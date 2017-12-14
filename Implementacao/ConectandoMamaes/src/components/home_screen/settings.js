//importação do react e react native
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
  StyleSheet
} from 'react-native';

//importação dos componentes
import Icon from 'react-native-vector-icons/Ionicons';

//importação do firebase
import { firebaseApp } from '../../firebase';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      email: '',
      displayName: '',
      password: '',
      signOutMsg: 'Deseja sair ',
      errMsg: null,
      clearDisplayName: null,
      clearEmail: null,
      clearPassword: null,
    };
  }

  componentDidMount() {
    const user = firebaseApp.auth().currentUser;
    if (user != null) {
      const name = user.displayName;
      const uemail = user.email;

      this.setState({
        user: name,
        email: uemail,
        deleteErrMsg: ''
      });
    }
  }

  _logOut() {
    this.props.onLogOut();
  }

  _deleteAccount() {
    Alert.alert(
      'Deletar conta',
      'Você tem certeza que deseja deletar essa conta?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => this._deleteAccountConfirmed() },
      ]
    );
  }

  _deleteAccountConfirmed() {
    this.setState({
      deleteErrMsg: ''
    });
    if (firebaseApp.auth().currentUser) {
      firebaseApp.auth().currentUser.delete().then(() => {
        this.props.onLogOut();
      }).catch((error) => {
        this.setState({
          deleteErrMsg: error.message
        });
      });
    } else {
      this.setState({
        deleteErrMsg: 'Algo deu errado'
      });
    }
  }

  _handleSignUp() {
    this.setState({ errMsg: 'Adicionando...' });
    firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        firebaseApp.auth().currentUser.updateProfile({
          displayName: this.state.displayName
        })
          .then(() => {
            const uid = firebaseApp.auth().currentUser.uid;
            const name = firebaseApp.auth().currentUser.displayName;
            const email = firebaseApp.auth().currentUser.email;

            firebaseApp.database().ref('users/' + uid).set({
              name,
              email,
              uid
            });
            setTimeout(() => {
              if (firebaseApp.auth().currentUser) {
                setTimeout(() => {
                }, 1000);
              }
            }, 1000);
            this.setState({ errMsg: 'Adicionado com sucesso!' });
            this.setState({ clearDisplayName: '' });
            this.setState({ clearEmail: '' });
            this.setState({ clearPassword: '' });
            this.setState({ clearDisplayName: null });
            this.setState({ clearEmail: null });
            this.setState({ clearPassword: null });
          })
          .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
              this.setState({ errMsg: 'Esse email já está cadastrado.' });
            } 
            if (error.code === 'auth/weak-password') {
              this.setState({ errMsg: 'Digite uma senha mais forte.' });
            }
            if (error.code === 'auth/invalid-email') {
              this.setState({ errMsg: 'Email inválido.' });
            }
          });
      });
  }

  render() {
    const errorMessage = this.state.errMsg ?
      <Text style={{ marginLeft: 20, fontWeight: 'bold' }}>{this.state.errMsg}</Text>
      : null;

    const gravidaAddFriends = firebaseApp.auth().currentUser.uid === 'coyXHm8LAWXeMaAkrLBa8osvB2h1' || 'FXi7e0WOZjMhUkbZbPZSKo0IsCy2' ?
      <View style={styles.boxAddFriend}>
        <View style={styles.listItem}>
          <Icon name='md-add-circle' size={30} color='rgba(0,0,0,.5)' style={styles.itemIcon} />
          <Text style={[styles.itemName, { fontWeight: 'bold' }]}>Adicione um novo amigo</Text>
        </View>
        <View>
          <TextInput
            value={this.state.clearDisplayName}
            onChangeText={(text) => this.setState({ displayName: text })}
            autoCapitalize='words'
            autoCorrect={false}
            underlineColorAndroid='black'
            placeholder='Nome'
            placeholderTextColor='rgba(0,0,0,.6)'
            style={{ marginLeft: 20, marginRight: 20 }}
          />

          <TextInput
            value={this.state.clearEmail}
            keyboardType='email-address'
            autoCorrect={false}
            onChangeText={(text) => this.setState({ email: text })}
            placeholder='Email'
            underlineColorAndroid='black'
            placeholderTextColor='rgba(0,0,0,.6)'
            style={{ marginLeft: 20, marginRight: 20 }}
          />

          <TextInput
            value={this.state.clearPassword}
            onChangeText={(text) => this.setState({ password: text })}
            underlineColorAndroid='black'
            placeholder='Senha'
            secureTextEntry
            placeholderTextColor='rgba(0,0,0,.6)'
            style={{ marginLeft: 20, marginRight: 20 }}
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <TouchableOpacity onPress={this._handleSignUp.bind(this)}>
            <View style={styles.submitBtnContainer}>
              <Text style={styles.submitBtn}>{'Adicionar amigo'.toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
          {errorMessage}
        </View>
      </View>
      : null;

    return (
      <View>
        {gravidaAddFriends}      

        <TouchableOpacity style={styles.listItem} onPress={this._logOut.bind(this)}>
          <Icon name='md-log-out' size={30} color='rgba(0,0,0,.5)' style={styles.itemIcon} />
          <Text style={styles.itemName}>
            {this.state.signOutMsg}{this.state.user} ?
            </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem} onPress={this._deleteAccount.bind(this)}>
          <Icon name='md-close' size={30} color='rgba(0,0,0,.5)' style={styles.itemIcon} />
          <Text style={[styles.itemName, { color: 'red' }]}>Delete minha conta</Text>
        </TouchableOpacity>
        <Text style={{ flex: 1, margin: 20 }}>{this.state.deleteErrMsg}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxAddFriend: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 5,
    borderColor: 'black',
    borderWidth: 1
  },
  listItem: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemIcon: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5
  },
  itemName: {
    fontFamily: 'Roboto-Regular'
  },
  submitBtnContainer: {
    width: 120,
    height: 40,
    backgroundColor: '#e8633a',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 5
  },
  submitBtn: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    color: '#ffffff'
  }
});
