
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import type { ExerciseRecord } from '../../utils/exerciseStorage';
import {
    deleteExercise,
    getExercises,
} from '../../utils/exerciseStorage';

export default function HistoryScreen() {
  const [records, setRecords] = useState<ExerciseRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRecords = useCallback(async () => {
    setLoading(true);
    try {
      const savedRecords = await getExercises();
      setRecords(savedRecords);
    } catch {
      Alert.alert('Error', 'Could not load your exercise history.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadRecords();
    }, [loadRecords]),
  );

  const totalMinutes = records.reduce(
    (total, record) => total + record.duration,
    0,
  );

  function confirmDelete(record: ExerciseRecord) {
    Alert.alert(
      'Delete exercise?',
      `Remove ${record.name} from your history?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteExercise(record.id);
              await loadRecords();
            } catch {
              Alert.alert('Error', 'Could not delete this exercise.');
            }
          },
        },
      ],
    );
  }

  function formatDate(date: string) {
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return 'Date unavailable';

    return parsedDate.toLocaleString([], {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>YOUR FITNESS JOURNEY</Text>
      <Text style={styles.title}>Exercise History</Text>
      <Text style={styles.subtitle}>
        Every workout counts. Keep building your healthy habits.
      </Text>

      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{records.length}</Text>
          <Text style={styles.summaryLabel}>WORKOUTS</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{totalMinutes}</Text>
          <Text style={styles.summaryLabel}>TOTAL MINUTES</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>YOUR RECORDS</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#65E6B3" />
      ) : records.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>🏃</Text>
          <Text style={styles.emptyTitle}>No exercises yet</Text>
          <Text style={styles.emptyText}>
            Add your first exercise to start building your history.
          </Text>
        </View>
      ) : (
        records.map((record) => (
          <View key={record.id} style={styles.recordCard}>
            <View style={styles.recordTop}>
              <View style={styles.recordIcon}>
                <Text style={styles.recordEmoji}>💪</Text>
              </View>
              <View style={styles.recordDetails}>
                <Text style={styles.recordName}>{record.name}</Text>
                <Text style={styles.recordDate}>
                  {formatDate(record.date)}
                </Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Delete ${record.name}`}
                onPress={() => confirmDelete(record)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </Pressable>
            </View>
            <View style={styles.durationRow}>
              <Text style={styles.durationLabel}>Duration</Text>
              <Text style={styles.durationValue}>
                {record.duration} minutes
              </Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
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
    paddingBottom: 40,
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
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: '#1A2537',
    borderColor: '#2A394F',
    borderWidth: 1,
    borderRadius: 18,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryNumber: {
    color: '#65E6B3',
    fontSize: 27,
    fontWeight: '900',
  },
  summaryLabel: {
    color: '#A8B3C7',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginTop: 7,
    textAlign: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 45,
    backgroundColor: '#35445B',
  },
  sectionTitle: {
    color: '#D6DEEA',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 15,
  },
  emptyCard: {
    backgroundColor: '#1A2537',
    borderRadius: 18,
    padding: 28,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 38,
    marginBottom: 12,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  emptyText: {
    color: '#A8B3C7',
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 21,
    marginTop: 8,
  },
  recordCard: {
    backgroundColor: '#1A2537',
    borderColor: '#2A394F',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  recordTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#26384B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordEmoji: {
    fontSize: 20,
  },
  recordDetails: {
    flex: 1,
    marginLeft: 12,
  },
  recordName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  recordDate: {
    color: '#A8B3C7',
    fontSize: 11,
    marginTop: 5,
  },
  deleteButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  deleteText: {
    color: '#FF8585',
    fontSize: 12,
    fontWeight: '700',
  },
  durationRow: {
    borderTopWidth: 1,
    borderTopColor: '#35445B',
    marginTop: 15,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  durationLabel: {
    color: '#A8B3C7',
    fontSize: 12,
  },
  durationValue: {
    color: '#65E6B3',
    fontSize: 13,
    fontWeight: '800',
  },
});
