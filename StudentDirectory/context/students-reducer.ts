import { STUDENTS } from '../data/students';
import type { Student } from '../data/students';

export type StudentsState = Student[];
export type StudentsAction =
  | { type: 'ADD_STUDENT'; payload: Student }
  | { type: 'REMOVE_STUDENT'; payload: string }
  | { type: 'RESET' };

export function studentsReducer(state: StudentsState, action: StudentsAction): StudentsState {
  switch (action.type) {
    case 'ADD_STUDENT':
      // The form gives the inline error; this guard also protects direct dispatches.
      if (state.some((student) => student.studentId === action.payload.studentId || student.id === action.payload.id)) return state;
      return [action.payload, ...state];
    case 'REMOVE_STUDENT':
      return state.filter((student) => student.id !== action.payload);
    case 'RESET':
      return STUDENTS.map((student) => ({ ...student, skills: [...student.skills] }));
    default:
      return state;
  }
}
