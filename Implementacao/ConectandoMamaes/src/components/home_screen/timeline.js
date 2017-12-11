//importação dos componentes do react, react native
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  RefreshControl
} from 'react-native';

//importacao dos componentes
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { savePosts } from '../../actions';
import { getColor } from '../config';
import { firebaseApp } from '../../firebase';
import Post from './post';


//tradução do componente locale
moment.defineLocale('pt-br', {
  months: 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split('_'),
  monthsShort: 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
  weekdays: 'domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado'.split('_'),
  weekdaysShort: 'dom_seg_ter_qua_qui_sex_sáb'.split('_'),
  weekdaysMin: 'dom_2ª_3ª_4ª_5ª_6ª_sáb'.split('_'),
  longDateFormat: {
      LT: 'HH:mm',
      L: 'DD/MM/YYYY',
      LL: 'D [de] MMMM [de] YYYY',
      LLL: 'D [de] MMMM [de] YYYY [às] LT',
      LLLL: 'dddd, D [de] MMMM [de] YYYY [às] LT'
  },
  calendar: {
      sameDay: '[Hoje às] LT',
      nextDay: '[Amanhã às] LT',
      nextWeek: 'dddd [às] LT',
      lastDay: '[Ontem às] LT',
      lastWeek: (() => {
          return (this.day() === 0 || this.day() === 6) ?
              '[Último] dddd [às] LT' : // Sábado + Domingo
              '[Última] dddd [às] LT'; // Segunda - Sexta
      }),
      sameElse: 'L'
  },
  relativeTime: {
      future: 'em %s',
      past: '%s atrás',
      s: 'segundos',
      m: 'um minuto',
      mm: '%d minutos',
      h: 'uma hora',
      hh: '%d horas',
      d: 'um dia',
      dd: '%d dias',
      M: 'um mês',
      MM: '%d meses',
      y: 'um ano',
      yy: '%d anos'
  },
  ordinal: '%dº'
});

moment.updateLocale('pt-br', null);

class Timeline extends Component {
  constructor(props) {
    super(props);

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.state = {
      isRefreshing: false,
      updateNotification: null
    };
  }

  componentDidMount() {
    firebaseApp.database().ref('posts/').once('value').then((snapshot) => {
      this.props.savePosts(snapshot.val());
    })
    .catch(() => { 

    });
    setTimeout(() => {
      this.setState({ updateNotification: 'Puxe para atualizar...' });
    }, 10000);
  }

  componentDidUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  _onRefresh() {
    this.setState({ isRefreshing: true });

    firebaseApp.database().ref('posts/').once('value').then((snapshot) => {
      this.props.savePosts(snapshot.val());
      this.setState({ isRefreshing: false, updateNotification: null });
    });
  }

  renderPosts() {
    const postArray = [];
    _.forEach(this.props.posts, (value, index) => {
      const time = value.time;
      let timeString = moment(time).fromNow();

      //verificar se o post já passou de 24 horas ou não
      if (timeString.match(/dia/)) {
        timeString = moment(time).format('LLL');
      } else {
        timeString = moment(time).fromNow();
      }

      postArray.push(
        <Post
          posterName={value.name}
          postTime={timeString}
          postContent={value.text}
          key={index}
        />
      );
    });
    _.reverse(postArray);
    return postArray;
  }

  render() {
    const notify = this.state.updateNotification ?
    <Text style={styles.updateNotificationStyle}>
      {this.state.updateNotification}
    </Text>
    : null;

    const view = this.props.posts ?
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh.bind(this)}
            tintColor="#ff0000"
            title="Carregando..."
            titleColor="#00ff00"
            colors={[getColor()]}
            progressBackgroundColor={getColor('#ffffff')}
          />
        }
      >

      {notify}

      {this.renderPosts()}

      </ScrollView>

    :
    <View style={styles.waitView}>
      <Text style={{ fontWeight: 'bold' }}>Não existe nenhum post ainda.</Text>
    </View>;

    return (
      <View style={styles.container}>
        {view}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  waitView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 2,
    backgroundColor: '#ffffff',
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10
  },
  name: {
    color: getColor(),
    fontFamily: 'Roboto-Bold',
    fontSize: 15
  },
  time: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    paddingBottom: 10
  },
  content: {
    color: 'rgba(0,0,0,.8)',
    fontFamily: 'Roboto-Regular',
    fontSize: 14
  },
  updateNotificationStyle: {
    textAlign: 'center',
    marginTop: 10,
    paddingBottom: 5
  }
});

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps, { savePosts })(Timeline);
