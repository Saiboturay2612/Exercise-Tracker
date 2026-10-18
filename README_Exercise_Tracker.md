# Exercise Tracker Mobile Application

**Course:** CS309 — Mobile Application Development  
**Project Question:** Q18  
**Student name:** Saibo Turay  
**Student ID:** 10523  
**Institution:** University of Makeni

## Project overview

Exercise Tracker is a simple mobile application that lets a user record exercise sessions, enter the duration in minutes, and review saved exercise history. It is built with React Native and Expo using TypeScript.

## Main features

- Home screen with navigation to the main functions.
- Add an exercise name and duration.
- Validate required exercise details before saving.
- Save exercise records locally on the device with AsyncStorage.
- View saved exercise names, durations, dates, number of sessions, and total minutes.
- Delete a saved record after confirmation.

## Technology used

- React Native and Expo
- TypeScript
- Expo Router
- `@react-native-async-storage/async-storage`
- Expo Go for development testing

## Project structure

```text
ExerciseTracker/
├── app/
│   └── (tabs)/
│       ├── index.tsx
│       ├── add-exercise.tsx
│       ├── history.tsx
│       └── _layout.tsx
├── utils/
│   └── exerciseStorage.ts
├── assets/
├── package.json
└── README.md
```

## Requirements

- Node.js and npm
- Visual Studio Code or another code editor
- An Android phone with Expo Go for device testing
- The project source folder

## Installation and running

1. Copy or clone the project folder to your computer.
2. Open the project folder in Visual Studio Code.
3. Open a terminal in the project directory.
4. Install the project dependencies:

   ```bash
   npm install
   ```

5. Start Expo:

   ```bash
   npx expo start
   ```

6. Open Expo Go on the Android phone and scan the QR code shown by Expo. For LAN mode, connect the phone and computer to the same Wi-Fi network. If the connection does not work, follow the connection options shown by the Expo development server.

## Data storage

Exercise records are stored locally on the device using AsyncStorage under the key `@exercise_tracker_records`. Records include an ID, exercise name, duration in minutes, and date/time. No remote server or cloud database is used.

**Note:** Clearing the app's data or uninstalling the app may remove locally stored records.

## Basic user guide

1. Open the application and review the Home screen.
2. Select **Add Exercise**.
3. Enter the exercise name and duration in minutes, then press **Save**.
4. Correct any missing or invalid values if the app displays a validation message.
5. Open **History** to review saved sessions and summary totals.
6. Use the delete control and confirm to remove a record.

## Testing before submission

Before submitting, verify and record the actual result for:
- Opening each screen using the bottom tabs and Home shortcuts.
- Saving a valid exercise.
- Rejecting blank names and invalid durations.
- Viewing history and summary totals.
- Deleting a record after confirmation.
- Closing and reopening the app and checking whether records remain.

## Limitations and future improvements

The current app is designed for local single-device use. Possible future improvements include editing records, exercise categories, weekly/monthly reports, reminders, and backup/export functionality.
