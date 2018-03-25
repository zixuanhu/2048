const LEFT = [37, 65];
const UP = [38, 87];
const RIGHT = [39, 68];
const DOWN = [40, 83];
let container, game, startBtn, keynum, keychar, message, lock;

// class Object
function gameRun(container) {
    // constructor
    this.container = container;
    this.tiles = new Array(16);
}

// build class object function
gameRun.prototype.init = function () {
    this.clearContainer();
    for (let i = 0; i < this.tiles.length; i++) {
        let tile = this.newTile('0');
        this.setClassName(tile, '0', i);
        tile.setAttribute("index", i);
        this.container.appendChild(tile);
        this.tiles[i] = tile;
    }

    this.randomTile();
    this.randomTile();
    //this.buildFailBaord();
    //this.buildWinBaord();
}

// gameRun.prototype.buildFailBaord = function () {
//     for (let row = 0; row < 4; row++) {
//         for (let col = 0; col < 4; col++) {
//             let index = col + row * 4;
//             if (col === 1 || col === 3) this.change(this.tiles[index], Math.pow(2, row + 1));
//             if (col === 0 || col === 2) this.change(this.tiles[index], Math.pow(4, row + 1));
//         }
//     }
// }

// gameRun.prototype.buildWinBaord = function () {
//     for (let row = 0; row < 4; row++) {
//         for (let col = 0; col < 4; col++) {
//             let index = col + row * 4;
//             if (col === 1 || col === 3) this.change(this.tiles[index], '1024');
//             if (col === 0 || col === 2) this.change(this.tiles[index], '0');
//         }
//     }
// }


//to create a new tile in "html" with "div"
gameRun.prototype.newTile = function (val) {
    let tile = document.createElement("div");
    this.setTileVal(tile, val);
    return tile;
}


//set value to each title 
gameRun.prototype.setTileVal = function (tile, val) {
    tile.setAttribute("val", val);
    //add text in div
    if (val !== '0') tile.innerHTML = `${val}`;
    else tile.innerHTML = ' ';

}

//set/change Classname
gameRun.prototype.setClassName = function (tile, val, index) {
    tile.className = `tile tile${val} tile-idx${index}`;
}

//change tile name 
gameRun.prototype.change = function (tile, val) {
    this.setClassName(tile, val, tile.getAttribute("index"));
    this.setTileVal(tile, val);

}

gameRun.prototype.clearContainer = function () {
    let size = this.container.childElementCount;
    if (size === 0) return;
    for (let i = size - 1; i >= 0; i--) {
        container.removeChild(container.childNodes[i]);
    }
}

gameRun.prototype.randomTile = function () {
    const rVal = Math.random() < 0.8 ? 2 : 4;
    let tempTiles = [];
    for (let i = 0; i < this.tiles.length; i++) {
        if (this.tiles[i].getAttribute("val") === "0") {
            tempTiles.push(this.tiles[i]);
        }
    }

    const rPosition = ~~(Math.random() * tempTiles.length);
    this.change(tempTiles[rPosition], rVal);

}

gameRun.prototype.win = function () {
    console.log("win");
    message.innerHTML = "You WIN!"
    lock = true;

}

gameRun.prototype.lost = function () {
    console.log("fail");
    message.innerHTML = "You Fail!";
    lock = true;
}

gameRun.prototype.upMove = function () {
    let tiles = this.tiles;
    let moved = false;
    for (let col = 0; col < 4; col++) {
        for (let row = 0; row < 4; row++) {
            let index = col + row * 4;
            let newVal = tiles[index].getAttribute("val");
            let checkIndex = index + 4;
            let moveUpIndex = index;
            while (newVal !== '0' && checkIndex + 4 < 16 && tiles[checkIndex].getAttribute("val") === '0') {
                checkIndex += 4;
            }
            //merge up
            if (newVal !== '0' && checkIndex < 16 && newVal === tiles[checkIndex].getAttribute("val")) {
                newVal *= 2;
                newVal = JSON.stringify(newVal);
                moved = true;
                gameRun.prototype.change(tiles[index], newVal);
                gameRun.prototype.change(tiles[checkIndex], '0');
            }
            if (~~newVal === 2048) this.win();
            //find move up index
            while (newVal !== '0' && moveUpIndex - 4 >= 0 && tiles[moveUpIndex - 4].getAttribute("val") === '0') {
                moveUpIndex -= 4;
            }
            if (newVal !== '0' && moveUpIndex >= 0 && moveUpIndex !== index) {
                moved = true;
                gameRun.prototype.change(tiles[moveUpIndex], tiles[index].getAttribute("val"));
                gameRun.prototype.change(tiles[index], '0');
            }
        }
    }
    if (moved) this.randomTile();
    if (this.checkLost()) this.lost();
}


gameRun.prototype.downMove = function () {
    let tiles = this.tiles;
    let moved = false;
    for (let col = 0; col < 4; col++) {
        for (let row = 3; row >= 0; row--) {
            let index = col + row * 4;
            let newVal = tiles[index].getAttribute("val");
            let checkIndex = index - 4;
            let moveDownIndex = index;
            while (newVal !== '0' && checkIndex - 4 >= 0 && tiles[checkIndex].getAttribute("val") === '0') {
                checkIndex -= 4;
            }
            //merge down
            if (newVal !== '0' && checkIndex >= 0 && newVal === tiles[checkIndex].getAttribute("val")) {
                newVal *= 2;
                moved = true;
                gameRun.prototype.change(tiles[index], newVal);
                gameRun.prototype.change(tiles[checkIndex], '0');
            }
            if (~~newVal === 2048) this.win();
            //find move down index
            while (newVal !== '0' && moveDownIndex + 4 < 16 && tiles[moveDownIndex + 4].getAttribute("val") === '0') {
                moveDownIndex += 4;
            }
            if (newVal !== '0' && moveDownIndex >= 0 && moveDownIndex !== index) {
                moved = true;
                gameRun.prototype.change(tiles[moveDownIndex], tiles[index].getAttribute("val"));
                gameRun.prototype.change(tiles[index], '0');
            }
        }
    }
    if (moved) this.randomTile();
    if (this.checkLost()) this.lost();
}

gameRun.prototype.leftMove = function () {
    let tiles = this.tiles;
    let moved = false;
    for (let col = 0; col < 4; col++) {
        for (let row = 3; row >= 0; row--) {
            let index = col + row * 4;
            let newVal = tiles[index].getAttribute("val");
            let checkIndex = index + 1;
            let moveLeftindex = index;
            while (newVal !== '0' && checkIndex + 1 < 4 + row * 4 && tiles[checkIndex].getAttribute("val") === '0') {
                checkIndex += 1;
            }
            //merge left
            if (newVal !== '0' && checkIndex < 4 + row * 4 && newVal === tiles[checkIndex].getAttribute("val")) {
                newVal *= 2;
                moved = true;
                gameRun.prototype.change(tiles[index], newVal);
                gameRun.prototype.change(tiles[checkIndex], '0');
            }
            if (~~newVal === 2048) this.win();
            //find move left index
            while (newVal !== '0' && moveLeftindex - 1 >= row * 4 && tiles[moveLeftindex - 1].getAttribute("val") === '0') {
                moveLeftindex -= 1;
            }
            if (newVal !== '0' && moveLeftindex >= row * 4 && moveLeftindex !== index) {
                moved = true;
                gameRun.prototype.change(tiles[moveLeftindex], tiles[index].getAttribute("val"));
                gameRun.prototype.change(tiles[index], '0');
            }
        }
    }
    if (moved) this.randomTile();
    if (this.checkLost()) this.lost();
}


gameRun.prototype.rightMove = function () {
    let tiles = this.tiles;
    let moved = false;
    for (let col = 3; col >= 0; col--) {
        for (let row = 3; row >= 0; row--) {
            let index = col + row * 4;
            let newVal = tiles[index].getAttribute("val");
            let checkIndex = index - 1;
            let moveRightIndex = index;
            while (newVal !== '0' && checkIndex - 1 >= row * 4 && tiles[checkIndex].getAttribute("val") === '0') {
                checkIndex -= 1;
            }
            //merge right
            if (newVal !== '0' && checkIndex >= row * 4 && newVal === tiles[checkIndex].getAttribute("val")) {
                newVal *= 2;
                moved = true;
                gameRun.prototype.change(tiles[index], newVal);
                gameRun.prototype.change(tiles[checkIndex], '0');
            }
            if (~newVal === 2048) this.win();
            //find move right index
            while (newVal !== '0' && moveRightIndex + 1 < row * 4 + 4 && tiles[moveRightIndex + 1].getAttribute("val") === '0') {
                moveRightIndex += 1;
            }
            if (newVal !== '0' && moveRightIndex < row * 4 + 4 && moveRightIndex !== index) {
                moved = true;
                gameRun.prototype.change(tiles[moveRightIndex], tiles[index].getAttribute("val"));
                gameRun.prototype.change(tiles[index], '0');
            }
        }
    }
    if (moved) this.randomTile();
    if (this.checkLost()) this.lost();
}

gameRun.prototype.checkLost = function () {
    let tiles = this.tiles;
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            let index = col + row * 4;
            if (tiles[index].getAttribute("val") === '0') {
                return false;
            }
            if (index + 4 < 16 && tiles[index + 4].getAttribute("val") === tiles[index].getAttribute("val")) {
                return false;
            }
            if (index + 1 < 4 + row * 4 && tiles[index + 1].getAttribute("val") === tiles[index].getAttribute("val")) {
                return false;
            }
        }
    }
    return true;
}

// project initialize
window.onload = function () {
    // get the boar
    container = document.getElementById("board");
    // get the botton
    startBtn = document.getElementById("start");
    // built the message
    message = document.getElementById("message")

    startBtn.onclick = function () {
        lock = false;
        game = new gameRun(container);
        game.init();
        message.innerText = "";
    };
    let handGesture = new Hammer(document.getElementById("board"));

    handGesture.on("panup", function (e) {
        console.log("pass up");
        game.upMove();
    });
    handGesture.on("pandown", function (e) {
        console.log("pass down");
        game.downMove();
    });
    handGesture.on("panleft", function (e) {
        console.log("pass left");
        game.leftMove();
    });
    handGesture.on("panright", function (e) {
        console.log("pass right");
        game.rightMove();
    });

}


window.onkeydown = function (e) {
    //For IE, Chrome
    if (window.event) {
        keynum = e.keyCode;
    } else if (e.which) {
        keynum = e.which;
    }
    keychar = String.fromCharCode(keynum);
    if (!lock) {
        if (UP.includes(keynum)) {
            game.upMove();
        }
        if (DOWN.includes(keynum)) {
            game.downMove();
        }
        if (LEFT.includes(keynum)) {
            game.leftMove();
        }
        if (RIGHT.includes(keynum)) {
            game.rightMove();
        }

    }
}