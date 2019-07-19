# Tetris

## Introduction

This is a rebuild of my previous (successful) attempt to create a Tetris like game. The goal of this rebuild is to get acquainted with some TypeScript/JavaScript techniques and patterns. Some of these are:

- Web componnents
- Decorators
- Finite state machine
- Dependency injection
- Observables
- Lenses
- Routing

A note for everyone that is thinking why doesn't he just use framework x of library z? The goal is not the game itself, but the journey. I want to learn how to create and implement certain patterns. The best way for me to learn these concepts is to create it myself.

The project will be created with vanilla ~~JavaScript~~ TypeScript.

## Setup

The project is build with TypeScript and won't have any dependencies, of course it has a few dev-dependencies.

For the bundling I use Webpack and for testing Karma.

These are the `npm` commands you can use:

- `npm run lint`, lint all files. The config is based on `tslint-microsoft-contrib`.
- `npm run test`, run all unit tests in a headless Chrome browser.
- `npm run build`, compile and bundle all files to `es6` JavaScript.
- `npm run dev`, start a development server on port `5000`.

## Phases

The project will be created in phases.

- [ ] __Web components__, I want to use _Custom elements_ with _shadow DOM_ and _HTML templates_.
- [ ] Use __decorators__ to make it easier to create a _Web component_.
- [ ] Use a __Finite state machine__ to ensure the flow through the pages.
- [ ] The pages will share services that need to be singletons, they will be available through __Dependency injection__.
- [ ] __Observables__ the DOM events that will control the game will be available as streams.
- [ ] A __Store__ to store the state of the game.
- [ ] __Color manipulation__ to create darker and lighter colors from a given color. This will be used to draw the Tetrominos.
- [ ] __Canvas__ for rendering the game.

## The old project

The code of the old project can be found in the `release/1.x` branch. The result can be found here [here](https://stoic-saha-73d2b3.netlify.com/).
