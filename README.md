<p align="center">
  <img alt="GitHub Contribution Color Graph" src="https://raw.githubusercontent.com/williambelle/github-contribution-color-graph/master/assets/readme-logo.png">
</p>

<p align="center">
  Change colors of contribution graph in GitHub.
</p>

<p align="center">
  <a href="https://travis-ci.com/williambelle/github-contribution-color-graph">
    <img alt="Travis Status" src="https://travis-ci.com/williambelle/github-contribution-color-graph.svg?branch=master">
  </a>
  <a href="https://david-dm.org/williambelle/github-contribution-color-graph">
    <img alt="Dependency Status" src="https://david-dm.org/williambelle/github-contribution-color-graph/status.svg"/>
  </a>
  <a href="https://raw.githubusercontent.com/williambelle/github-contribution-color-graph/master/LICENSE">
    <img alt="MIT License" src="https://img.shields.io/badge/license-MIT-blue.svg">
  </a>
  <a href='https://github.com/williambelle/github-contribution-color-graph/tags'>
    <img alt="GitHub Tag" src="https://img.shields.io/github/tag/williambelle/github-contribution-color-graph.svg" />
  </a>
</p>

---

Overview
--------

A Web Extension to change colors of contribution graph in GitHub.

Features:

  * Colorize contribution graph and legend
  * Colorize activity overview graph
  * Colorize activity listing progress bar

Options:

  * GitHub themes
  * Material Design themes
  * Random theme

Install
-------

[link-ch]:https://chrome.google.com/webstore/detail/github-contribution-color/cfilkjdlgdiclmdfdggjommndffiibbe
[link-ff]:https://addons.mozilla.org/en-US/firefox/addon/github-contribution-color/
[link-op]:https://addons.opera.com/en/extensions/details/install-chrome-extensions/

  * [**Chrome** extension][link-ch] - [<img valign="middle" src="https://img.shields.io/chrome-web-store/v/cfilkjdlgdiclmdfdggjommndffiibbe.svg?label=%20">][link-ch]
  * [**Firefox** add-on][link-ff] - [<img valign="middle" src="https://img.shields.io/amo/v/github-contribution-color.svg?label=%20">][link-ff]

The Chrome version also works in Opera (using [this][link-op]) and Edge.

### Install this fork in Chrome

The Chrome build uses Manifest V3. To install the version from this repository:

1. Install Node.js 18 or newer, then run `npm install` and `npm run package`.
2. Open `chrome://extensions` in Chrome and enable **Developer mode**.
3. Click **Load unpacked** and select this project's `dist/chrome` folder.
4. Reload any already-open GitHub profile tabs.
5. Open the extension's **Details → Extension options**, choose a theme and save.
   Open GitHub profile graphs update immediately when a preference is saved.

Keep `dist/chrome` in place while the unpacked extension is installed.
The ZIP in `package/` is for distribution; Chrome's **Load unpacked** needs the
folder containing `manifest.json`, rather than the ZIP itself.

Before submitting changes, check graph and legend colors, activity overview,
year switching, navigation between profiles, preference persistence after
restarting Chrome, and both light and dark GitHub appearances.

### Automatic Chrome builds

Every push to `main` runs lint and regression tests, builds the Chrome
extension, and updates the **Latest build** GitHub release with `release.zip`.
Download it from the [latest build release](https://github.com/hoksilato/github-contribution-color-graph/releases/tag/latest-build).
The release tag moves to the successfully published commit. A failed build
leaves the previous release in place; old runs cannot overwrite a newer commit.

Pull requests targeting `main` run the same build checks and upload a workflow
artifact, but do not publish releases. The workflow can also be run manually
from the Actions tab on `main`. No additional repository secrets are needed.

To generate the same archive locally, use `npm ci` followed by
`npm run package:chrome`. The result is `package/release.zip`, with
`manifest.json` and the original MIT license at the ZIP root. Extract the ZIP
before loading it in Chrome. This workflow publishes to GitHub Releases;
Chrome Web Store submission remains a separate step.

Screenshots
-----------

See all available themes [here](docs/THEMES.md).

Halloween                           |  Blue
:----------------------------------:|:--------------------------------------:		
![Halloween](https://raw.github.com/williambelle/github-contribution-color-graph/master/docs/contributions-halloween.png)|![Blue](https://raw.github.com/williambelle/github-contribution-color-graph/master/docs/contributions-blue.png)

Pink                                |  Unicorn
:----------------------------------:|:--------------------------------------:		
![Pink](https://raw.github.com/williambelle/github-contribution-color-graph/master/docs/contributions-pink.png)|![Unicorn](https://raw.github.com/williambelle/github-contribution-color-graph/master/docs/contributions-unicorn.png)


Contributing
------------

Contributions are always welcome.

See [Contributing](CONTRIBUTING.md).

Contributors
------------

  * [MoonAntonio](https://github.com/MoonAntonio)
  * [puroong](https://github.com/puroong)

License
-------

The MIT License (MIT)
