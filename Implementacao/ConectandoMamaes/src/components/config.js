const colors = {
  'orange57': {
    'color': '#e8633a'
  },
  'orange65': {
    'color': '#ec805f'
  },
  'orange70': {
    'color': '#ef9276'
  },
  'orange75': {
    'color': '#f2a48d'
  },
  'orange80': {
    'color': '#f4b7a4'
  },
};

const PRIMARY = 'orange';

export function getColor(string) {
  if (string) {
    if (string.indexOf('#') > -1 || string.indexOf('rgba') > -1
        || string.indexOf('rgb') > -1) {
      return string;
    }
    if (colors[string]) {
      return colors[string].color;
    }
    if (colors[`${string}57`]) {
      return colors[`${string}57`].color;
    }
  }
  return colors[`${PRIMARY}57`].color;
}
