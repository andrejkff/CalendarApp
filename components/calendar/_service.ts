// import { User } from '@react-native-firebase/auth';
// import {
//   collection,
//   addDoc,
//   serverTimestamp,
// } from 'firebase/firestore';
// import { auth, db } from '../../firebase';

function isLeap(year: number): boolean {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
};

function maxDaysIn(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
};

function getNameOfDay(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

export default {
  isLeap,
  getNameOfDay,
  maxDaysIn,
};
