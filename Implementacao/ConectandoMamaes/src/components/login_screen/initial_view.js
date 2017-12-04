//importação dos componentes do react, react native e react-native-animatable
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import * as Animatable from 'react-native-animatable';

//importação dos componentes
import { getColor } from '../config';


export default class InitialView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      init: true,
      signInPressed: false,
      signUpPressed: false
    };
  }

  _handleSignInPress() {
    this.setState({ init: false, signInPressed: true });
  }

  _handleSignUpPress() {
    this.setState({ init: false, signUpPressed: true });
  }

  _handleAnimEnd() {
    if (!this.state.init) {
      if (this.state.signInPressed) {
        this.props.onSignIn();
      }
      if (this.state.signUpPressed) {
        this.props.onSignUp();
      }
    }
  }

  render() {
    const animation = this.state.init ? 'bounceInUp' : 'bounceOutDown';
    return (
      <Animatable.View
        animation={animation}
        style={styles.container}
        delay={this.props.animDelay}
        onAnimationEnd={this._handleAnimEnd.bind(this)}
      >
        <View style={styles.btnBox}>
          <TouchableOpacity onPress={this._handleSignInPress.bind(this)}>
            <View style={styles.btnContainer}>
              <Text style={styles.btnText}>{ 'Login'.toUpperCase() }</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._handleSignUpPress.bind(this)}>
            <View style={styles.btnContainer}>
              <Text style={styles.btnText}>{ 'Sign Up'.toUpperCase() }</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    );
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20
  },
  title: {
    marginBottom: 20,
    fontSize: 30,
    fontFamily: 'MagmaWave',
    color: 'rgba(255,255,255,.8)'
  },
  btnBox: {
    height: 40,
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  },
  btnContainer: {
    width: 130,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10
  },
  btnText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    color: getColor('orange57')
  }
});
