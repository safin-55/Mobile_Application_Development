import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StudentsProvider } from '../context/students-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StudentsProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </StudentsProvider>
    </SafeAreaProvider>
  );
}
