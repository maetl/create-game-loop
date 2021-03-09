# Create Game Loop

Generate a kitset game loop from zero build configuration.

## When to Use

Useful for prototyping and experimenting with game mechanics while maintaining a clean, isolated folder structure that avoids the branching and copypasta problems associated with forking larger projects or maintaining separate boilerplate repos.

## Requirements

- Command line installation of Node and NPM
- Web browser to run the games

## Quickstart

There are two methods of generating a runnable game, either by overriding the NPM initializer or by running the standalone bin script directly.

### NPM Initializer

This will generate a `package.json` and associated game files inside the current working directory. This is a one-shot operation that doesn’t require `create-game-loop` to be installed.

```
mkdir example-rl
cd example-rl
npm init game-loop
```

### Standalone Bin Script

The global install of `create-game-loop` puts the `create-game-loop` command into your path which you can run from anywhere.

```
npm install -g create-game-loop
create-game-loop example-rl
cd example-rl
```

The optional argument to the command specifies a new root directory for your project. If not provided, the game files are created in the current working directory.

### Skip Interactive Prompt

To generate a project directly from provided options and best-guess defaults without stepping through the interactive prompt, pass `-y` or `--yes` to the command.

```
npm init game-loop -y
```

Or:

```
create-game-loop -y
```

## Presets Library

Available presets:

- `caves`
- `forest`
- `dungeon`

## License

### The MIT License (MIT)
**Copyright © 2017–2021 [Mark Rickerby](https://maetl.net)**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
