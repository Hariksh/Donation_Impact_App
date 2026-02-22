# Donation Impact App

The Donation Impact App is a React Native mobile application built with Expo. It provides users with a platform to discover, contribute to, and track the impact of charitable campaigns.

## Features

- **Campaign Discovery**: Browse through various fundraising campaigns and read detailed stories about their goals and impact.
- **Donation Processing**: Securely contribute to selected campaigns.
- **Impact Tracking**: View live updates and understand where your money goes with detailed funding allocation breakdowns.
- **User Profile**: Manage user settings, track total donations, view the number of families supported, and generate official tax receipts in PDF format.
- **Tax Receipts**: Automatically generate, download, and share official tax receipts for your contributions.

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Native Stack, Bottom Tabs)
- **Icons**: Expo Vector Icons
- **PDF Generation & Sharing**: Expo Print, Expo Sharing

## Project Structure

- `Frontend/`: Contains the entire React Native application source code.
  - `src/screens/`: Contains all the application screens such as `HomeScreen`, `CampaignDetailsScreen`, `ImpactScreen`, and `ProfileScreen`.
  - `src/context/`: Context providers for managing global state like `UserContext` and `DonationContext`.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js
- npm or yarn
- Expo CLI
- Expo Go app on your mobile device (optional, for testing)

## Getting Started

Follow these steps to set up and run the project locally.

1. **Navigate to the frontend directory**
   cd Frontend

2. **Install dependencies**
   npm install

3. **Start the development server**
   npx expo start

4. **Run the app**
   - Press `i` to open the iOS simulator
   - Press `a` to open the Android emulator
   - Or scan the QR code with the Expo Go app on your physical device

## Scripts

- `npm start`: Starts the Expo development server.
- `npm run android`: Starts the app on an Android emulator.
- `npm run ios`: Starts the app on an iOS simulator.
- `npm run web`: Starts the app in a web browser.
