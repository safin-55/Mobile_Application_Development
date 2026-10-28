import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import FormField from './form-field';
import { createStudent, EMPTY_FORM, validateForm } from '../utils/student-form';
import type { FormData, FormErrors } from '../utils/student-form';
import { useStudents } from '../context/students-context';



export default function AddStudentForm() {
  const { students, dispatch } = useStudents();
  const router = useRouter();
  // Five controlled values are kept together; unrelated flags have separate state.
  const [formData, setFormData] = useState<FormData>({ ...EMPTY_FORM });
  const [errors, setErrors] = useState<FormErrors>(() => validateForm(EMPTY_FORM, students));
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitTrigger, setSubmitTrigger] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
  };
  const markTouched = (field: keyof FormData) => {
    setTouched((previous) => ({ ...previous, [field]: true }));
  };
  const getFieldError = (field: keyof FormErrors) =>
    touched[field] || submitAttempted ? errors[field] : undefined;

  // Manual 4: live validation is driven by an effect on the combined form object.
  useEffect(() => {
    setErrors(validateForm(formData, students));
  }, [formData, students]);

  // Tabs may keep a screen mounted after navigation. Clear the actual timer on
  // blur as well as in the submit effect's unmount cleanup.
  useFocusEffect(useCallback(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
      timerRef.current = null;
      setSubmitTrigger(false);
      setIsSubmitting(false);
    };
  }, []));

  useEffect(() => {
    if (!submitTrigger) return;
    const timeoutId = setTimeout(() => {
      timerRef.current = null;
      // Recheck the current list/data before committing the simulated request.
      const currentErrors = validateForm(formData, students);
      setIsSubmitting(false);
      setSubmitTrigger(false);
      if (Object.keys(currentErrors).length > 0) {
        setErrors(currentErrors);
        setSubmitAttempted(true);
        return;
      }
      const newStudent = createStudent(formData);
      dispatch({ type: 'ADD_STUDENT', payload: newStudent });
      if (router.canGoBack()) router.back();
      else router.replace('/(tabs)');
      setFormData({ ...EMPTY_FORM });
      setTouched({});
      setSubmitAttempted(false);
    }, 1500);
    timerRef.current = timeoutId;
    return () => {
      clearTimeout(timeoutId);
      if (timerRef.current === timeoutId) timerRef.current = null;
    };
  }, [submitTrigger, formData, students, dispatch, router]);

  // Derive validity directly to avoid enabling Submit for a stale validation render.
  const isFormValid = Object.keys(validateForm(formData, students)).length === 0;
  const handleSubmitPress = () => {
    setSubmitAttempted(true);
    setTouched({ name: true, studentId: true, department: true, bio: true, skillsText: true });
    const currentErrors = validateForm(formData, students);
    setErrors(currentErrors);
    if (!isSubmitting && Object.keys(currentErrors).length === 0) {
      setIsSubmitting(true);
      setSubmitTrigger(true);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.flex} contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.headingRow}>
          <Text style={styles.heading}>Join the Directory</Text>
          <Pressable accessibilityRole="button" accessibilityLabel="Cancel adding student"
            onPress={() => { if (router.canGoBack()) router.back(); else router.replace('/(tabs)'); }} style={styles.cancel}><Text style={styles.cancelText}>Cancel</Text></Pressable>
        </View>
        <Text style={styles.subheading}>Tell us about yourself. Fields marked * are required; skills are optional.</Text>
        <FormField label="Full Name *" value={formData.name} testID="field-name"
          onChangeText={(value) => updateField('name', value)} onBlur={() => markTouched('name')}
          placeholder="e.g. Ashraful Haque" autoCapitalize="words" error={getFieldError('name')} editable={!isSubmitting} />
        <FormField label="Student ID *" value={formData.studentId} testID="field-studentId"
          onChangeText={(value) => updateField('studentId', value)} onBlur={() => markTouched('studentId')}
          placeholder="e.g. 22-12345-1" autoCapitalize="none" error={getFieldError('studentId')} editable={!isSubmitting} />
        <FormField label="Department *" value={formData.department} testID="field-department"
          onChangeText={(value) => updateField('department', value)} onBlur={() => markTouched('department')}
          placeholder="e.g. Computer Science" autoCapitalize="words" error={getFieldError('department')} editable={!isSubmitting} />
        <FormField label="Bio *" value={formData.bio} testID="field-bio"
          onChangeText={(value) => updateField('bio', value)} onBlur={() => markTouched('bio')}
          placeholder="At least 10 characters about yourself" multiline error={getFieldError('bio')} editable={!isSubmitting} />
        <FormField label="Skills (comma-separated)" value={formData.skillsText} testID="field-skillsText"
          onChangeText={(value) => updateField('skillsText', value)} onBlur={() => markTouched('skillsText')}
          placeholder="e.g. React Native, TypeScript, Figma" autoCapitalize="none" editable={!isSubmitting} />
        <Text style={styles.help}>{isSubmitting ? 'Adding your student profile…' : 'Complete the required fields to enable Join Directory.'}</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Join Directory"
          accessibilityState={{ disabled: !isFormValid || isSubmitting, busy: isSubmitting }} testID="submit-student"
          disabled={!isFormValid || isSubmitting} onPress={handleSubmitPress}
          style={[styles.button, (!isFormValid || isSubmitting) && styles.buttonDisabled]}>
          {isSubmitting ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Join Directory</Text>}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { padding: 22, paddingBottom: 48, width: '100%', maxWidth: 720, alignSelf: 'center' },
  headingRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8 },
  heading: { fontSize: 24, fontWeight: '800', color: '#0D1F4E', flexShrink: 1 },
  cancel: { minHeight: 44, justifyContent: 'center', paddingHorizontal: 8 },
  cancelText: { color: '#0F766E', fontWeight: '700', fontSize: 14 },
  subheading: { fontSize: 14, color: '#64748B', marginTop: 4, marginBottom: 26, lineHeight: 21 },
  help: { fontSize: 12, color: '#64748B', lineHeight: 18, marginBottom: 10 },
  button: { backgroundColor: '#0F766E', borderRadius: 12, minHeight: 52, justifyContent: 'center', alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#94A3B8' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
