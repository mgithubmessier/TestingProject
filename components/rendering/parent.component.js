import React from 'react';
import { View, Text } from 'react-native';
import { Child } from './child.component';

export class Parent extends React.Component {
  render() {
    return <View className="parent-container">
      <Child ref="child-ref" />
    </View>
  }
}