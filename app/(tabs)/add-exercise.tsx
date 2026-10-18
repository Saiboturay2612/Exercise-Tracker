
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import type { ExerciseRecord } from '../../utils/exerciseStorage';
import { saveExercise } from '../../utils/exerciseStorage';

export default function AddExerciseScreen() {
  const [exerciseName, setExerciseName] = useState('');
  const [duration, setDuration] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    const name = exerciseName.trim();
    const minutes = Number(duration);

    if (!name || !duration.trim()) {
      Alert.alert(
        'Missing information',
        'Enter the exercise name and duration.',
      );
      return;
    }

    if (!Number.isFinite(minutes) || minutes <= 0) {
      Alert.alert(
        'Invalid duration',
        'Enter a duration greater than zero minutes.',
      );
      return;
    }

    if (saving) return;

    setSaving(true);

    const record: ExerciseRecord = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      duration: minutes,
      date: new Date().toISOString(),
    };

    try {
      await saveExercise(record);

      setExerciseName('');
      setDuration('');

      Alert.alert(
        'Exercise saved!',
        `${name} — ${minutes} minutes has been added to your exercise records.`,
      );
    } catch {
      Alert.alert(
        'Unable to save',
        'Your exercise could not be saved. Please try again.',
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>YOUR FITNESS JOURNEY</Text>
        <Text style={styles.title}>Add Exercise</Text>
        <Text style={styles.subtitle}>
          Record the activity you completed today.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>EXERCISE NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Running, Walking, Cycling"
            placeholderTextColor="#7D8BA3"
            value={exerciseName}
            onChangeText={setExerciseName}
            autoCapitalize="words"
            accessibilityLabel="Exercise name"
            editable={!saving}
          />

          <Text style={styles.label}>DURATION (MINUTES)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 30"
            placeholderTextColor="#7D8BA3"
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
            accessibilityLabel="Exercise duration in minutes"
            editable={!saving}
          />

          <Pressable
            style={({ pressed }) => [
              styles.saveButton,
              pressed && styles.buttonPressed,
              saving && { opacity: 0.6 },
            ]}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#101827" />
            ) : (
              <Text style={styles.saveButtonText}>SAVE EXERCISE</Text>
            )}
          </Pressable>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 FITNESS TIP</Text>
          <Text style={styles.tipText}>
            Record your exercise soon after finishing so you remember
            the correct duration.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101827',
  },
  content: {
    padding: 22,
    paddingTop: 45,
    paddingBottom: 35,
  },
  eyebrow: {
    color: '#65E6B3',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 10,
  },
  subtitle: {
    color: '#A8B3C7',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 28,
  },
  card: {
    backgroundColor: '#1A2537',
    borderColor: '#2A394F',
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
  },
  label: {
    color: '#D6DEEA',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#101827',
    borderColor: '#35445B',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 15,
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#65E6B3',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  saveButtonText: {
    color: '#101827',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  tipCard: {
    backgroundColor: '#1D2B40',
    padding: 18,
    borderRadius: 16,
    marginTop: 20,
  },
  tipTitle: {
    color: '#65E6B3',
    fontSize: 12,
    fontWeight: '800',
  },
  tipText: {
    color: '#B8C4D7',
    fontSize: 13,
    lineHeight: 21,
    marginTop: 8,
  },
});
