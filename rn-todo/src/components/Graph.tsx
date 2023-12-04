import React from 'react';
import { Text, View } from 'react-native';
import {
  INITIAL_DATE_STRING,
  INITIAL_END_STRING,
  INITIAL_START_STRING,
} from '../constans/constant.tsx';
import copyData from '../datas/usages.json';
import CalendarScreen from '../screens/CalendarScreen.tsx';

const Graph = () => {
  const [currentDate, setCurrentDate] = React.useState(INITIAL_DATE_STRING);
  const [startDate, setStartDate] = React.useState(INITIAL_START_STRING);
  const [endDate, setEndDate] = React.useState(INITIAL_END_STRING);
  const [measurement, setMeasurement] = React.useState({
    ['init']: {
      flow_total: 1368600,
      pressure: 0,
      reading_time: '',
      valve: 0,
      ct: '',
      min: 0,
      max: 0,
    },
  });
  const [color, setColor] = React.useState('black');
  const path = React.useMemo(() => {
    return;
  }, [color]);

  React.useEffect(() => {
    const { init, ...originUsages } = measurement;
    const keys = Object.keys(originUsages);
    const values = Object.values(originUsages);

    for (let i = 0; i < values.length; i++) {
      console.log(
        `${keys[i]} : ${((values[i].max - values[i].min) / 1000).toFixed(3)}`,
      );
    }
  }, [measurement]);

  const onChangeStartDate = (date) => {
    setStartDate(date);
  };

  const onChangeEndDate = (date) => {
    setEndDate(date);
  };

  const onChangeColorToBlack = () => {
    setColor('black');
  };

  const onPressResearch = () => {
    const startDay = new Date(startDate).getDate();
    const endDay = new Date(endDate).getDate();

    const getStartDate = new Date(2023, 8, startDay);
    const getEndDate = new Date(2023, 8, endDay);

    while (getStartDate <= getEndDate) {
      const curDateString = getStartDate.toISOString().split('T')[0];
      const getNewMeasurement = copyData.data.usages[curDateString];

      setMeasurement((prevUsages) => {
        return { ...prevUsages, [curDateString]: getNewMeasurement };
      });
      getStartDate.setDate(getStartDate.getDate() + 1);
    }

    if (color === 'skyblue') {
      setColor('red');
    } else {
      setColor('skyblue');
    }
  };

  return (
    <View>
      <CalendarScreen
        startDate={startDate}
        endDate={endDate}
        onChangeStartDate={onChangeStartDate}
        onChangeEndDate={onChangeEndDate}
        onPressResearch={onPressResearch}
        onChangeColorToBlack={onChangeColorToBlack}
      />
      <View
        style={{ flex: 1, margin: 10, backgroundColor: color, height: 200 }}
      >
        <Text>대충 그래프</Text>
        <Text>{`${color.split('').join('-')}`}</Text>
      </View>
    </View>
  );
};

export default Graph;
