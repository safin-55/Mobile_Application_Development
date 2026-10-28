import assert from 'node:assert/strict';
import { test } from 'node:test';
import { STUDENTS } from '../data/students';
import { studentsReducer } from '../context/students-reducer';
import { validateForm } from '../utils/student-form';
import type { Student } from '../data/students';

const added: Student = { id: 'new-1', name: 'New Student', studentId: '26-99999-1', department: 'Computer Science', bio: 'Learning about shared application state.', skills: [], avatarUrl: '' };

test('add prepends a student without mutating frozen input', () => {
  const initial = [...STUDENTS];
  Object.freeze(initial);
  const next = studentsReducer(initial, { type: 'ADD_STUDENT', payload: added });
  assert.equal(next[0], added);
  assert.equal(next.length, STUDENTS.length + 1);
  assert.equal(initial.length, STUDENTS.length);
});
test('remove uses the internal ID and leaves the input untouched', () => {
  const initial = [added, ...STUDENTS];
  Object.freeze(initial);
  const next = studentsReducer(initial, { type: 'REMOVE_STUDENT', payload: added.id });
  assert.deepEqual(next, STUDENTS);
  assert.equal(initial.length, STUDENTS.length + 1);
});
test('reset restores the seed list after both additions and removals', () => {
  const changed = studentsReducer([added, ...STUDENTS], { type: 'REMOVE_STUDENT', payload: STUDENTS[0].id });
  const reset = studentsReducer(changed, { type: 'RESET' });
  assert.deepEqual(reset, STUDENTS);
  assert.notEqual(reset, STUDENTS);
  assert.notEqual(reset[0].skills, STUDENTS[0].skills);
});
test('duplicate student IDs produce the exact inline error and cannot be dispatched', () => {
  const form = { name: 'Another Student', studentId: ` ${STUDENTS[0].studentId} `, department: 'Computer Science', bio: 'This should be blocked as a duplicate.', skillsText: '' };
  assert.equal(validateForm(form, STUDENTS).studentId, 'Student ID already exists');
  assert.equal(studentsReducer(STUDENTS, { type: 'ADD_STUDENT', payload: { ...added, studentId: STUDENTS[0].studentId } }), STUDENTS);
});
test('a removed student ID becomes available again', () => {
  const changed = studentsReducer(STUDENTS, { type: 'REMOVE_STUDENT', payload: STUDENTS[0].id });
  const form = { name: 'Replacement Student', studentId: STUDENTS[0].studentId, department: 'Computer Science', bio: 'The previous entry has been removed.', skillsText: '' };
  assert.deepEqual(validateForm(form, changed), {});
});
test('duplicate internal keys are blocked and removing a missing key preserves values', () => {
  assert.equal(studentsReducer(STUDENTS, { type: 'ADD_STUDENT', payload: { ...added, id: STUDENTS[0].id } }), STUDENTS);
  assert.deepEqual(studentsReducer(STUDENTS, { type: 'REMOVE_STUDENT', payload: 'missing' }), STUDENTS);
});
