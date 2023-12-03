import React, { Fragment, useCallback, useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Calendar, CalendarUtils } from 'react-native-calendars';

const INITIAL_DATE = new Date().toISOString().split('T')[0];

type PeriodType = {
  [key: string]: {};
};

const CalendarScreen = () => {
  const [selected, setSelected] = React.useState(INITIAL_DATE);
  const [currentMonth, setCurrentMonth] = useState(INITIAL_DATE.split('-')[1]);
  const [startAt, setStartAt] = React.useState('');
  const [endAt, setEndAt] = React.useState('');
  const getDate = (count: number) => {
    const date = new Date(selected);
    const newDate = date.setDate(date.getDate() + count);
    return CalendarUtils.getCalendarDateString(newDate);
  };

  const getPeriodDate = (count: number) => {
    const date = new Date();
    const newDate = date.setDate(date.getDate() + count);
    return CalendarUtils.getCalendarDateString(newDate);
  };

  const onDayPress = useCallback((day) => {
    setSelected(day.dateString);
  }, []);

  const onPeriodPress = (day) => {
    // 시작일, 종료일, 기간
    // 시작일( false ) 종료일( false )
    if (startAt === '' && endAt === '') {
      // Set 시작일
      console.log('set StartAt');
      setStartAt(day.dateString);
    }
    // 시작일( true ) 종료일( false )
    else if (startAt !== '' && endAt === '') {
      // day is previous than 시작일
      const current = new Date(day.dateString);
      const start = new Date(startAt);
      if (current < start) {
        // Set day into 시작일
        console.log('set StartAt');
        setStartAt(day.dateString);
      }
      // day is next than 시작일
      else {
        // Set day into 종료일
        console.log('set EndAt');
        setEndAt(day.dateString);
      }
    }
    // 시작일( true ) 종료일( true )
    //    ------ 시작일 ------ 기간 ------ 종료일------
    // #1 |- day ------------------------------------|
    // #2 |------------------- day ------------------|
    // #3 |--------------------------------------day-|
    else {
      const current = new Date(day.dateString);
      const start = new Date(startAt);
      const end = new Date(endAt);
      // #1 Set day into 시작일 & Set initial into 종료일
      if (current < start) {
        setStartAt(day.dateString);
        setEndAt('');
      }
      // #2 Set day into 종료일
      // #3 Set day into 시작일 & Set initial into 종료일
      else {
        setEndAt(day.dateString);
      }
    }
  };
  console.log('startAt & endAt: ', startAt, endAt);
  const marked = useMemo(() => {
    return {
      [getDate(0)]: {
        dotColor: 'red',
        marked: true,
      },
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: 'skyblue',
        selectedTextColor: 'red',
      },
    };
  }, [selected]);

  const reset = () => {
    setStartAt('');
    setEndAt('');
    console.log('Reset period');
  };

  const periodMarked = React.useMemo(() => {
    const start = new Date(startAt);
    const end = new Date(endAt);
    let localPeriod = {};
    localPeriod = {
      ...localPeriod,
      [startAt]: {
        disableTouchEvent: true,
        startingDay: true,
        color: '#50cebb',
        textColor: 'white',
      },
      [endAt]: {
        endingDay: true,
        color: '#50cebb',
        textColor: 'white',
        customContainerStyle: {
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
        },
      },
    };

    if (endAt !== '') {
      let i = new Date(start.toISOString());
      i.setDate(i.getDate() + 1);

      for (; i < end; i.setDate(i.getDate() + 1)) {
        const currentStr = i.toISOString().split('T')[0];
        console.log('>>>', currentStr);
        localPeriod = {
          ...localPeriod,
          [currentStr]: {
            color: '#70d7c7',
            customTextStyle: {
              color: '#FFFAAA',
              fontWeight: '700',
            },
          },
        };
      }
    }

    return localPeriod;
  }, [startAt, endAt]);

  return (
    <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
      <Fragment>
        <Text style={styles.text}>Calendar with selectable date</Text>
        <TouchableOpacity onPress={reset}>
          <View
            style={{
              backgroundColor: 'lightgray',
              borderWidth: 1,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white' }}>reset</Text>
          </View>
        </TouchableOpacity>
        <Calendar
          enableSwipeMonths
          current={selected}
          style={styles.calendar}
          markingType={'period'}
          //   onDayPress={onDayPress}
          onDayPress={onPeriodPress}
          //   markedDates={marked}
          markedDates={periodMarked}
          disabledDaysIndexes={[0, 6]}
          theme={{
            textInactiveColor: '#a68a9f',
            textSectionTitleDisabledColor: 'grey',
            textSectionTitleColor: '#319e8e',
            arrowColor: '#319e8e',
          }}
        />
        <Calendar
          current={INITIAL_DATE}
          minDate={getPeriodDate(-14)}
          markingType={'period'}
          markedDates={{
            [INITIAL_DATE]: { marked: true, dotColor: '#50cebb' },
            [getPeriodDate(4)]: { marked: true, dotColor: '#50cebb' },
            [getPeriodDate(9)]: {
              startingDay: true,
              color: '#50cebb',
              textColor: 'white',
            },
            [getPeriodDate(10)]: {
              color: '#70d7c7',
              customTextStyle: {
                color: '#FFFAAA',
                fontWeight: '700',
              },
            },
            [getPeriodDate(11)]: {
              color: '#70d7c7',
              textColor: 'white',
              marked: true,
              dotColor: 'white',
            },
            [getPeriodDate(12)]: { color: '#70d7c7', inactive: true },
            [getPeriodDate(13)]: {
              endingDay: true,
              color: '#50cebb',
              textColor: 'white',
              customContainerStyle: {
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
              },
            },
            [getPeriodDate(25)]: { inactive: true, disableTouchEvent: true },
          }}
          disabledDaysIndexes={[0, 6]}
          theme={{
            textInactiveColor: '#a68a9f',
            textSectionTitleDisabledColor: 'grey',
            textSectionTitleColor: '#319e8e',
            arrowColor: '#319e8e',
          }}
          onDayPress={(day) => console.warn(`${day.dateString} pressed`)}
          //   onDayPress={onPeriodPress}
        />
      </Fragment>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
  },
});

export default CalendarScreen;
