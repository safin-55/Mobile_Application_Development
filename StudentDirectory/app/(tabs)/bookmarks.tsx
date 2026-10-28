import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStudents } from '../../context/students-context';

const references = [
  { title: 'React: useState', detail: 'Controlled inputs and local component state.', url: 'https://react.dev/reference/react/useState' },
  { title: 'React: useEffect', detail: 'Dependencies, timers, and cleanup.', url: 'https://react.dev/reference/react/useEffect' },
  { title: 'Expo Router', detail: 'Routes, layouts, and tab navigation.', url: 'https://docs.expo.dev/router/introduction/' },
];

export default function BookmarksScreen() {
  const { students } = useStudents();
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>MANUAL 5</Text>
        <Text style={styles.heading}>Bookmarks</Text>
        <Text style={styles.intro}>Saved learning references for this lab.</Text>
        {references.map((reference) => (
          <Link key={reference.url} href={reference.url} target="_blank" asChild>
            <Pressable style={styles.card}><Text style={styles.title}>{reference.title}</Text><Text style={styles.detail}>{reference.detail}</Text></Pressable>
          </Link>
        ))}
        <View style={styles.note}>
          <Text style={styles.noteTitle}>Check your session</Text>
          <Text style={styles.detail}>Add a student, visit this tab, and return Home. Your list is shared across routes for this session. Refreshing the app restores the sample students.</Text>
          <Text testID="shared-student-count" style={styles.count}>Students in this session: {students.length}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F0F4F8' },
  container: { padding: 24, paddingBottom: 48, width: '100%', maxWidth: 760, alignSelf: 'center' },
  eyebrow: { fontSize: 11, letterSpacing: 2, color: '#0F766E', fontWeight: '700' },
  heading: { fontSize: 30, fontWeight: '800', color: '#0D1F4E', marginTop: 8 },
  intro: { color: '#64748B', fontSize: 15, lineHeight: 23, marginTop: 8, marginBottom: 24 },
  link: { marginBottom: 12 },
  card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', padding: 20, borderRadius: 14, width: '100%', marginBottom: 12 },
  title: { fontSize: 17, fontWeight: '700', color: '#0F766E', marginBottom: 6 },
  detail: { fontSize: 14, lineHeight: 22, color: '#475569' },
  note: { padding: 20, borderRadius: 14, backgroundColor: '#CCFBF1', marginTop: 12 },
  noteTitle: { fontSize: 16, fontWeight: '700', color: '#115E59', marginBottom: 8 },
  count: { fontSize: 18, fontWeight: '800', color: '#0D1F4E', marginTop: 14 },
});
