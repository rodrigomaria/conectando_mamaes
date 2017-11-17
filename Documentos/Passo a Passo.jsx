//Criação do Entry Point
//App.js
import React from 'react';
import { View, Text } from 'react-native';

export default props => (
  <View>
    <Text>Oi</Text>
  </View>
)

//index.android.js e index.ios.js
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';

const ConectandoMamaes = props => (
  <App />
)

AppRegistry.registerComponent('ConectandoMamaes', () => ConectandoMamaes);

//tamanho da tela simulador: 1080 x 1920 420dpi