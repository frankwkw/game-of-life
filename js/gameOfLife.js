/**
 * Conway's Game of Life
 * by Frank Wong, 26/01/2018
 * 
 * For submission of Conway's Game of Life coding challenge for Sidekicker application.
 *
 * 
 * Notes:
 * - I chose a minimalistic structure for the challenge to avoid over-engineering, to
 *   fulfil the requirements with the most economical route available.
 * 
 * - Ava was selected for testing, as a lightweight framework suitable for the levity of 
 *   the challenge.
 * 
 * - Potential future improvements include exploring Tony Finch's List Life approach
 *   (http://dotat.at/prog/life/life.html) and exposing the configurable parameters.
 * 
 * 
 * Inspirations:
 * - Concannon's Game of Life
 *   http://disruptive-communications.com/conwaylifejavascript/
 *   I selected Concannon's implementation as the starting point, and then refined and
 *   extended the base ideas to fulfil the requirements of the challenge.
 *   
 *
 * Dependencies:
 * - Addyosmani's limitloop https://gist.github.com/addyosmani/5434533
 *   The flaw of Concannon's implementation was performance. I began planning a throttling
 *   mechanism but discovered Addyosmani's limitloop already satisfying this function.
 *   
 * 
 */

    // Constants
var CANVAS_ELEMENT_ID = "canvas_gameoflife",
    CANVAS_CONTEXT    = "2d",

    // Configurable parameters
    fps        = 10,        // Frames per second
    cellSize   = 6,         // Size of cell in pixels
    cellMargin = 2,         // Margin between cells in pixels
    edgeMargin = 10,        // Margin from canvas edge to spawn initial cells
    cellColour = "#41c6f1", // Colour of cells

    // Internal parameters
    c           = document.getElementById(CANVAS_ELEMENT_ID),
    ctx         = c.getContext(CANVAS_CONTEXT),
    cellScale   = cellSize + cellMargin,
    gridWidth   = Math.round(window.innerWidth/cellScale),
    gridHeight  = Math.round(window.innerHeight/cellScale),
    currentGrid = gameOfLife.createArray(gridWidth),
    nextGrid    = gameOfLife.createArray(gridWidth);


// Set up canvas.
initialiseCanvas();

// Kick start the core loop.
limitLoop(tick, fps);


// Functions
function tick() {
    drawGrid();
    updateGrid();
}

function initialiseCanvas() {
    // Scale canvas to initial window size.
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    // Set colour of living cells.
    ctx.fillStyle = cellColour;
    
    // Initialise grid with cells. 
    gameOfLife.fillRandomCells(currentGrid, gridHeight, edgeMargin);
}

// Draw the contents of the grid onto canvas.
function drawGrid() {
    var x,
        y;
    
    // Clear the canvas ahead of each redraw.
    ctx.clearRect(0, 0, gridWidth*cellScale, gridHeight*cellScale);
    
    // Iterate through every cell on grid, looking for living cells.
    for (x = 0; x < gridWidth; x += 1) { 
        for (y = 0; y < gridHeight; y += 1) {
            if (currentGrid[x][y] !== 1) {
                continue;
            }
            
            // Draw living cell.
            ctx.fillRect(x*cellScale, y*cellScale, cellSize, cellSize);
        }
    }
}

// Calculate and then replace the current state of grid with the next state.
function updateGrid() {
       var x,
           y,
           temp;

    // Iterate through every cell on grid, calculating its next state.
    for (x = 0; x < gridWidth; x += 1) {
        for (y = 0; y < gridHeight; y += 1) {
            nextGrid[x][y] = gameOfLife.calculateCellState(x, y, currentGrid);
        }
    }

    // Swap current and next frame grids.
    temp        = currentGrid;
    currentGrid = nextGrid;
    nextGrid    = temp;
}