# Theia-Dart 

> Note: This is an experimental repository to test out embedding Theia in https://github.com/flutter/devtools.

## Getting started

Please install all necessary [prerequisites](https://github.com/eclipse-theia/theia/blob/master/doc/Developing.md#prerequisites).

## How to run

Download all plugins (e.g. Dart-Code plugins)

    cd browser-app
    mkdir plugins
    yarn download:plugins

Compile Theia and run in the browser

    yarn
    yarn start

> Note: You will likely see a lot of errors in the terminal! These seem to be false positives and don't prevent Theia from being compiled and run.

Open http://localhost:3000 in the browser.

Confirm that the `dart-devtools-integration` is set-up by checking for Edit > Dart DevTools Integration

*[Optional] Trigger automatic rebuilds by running `yarn watch` in a separate terminal window.*

## Directory structure

- `browser-app`: All of the configuration is contained in `package.json`. This lists all the dependencies and VS Code extensions to include. 
- `dart-devtools-integration`: This is the extension we use to customize Theia for use in Dart DevTools. 

## Theia documentation 

* Official documentation: https://theia-ide.org/docs/
* Theia community: https://community.theia-ide.org/