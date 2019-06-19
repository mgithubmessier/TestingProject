import React from 'react';
import { View, Text } from 'react-native';

export class Child extends React.Component {
  refFunction() {
    return 'ref-func';
  }
  render() {
    return <View className="child-container">
      <Text className="child-item"></Text>
    </View>
  }
}