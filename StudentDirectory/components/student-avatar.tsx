import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { Student } from '../data/students';

export default function StudentAvatar({ student }: { student: Student }) {
  const [failed, setFailed] = useState(false);
  const initials = student.name.trim().split(/\s+/).slice(0, 2).map((s) => s[0]).join('');
  if (student.avatarUrl && !failed) {
    return <Image source={{ uri: student.avatarUrl }} style={styles.avatar}
      accessibilityLabel={`${student.name}'s avatar`} onError={() => setFailed(true)} />;
  }
  return <View style={styles.avatar}><Text style={styles.initials}>{initials}</Text></View>;
}

const styles = StyleSheet.create({
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#CCFBF1', alignItems: 'center', justifyContent: 'center' },
  initials: { fontSize: 16, color: '#115E59', fontWeight: '800' },
});
