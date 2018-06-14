/* eslint-disable import/no-commonjs */
const _ = require('lodash');
const colors = {
  transparent: 'transparent',
  inherit: 'inherit',

  white: '#ffffff',
  'white-10': 'rgba(255, 255, 255, .10)',
  'white-25': 'rgba(255, 255, 255, .25)',
  'white-50': 'rgba(255, 255, 255, .5)',
  'white-65': 'rgba(255, 255, 255, .65)',
  'white-75': 'rgba(255, 255, 255, .75)',
  black: '#22292F',
  'black-pure': '#000',
  'black-25': 'rgba(0, 0, 0, .25)',
  'black-50': 'rgba(0, 0, 0, .5)',
  'black-65': 'rgba(0, 0, 0, .65)',
  'black-75': 'rgba(0, 0, 0, .75)',
  gray: '#777777',
  red: '#e3342f',
  orange: '#f6993f',
  yellow: '#ffed4a',
  green: '#38c172',
  teal: '#4dc0b5',
  blue: '#3490dc',
  indigo: '#6574cd',
  purple: '#9561e2',
  pink: '#f66d9b',
};

const dimensionScale = {
  auto: 'auto',
  '0': '0',
  '1': '1rem',
  '2': '2rem',
  '3': '4rem',
  '4': '8rem',
  '5': '16rem',
  '1x': '1.5rem',
  '2x': '3rem',
  '3x': '6rem',
  '4x': '12rem',
  '10': '10%',
  '20': '20%',
  '25': '25%',
  '30': '30%',
  '33': 'calc(100% / 3)',
  '40': '40%',
  '50': '50%',
  '60': '60%',
  '66': 'calc(100% / 1.5)',
  '70': '70%',
  '75': '75%',
  '80': '80%',
  '90': '90%',
  '100': '100%',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

const widthScale = {
  ...dimensionScale,
  '100vw': '100vw',
};
const heightScale = {
  ...dimensionScale,
  '100vh': '100vh',
};

const spacingScale = {
  '0': '0',
  '05': '.5rem',
  '1': '1rem',
  '2': '2rem',
  '3': '4rem',
  '4': '8rem',
  '5': '16rem',
  '0x': '.25rem',
  '05x': '.75rem',
  '1x': '1.5rem',
  '2x': '3rem',
  '3x': '6rem',
  '4x': '12rem',
  '10': '10%',
  '20': '20%',
  '25': '25%',
  '30': '30%',
  '33': 'calc(100% / 3)',
  '40': '40%',
  '50': '50%',
  '60': '60%',
  '66': 'calc(100% / 1.5)',
  '70': '70%',
  '75': '75%',
  '80': '80%',
  '90': '90%',
  '100': '100%',
};
const marginScale = {
  ...spacingScale,
  auto: 'auto',
};

const fontScale = {
  '-2': '0.75rem',
  '-1': '0.875rem',
  '1': '1rem', // 16px
  '2': '1.125rem', // 18px
  '3': '1.25rem', // 20px
  '4': '1.5rem', // 24px
  '5': '1.875rem', // 30px
  '6': '2.25rem', // 36px
  '7': '3rem', // 48px
};

const zIndex = {
  auto: 'auto',
  '-2': -20,
  '-1': -10,
  '0': 0,
  '1': 10,
  '2': 20,
  '3': 30,
  '4': 40,
  '5': 50,
};

const opacity = {
  '0': '0',
  '15': '.15',
  '25': '.25',
  '50': '.5',
  '75': '.75',
  '100': '1',
};

const shortNames = {
  bold: {
    fontWeight: 'bold',
  },
};
const utilities = {
  'outline-none': {
    outline: 'none',
  },
  'text-outline': {
    'text-shadow':
      '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
  },
  'bg-blur': {
    filter: 'blur(10px)',
  },
};
const flexbox = {
  flrnw: {
    display: 'flex',
    flexDirection: 'row',
  },
  flrw: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flcnw: {
    display: 'flex',
    flexDirection: 'column',
  },
  flcw: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  fln: {
    flex: 'none',
  },
  fla: {
    flex: '1 1 auto',
    minWidth: 0,
    minHeight: 0,
  },
  flccv: {
    justifyContent: 'center',
  },
  flcch: {
    alignItems: 'center',
  },
  flrcv: {
    alignItems: 'center',
  },
  flrch: {
    justifyContent: 'center',
  },
  flc: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flrar: {
    justifyContent: 'flex-start',
  },
  flral: {
    justifyContent: 'flex-end',
  },
  flcat: {
    justifyContent: 'flex-start',
  },
  flcab: {
    justifyContent: 'flex-end',
  },
  flspa: {
    justifyContent: 'space-around',
  },
  flspb: {
    justifyContent: 'space-between',
  },
};

function addCustomClasses(customClasses) {
  return ({ addUtilities }) => {
    const prefixedClasses = _.mapKeys(customClasses, (value, key) => `.${key}`);
    addUtilities(prefixedClasses);
  };
}

const plugins = [
  addCustomClasses(shortNames),
  addCustomClasses(flexbox),
  addCustomClasses(utilities),
];

module.exports = {
  textSizes: fontScale,
  width: widthScale,
  minWidth: widthScale,
  maxWidth: widthScale,

  height: heightScale,
  minHeight: heightScale,
  maxHeight: heightScale,

  padding: spacingScale,

  margin: marginScale,
  negativeMargin: marginScale,

  colors,
  zIndex,
  opacity,

  plugins,
  screens: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    print: { raw: 'print' },
  },
  textColors: colors,
  backgroundColors: colors,
  borderWidths: {
    default: '1px',
    '0': '0',
    '1': '2px',
    '2': '4px',
    '3': '8px',
  },
  borderColors: global.Object.assign({ default: colors['grey-light'] }, colors),
  borderRadius: {
    none: '0',
    sm: '.125rem',
    default: '.25rem',
    lg: '.5rem',
    full: '9999px',
  },
  fonts: {
    sans: [
      'system-ui',
      'BlinkMacSystemFont',
      '-apple-system',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ],
    serif: [
      'Constantia',
      'Lucida Bright',
      'Lucidabright',
      'Lucida Serif',
      'Lucida',
      'DejaVu Serif',
      'Bitstream Vera Serif',
      'Liberation Serif',
      'Georgia',
      'serif',
    ],
    mono: [
      'Menlo',
      'Monaco',
      'Consolas',
      'Liberation Mono',
      'Courier New',
      'monospace',
    ],
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  // Line-height
  leading: {
    '0': '0',
    '01': 1,
    '1': 1.25,
    '2': 1.5,
    '3': 2,
  },
  // Letter-spacing
  tracking: {
    tight: '-0.05em',
    normal: '0',
    wide: '0.05em',
  },
  shadows: {
    default: '0 2px 4px 0 rgba(0,0,0,0.10)',
    md: '0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)',
    lg: '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)',
    inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
    none: 'none',
  },
  svgFill: {
    current: 'currentColor',
  },
  svgStroke: {
    current: 'currentColor',
  },

  modules: {
    appearance: ['responsive'],
    backgroundAttachment: ['responsive'],
    backgroundColors: ['responsive', 'hover'],
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    borderColors: ['responsive', 'hover'],
    borderRadius: ['responsive'],
    borderStyle: ['responsive'],
    borderWidths: ['responsive'],
    cursor: ['responsive'],
    display: ['responsive'],
    flexbox: ['responsive'],
    float: ['responsive'],
    fonts: ['responsive'],
    fontWeights: ['responsive', 'hover'],
    height: ['responsive'],
    leading: ['responsive'],
    lists: ['responsive'],
    margin: ['responsive'],
    maxHeight: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    negativeMargin: ['responsive'],
    opacity: ['responsive'],
    overflow: ['responsive'],
    padding: ['responsive'],
    pointerEvents: ['responsive'],
    position: ['responsive'],
    resize: ['responsive'],
    shadows: ['responsive'],
    svgFill: [],
    svgStroke: [],
    textAlign: ['responsive'],
    textColors: ['responsive', 'hover'],
    textSizes: ['responsive'],
    textStyle: ['responsive', 'hover'],
    tracking: ['responsive'],
    userSelect: ['responsive'],
    verticalAlign: ['responsive'],
    visibility: ['responsive'],
    whitespace: ['responsive'],
    width: ['responsive'],
    zIndex: ['responsive'],
  },

  /*
  |-----------------------------------------------------------------------------
  | Advanced Options         https://tailwindcss.com/docs/configuration#options
  |-----------------------------------------------------------------------------
  |
  | Here is where you can tweak advanced configuration options. We recommend
  | leaving these options alone unless you absolutely need to change them.
  |
  */

  options: {
    prefix: '',
    important: false,
    separator: '_',
  },
};
