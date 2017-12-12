//importação dos componentes do react, react native
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

//importacao dos componentes
import moment from 'moment';
import { connect } from 'react-redux';

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

class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameUser: null,
      nameBaby: null,
      date: null,
      now: null,
      week: null,
      dayBorn: null
    };   
  }

  componentDidMount() {
    const nameDisplay = this.props.currentUser.name;

    this.setState({
      nameUser: nameDisplay,
      nameBaby: 'Gurizinho',
      date: '01/06/2016',
      week: '48',
      dayBorn: '08/03/2018'
    });
  }

  render() {
    return (
      <View style={styles.boxInfo}>
        <Text style={styles.text}>Olá {this.state.nameUser}, </Text>
        <Text style={styles.text}>O {this.state.nameBaby} está com {this.state.week} semanas.</Text>
        <Text style={styles.text}>Data prevista para o parto: {this.state.dayBorn} </Text>
        <Text style={styles.text}>Faltam 86 dias.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxInfo: {
    borderWidth: 3,
    borderColor: '#e8633a',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#e8633a'
  },
  text: {
    textAlign: 'center',
    color: 'white'
  } 
});

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(Information);
