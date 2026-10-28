import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../../components/search-bar';
import StudentDetail from '../../components/student-detail';
import StudentItem from '../../components/student-item';
import type { Student } from '../../data/students';
import { searchStudents } from '../../utils/search-students';
import { useRouter } from 'expo-router';
import { useStudents } from '../../context/students-context';
import { confirmAction } from '../../utils/confirm-action';

export default function HomePage() {
  const { students, dispatch } = useStudents();
  const router = useRouter();
  const [query, setQuery] = useState('');
  // Keep an ID and derive the current object: removed cards cannot stay on screen.
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedStudent = students.find((student) => student.id === selectedId) ?? null;
  const filtered = searchStudents(students, query);
  const handleSelect = (student: Student) => setSelectedId((previous) => previous === student.id ? null : student.id);
  const handleAdd = () => {
    setQuery('');
    setSelectedId(null);
    router.push('/(tabs)/add-student');
  };
  const handleReset = () => confirmAction(
    'Reset Directory', 'Restore the original students? Added entries will be removed.', 'Reset',
    () => {
      dispatch({ type: 'RESET' });
      setSelectedId(null);
      setQuery('');
    },
  );

  

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.titleBar}>
          <View style={styles.titleGroup}>
            <Text style={styles.eyebrow}>STUDENTDIRECTORY</Text>
            <Text style={styles.title} testID="directory-title">Student Directory ({students.length})</Text>
          </View>
          <View style={styles.actions}>
            <Pressable accessibilityRole="button" accessibilityLabel="Reset directory" onPress={handleReset} style={styles.resetButton}><Text style={styles.resetText}>Reset</Text></Pressable>
            <Pressable accessibilityRole="button" accessibilityLabel="Add student" onPress={handleAdd} style={styles.addButton}>
              <Text style={styles.addText}>+ Add</Text>
            </Pressable>
          </View>
        </View>
        <SearchBar value={query} onChangeText={setQuery} />
        <Text style={styles.results} accessibilityLiveRegion="polite">{filtered.length} {filtered.length === 1 ? 'student' : 'students'} shown · tap a card for details</Text>
        <FlatList style={styles.list} contentContainerStyle={styles.listContent}
          data={filtered} keyExtractor={(item) => item.id} keyboardShouldPersistTaps="handled"
          extraData={selectedId}
          renderItem={({ item }) => <StudentItem student={item} onPress={handleSelect} isSelected={selectedId === item.id} />}
          ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyTitle}>No students found</Text><Text style={styles.emptyText}>{query ? `No students match “${query}”. Try a different search.` : 'Use + Add to join the directory.'}</Text></View>}
        />
        {selectedStudent ? <StudentDetail student={selectedStudent} onClose={() => setSelectedId(null)} /> : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F0F4F8' },
  content: { flex: 1, width: '100%', maxWidth: 900, alignSelf: 'center' },
  titleBar: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, alignItems: 'center', justifyContent: 'space-between', padding: 20, backgroundColor: '#0D1F4E' },
  titleGroup: { flexShrink: 1 }, eyebrow: { fontSize: 10, letterSpacing: 1.5, color: '#99F6E4', marginBottom: 7 },
  title: { fontSize: 22, fontWeight: '800', color: '#FFFFFF' },
  actions: { flexDirection: 'row', gap: 8 },
  addButton: { minHeight: 44, justifyContent: 'center', paddingHorizontal: 18, borderRadius: 10, backgroundColor: '#0F766E' },
  addText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  resetButton: { minHeight: 44, justifyContent: 'center', paddingHorizontal: 14, borderRadius: 10, borderWidth: 1, borderColor: '#94A3B8' },
  resetText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  results: { color: '#64748B', fontSize: 12, marginHorizontal: 18, marginTop: 4, marginBottom: 12 },
  list: { flex: 1, minHeight: 120 }, listContent: { paddingHorizontal: 16, paddingBottom: 16 },
  empty: { alignItems: 'center', paddingHorizontal: 16, paddingVertical: 42 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#334155' },
  emptyText: { fontSize: 14, lineHeight: 22, color: '#64748B', textAlign: 'center', marginTop: 8 },
});
