import React from 'react';
import { StyleSheet, View, Image, TextInput, Button, Text } from 'react-native';

const estilos = {
  boxPrincipal: {
    flex: 1,
    padding: 10,
    backgroundColor: 'orange'
  },

  imagemTopo: {
    flex: 1,
    paddingTop: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  boxEntradasTexto: {
    flex: 2, 
    paddingTop: 20
  },

  entradasTexto: {
    fontSize: 20,
    height: 45
  },

  textoLink: {
    fontSize: 20
  },

  boxBotao: {
    flex: 2
  }
}

export default props => (
  <View style={ estilos.boxPrincipal }>
    <View style={ estilos.imagemTopo }>
      <Image style={{ height: 125, width: 125 }} source = { require ('../imgs/logo.png') } />
    </View>
    
    <View style={ estilos.boxEntradasTexto }>
      <TextInput style={ estilos.entradasTexto } placeholder='Usuário' />
      <TextInput style={ estilos.entradasTexto } placeholder='Senha' />
      <Text style={ estilos.textoLink }>Ainda não tem cadastro? Cadastre-se</Text>
    </View>

    <View style={ estilos.boxBotao }>
      <Button title='Acessar' color='#C6A9B5' onPress={() => false}/>
    </View>
  </View>
)