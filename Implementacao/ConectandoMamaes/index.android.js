//importação dos componentes do react e do react native
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

//importação do componente storage
import AppStorage from './src/app_storage';

//desabilita o console no emulador
console.disableYellowBox = true;

class ConectandoMamaes extends Component {
  render() {
    return (
      <AppStorage />
    );
  }
}

AppRegistry.registerComponent('ConectandoMamaes', () => ConectandoMamaes);
