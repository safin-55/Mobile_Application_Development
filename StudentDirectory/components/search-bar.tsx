import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

interface SearchBarProps { value: string; onChangeText: (value: string) => void; }

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <View style={styles.wrapper}>
      <TextInput accessibilityLabel="Search students" testID="search-students"
        placeholder="Search name, department, or student ID" placeholderTextColor="#64748B"
        value={value} onChangeText={onChangeText} autoCapitalize="none" autoCorrect={false}
        style={styles.input} />
      {value ? <Pressable accessibilityRole="button" accessibilityLabel="Clear search"
        onPress={() => onChangeText('')} style={styles.clear}><Text style={styles.clearText}>Clear</Text></Pressable> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginTop: 18, marginBottom: 8, borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, backgroundColor: '#FFFFFF' },
  input: { flex: 1, minWidth: 0, padding: 14, fontSize: 15, color: '#0F172A' },
  clear: { minHeight: 44, justifyContent: 'center', paddingHorizontal: 12 },
  clearText: { color: '#0F766E', fontSize: 13, fontWeight: '600' },
});
