//importação dos componentes do react, react native, react-redux e react-native-deprecated-custom-components
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Navigator } from 'react-native-deprecated-custom-components';

//importando as telas de login e tela principal
import LoginScreen from './views/login_screen';
import HomeScreen from './views/home_screen';

class App extends Component {
  constructor(props) {
    super(props);

    this.routes = [
      { view: LoginScreen },
      { view: HomeScreen }
    ];
  }

  configureScene(route, routeStack) {
    return Navigator.SceneConfigs.FloatFromRight;
  }

  renderScene(route, navigator) {
    return <route.view navigator={navigator} {...route}/>;
  }

  render() {
    let navigator;
    if (this.props.currentUser.signInStatus) {
      navigator =
        <Navigator
          style={{ flex: 1 }}
          initialRoute={this.routes[1]}
          initialRouteStack={this.routes}
          renderScene={this.renderScene}
          configureScene={this.configureScene}
        />;
    } else {
      navigator =
        <Navigator
          style={{ flex: 1 }}
          initialRoute={this.routes[0]}
          initialRouteStack={this.routes}
          renderScene={this.renderScene}
          configureScene={this.configureScene}
        />;
    }

    return (
      <View style={{ flex: 1 }}>
        {navigator}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(App);
