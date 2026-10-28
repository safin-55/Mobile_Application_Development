import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { Student } from '../data/students';
import { useStudents } from '../context/students-context';
import { confirmAction } from '../utils/confirm-action';

interface StudentDetailProps { student: Student; onClose: () => void; }

export default function StudentDetail({ student, onClose }: StudentDetailProps) {
  const { dispatch } = useStudents();
  const handleRemove = () => confirmAction(
    'Remove Student', `Remove ${student.name} from the directory?`, 'Remove',
    () => dispatch({ type: 'REMOVE_STUDENT', payload: student.id }),
  );
  return (
    <View style={styles.card} testID="student-detail">
      <View style={styles.headingRow}>
        <Text style={styles.name}>{student.name}</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Close student details"
          onPress={onClose} style={styles.close}><Text style={styles.closeText}>Close</Text></Pressable>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.body}>
        <Text style={styles.meta}>{student.studentId} · {student.department}</Text>
        <Text style={styles.bio}>{student.bio}</Text>
        <View style={styles.skills}>
          {student.skills.length ? student.skills.map((skill, index) => <View key={`${skill}-${index}`} style={styles.pill}><Text style={styles.skill}>{skill}</Text></View>) : <Text style={styles.meta}>No skills listed</Text>}
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Remove from Directory" onPress={handleRemove} style={styles.removeButton}>
          <Text style={styles.removeText}>Remove from Directory</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { margin: 16, marginTop: 6, borderRadius: 14, borderWidth: 1, borderColor: '#99F6E4', backgroundColor: '#FFFFFF', maxHeight: 290 },
  headingRow: { paddingHorizontal: 16, paddingTop: 6, flexDirection: 'row', alignItems: 'center', gap: 12 },
  name: { flex: 1, fontSize: 18, fontWeight: '800', color: '#0D1F4E' },
  close: { minHeight: 44, justifyContent: 'center' }, closeText: { color: '#0F766E', fontWeight: '600' },
  scroll: { flexGrow: 0 }, body: { padding: 16, paddingTop: 4 },
  meta: { color: '#64748B', fontSize: 13, lineHeight: 20 },
  bio: { fontSize: 14, lineHeight: 22, color: '#334155', marginTop: 10 },
  skills: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 12 },
  pill: { borderRadius: 14, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#F0FDFA' },
  skill: { color: '#115E59', fontSize: 12 },
  removeButton: { minHeight: 44, marginTop: 16, borderRadius: 8, borderWidth: 1, borderColor: '#DC2626', justifyContent: 'center', alignItems: 'center' },
  removeText: { color: '#B91C1C', fontSize: 13, fontWeight: '700' },
});
