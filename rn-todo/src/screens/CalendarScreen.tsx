import React, { Fragment, useCallback, useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Calendar, CalendarUtils } from 'react-native-calendars';
import { INITIAL_DATE_STRING } from '../constans/constant';
import { UsageGraph } from './../components/UsageGraph';

type PeriodType = {
  [key: string]: {};
};

const CalendarScreen = ({
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
  onPressResearch,
  onChangeColorToBlack,
}) => {
  const [selected, setSelected] = React.useState(INITIAL_DATE_STRING);
  const [currentMonth, setCurrentMonth] = useState(
    INITIAL_DATE_STRING.split('-')[1],
  );
  const [period, setPeriod] = React.useState<PeriodType>({});
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
    if (startDate === '' && endDate === '') {
      // Set 시작일
      console.log('set StartAt');
      onChangeStartDate(day.dateString);
    }
    // 시작일( true ) 종료일( false )
    else if (startDate !== '' && endDate === '') {
      // day is previous than 시작일
      const current = new Date(day.dateString);
      const start = new Date(startDate);
      if (current < start) {
        // Set day into 시작일
        console.log('set StartAt');
        onChangeStartDate(day.dateString);
      }
      // day is next than 시작일
      else {
        // Set day into 종료일
        console.log('set EndAt');
        onChangeEndDate(day.dateString);
      }
    }
    // 시작일( true ) 종료일( true )
    //    ------ 시작일 ------ 기간 ------ 종료일------
    // #1 |- day ------------------------------------|
    // #2 |------------------- day ------------------|
    // #3 |--------------------------------------day-|
    else {
      const current = new Date(day.dateString);
      const start = new Date(startDate);
      const end = new Date(endDate);
      // #1 Set day into 시작일 & Set initial into 종료일
      if (current < start) {
        onChangeStartDate(day.dateString);
        onChangeEndDate('');
      }
      // #2 Set day into 종료일
      // #3 Set day into 시작일 & Set initial into 종료일
      else {
        onChangeEndDate(day.dateString);
      }
    }
  };

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
    onChangeStartDate('');
    onChangeEndDate('');
    onChangeColorToBlack();
    setPeriod({});
    console.log('Reset period');
  };

  const periodMarked = React.useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let localPeriod = {};
    localPeriod = {
      ...localPeriod,
      [startDate]: {
        disableTouchEvent: true,
        startingDay: true,
        color: '#50cebb',
        textColor: 'white',
      },
      [endDate]: {
        endingDay: true,
        color: '#50cebb',
        textColor: 'white',
        customContainerStyle: {
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
        },
      },
    };

    if (endDate !== '') {
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
  }, [startDate, endDate]);

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
              marginBottom: 10,
            }}
          >
            <Text style={{ color: 'white' }}>reset</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressResearch}>
          <View
            style={{
              backgroundColor: 'lightgray',
              borderWidth: 1,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white' }}>조회</Text>
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
        <UsageGraph />
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
