import { View, TextInput, StyleSheet, Button, Text } from 'react-native';
import { User } from '@react-native-firebase/auth';

import { IEventView } from '../../../types/api/event';

interface Props {
  user: User,
  selectedDate: Date,
  selectedHours: number,
  selectedEvent: IEventView | null
  onClose: () => void,
};

import { useState, useEffect } from 'react';
import calendarService from './_service';
import formatTime from '../../../helpers/formatTime';

export default function EventForm({
  user,
  selectedDate,
  selectedHours,
  selectedEvent,
  onClose,
}: Props) {
  const [eventName, setEventName] = useState(selectedEvent?.name || '');
  const [eventDescription, setEventDescription] = useState(selectedEvent?.description || '');
  const [newEventSaved, setNewEventSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  function formIsValid(): boolean {
    return !!eventName.length && !!eventDescription.length;
  }

  useEffect(() => {
    setEventName(selectedEvent?.name || '');
    setEventDescription(selectedEvent?.description || '');
  }, [selectedEvent]);

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
    onClose();
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
    const startDate = selectedEvent?.startDate || selectedDate.getDate();
    const startMonth = selectedEvent?.startMonth !== undefined ? selectedEvent.startMonth : selectedDate.getMonth();
    const startYear = selectedEvent?.startYear || selectedDate.getFullYear();
    const startHours = selectedEvent?.startHours || selectedHours;
    return (
      <Text>
        {startDate}/{startMonth + 1}/{startYear}, {formatTime(startHours)}
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <Text style={styles.resultsLabel}>
          {
            !selectedEvent && !newEventSaved
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
          disabled={loading || !formIsValid()}
          testID="submit-event-button"
        />
        <Button
          title="Back"
          onPress={onClose}
          disabled={loading}
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
