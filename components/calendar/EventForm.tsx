import { View, TextInput, StyleSheet, Button, Text } from 'react-native';
import { User } from '@react-native-firebase/auth';

import { IEventView } from '../../types/api/event';

interface Props { user: User, selectedDate: Date, selectedHours: number, selectedEvent?: IEventView | null };

import { useState, useEffect } from 'react';
import calendarService from './_service';

export default function EventForm({ user, selectedDate, selectedHours, selectedEvent }: Props) {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [newEventSaved, setNewEventSaved] = useState(false);

  useEffect(() => {
    setNewEventSaved(false);
    if (!selectedEvent) {
    setEventName('');
    setEventDescription('');
      return;
    }
    setEventName(selectedEvent.name);
    setEventDescription(selectedEvent.description);
  }, [selectedEvent]);

  async function saveEvent() {
    await calendarService.saveEvent({
      name: eventName,
      description: eventDescription,
      startDate: selectedDate.getDate(),
      startMonth: selectedDate.getMonth(),
      startYear: selectedDate.getFullYear(),
      startHours: selectedHours,
    }, user);
    setNewEventSaved(true);
  };

  async function updateEvent() {
    await calendarService.updateEvent(selectedEvent!.id, {
      ...selectedEvent!,
      name: eventName,
      description: eventDescription,
    });
  }

  return (
    <View style={styles.container}>
      {!selectedEvent && !newEventSaved ? <Text>No event saved in this time slot</Text> : <Text>Event details:</Text>}
      <TextInput
        value={eventName}
        onChangeText={setEventName}
        placeholder="Event name"
        style={styles.input}
      />
      <TextInput
        value={eventDescription}
        onChangeText={setEventDescription}
        multiline
        numberOfLines={5}
        placeholder="Event details"
        style={[styles.input, styles.textarea]}
      />
      <Button
        title="Save event"
        onPress={() => selectedEvent ? updateEvent() : saveEvent()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    gap: 4,
  },
  input: {
    backgroundColor: '#d7d7d7',
  },
  textarea: {
    height: 64,
  },
})
