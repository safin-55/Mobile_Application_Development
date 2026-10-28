import { StyleSheet, Text, TextInput, View } from 'react-native';
import type { TextInputProps } from 'react-native';

interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  multiline?: boolean;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  editable?: boolean;
  testID?: string;
}

export default function FormField({
  label, value, onChangeText, onBlur, error, placeholder,
  multiline = false, autoCapitalize = 'sentences', editable = true, testID,
}: FormFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        accessibilityHint={error}
        testID={testID}
        style={[styles.input, multiline && styles.multiline, error ? styles.inputError : null]}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor="#64748B"
        multiline={multiline}
        autoCapitalize={autoCapitalize}
        editable={editable}
        autoCorrect={autoCapitalize !== 'none'}
      />
      {error ? <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 18 },
  label: { fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 7 },
  input: {
    backgroundColor: '#F1F5F9', borderRadius: 10, paddingHorizontal: 14,
    paddingVertical: 12, minHeight: 48, fontSize: 16, color: '#1E293B',
    borderWidth: 1, borderColor: '#CBD5E1',
  },
  multiline: { minHeight: 100, textAlignVertical: 'top' },
  inputError: { borderColor: '#DC2626', backgroundColor: '#FEF2F2' },
  error: { fontSize: 12, color: '#B91C1C', marginTop: 5, lineHeight: 18 },
});
