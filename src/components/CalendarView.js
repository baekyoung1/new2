import React from 'react';
import {Calendar} from 'react-native-calendars';
import {StyleSheet} from 'react-native';

function CalendarView() {
    const markedDates = {
        '2021-05-17': {
            selected: true,
        },
        '2021-05-18': {
            marked: true,
        },
        '2021-05-19': {
            marked: true,
        },
    };
    return (
    <Calendar
    style={styles.calendar}
    markedDates={markedDates}
    theme={{
        selectedDayBackgroundColor: '#009688',
        arrowColor: '#009688',
        dotColor: '#009688',
        todayTextColor: '#009688',
    }}
    />
    );
}

const styles = StyleSheet.create({
    calendar: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
});

export default CalendarView;
