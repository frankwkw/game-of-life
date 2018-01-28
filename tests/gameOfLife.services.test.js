/**
 * gameOfLife.services.test.js
 * by Frank Wong, 26/01/2018
 *
 * Unit tests for:
 * - ../js/gameOfLife.services.js
 * 
 */

import test from 'ava';
import gameOfLife from  './../js/gameOfLife.services.js';

test('Test count of living adjacent cells.', t => {
    var grid = [
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1]
        ],
        x = 1,
        y = 1,
        result = gameOfLife.countAdjacentLivingCells(x, y, grid);

    t.is(result, 8);
});

test('Test count of living adjacent cells with wrapping.', t => {
    var grid = [
            [0, 0, 1],
            [0, 0, 0],
            [1, 0, 0]
        ],
        x = 0,
        y = 0,
        result = gameOfLife.countAdjacentLivingCells(x, y, grid);

    t.is(result, 2);
});

test('Test count of empty grid.', t => {
    var grid = [[],[],[]],
        x = 1,
        y = 1,
        result = gameOfLife.countAdjacentLivingCells(x, y, grid);

    t.is(result, 0);
});

test('Test population of grid with cells.', t => {
    var grid = [[],[],[]];

    gameOfLife.fillRandomCells(grid, 3, 0);

    t.is(grid[0].length, 3);
});

test('Test calculation of living cell state.', t => {
    var grid = [
            [1, 1, 1],
            [0, 0, 0],
            [0, 0, 0]
        ],
        x = 1,
        y = 1,
        result = gameOfLife.calculateCellState(x, y, grid);

    t.is(result, 1);
});

test('Test calculation of dead cell state.', t => {
    var grid = [
            [1, 1, 1],
            [1, 0, 0],
            [0, 0, 0]
        ],
        x = 1,
        y = 1,
        result = gameOfLife.calculateCellState(x, y, grid);

    t.is(result, 0);
});