'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

function setup (favoriteColor, delayed) {
  const source = fs.readFileSync(path.join(__dirname,
    '../src/js/contentscript.js'), 'utf8');
  const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    runScripts: 'outside-only', url: 'https://github.com/example'
  });
  let onChanged;
  let initialRead;
  dom.window.chrome = {
    storage: {
      local: {
        get: function (key, onResult) {
          initialRead = function () { onResult({ favoriteColor }); };
          if (!delayed) initialRead();
        }
      },
      onChanged: { addListener: function (listener) { onChanged = listener; } }
    }
  };
  dom.window.eval(source);
  return {
    window: dom.window,
    read: function () { initialRead(); },
    change: function (value, area) {
      onChanged({ favoriteColor: { newValue: value } }, area || 'local');
    }
  };
}

function graph (window) {
  window.document.body.innerHTML = '<div class="js-yearly-contributions">' +
    [0, 1, 2, 3, 4].map(function (level) {
      return '<div class="ContributionCalendar-day" data-level="' + level +
        '"></div>';
    }).join('') + '<svg><path class="js-highlight-blob"></path>' +
    '<line class="activity-overview-axis"></line></svg></div>';
  return Array.from(window.document.querySelectorAll(
    '.ContributionCalendar-day')).map(function (day) {
    return window.getComputedStyle(day).backgroundColor;
  });
}

module.exports = function () {
  const blue = ['rgb(238, 238, 238)', 'rgb(187, 222, 251)',
    'rgb(100, 181, 246)', 'rgb(30, 136, 229)', 'rgb(13, 71, 161)'];
  const pink = ['rgb(238, 238, 238)', 'rgb(248, 187, 208)',
    'rgb(240, 98, 146)', 'rgb(233, 30, 99)', 'rgb(136, 14, 79)'];
  const app = setup('blue');
  try {
    assert.deepStrictEqual(graph(app.window), blue);
    app.window.document.body.insertAdjacentHTML('beforeend',
      '<div id="contribution-graph-legend-level-4" data-level="4"' +
      ' class="ContributionCalendar-day"></div>' +
      '<div class="contribution-activity"><span class="Progress-item">' +
      '</span></div><span id="unrelated" class="Progress-item"></span>');
    assert.strictEqual(app.window.getComputedStyle(
      app.window.document.querySelector('[id$="legend-level-4"]'))
      .backgroundColor, blue[4]);
    assert.strictEqual(app.window.getComputedStyle(
      app.window.document.querySelector('.contribution-activity span'))
      .backgroundColor, blue[4]);
    const unrelated = app.window.document.getElementById('unrelated');
    const outsideColor = app.window.getComputedStyle(unrelated).backgroundColor;
    assert.notStrictEqual(outsideColor, blue[4]);
    const sheet = app.window.document.getElementById(
      'github-contribution-color-graph-theme').sheet;
    const rule = Array.from(sheet.cssRules).find(function (r) {
      return r.selectorText === '.contribution-activity .Progress-item';
    });
    assert.strictEqual(rule.style.getPropertyPriority('background-color'),
      'important');
    // Replacing the body simulates Turbo navigation/year-fragment replacement.
    assert.deepStrictEqual(graph(app.window), blue);
    app.change('pink');
    assert.deepStrictEqual(graph(app.window), pink);
    app.change('blue', 'sync');
    assert.deepStrictEqual(graph(app.window), pink);
    assert.strictEqual(app.window.document.querySelectorAll(
      '#github-contribution-color-graph-theme').length, 1);
    assert.strictEqual(app.window.getComputedStyle(
      app.window.document.querySelector('.js-highlight-blob')).fill, '#f06292');
    assert.strictEqual(app.window.getComputedStyle(
      app.window.document.querySelector('.activity-overview-axis')).stroke,
    '#e91e63');

    // Check every selectable theme, including the session-stable random theme.
    const options = fs.readFileSync(path.join(__dirname,
      '../src/options.html'), 'utf8');
    const names = Array.from(options.matchAll(/option value="([^"]+)"/g),
      function (match) { return match[1]; });
    names.forEach(function (name) {
      app.change(name);
      const style = app.window.document.getElementById(
        'github-contribution-color-graph-theme');
      assert(!style.textContent.includes('undefined'), name);
      const before = style.textContent;
      app.change(name);
      assert.strictEqual(style.textContent, before);
    });
    ['unknown', 'constructor', '__proto__', undefined].forEach(function (name) {
      app.change(name);
      assert.strictEqual(graph(app.window)[1], 'rgb(253, 241, 86)');
    });
  } finally {
    app.window.close();
  }

  const delayed = setup('blue', true);
  try {
    delayed.change('pink');
    delayed.read();
    assert.deepStrictEqual(graph(delayed.window), pink);
  } finally {
    delayed.window.close();
  }

  const unset = setup();
  try {
    assert.strictEqual(graph(unset.window)[1], 'rgb(253, 241, 86)');
  } finally {
    unset.window.close();
  }

  const pkg = require('../package.json');
  ['manifest.json', 'manifest.firefox.json'].forEach(function (file) {
    const manifest = require('../src/' + file);
    assert.strictEqual(manifest.version, pkg.version);
    assert.deepStrictEqual(manifest.permissions, ['storage']);
    assert.deepStrictEqual(manifest.content_scripts[0].matches,
      ['https://github.com/*']);
    Object.values(manifest.icons).forEach(function (icon) {
      assert(fs.existsSync(path.join(__dirname, '../src', icon)));
    });
  });
  assert.strictEqual(require('../src/manifest.json').manifest_version, 3);
  console.log('Passed graph, navigation, storage, themes and manifest checks.');
};
