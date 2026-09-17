import { View, TextInput, StyleSheet, Button, Text } from 'react-native';
import { User } from '@react-native-firebase/auth';

import { IEventView } from '../../types/api/event';

interface Props { user: User, selectedDate: Date, selectedHours: number };

import { useState } from 'react';
import calendarService from './_service';

export default function EventForm({ user, selectedDate, selectedHours }: Props) {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [newEventSaved, setNewEventSaved] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IEventView | null>(null);
  const [loading, setLoading] = useState(false);

  async function searchEvents() {
    setLoading(true);
    setNewEventSaved(false);
    const result = await calendarService.getEvents(
      user.uid,
      selectedDate.getDate(),
      selectedDate.getMonth(),
      selectedDate.getFullYear(),
      selectedHours,
    );
    setLoading(false);
    if (!result?.length) {
      setSelectedEvent(null);
      setEventName('');
      setEventDescription('');
      return;
    }
    setSelectedEvent(result[0]);
    setEventName(result[0].name);
    setEventDescription(result[0].description);
  };

  async function saveEvent() {
    setLoading(true);
    await calendarService.saveEvent({
      name: eventName,
      description: eventDescription,
      startDate: selectedDate.getDate(),
      startMonth: selectedDate.getMonth(),
      startYear: selectedDate.getFullYear(),
      startHours: selectedHours,
    }, user);
    setNewEventSaved(true);
    setLoading(false);
  };

  async function updateEvent() {
    setLoading(true);
    await calendarService.updateEvent(selectedEvent!.id, {
      ...selectedEvent!,
      name: eventName,
      description: eventDescription,
    });
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Button
        title="Search events"
        onPress={searchEvents}
        disabled={loading}
      />
      {!selectedEvent && !newEventSaved ? <Text>No event saved in this time slot</Text> : <Text>Event details:</Text>}
      <TextInput
        value={eventName}
        onChangeText={setEventName}
        placeholder="Event name"
        style={styles.input}
        testID="event-name-input"
      />
      <TextInput
        value={eventDescription}
        onChangeText={setEventDescription}
        multiline
        numberOfLines={5}
        placeholder="Event details"
        style={[styles.input, styles.textarea]}
        testID="event-details-input"
      />
      <Button
        title="Save event"
        onPress={() => selectedEvent ? updateEvent() : saveEvent()}
        disabled={loading}
        testID="submit-event-button"
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
