
import AsyncStorage from '@react-native-async-storage/async-storage';

// Describes the information stored for each exercise
export type ExerciseRecord = {
  id: string;
  name: string;
  duration: number;
  date: string;
};

// The storage key used to find our saved exercise records
const STORAGE_KEY = '@exercise_tracker_records';

// Save a new exercise record
export async function saveExercise(
  exercise: ExerciseRecord
): Promise<void> {
  try {
    const existingRecords = await getExercises();

    const updatedRecords = [exercise, ...existingRecords];

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedRecords)
    );
  } catch (error) {
    console.error('Error saving exercise:', error);
    throw error;
  }
}

// Retrieve all saved exercise records
export async function getExercises(): Promise<ExerciseRecord[]> {
  try {
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);

    if (storedData === null) {
      return [];
    }

    return JSON.parse(storedData) as ExerciseRecord[];
  } catch (error) {
    console.error('Error loading exercises:', error);
    throw error;
  }
}

// Delete one exercise record using its ID
export async function deleteExercise(id: string): Promise<void> {
  try {
    const existingRecords = await getExercises();

    const updatedRecords = existingRecords.filter(
      (exercise) => exercise.id !== id
    );

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedRecords)
    );
  } catch (error) {
    console.error('Error deleting exercise:', error);
    throw error;
  }
}
