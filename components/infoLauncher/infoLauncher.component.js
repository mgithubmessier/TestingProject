import React from 'react';
import { Image, TouchableHighlight } from 'react-native';

export class InfoLauncher extends React.Component {
  launchAlert = () => {
    window.alert(this.props.info);
  }
  render() {
    return (
      <TouchableHighlight className="clickable" onPress={this.launchAlert}>
        <Image source={require("./info.png")} style={{ width: 20, height: 20 }} />
      </TouchableHighlight>
    );
  }
}