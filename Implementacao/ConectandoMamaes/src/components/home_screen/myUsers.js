//importação do react e react-native
import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native';

//importação dos componentes
import _ from 'lodash';
import { getColor } from '../config';
import User from './user';

//importação do firebase
import { firebaseApp } from '../../firebase';

class myUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: {}
    };
  }

  componentDidMount() {
    firebaseApp.database().ref('/users/').on('value', (snapshot) => {
      this.setState({ users: snapshot.val() });
    });
  }

  _handleDelete(uid) {
    Alert.alert(
      'Deletar usuário(a)',
      'Você tem certeza que deseja deletar esse usuário(a)?',
      [
        { text: 'Sim', onPress: () => this._deleteConfirmed(uid) },
        { text: 'Não' }
      ]
    );
  }

  _deleteConfirmed(uid) {
    const postData = {
      uid
    };

    const newPostKey = uid;
    
    const updates = {};
    updates['/dontPermission/' + newPostKey] = postData;
    
   firebaseApp.database().ref().update(updates);
   firebaseApp.database().ref('/users/' + uid).remove();
  }

  renderUsers() {
    const userArray = [];
    _.forEach(this.state.users, (value, index) => {
      userArray.push(
        <TouchableOpacity
          onLongPress={this._handleDelete.bind(this, value.uid)}
          key={index}
        >
          <User
            name={value.name}
            email={value.email}
          />
        </TouchableOpacity>
      );
    });
    _.reverse(userArray);
    return userArray;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileInfoContainer}>
          <View style={styles.profileCountsContainer}>
            <Text style={styles.profileName}>
              Usuários
            </Text>
          </View>
        </View>

        <ScrollView styles={styles.postContainer}>
          {this.renderUsers()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profileInfoContainer: {
    flexDirection: 'row',
    height: 65,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 2,
    backgroundColor: getColor()
  },
  profileNameContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  profileName: {
    marginLeft: 20,
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: '#ffffff'
  },
  profileCountsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5
  },
  profileCounts: {
    fontFamily: 'Roboto-Regular',
    fontSize: 30,
    color: '#ffffff'
  },
  countsName: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    color: '#ffffff'
  }
});

export default myUsers;
