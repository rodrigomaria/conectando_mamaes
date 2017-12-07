//importação dos componentes do react, react native, react-redux e redux-storage
import React, { Component } from 'react';
import * as storage from 'redux-storage';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

//importação do storage async
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';

//importação do componente App
import App from './app';

//importação do arquivo principal dos reducers
import RootReducer from './reducers';

//criação do storage para persistência
const appStorage = storage.reducer(RootReducer);

//criação do storage async
const engine = createEngine('conectando-mamaes-application-engine');

//criação da store com storage
const middleware = storage.createMiddleware(engine);
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);
const store = createStoreWithMiddleware(appStorage);

//carregando o storage no device
const load = storage.createLoader(engine);
load(store);


export default class AppStorage extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
