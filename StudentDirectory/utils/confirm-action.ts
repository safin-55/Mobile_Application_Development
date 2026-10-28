import { Alert, Platform } from 'react-native';

// React Native's Alert works on phones. React Native Web needs a browser dialog.
export function confirmAction(title: string, message: string, confirmText: string, onConfirm: () => void): void {
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined' && window.confirm(`${title}\n\n${message}`)) onConfirm();
    return;
  }
  Alert.alert(title, message, [
    { text: 'Cancel', style: 'cancel' },
    { text: confirmText, style: 'destructive', onPress: onConfirm },
  ]);
}
