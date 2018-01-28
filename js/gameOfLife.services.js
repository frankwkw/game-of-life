/**
 * gameOfLife.services.js
 * by Frank Wong, 26/01/2018
 * 
 * Providing logic functions for the Conway's Game of Life challenge for the Sidekicker.
 *
 * Unit tested by:
 * - ../tests/gameOfLife.services.test.js
 * 
 */

var gameOfLife = {

    // Creates a two dimensional array.
    createArray: function(rows) {
        var arr = [],
            i;

        for (i = 0; i < rows; i += 1) {
            arr[i] = [];
        }

        return arr;
    },

    // Fills grid randomly with living cells.
    fillRandomCells: function(grid, height, edgeMargin) { 
        var x,
            y,
            width = grid.length;

        // Iterate through each cell on grid, randomly assigning life.
        for (x = 0; x < width; x += 1) {
            for (y = 0; y < height; y += 1) {
                if (edgeMargin > 0 &&
                    (x < edgeMargin ||
                     x > width - edgeMargin ||
                     y < edgeMargin ||
                     y > height - edgeMargin)
                    ) {
                    continue;
                }

                grid[x][y] = Math.round(Math.random());
            }
        }
    },
    
    // Calculates the fate of the cell.
    calculateCellState: function(x, y, grid) {
        var totalCells = this.countAdjacentLivingCells(x, y, grid);

        // Apply rules based on number of living adjacent cells.
        switch (totalCells) {
            case 2:
                return grid[x][y]; // Retain present state.
            case 3:
                return 1;          // Come to life.
            default:
                return 0;          // RIP.
        }
    },

    // Adds up the number of adjacent living cells.
    // This function innately wraps to other edge of grid; a deviation from Concannon's
    // implementation which just replicated the grid edge states.
    countAdjacentLivingCells: function(x, y, grid) {
        var result  = 0,
            width   = grid.length,
            height  = grid[0].length,
            topY    = y === 0 ? height - 1 : y - 1,
            bottomY = y === height - 1 ? 0 : y + 1,
            leftX   = x === 0 ? width - 1 : x - 1,
            rightX  = x === width - 1 ? 0 : x + 1;
    
        result += grid[leftX][topY];     // Top left
        result += grid[x][topY];         // Top center
        result += grid[rightX][topY];    // Top right

        result += grid[leftX][y];        // Middle left
        result += grid[rightX][y];       // Middle right

        result += grid[leftX][bottomY];  // Bottom left
        result += grid[x][bottomY];      // Bottom center
        result += grid[rightX][bottomY]; // Bottom right
    
        // Return result or zero.
        return result || 0;
    }
};

// Export services for testing.
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = gameOfLife;
}