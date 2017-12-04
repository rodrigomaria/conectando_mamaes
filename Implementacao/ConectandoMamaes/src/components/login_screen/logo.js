//importação dos componentes do react e react native
import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native';

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.logoContainer}>
        <Image style={{ height: 180, width: 180 }}source={require('../../assets/images/logo.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoContainer: {
    height: 180,
    width: 180,
    backgroundColor: '#ffffff',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20
  }
});
