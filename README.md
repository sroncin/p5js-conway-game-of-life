# Conway's Game of Life

I was inspired by the challenge [Coding Train Challenge](https://thecodingtrain.com/challenges/85-the-game-of-life) "#85 — The Game of Life" of **Daniel Shiffman**.

Every turn, cells live, die, or are "born" based on these rules:

- Any live cell with fewer than two live neighbors dies, as if by underpopulation.
- Any live cell with two or three live neighbors lives on to the next generation.
- Any live cell with more than three live neighbors dies, as if by overpopulation.
- Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
Remark: cells of the same color are of the same generation

You can read more in this [Wikipedia page](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) about Conway's Game of Life.

A playable version of the game is available <a href="https://editor.p5js.org/stephane.roncin/full/EVAPcOrd7" _target="p5js-space-invador">here</a>