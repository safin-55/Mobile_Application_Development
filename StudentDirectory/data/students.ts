// Demonstration data: the original Week 2 project was not supplied.
// The interface is exactly the one required by Manual 4.
export interface Student {
  id: string;
  name: string;
  studentId: string;
  department: string;
  bio: string;
  skills: string[];
  avatarUrl: string;
}

export const STUDENTS: Student[] = [
  {
    id: '1', name: 'Ayesha Rahman', studentId: '22-10001-1',
    department: 'Computer Science',
    bio: 'I enjoy building mobile apps and solving programming problems.',
    skills: ['React Native', 'TypeScript'], avatarUrl: '',
  },
  {
    id: '2', name: 'Hasan Ahmed', studentId: '22-10002-1',
    department: 'Electrical Engineering',
    bio: 'Interested in robotics, embedded systems, and practical electronics.',
    skills: ['Arduino', 'Python'], avatarUrl: '',
  },
  {
    id: '3', name: 'Nusrat Jahan', studentId: '22-10003-1',
    department: 'Business Administration',
    bio: 'I like bringing people together and developing new business ideas.',
    skills: ['Communication', 'Excel'], avatarUrl: '',
  },
  {
    id: '4', name: 'Tanvir Islam', studentId: '22-10004-1',
    department: 'Computer Science',
    bio: 'A curious developer learning web design and mobile development.',
    skills: ['JavaScript', 'Figma'], avatarUrl: '',
  },
  {
    id: '5', name: 'Farhana Akter', studentId: '22-10005-1',
    department: 'Architecture',
    bio: 'Exploring how thoughtful design can improve everyday spaces.',
    skills: ['Sketching', 'AutoCAD'], avatarUrl: '',
  },
  {
    id: '6', name: 'Rafiul Karim', studentId: '22-10006-1',
    department: 'Computer Science',
    bio: 'I enjoy teamwork, clean code, and learning how software works.',
    skills: ['Java', 'Git'], avatarUrl: '',
  },
];
