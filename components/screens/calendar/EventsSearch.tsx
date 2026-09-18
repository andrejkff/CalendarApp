import { View, StyleSheet, Button, Text, Pressable } from 'react-native';
import { User } from '@react-native-firebase/auth';
import { IEventView } from '../../../types/api/event';

import calendarService from './_service';
import { useState, useEffect } from 'react';

import { HOURS } from '../../../constants/calendar';

interface Props { user: User, selectedDate: Date, onSelected: (event: IEventView | { hours: number }) => void, };

export default function EventsSearch({
  user, selectedDate, onSelected,
}: Props) {
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<IEventView[]>([]);

  async function searchEvents() {
    setSearching(true);
    setResults([]);
    const _results = await calendarService.getEventsInDay(
      user.uid, selectedDate.getDate(), selectedDate.getMonth(), selectedDate.getFullYear(),
    );
    setResults(_results);
    setSearching(false);
  };

  useEffect(() => {
    searchEvents();
  }, []);

  function renderTimeSlot(time: number) {
    const eventInTimeSlot = results.find(r => r.startHours === time);
    return (
      <View style={styles.timeSlot} key={time}>
        <Text style={styles.hourMarker}>{time}:00</Text>
        {
          eventInTimeSlot ?
          <Pressable style={[styles.eventLabel, styles.existingEvent]} onPress={() => onSelected(eventInTimeSlot)}>
            <Text style={styles.eventName}>{eventInTimeSlot.name}</Text>
          </Pressable> :
          <Pressable style={[styles.eventLabel, styles.newEvent]} onPress={() => onSelected({ hours: time })}>
            <Text>Create event</Text>
          </Pressable>
        }
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        title="Search events"
        disabled={searching}
        onPress={searchEvents}
      />
      <View style={[styles.timeSlotsList, searching && styles.timeSlotsListSearching]}>
        {HOURS.map(h => renderTimeSlot(h))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    gap: 32,
  },
  timeSlotsListSearching: {
    opacity: .5,
  },
  timeSlotsList: {
    display: 'flex',
    gap: 4,
  },
  timeSlot: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#d0d7d7',
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    height: 64,
  },
  hourMarker: {
    color: 'grey',
  },
  eventLabel: {
    padding: 8,
    borderRadius: 10,
  },
  eventName: {
    color: 'white',
  },
  existingEvent: {
    backgroundColor: 'green',
  },
  newEvent: {
    backgroundColor: '#d7d7d7',
  },
})
