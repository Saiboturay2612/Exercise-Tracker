
import { router } from 'expo-router';
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="light-content" backgroundColor="#101827" />

      <View style={styles.header}>
        <Text style={styles.greeting}>YOUR FITNESS JOURNEY</Text>
        <Text style={styles.title}>Exercise Tracker</Text>
        <Text style={styles.subtitle}>
          Build healthy habits, one session at a time.
        </Text>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.cardLabel}>WELCOME BACK!</Text>
        <Text style={styles.cardTitle}>Ready to get moving?</Text>
        <Text style={styles.cardDescription}>
          Record your workouts and keep track of your progress.
        </Text>
        <View style={styles.accentLine} />
      </View>

      <Text style={styles.sectionTitle}>YOUR TRACKER</Text>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.navigate('/add-exercise')}
        style={({ pressed }) => [
          styles.featureCard,
          pressed && styles.cardPressed,
        ]}
      >
        <Text style={styles.featureEmoji}>🏋️</Text>
        <View style={styles.featureText}>
          <Text style={styles.featureTitle}>Add an Exercise</Text>
          <Text style={styles.featureDescription}>
            Enter an exercise and its duration.
          </Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.navigate('/(tabs)/history')}
        style={({ pressed }) => [
          styles.featureCard,
          pressed && styles.cardPressed,
        ]}
      >
        <Text style={styles.featureEmoji}>📋</Text>
        <View style={styles.featureText}>
          <Text style={styles.featureTitle}>Workout Records</Text>
          <Text style={styles.featureDescription}>
            Keep a record of completed exercise sessions.
          </Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.navigate('/(tabs)/history')}
        style={({ pressed }) => [
          styles.featureCard,
          pressed && styles.cardPressed,
        ]}
      >
        <Text style={styles.featureEmoji}>🕒</Text>
        <View style={styles.featureText}>
          <Text style={styles.featureTitle}>Exercise History</Text>
          <Text style={styles.featureDescription}>
            Review your previous workouts and durations.
          </Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Text style={styles.footer}>
        SMALL STEPS. STRONGER YOU.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101827',
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 55,
    paddingBottom: 30,
  },
  header: {
    marginBottom: 28,
  },
  greeting: {
    color: '#65E6B3',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 9,
  },
  subtitle: {
    color: '#A8B3C7',
    fontSize: 14,
    marginTop: 8,
    lineHeight: 21,
  },
  summaryCard: {
    backgroundColor: '#1D2B40',
    borderRadius: 20,
    padding: 22,
    marginBottom: 28,
    overflow: 'hidden',
  },
  cardLabel: {
    color: '#65E6B3',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
    marginTop: 12,
  },
  cardDescription: {
    color: '#B8C4D7',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
  accentLine: {
    height: 4,
    width: 55,
    backgroundColor: '#65E6B3',
    borderRadius: 5,
    marginTop: 20,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 14,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A2537',
    borderWidth: 1,
    borderColor: '#2A394F',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
  },
  cardPressed: {
    opacity: 0.7,
    borderColor: '#65E6B3',
  },
  featureEmoji: {
    fontSize: 27,
    marginRight: 14,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  featureDescription: {
    color: '#A8B3C7',
    fontSize: 11,
    lineHeight: 17,
    marginTop: 5,
  },
  arrow: {
    color: '#65E6B3',
    fontSize: 27,
    marginLeft: 8,
  },
  footer: {
    color: '#71819B',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
});
