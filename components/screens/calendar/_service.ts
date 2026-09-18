import { User } from '@react-native-firebase/auth';
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../../../firebase';
import { ICreateEventPayload, IEventView } from '../../../types/api/event';

function maxDaysIn(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
};

function getNameOfDay(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

async function saveEvent(event: ICreateEventPayload, user: User) {
  const docRef = await addDoc(collection(db, 'events'), {
    ...event,
    userId: user.uid,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

async function updateEvent(
  eventId: string,
  event: IEventView,
) {
  await updateDoc(doc(db, 'events', eventId), {
    ...event,
  });
}

async function getEventDetails(
  userId: string,
  date: number,
  month: number,
  year: number,
  hours: number
): Promise<IEventView | null> {
  const q = query(
    collection(db, 'events'),
    where('userId', '==', userId),
    where('startDate', '==', date),
    where('startMonth', '==', month),
    where('startYear', '==', year),
    where('startHours', '==', hours),
  );

  const snapshot = await getDocs(q);

  if (!snapshot.docs?.length) return null;

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))[0] as IEventView;
}

export default {
  getNameOfDay,
  maxDaysIn,
  saveEvent,
  getEventDetails,
  updateEvent,
};
