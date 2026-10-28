import type { Student } from '../data/students';

export function searchStudents(students: readonly Student[], query: string): Student[] {
  const term = query.trim().toLowerCase();
  return students.filter((student) =>
    [student.name, student.department, student.studentId]
      .some((value) => value.toLowerCase().includes(term))
  );
}
