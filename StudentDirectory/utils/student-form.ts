import type { Student } from '../data/students';

export interface FormData {
  name: string;
  studentId: string;
  department: string;
  bio: string;
  skillsText: string;
}
export type FormErrors = Partial<Record<'name' | 'studentId' | 'department' | 'bio', string>>;
export const EMPTY_FORM: FormData = { name: '', studentId: '', department: '', bio: '', skillsText: '' };

// Pure validation, called by the live-validation effect and again before submitting.
export function validateForm(data: FormData, students: readonly Student[]): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Name is required.';
  else if (data.name.trim().length < 3) errors.name = 'Name must be at least 3 characters.';

  if (!data.studentId.trim()) errors.studentId = 'Student ID is required.';
  else if (!/^\d{2}-\d{5}-\d$/.test(data.studentId.trim())) {
    errors.studentId = 'Format must be NN-NNNNN-N (e.g. 22-12345-1).';
  } else if (students.some((student) => student.studentId === data.studentId.trim())) {
    errors.studentId = 'Student ID already exists';
  }

  if (!data.department.trim()) errors.department = 'Department is required.';
  if (!data.bio.trim()) errors.bio = 'Bio is required.';
  else if (data.bio.trim().length < 10) errors.bio = 'Bio must be at least 10 characters.';
  // Skills are optional, as stated in Manual 4.
  return errors;
}

export function createStudent(data: FormData): Student {
  const id = Date.now().toString();
  return {
    id, name: data.name.trim(), studentId: data.studentId.trim(),
    department: data.department.trim(), bio: data.bio.trim(),
    skills: data.skillsText.split(',').map((skill) => skill.trim()).filter(Boolean),
    // Initials remain visible if the optional remote avatar cannot load.
    avatarUrl: `https://i.pravatar.cc/150?u=${id}`,
  };
}
