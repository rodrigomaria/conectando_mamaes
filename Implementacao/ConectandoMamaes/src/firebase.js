//importação e configuração do firebase
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA9Ib8R57BSQMdoVIRDO6RW4XkT3lBrl3E',
  authDomain: 'conectandomamaes.firebaseapp.com',
  databaseURL: 'https://conectandomamaes.firebaseio.com',
  projectId: 'conectandomamaes',
  storageBucket: 'conectandomamaes.appspot.com',
  messagingSenderId: '342812744417'
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
