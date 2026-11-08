'use strict';

// Themes from GitHub
var github      = ['#eeeeee', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
var halloween   = ['#eeeeee', '#fdf156', '#ffc722', '#ff9711', '#04001b'];

// Themes from Material design
var amber       = ['#eeeeee', '#ffecb3', '#ffd54f', '#ffb300', '#ff6f00'];
var blue        = ['#eeeeee', '#bbdefb', '#64b5f6', '#1e88e5', '#0d47a1'];
var bluegrey    = ['#eeeeee', '#cfd8dc', '#90a4ae', '#546e7a', '#263238'];
var brown       = ['#eeeeee', '#d7ccc8', '#a1887f', '#6d4c41', '#3e2723'];
var cyan        = ['#eeeeee', '#b2ebf2', '#4dd0e1', '#00acc1', '#006064'];
var deeporange  = ['#eeeeee', '#ffccbc', '#ff8a65', '#f4511e', '#bf360c'];
var deeppurple  = ['#eeeeee', '#d1c4e9', '#9575cd', '#5e35b1', '#311b92'];
var green       = ['#eeeeee', '#c8e6c9', '#81c784', '#43a047', '#1b5e20'];
var grey        = ['#eeeeee', '#e0e0e0', '#9e9e9e', '#616161', '#212121'];
var indigo      = ['#eeeeee', '#c5cae9', '#7986cb', '#3949ab', '#1a237e'];
var lightblue   = ['#eeeeee', '#b3e5fc', '#4fc3f7', '#039be5', '#01579b'];
var lightgreen  = ['#eeeeee', '#dcedc8', '#aed581', '#7cb342', '#33691e'];
var lime        = ['#eeeeee', '#f0f4c3', '#dce775', '#c0ca33', '#827717'];
var orange      = ['#eeeeee', '#ffe0b2', '#ffb74d', '#fb8c00', '#e65100'];
var pink        = ['#eeeeee', '#f8bbd0', '#f06292', '#e91e63', '#880e4f'];
var purple      = ['#eeeeee', '#e1bee7', '#ba68c8', '#8e24aa', '#4a148c'];
var red         = ['#eeeeee', '#ffcdd2', '#e57373', '#e53935', '#b71c1c'];
var teal        = ['#eeeeee', '#b2dfdb', '#4db6ac', '#00897b', '#004d40'];
var yellowMd    = ['#eeeeee', '#fff9c4', '#fff176', '#ffd835', '#f57f17'];

// Theme from Me
var unicorn     = ['#eeeeee', '#6dc5fb', '#f6f68c', '#8affa4', '#f283d1'];
var summer      = ['#eeeeee', '#eae374', '#f9d62e', '#fc913a', '#ff4e50'];
var sunset      = ['#eeeeee', '#fed800', '#ff6f01', '#fd2f24', '#811d5e'];

// Theme from MoonAntonio
var moon        = ['#eeeeee', '#6bcdff', '#00a1f3', '#48009a', '#4f2266'];
var psychedelic = ['#eeeeee', '#faafe1', '#fb6dcc', '#fa3fbc', '#ff00ab'];
var yellow      = ['#eeeeee', '#d7d7a2', '#d4d462', '#e0e03f', '#ffff00'];

var colors = {
  github: github,
  halloween: halloween,

  amber: amber,
  blue: blue,
  bluegrey: bluegrey,
  brown: brown,
  cyan: cyan,
  deeporange: deeporange,
  deeppurple: deeppurple,
  green: green,
  grey: grey,
  indigo: indigo,
  lightblue: lightblue,
  lightgreen: lightgreen,
  lime: lime,
  orange: orange,
  pink: pink,
  purple: purple,
  red: red,
  teal: teal,
  yellowMd: yellowMd,

  summer: summer,
  unicorn: unicorn,
  sunset: sunset,

  moon: moon,
  psychedelic: psychedelic,
  yellow: yellow
};

var cssGitHubVars = [
  '--color-calendar-graph-day-bg',
  '--color-calendar-graph-day-L1-bg',
  '--color-calendar-graph-day-L2-bg',
  '--color-calendar-graph-day-L3-bg',
  '--color-calendar-graph-day-L4-bg'
];

var randomColor = randomProperty(colors);

function randomProperty (obj) {
  var keys = Object.keys(obj);
  return keys[keys.length * Math.random() << 0];
}

// A stylesheet also applies to graphs loaded later by Turbo navigation or
// year switching, without observing and repainting the whole document.
var themeStyle = document.createElement('style');
themeStyle.id = 'github-contribution-color-graph-theme';
document.documentElement.appendChild(themeStyle);

function applyTheme (name) {
  if (name === 'random') name = randomColor;
  if (!Object.prototype.hasOwnProperty.call(colors, name)) name = 'halloween';
  var color = colors[name];
  var rules = [];

  for (var i = 0; i < color.length; i++) {
    rules.push(':root { ' + cssGitHubVars[i] + ': ' + color[i] + '; }');
    rules.push('.ContributionCalendar-day[data-level="' + i + '"] {' +
      ' background-color: ' + color[i] + ' !important;' +
      ' fill: ' + color[i] + ' !important; }');
    rules.push('.js-yearly-contributions .legend li:nth-child(' + (i + 1) +
      ') { background-color: ' + color[i] + ' !important; }');
  }

  rules.push('.js-highlight-blob { fill: ' + color[2] +
    ' !important; stroke: ' + color[2] + ' !important; }');
  rules.push('.activity-overview-axis, .activity-overview-point {' +
    ' stroke: ' + color[3] + ' !important; }');
  rules.push('.contribution-activity .Progress-item {' +
    ' background-color: ' + color[4] + ' !important; }');
  themeStyle.textContent = rules.join('\n');
}

// Register first so a preference saved during the initial read is not lost.
var preferenceChanged = false;
chrome.storage.onChanged.addListener(function (changes, area) {
  if (area === 'local' && changes.favoriteColor) {
    preferenceChanged = true;
    applyTheme(changes.favoriteColor.newValue);
  }
});

chrome.storage.local.get('favoriteColor', function (items) {
  if (!preferenceChanged) applyTheme(items.favoriteColor);
});
