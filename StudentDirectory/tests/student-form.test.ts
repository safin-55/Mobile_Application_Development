import assert from 'node:assert/strict';
import { test } from 'node:test';
import { STUDENTS } from '../data/students';
import { createStudent, EMPTY_FORM, validateForm } from '../utils/student-form';
import { searchStudents } from '../utils/search-students';
import type { FormData } from '../utils/student-form';

const valid: FormData = {
  name: 'Test Student', studentId: '26-54321-1', department: 'Computer Science',
  bio: 'A mobile developer learning React Native.', skillsText: '',
};
test('blank form identifies all four required fields; skills stay optional', () => {
  assert.deepEqual(Object.keys(validateForm(EMPTY_FORM, STUDENTS)).sort(), ['bio', 'department', 'name', 'studentId']);
});
test('valid form accepts optional empty skills and trims surrounding whitespace', () => {
  assert.deepEqual(validateForm({ ...valid, name: '  Test Student  ', studentId: ' 26-54321-1 ' }, STUDENTS), {});
});
test('student ID rejects incorrect digit counts and missing hyphens', () => {
  for (const studentId of ['2-12345-1', '22-1234-1', '22-123456-1', '22123451', 'aa-12345-1', '22-12345-12']) {
    assert.ok(validateForm({ ...valid, studentId }, STUDENTS).studentId, studentId);
  }
});
test('name and bio enforce their exact minimum lengths after trimming', () => {
  assert.ok(validateForm({ ...valid, name: '  Ab ', bio: '123456789' }, STUDENTS).name);
  assert.ok(validateForm({ ...valid, bio: '123456789' }, STUDENTS).bio);
  assert.deepEqual(validateForm({ ...valid, name: 'Abc', bio: '1234567890' }, STUDENTS), {});
});
test('student creation trims values and drops empty comma-separated skills', () => {
  const student = createStudent({ ...valid, name: ' Test Student ', skillsText: ' React Native, , TypeScript,  ' });
  assert.equal(student.name, 'Test Student');
  assert.deepEqual(student.skills, ['React Native', 'TypeScript']);
  assert.equal(student.studentId, valid.studentId);
  assert.ok(student.id);
});
test('search is case-insensitive, ignores outer spaces, and supports student IDs', () => {
  assert.equal(searchStudents(STUDENTS, ' AYESHA ')[0]?.name, 'Ayesha Rahman');
  assert.equal(searchStudents(STUDENTS, '22-10002-1')[0]?.name, 'Hasan Ahmed');
  assert.equal(searchStudents(STUDENTS, 'computer science').length, 3);
  assert.equal(searchStudents(STUDENTS, 'nothing-matches').length, 0);
  assert.equal(searchStudents(STUDENTS, '').length, STUDENTS.length);
});
