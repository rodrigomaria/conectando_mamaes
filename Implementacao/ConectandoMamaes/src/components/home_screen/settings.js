//importação do react e react native
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
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
      signOutMsg: 'Sair'
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

  render() {
    return (
        <View>
          <TouchableOpacity style={styles.listItem}>
            <Icon name='md-add-circle' size={30} color='rgba(0,0,0,.5)' style={styles.itemIcon} />
            <Text style={styles.itemName}>
              Adicione um novo amigo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem}>
            <Icon name='md-remove-circle' size={30} color='rgba(0,0,0,.5)' style={styles.itemIcon} />
            <Text style={styles.itemName}>
              Remover amigos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem} onPress={this._logOut.bind(this)}>
            <Icon name='md-log-out' size={30} color='rgba(0,0,0,.5)' style={styles.itemIcon} />
            <Text style={styles.itemName}>
              {this.state.signOutMsg} - {this.state.user}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem} onPress={this._deleteAccount.bind(this)}>
            <Icon name='md-close' size={30} color='rgba(0,0,0,.5)' style={styles.itemIcon} />
            <Text style={[styles.itemName, { color: 'red' }]}>
              Delete minha conta
            </Text>
          </TouchableOpacity>
          <Text style={{ flex: 1, margin: 20 }}>{this.state.deleteErrMsg}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    marginTop: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemIcon: {
    marginLeft: 20,
    marginRight: 20
  },
  itemName: {
    fontFamily: 'Roboto-Regular'
  }
});
