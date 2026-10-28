import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddStudentForm from '../../components/add-student-form';

export default function AddStudentScreen() {
  return <SafeAreaView edges={['left', 'right']} style={styles.screen}><AddStudentForm /></SafeAreaView>;
}
const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#FFFFFF' } });
