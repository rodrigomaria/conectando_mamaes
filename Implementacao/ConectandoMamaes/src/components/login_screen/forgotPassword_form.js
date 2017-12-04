import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  BackAndroid,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { getColor } from '../config';
import { firebaseApp } from '../../firebase';

export default class ForgotPassForm extends Component {
  constructor(props) {
    super(props);
    this._handleBackBtnPress = this._handleBackBtnPress.bind(this);

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.state = {
      init: true,
      errMsg: null,
      email: ''
    };
  }

  componentDidMount() {
    BackAndroid.addEventListener('backBtnPressed', this._handleBackBtnPress);
  }

  componentDidUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('backBtnPressed', this._handleBackBtnPress);
  }

  _handleForgotPass() {
    this.setState({ errMsg: 'Aguarde...' });

    firebaseApp.auth().sendPasswordResetEmail(this.state.email).then(() => {
      this.setState({ errMsg: 'Você recebeu o email para modificação da senha!' });
    }).catch((error) => {
      this.setState({ errMsg: error.message });
    });
  }

  _handleGoBack() {
    this.setState({ init: false });
  }

  _handleBackBtnPress() {
    this._handleGoBack();
    return true;
  }

  _handleAnimEnd() {
    if (!this.state.init) {
      this.props.onBackFromForgotPass();
    }
  }

  render() {
    const animation = this.state.init ? 'bounceInUp' : 'bounceOutDown';
    const errorMessage = this.state.errMsg ?
      <Text style={styles.errMsg}>{this.state.errMsg}</Text>
    : null;

    return (
      <Animatable.View
        animation={animation}
        style={styles.container}
        onAnimationEnd={this._handleAnimEnd.bind(this)}
      >
        <Text style={styles.title}>Esqueci minha senha</Text>
        {errorMessage}
        <View style={[styles.inputContainer, { marginBottom: 10 }]}>
          <TextInput
            style={styles.inputField}
            underlineColorAndroid='transparent'
            placeholder='Digite seu email'
            placeholderTextColor='rgba(255,255,255,.6)'
            onChangeText={(text) => this.setState({ email: text })}
          />
        </View>
        <View style={styles.btnContainers}>
          <TouchableOpacity onPress={this._handleForgotPass.bind(this)}>
            <View style={styles.submitBtnContainer}>
              <Text style={styles.submitBtn}>{'Recuperar minha senha'.toUpperCase()}</Text>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20
  },
  title: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    marginBottom: 10,
    color: 'rgba(255,255,255,.8)'
  },
  errMsg: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    marginBottom: 10
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255,.3)',
    borderRadius: 5
  },
  inputField: {
    width: 280,
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'Roboto-Bold',
    color: '#ffffff'
  },
  btnContainers: {
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 280
  },
  submitBtnContainer: {
    width: 240,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtn: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    color: getColor()
  }
});
