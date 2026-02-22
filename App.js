import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { DonationProvider } from './src/context/DonationContext';
import { UserProvider } from './src/context/UserContext';

export default function App() {
  return (
    <UserProvider>
      <DonationProvider>
        <View style={styles.container}>
          <AppNavigator />
          <StatusBar style="auto" />
        </View>
      </DonationProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
