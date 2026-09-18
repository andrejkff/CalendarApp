import { View, TextInput, StyleSheet, Button, Text } from 'react-native';
import { User } from '@react-native-firebase/auth';

import { IEventView } from '../../../types/api/event';

interface Props { user: User, selectedDate: Date, selectedHours: number };

import { useState } from 'react';
import calendarService from './_service';

export default function EventForm({ user, selectedDate, selectedHours }: Props) {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [newEventSaved, setNewEventSaved] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IEventView | null>(null);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  async function loadEvent() {
    setSearching(true);
    setNewEventSaved(false);
    const result = await calendarService.getEventDetails(
      user.uid,
      selectedDate.getDate(),
      selectedDate.getMonth(),
      selectedDate.getFullYear(),
      selectedHours,
    );
    setSearching(false);
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

  function renderEventTimeUi() {
    if (!selectedEvent && !newEventSaved) return <></>;
    const startDate = selectedEvent?.startDate || selectedDate.getDate();
    const startMonth = selectedEvent?.startMonth !== undefined ? selectedEvent.startMonth : selectedDate.getMonth();
    const startYear = selectedEvent?.startYear || selectedDate.getFullYear();
    const startHours = selectedEvent?.startHours || selectedHours;
    return (
      <Text>
        {startDate}/{startMonth + 1}/{startYear}, {startHours}:00
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        title="Search events"
        onPress={loadEvent}
        disabled={loading || searching}
      />
      <View style={styles.containerInner}>
        <Text style={styles.resultsLabel}>
          { searching ?
            'Searching...'
            : !selectedEvent && !newEventSaved
            ? 'No event saved in this time slot'
            : 'Event details:'
          }
        </Text>
        {renderEventTimeUi()}
        <View style={styles.formFieldsWrapper}>
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
        </View>
        <Button
          title="Save event"
          onPress={() => selectedEvent ? updateEvent() : saveEvent()}
          disabled={loading || searching}
          testID="submit-event-button"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    gap: 32,
  },
  containerInner: {
    display: 'flex',
    gap: 12,
  },
  formFieldsWrapper: {
    display: 'flex',
    gap: 4,
  },
  resultsLabel: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#d7d7d7',
  },
  textarea: {
    height: 64,
  },
  searchButton: {
    marginBottom: 32,
  },
})
