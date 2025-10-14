// //https://www.youtube.com/watch?v=bznJPt4t_4s
// const tilesContainer = document.querySelector('.tiles')
// const colors = ['blue', 'gold', 'red', 'orange', 'green']
// const colorsPickList = [...colors, ...colors]
// const tileCount = colorsPickList.length

// //game state
// let revealedCount = 0;
// let activeTile = null
// let awaitingEndOfMove = false

// function buildTile(color){
//     const element = document.createElement('div')
    
//     element.classList.add('tile')
//     element.setAttribute('data-color', color)
//     element.setAttribute('data-revealed', 'false')

//     element.addEventListener('click', ()=> {
//         const revealed = element.getAttribute('data-revealed')

//         if(
//             awaitingEndOfMove
//             || revealed === 'true'
//             || element === activeTile
//         ){
//             return //prevents user from clicking another card while still showing if user was correct or not
//         }

//         element.style.backgroundColor = color

//         if(!activeTile){
//             activeTile = element

//             return
//         }

//         const colorToMatch = activeTile.getAttribute('data-color')

//         if(colorToMatch === color){
//             activeTile.setAttribute('data-revealed', 'true')
//             element.setAttribute('data-revealed', 'true')

//             activeTile = null
//             awaitingEndOfMove = false
//             revealedCount += 2

//             if (revealedCount === tileCount){
//                 alert('You win! Refresh to play again.')
//             }
//         }

//         awaitingEndOfMove = true
//         setTimeout(() => {
//             element.style.backgroundColor = null
//             activeTile.style.backgroundColor = null

//             awaitingEndOfMove = false
//             activeTile = null
//         }, 1000)
//     })

//     return element
// }


// //build up tiles
// for(let i = 0; i < tileCount; i++){
//     const randomIndex = Math.floor(Math.random() * colorsPickList.length)
//     const color = colorsPickList[randomIndex]
//     const tile = buildTile(color)

//     colorsPickList.splice(randomIndex, 1)
//     tilesContainer.appendChild(tile)
// }

const tilesContainer = document.querySelector('.tiles');

// colors for the tiles
const colors = ['blue', 'gold', 'red', 'orange', 'green'];
// duplicate colors so each color has a pair
const colorsPickList = [...colors, ...colors];
const tileCount = colorsPickList.length;

// game state
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;

// function to create a tile
function buildTile(color) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.dataset.color = color;       // store color in data attribute
    tile.dataset.revealed = 'false';  // track if tile is revealed

    tile.addEventListener('click', () => {
        // ignore clicks if:
        // waiting for unmatched tiles to hide
        // tile is already revealed
        // tile is the currently active tile
        if (awaitingEndOfMove || tile.dataset.revealed === 'true' || tile === activeTile) {
            return;
        }

        // Reveal tile color
        tile.style.backgroundColor = color;

        // if no tile is active, set this tile as active and return
        if (!activeTile) {
            activeTile = tile;
            return;
        }

        // check if colors match
        if (activeTile.dataset.color === color) {
            // match found
            activeTile.dataset.revealed = 'true';
            tile.dataset.revealed = 'true';
            revealedCount += 2;

            // reset active tile
            activeTile = null;

            // check for win
            if (revealedCount === tileCount) {
                alert('You win! Refresh to play again.');
            }
        } else {
            // no match: hide both tiles after a short delay, prevents user from clicking another card while still showing if user was correct or not
            awaitingEndOfMove = true;
            setTimeout(() => {
                tile.style.backgroundColor = null;
                activeTile.style.backgroundColor = null;
                activeTile = null;
                awaitingEndOfMove = false;
            }, 1000);
        }
    });

    return tile;
}

// build the board with randomly ordered tiles
for (let i = 0; i < tileCount; i++) {
    const randomIndex = Math.floor(Math.random() * colorsPickList.length);
    const color = colorsPickList[randomIndex];
    const tile = buildTile(color);

    colorsPickList.splice(randomIndex, 1); // remove color so it's not reused
    tilesContainer.appendChild(tile);
}
