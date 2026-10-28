import { createContext, useContext, useMemo, useReducer } from 'react';
import type { Dispatch, ReactNode } from 'react';
import { STUDENTS } from '../data/students';
import { studentsReducer } from './students-reducer';
import type { StudentsAction, StudentsState } from './students-reducer';

interface StudentsContextValue { students: StudentsState; dispatch: Dispatch<StudentsAction>; }
export const StudentsContext = createContext<StudentsContextValue | null>(null);

export function StudentsProvider({ children }: { children: ReactNode }) {
  const [students, dispatch] = useReducer(studentsReducer, STUDENTS);
  const value = useMemo(() => ({ students, dispatch }), [students, dispatch]);
  return <StudentsContext.Provider value={value}>{children}</StudentsContext.Provider>;
}

export function useStudents(): StudentsContextValue {
  const context = useContext(StudentsContext);
  if (!context) throw new Error('useStudents must be used inside a StudentsProvider');
  return context;
}
