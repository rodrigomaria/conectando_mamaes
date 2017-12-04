import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';
import { getColor } from '../config';
import { firebaseApp } from '../../firebase';

export default class CreateNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postStatus: null,
      postText: ''
    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  _handleNewPost() {
    this.setState({
      postStatus: 'Postando...'
    });

    if (this.state.postText.length > 1) {
      const time = Date.now();
      const uid = firebaseApp.auth().currentUser.uid;
      const email = firebaseApp.auth().currentUser.email;
      const newPostKey = firebaseApp.database().ref().child('posts').push().key;

      const postData = {
        name: firebaseApp.auth().currentUser.displayName,
        time,
        text: this.state.postText,
        puid: newPostKey
      };

      let updates = {};
      updates['/posts/' + newPostKey] = postData;
      updates['/users/' + uid + '/posts/' + newPostKey] = postData;

      firebaseApp.database().ref().update(updates).then(() => {
        this.setState({ postStatus: 'Postado.', postText: '' });
      }).catch(() => {
        this.setState({ postStatus: 'Algo deu errado :(' });
      })
    } else {
      this.setState({ postStatus: 'Seu post precisa ter pelo menos um caracter.' });
    }

    setTimeout(() => {
      this.setState({ postStatus: null });
    }, 2000)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {'Criar um novo post'.toUpperCase()}
        </Text>
        <Text style={styles.message}>{this.state.postStatus}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            multiline={true}
            style={styles.inputField}
            underlineColorAndroid='transparent'
            placeholder='Digite aqui...'
            value={this.state.postText}
            onChangeText={(text) => this.setState({ postText: text })}
            placeholderTextColor='rgba(0,0,0,.6)'
          />
        </View>
        <View style={styles.btnBox}>
          <TouchableOpacity style={styles.btnContainer} onPress={this._handleNewPost.bind(this)}>
            <Text style={styles.btnText}>{ 'Post'.toUpperCase() }</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.btnText}>{ 'Selecionar Mídia'.toUpperCase() }</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  title: {
    marginTop: 10,
    paddingBottom: 10,
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
    color: getColor()
  },
  message: {
    textAlign: 'left',
    paddingTop: 10,
    paddingBottom: 0
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(255,255,255,.6)',
    marginBottom: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 2,
  },
  inputField: {
    flex: 1,
    padding: 0,
    textAlignVertical: 'top'
  },
  btnBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  },
  btnContainer: {
    width: 120,
    height: 40,
    backgroundColor: getColor(),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  btnText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    color: getColor('#ffffff')
  }
})
