import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs backBehavior="history" screenOptions={{
      headerShown: false, tabBarActiveTintColor: '#0F766E', tabBarInactiveTintColor: '#64748B',
      tabBarStyle: { backgroundColor: '#FFFFFF' }, tabBarLabelStyle: { fontWeight: '600' },
    }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}>⌂</Text> }} />
      <Tabs.Screen name="bookmarks" options={{ title: 'Bookmarks', tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>☆</Text> }} />
      <Tabs.Screen name="add-student" options={{
        title: 'Add Student', href: null, headerShown: true, headerTitle: 'Join the Directory',
        headerStyle: { backgroundColor: '#0D1F4E' }, headerTintColor: '#FFFFFF',
      }} />
    </Tabs>
  );
}
