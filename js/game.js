const LEFT = [37, 65];
const UP = [38, 87];
const RIGHT = [39, 68];
const DOWN = [40, 83];
const WIN = 2048;
let container, game, startBtn, keynum, lock, score, scoreMessage, memory, message;
const handGesture = new Hammer(document.getElementById("game-container"));
handGesture.get('swipe').set({
    direction: Hammer.DIRECTION_ALL
});


handGesture.on("swipeup", function (e) {
    game.upMove();
    scoreMessage.innerHTML = `score : ${score}`;
});
handGesture.on("swipedown", function (e) {
    game.downMove();
    scoreMessage.innerHTML = `score : ${score}`;
});
handGesture.on("swipeleft", function (e) {

    game.leftMove();
    scoreMessage.innerHTML = `score : ${score}`;
});
handGesture.on("swiperight", function (e) {
    game.rightMove();
    scoreMessage.innerHTML = `score : ${score}`;
});


// class Object
function gameRun(container) {
    // constructor
    this.container = container;
    this.tiles = new Array(16);
}

// build class object function
gameRun.prototype.init = function () {
    this.clearContainer();
    //console.log(this.container)
    memory = [];
    for (let i = 0; i < this.tiles.length; i++) {
        let tile = this.newTile('0');
        this.setClassName(tile, '0', i);
        tile.setAttribute("index", i);
        this.container.appendChild(tile);
        this.tiles[i] = tile;
        memory.push('0');
    }
    this.randomTile();
    this.randomTile();
}

//to create a new tile in "html" with "div"
gameRun.prototype.newTile = function () {
    let tile = document.createElement("div");
    this.setTileVal(tile, "0");
    return tile;
}


//set value to each title 
gameRun.prototype.setTileVal = function (tile, val) {
    //add text in div
    if (val !== '0') tile.innerHTML = `${val}`;
    else tile.innerHTML = ' ';
}

//set/change Classname
gameRun.prototype.setClassName = function (tile, val, index) {
    tile.className = `tile tile${val}`;
}

//change tile name 
gameRun.prototype.change = function (tile, val) {
    this.setClassName(tile, val, tile.getAttribute("index"));
    this.setTileVal(tile, val);
}
gameRun.prototype.exchange = function (index1, tile1, val1, index2, tile2, val2) {
    gameRun.prototype.change(tile1, val1);
    gameRun.prototype.change(tile2, val2);
    memory[index1] = JSON.stringify(~~val1);
    memory[index2] = JSON.stringify(~~val2);
}

gameRun.prototype.clearContainer = function () {
    let size = this.container.childElementCount;
    if (size === 0) return;
    for (let i = size - 1; i >= 0; i--) {
        this.container.removeChild(container.childNodes[i]);
    }
}

gameRun.prototype.randomTile = function () {
    const rVal = Math.random() < 0.8 ? 2 : 4;
    let tempTiles = [];
    for (let i = 0; i < this.tiles.length; i++) {
        if (memory[i] === "0") {
            tempTiles.push(this.tiles[i]);
        }
    }

    const rPosition = ~~(Math.random() * tempTiles.length);
    this.change(tempTiles[rPosition], rVal);
    memory[tempTiles[rPosition].getAttribute("index")] = JSON.stringify(~~rVal);
    if (tempTiles.length === 1 && this.checkLost()) this.lost();
    //console.log(memory);
    //debugger;

}

gameRun.prototype.win = function () {
    message.innerHTML = "WIN";
    lock = true;

}

gameRun.prototype.lost = function () {
    message.innerHTML = "FAIL"
    lock = true;
}

gameRun.prototype.upMove = function () {
    let tiles = this.tiles;
    let moved = false;
    for (let col = 0; col < 4; col++) {
        for (let row = 0; row < 4; row++) {
            let index = col + row * 4, newVal = memory[index], checkIndex = index + 4, moveUpIndex = index;
            while (newVal !== '0' && checkIndex + 4 < 16 && memory[checkIndex] === '0') {
                checkIndex += 4;
            }
            //merge up
            if (newVal !== '0' && checkIndex < 16 && newVal === memory[checkIndex]) {
                newVal *= 2;
                score += newVal;
                moved = true;
                gameRun.prototype.exchange(index, tiles[index], newVal, checkIndex, tiles[checkIndex], '0');
            }
            if (~~newVal === WIN) this.win();
            //find move up index
            while (newVal !== '0' && moveUpIndex - 4 >= 0 && memory[moveUpIndex - 4] === '0') {
                moveUpIndex -= 4;
            }
            if (newVal !== '0' && moveUpIndex >= 0 && moveUpIndex !== index) {
                moved = true;
                gameRun.prototype.exchange(moveUpIndex, tiles[moveUpIndex], memory[index], index, tiles[index], '0');
            }
        }
    }
    if (moved) this.randomTile();
}


gameRun.prototype.downMove = function () {
    let tiles = this.tiles;
    let moved = false;
    for (let col = 0; col < 4; col++) {
        for (let row = 3; row >= 0; row--) {
            let index = col + row * 4, newVal = memory[index], checkIndex = index - 4, moveDownIndex = index;
            while (newVal !== '0' && checkIndex - 4 >= 0 && memory[checkIndex] === '0') {
                checkIndex -= 4;
            }
            //merge down
            if (newVal !== '0' && checkIndex >= 0 && newVal === memory[checkIndex]) {
                newVal *= 2;
                score += newVal;
                moved = true;
                gameRun.prototype.exchange(index, tiles[index], newVal, checkIndex, tiles[checkIndex], '0');

            }
            if (~~newVal === WIN) this.win();
            //find move down index
            while (newVal !== '0' && moveDownIndex + 4 < 16 && memory[moveDownIndex + 4] === '0') {
                moveDownIndex += 4;
            }
            if (newVal !== '0' && moveDownIndex >= 0 && moveDownIndex !== index) {
                moved = true;
                gameRun.prototype.exchange(moveDownIndex, tiles[moveDownIndex], memory[index], index, tiles[index], '0');
            }
        }
    }
    if (moved) this.randomTile();
}

gameRun.prototype.leftMove = function () {
    let tiles = this.tiles;
    let moved = false;
    for (let col = 0; col < 4; col++) {
        for (let row = 3; row >= 0; row--) {
            let index = col + row * 4, newVal = memory[index], checkIndex = index + 1, moveLeftindex = index;
            while (newVal !== '0' && checkIndex + 1 < 4 + row * 4 && memory[checkIndex] === '0') {
                checkIndex += 1;
            }
            //merge left
            if (newVal !== '0' && checkIndex < 4 + row * 4 && newVal === memory[checkIndex]) {
                newVal *= 2;
                score += newVal;
                moved = true;
                gameRun.prototype.exchange(index, tiles[index], newVal, checkIndex, tiles[checkIndex], '0');
            }
            if (~~newVal === WIN) this.win();
            //find move left index
            while (newVal !== '0' && moveLeftindex - 1 >= row * 4 && memory[moveLeftindex - 1] === '0') {
                moveLeftindex -= 1;
            }
            if (newVal !== '0' && moveLeftindex >= row * 4 && moveLeftindex !== index) {
                moved = true;
                gameRun.prototype.exchange(moveLeftindex, tiles[moveLeftindex], memory[index], index, tiles[index], '0');
            }
        }
    }
    if (moved) this.randomTile();
}


gameRun.prototype.rightMove = function () {
    let tiles = this.tiles;
    let moved = false;
    for (let col = 3; col >= 0; col--) {
        for (let row = 3; row >= 0; row--) {
            let index = col + row * 4, newVal = memory[index], checkIndex = index - 1, moveRightIndex = index;
            while (newVal !== '0' && checkIndex - 1 >= row * 4 && memory[checkIndex] === '0') {
                checkIndex -= 1;
            }
            //merge right
            if (newVal !== '0' && checkIndex >= row * 4 && newVal === memory[checkIndex]) {
                newVal *= 2;
                score += newVal;
                moved = true;
                gameRun.prototype.exchange(index, tiles[index], newVal, checkIndex, tiles[checkIndex], '0');
            }
            if (~newVal === WIN) this.win();
            //find move right index
            while (newVal !== '0' && moveRightIndex + 1 < row * 4 + 4 && memory[moveRightIndex + 1] === '0') {
                moveRightIndex += 1;
            }
            if (newVal !== '0' && moveRightIndex < row * 4 + 4 && moveRightIndex !== index) {
                moved = true;
                gameRun.prototype.exchange(moveRightIndex, tiles[moveRightIndex], memory[index], index, tiles[index], '0');
            }
        }
    }
    if (moved) this.randomTile();
}

gameRun.prototype.checkLost = function () {
    let tiles = this.tiles;
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            let index = col + row * 4;
            if (memory[index] === '0' || index + 4 < 16 && memory[index + 4] === memory[index] || index + 1 < 4 + row * 4 && memory[index + 1] === memory[index]) {
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
    // built the score
    scoreMessage = document.getElementById("score");
    startBtn.onclick = function () {
        lock = false;
        game = new gameRun(container);
        game.init();
        message.innerHTML = "";
        score = 0;
        scoreMessage.innerHTML = `score : ${0}`;
    };

}


window.onkeydown = function (e) {
    //For IE, Chrome
    if (window.event) {
        keynum = e.keyCode;
    } else if (e.which) {
        keynum = e.which;
    }
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
        scoreMessage.innerHTML = `score : ${score}`;
    }
}