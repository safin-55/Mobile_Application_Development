import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Student } from '../data/students';
import StudentAvatar from './student-avatar';

interface StudentItemProps {
  student: Student;
  onPress: (student: Student) => void;
  isSelected: boolean;
}

export default function StudentItem({ student, onPress, isSelected }: StudentItemProps) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`View ${student.name}`}
      accessibilityState={{ selected: isSelected }} testID={`student-${student.id}`}
      onPress={() => onPress(student)}
      style={({ pressed }) => [styles.card, isSelected && styles.selected, pressed && styles.pressed]}>
      <StudentAvatar student={student} />
      <View style={styles.content}>
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.department}>{student.department}</Text>
        <Text style={styles.id}>{student.studentId}</Text>
      </View>
      <Text style={styles.arrow}>{isSelected ? '−' : '+'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 14, padding: 16, marginBottom: 10 },
  selected: { borderColor: '#0D9488', backgroundColor: '#F0FDFA' },
  pressed: { opacity: 0.75 },
  content: { flex: 1 },
  name: { fontSize: 17, fontWeight: '700', color: '#0D1F4E' },
  department: { fontSize: 13, color: '#475569', marginTop: 4 },
  id: { fontSize: 12, color: '#64748B', marginTop: 4 },
  arrow: { fontSize: 24, color: '#0F766E' },
});
