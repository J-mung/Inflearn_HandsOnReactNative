import { Canvas, Circle, useCanvasRef } from '@shopify/react-native-skia';
import React from 'react';
import { View } from 'react-native';

const UsageGraph = () => {
  const ref = useCanvasRef();
  React.useEffect(() => {
    setTimeout(() => {
      const image = ref.current?.makeImageSnapshot();
      if (image) {
        const bytes = image.encodeToBytes();
      }
    }, 1000);
  });
  return (
    <View style={{ flex: 1 }}>
      <Canvas style={{ flex: 1 }} ref={ref}>
        <Circle r={128} cx={128} y={128} color="red" />
      </Canvas>
    </View>
  );
};

export default UsageGraph;
