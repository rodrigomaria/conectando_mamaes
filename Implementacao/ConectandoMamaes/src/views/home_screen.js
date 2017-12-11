//importação dos componentes do react, react native, react-redux, react-native-vector-icons
// e react-native-scrollable-tab-view
import React, { Component } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollableTabView from 'react-native-scrollable-tab-view';


//importação do firebase
import { firebaseApp } from '../firebase';

//importação dos componentes internos
import { getColor } from '../components/config';
import { signedOut } from '../actions';
import NavigationTab from '../components/home_screen/navTab';
import Timeline from '../components/home_screen/timeline';
import CreateNew from '../components/home_screen/createNew';
import MyPosts from '../components/home_screen/myPosts';
import Settings from '../components/home_screen/settings';
import MyUsers from '../components/home_screen/myUsers';

class HomeScreen extends Component {
  _onLogOut() {
    firebaseApp.auth().signOut().then(() => {
      this.props.navigator.pop();
      this.props.signedOut();
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar
      backgroundColor={getColor('orange57')}
      animated
      />
      <ScrollableTabView
        initialPage={0}
        renderTabBar={() => <NavigationTab />}
      >
        <Timeline tabLabel="md-pulse" />
        <CreateNew tabLabel="md-create" />
        <MyPosts tabLabel="md-contact" />
        <MyUsers tabLabel="md-people" />  
        <Settings
          tabLabel="ios-settings"
          onLogOut={() => { this._onLogOut(); }}
        /> 
      </ScrollableTabView>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
});

export default connect(null, { signedOut })(HomeScreen);
