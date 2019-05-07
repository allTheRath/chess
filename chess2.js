// 64 boxes
// Pawn 8 pieces
//Rooks 2 pieces
//knight 2 pieces
// 1 queen
// 1 king 
// all of the above for two players..
// total of 14 boxes at start for one player
// 64-28 36 places left..
// Board class has 64 objects with values with a x value and y value x value being 1 to 8 and y value being a to h
// adding background color from js:::--

class Board {
  constructor() {
    this.board = [];
    this.index = 1;
    this.boxesOfHtml = document.querySelectorAll('.box');
    let counter = 0;
    [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`].forEach((ele1) => {
      [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`].forEach((ele2) => {
        this.board.push(new Box(ele1, ele2, this.index));
        this.index++;
        this.boxesOfHtml[counter].setAttribute('data-x', ele1);
        this.boxesOfHtml[counter].setAttribute('data-y', ele2);
        counter++;
      });
    });

  }
  
  putPecies() {
    for(let element of this.board) {
      if((element.xValue == `2` ) || (element.xValue == `7`)) {
        element.piece = 'pawn';
        element.weight = 1;
      }
      if((element.xValue == `1`) || (element.xValue == `8`)) {
        switch(true) {
          case (element.yValue == 'a' || element.yValue == 'h'):
            element.piece = 'rook';
            element.weight = 8;
            break;
          case (element.yValue == 'b' || element.yValue == 'g'): 
            element.piece = 'knight';
            element.weight = 2.5;
            break;
          case (element.yValue == 'c' || element.yValue == 'f'):
            element.piece = 'bishop';
            element.weight = 7;
            break;
        }
        if(element.yValue == 'd' && element.xValue == `1`) {
          element.piece = 'queen';
          element.weight = 9;
        } else if(element.yValue == 'e' && element.xValue == '8') {
          element.piece = 'queen';
          element.weight = 9;
        }
        if(element.yValue == 'e' && element.xValue == `1`) {
          element.piece = 'king';
          element.weight = 2;
        } else if(element.yValue == 'd' && element.xValue == '8') {
          element.piece = 'king';
          element.weight = 2;
        }
        
      }
    }
    for(let element of this.board) {
      if(element.piece === undefined) {
        element.piece = '';
      }
    }
  }
}
class Box {

  constructor(x, y, z) {
    this.xValue = x;
    this.yValue = y;
    this.pie;
    this.weight = 0;
    this.position = z;
    
  }
}

// all boxes have to have a method to check 

// suppose player knows applicable moves..

class Option extends Board {
  constructor() {
    super();
    super.putPecies();
    this.player = [];
    this.player.push(new Player('Jay', 'White'));
    this.player.push(new Player('Darshan', 'Black'));
  }
}

class Player {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
}

//checks--
let kingsMove = false;

let option = new Option();
console.log(option.board);
console.log(option.player);
let counter = 0;
let boxes = document.body.querySelectorAll('.box');
for(let i = 0; i < boxes.length; i++) {
  boxes[i].setAttribute('data-position', i + 1);
  if(i === 1 || i % 8 === 0 || (i - 1) % 8 === 0) {
    boxes[i].setAttribute('data-position-noPawn', true);
  }
}

const objectPositions = [];
for(let i = 0; i < 64; i++) {
  if(boxes[i].childElementCount !== 0) {
    objectPositions[i + 1] = true;
  } else {
    objectPositions[i + 1] = false;
  }
}
console.log(objectPositions);

function changePecies(target) {
  if(document.body.querySelector('.open')) {
  if(counter == 0) {
    // player white
    counter = 1;
  } else {
    // player black
    counter = 0;
  }

  let temp = document.body.querySelector('.open');
  document.body.querySelector('.open').parentNode.removeChild(document.body.querySelector('.open'));
  if(target.classList.contains('show')) {
    target.parentNode.appendChild(temp);
    target.parentNode.removeChild(target);
  } else {
    // not peice .. empty..
    target.appendChild(temp);
  }

  if(document.body.querySelector('.open')) {
    document.body.querySelector('.open').classList.remove('open');
  }

  }
}

function pawn(from, to, typeFrom, typeTo) {
  if(typeFrom === 'white') {
    let temp1 = from;
    if(typeTo === 'empty') {
      if(temp1 + 8 == to) {
        return true;
      } else {
        return false;
      }
    } else if(typeTo === 'black') {
      if((temp1 + 9 == to)  || (temp1 + 7 == to)) {
        return true;
      } else {
        return false;
      }
    } else if(typeTo === 'white') {
      return false;
    }
  } else if(typeFrom === 'black') {
    let temp1 = from;
    if(typeTo === 'empty') {
      if(temp1 - 8 == to) {
        return true;
      } else {
        return false;
      }
    
   } else if(typeTo === 'white') {
      if((temp1 - 9 == to) || (temp1 - 7 == to)) {
        return true;
      } else {
        return false;
      }
    } 
  }
}

  function checkForRookRules(from, to, typeFromXValue, typeFromYValue, typeToXValue, typeToYValue) {
    if((typeFromXValue === typeToXValue) || (typeFromYValue === typeToYValue)) {
      if(typeFromXValue === typeToXValue) {
          let firstLimit = 0; 
          let lastLimit = 0;
          if(from > to) {
            firstLimit = to;
            lastLimit = from;
          } else {
            firstLimit = from;
            lastLimit = to;
          } 
          for(let i = firstLimit + 1; i < lastLimit; i++) {
            if(objectPositions[i] == true) {
              console.log(objectPositions[i]);
              return false;
            }
          }
        return true;
      } else if(typeFromYValue === typeToYValue) {
        let firstLimit = 0; 
        let lastLimit = 0;
        if(from > to) {
          firstLimit = to;
          lastLimit = from;
        } else {
          firstLimit = from;
          lastLimit = to;
        } 
        for(let i = firstLimit + 8; i < lastLimit; i = i+8) {
          if(objectPositions[i] == true) {
            console.log(objectPositions[i]);
            return false;
          }
        }
      return true;
    }

    } // till this is same for the half of queen
  }

  function rook(from, to, typeFrom, typeTo, typeFromXValue, typeFromYValue, typeToXValue, typeToYValue) {
    if(typeFrom === 'white') {
      console.log(typeFromXValue, typeFromYValue, "from x y");
      console.log(typeToXValue, typeToYValue, "to x y");
      let a = false;
      if(typeTo === 'empty') {
        a = checkForRookRules(from, to, typeFromXValue, typeFromYValue, typeToXValue, typeToYValue);
      } else if(typeTo === 'black') {
        a = checkForRookRules(from, to, typeFromXValue, typeFromYValue, typeToXValue, typeToYValue);
      } else if(typeTo === 'white') {
        return false;
      }
      return a;
    } else if(typeFrom === 'black') {
      let a = false;
      if(typeTo === 'empty') {
        a = checkForRookRules(from, to, typeFromXValue, typeFromYValue, typeToXValue, typeToYValue);
      } else if(typeTo === 'white') {
        a = checkForRookRules(from, to, typeFromXValue, typeFromYValue, typeToXValue, typeToYValue);
      } else if(typeTo === 'black') {
        return false;
      }
      return a;
  }
}

function checkForBishopRules(from, to, typeFromXValue, typeToXValue) {
  let returning = false;
  if(from > to) {
    if(to === (from - Math.abs(8*Math.abs(typeFromXValue - typeToXValue)) + Math.abs(typeFromXValue - typeToXValue)) || to === (from - Math.abs(8*Math.abs(typeFromXValue - typeToXValue) ) - Math.abs(typeFromXValue - typeToXValue))) {
      console.log('true main');
    let limit = Math.abs(typeFromXValue - typeToXValue);
      if(to === (from - Math.abs(8*Math.abs(typeFromXValue - typeToXValue)) + Math.abs(typeFromXValue - typeToXValue))) {
        console.log('true right');
        for(let i = limit; i > 1 ; i--) {
          let temp = (8*i - from) + i;
          if(objectPositions[temp] && (temp !== to)) {
            console.log(objectPositions[temp], temp);
            return false;
          }
        }
        returning = true;
      } else if(to === (from - Math.abs(8*Math.abs(typeFromXValue - typeToXValue)) - Math.abs(typeFromXValue - typeToXValue))) {
        console.log('true left');
        for(let i = limit; i > 1 ; i--) {
          let temp = (8*i - from) - i;
          if(objectPositions[temp] && (temp !== to)) {
            console.log(objectPositions[temp], temp);
            return false;
          }
        }
        returning = true;
      }
    } 
  } else if(from < to) {
    if(to === ((8*Math.abs(typeFromXValue - typeToXValue) + from) + Math.abs(typeFromXValue - typeToXValue)) || to === ((8*Math.abs(typeFromXValue - typeToXValue) + from) - Math.abs(typeFromXValue - typeToXValue))) {
      console.log('true main');
      let limit = Math.abs(typeFromXValue - typeToXValue);
      // return true;
      if(to === ((8*Math.abs(typeFromXValue - typeToXValue) + from) + Math.abs(typeFromXValue - typeToXValue))) {
        console.log('true right');
        for(let i = limit; i > 1 ; i--) {
          let temp = (8*i + from) + i;
          if(objectPositions[temp] && (temp !== to)) {
            console.log(objectPositions[temp], temp);
            return false;
          }
          
        }
        returning = true;

      } else if(to === ((8*Math.abs(typeFromXValue - typeToXValue) + from) - Math.abs(typeFromXValue - typeToXValue))) {
        console.log('true left');
        for(let i = limit; i > 1 ; i--) {
          let temp = (8*i + from) - i;
          if(objectPositions[temp] && (temp !== to)) {
            console.log(objectPositions[temp], temp);
            return false;
          }
        }
        returning = true;

      }
    }
  }
  return returning;
}

function bishop(from, to, typeFrom, typeTo, typeFromXValue, typeFromYValue, typeToXValue, typeToYValue) {

  //to = from+m || from-m
  // to = 8*abs(data-xfrom-data-xTO) +- (data-xfrom -tox) 
  // King can only move one place in any direction only if has a check..
  // position = currentPosition + 1 || + 8 || +9 || +7|| -1 || -7,-8,-9
  let a = undefined;
  if(typeFrom === 'white') {
    if(typeTo === 'black') {
      a = checkForBishopRules(from, to, typeFromXValue, typeToXValue);
    } else if(typeTo === 'empty') {
      a = checkForBishopRules(from, to, typeFromXValue, typeToXValue);
    } else if(typeTo === 'white') {
      a = false;
    }
  } else if(typeFrom === 'black') {
    if(typeTo === 'white') {
      a = checkForBishopRules(from, to, typeFromXValue, typeToXValue);
    } else if(typeTo === 'empty') {
      a = checkForBishopRules(from, to, typeFromXValue, typeToXValue);
    } else if(typeTo === 'black') {
      a = false;
    }
  }
  return a;
}

function checkForKingRules(from ,to) {
// position = currentPosition + 1 || + 8 || +9 || +7|| -1 || -7,-8,-9
  if(to === (from + 8) || to === (from + 9) || to === (from + 1) || to === (from - 1) || to === (from + 7) || to === (from -7) || to === (from - 8) || to === (from - 9)) {
    return true;
  }
}

function king(from, to, typeFrom, typeTo) {
  let a = undefined;
  if(typeFrom === 'white') {
    if(typeTo === 'black') {
      a = checkForKingRules(from ,to);
    } else if(typeTo === 'empty') {
      a = checkForKingRules(from ,to);
    } else if(typeTo === 'white') {
      return false;
    }
  } else if(typeFrom === 'black') {
    if(typeTo === 'white') {
      a = checkForKingRules(from ,to);
    } else if(typeTo === 'empty') {
      a = checkForKingRules(from ,to);
    } else if(typeTo === 'black') {
      return false;
    }
  }
  if(kingsMove == true) {
    return a;
  } else {
    return false;
  }
  
}

function checkForKnightRules(from ,to, typeFromXValue, typeToXValue, typeFromYValue, typeToYValue) {
// num + 10 = 32, num - 8 = 16, num - 17 = 5, num + 6 = 28, num + 15 = 37 , num + 17 = 39, num - 15 = 7, num - 10 = 12 
  if((to == from + 10 || to == from - 8 || to == from - 17 || to == from + 6 || to == from + 15 || to == from + 17 || to == from - 15 || to == from - 10 || to == from + 6 || to == from - 6) && (typeFromXValue !== typeToXValue) && (typeFromYValue !== typeToYValue)) {
    return true;
  }  
}

function knight(from, to, typeFrom, typeTo, typeFromXValue, typeToXValue, typeFromYValue, typeToYValue) {
  let a = undefined;
  if(typeFrom === 'white') {
    if(typeTo === 'black') {
      a = checkForKnightRules(from , to, typeFromXValue, typeToXValue, typeFromYValue, typeToYValue);
    } else if(typeTo === 'empty') {
      a = checkForKnightRules(from , to, typeFromXValue, typeToXValue, typeFromYValue, typeToYValue);
    } else if(typeTo === 'white') {
      return false;
    }
  } else if(typeFrom === 'black') {
    if(typeTo === 'white') {
      a = checkForKnightRules(from , to, typeFromXValue, typeToXValue, typeFromYValue, typeToYValue);
    } else if(typeTo === 'empty') {
      a = checkForKnightRules(from , to, typeFromXValue, typeToXValue, typeFromYValue, typeToYValue);
    } else if(typeTo === 'black') {
      return false;
    }
  }
  return a;
}

function ruleCheck(clickedE, previousE, none = true, check = false) {
  let elePAt;
  let typeFrom = 'empty';
  let typeFromXValue = undefined;
  let typeFromYValue = undefined;
  let typeToXValue = undefined;
  let typeToYValue = undefined;
  if(previousE.getAttribute('data-position')) {
    elePAt = previousE.getAttribute('data-position');
    typeFromXValue = previousE.getAttribute('data-x');
    typeFromYValue = previousE.getAttribute('data-y');
  } else {
    if(previousE.classList.contains('white')){
      typeFrom = 'white';
    } 
    if(previousE.classList.contains('black')){
      typeFrom = 'black';
    } 
    elePAt = previousE.parentNode.getAttribute('data-position');
    typeFromXValue = previousE.parentNode.getAttribute('data-x');
    typeFromYValue = previousE.parentNode.getAttribute('data-y');
  }
  let eleCAt = undefined;
  let typeTo = 'empty';
  if(clickedE.getAttribute('data-position')) {
    eleCAt = clickedE.getAttribute('data-position');  
    typeToXValue = clickedE.getAttribute('data-x');
    typeToYValue = clickedE.getAttribute('data-y'); 
  } else {
    eleCAt = clickedE.parentNode.getAttribute('data-position');
    typeToXValue = clickedE.parentNode.getAttribute('data-x');
    typeToYValue = clickedE.parentNode.getAttribute('data-y');
    if(clickedE.classList.contains('white')){
      typeTo = 'white';
    } 
    if(clickedE.classList.contains('black')){
      typeTo = 'black';
    }
  }

  if(check = true) {
    if(previousE.childElementCount !== 0) {
      if(previousE.children.classList.contains('white')) {
        typeFrom = 'white';
      } else if(previousE.children.classList.contains('black')) {
        typeFrom = 'black';
      }
    }
  }

  function optionUpdate(from, to) {
    if(none == true) {
      objectPositions[from] = false;
      objectPositions[to] = true;
    }
  }

  let peice = previousE.classList[0];
  let from = parseInt(elePAt);
  let to = parseInt(eleCAt);
  typeFromXValue = parseInt(typeFromXValue);
  typeToXValue = parseInt(typeToXValue);
  // for pawn..  
  console.log(from, to, typeFrom, typeTo);
  if(peice === 'pawn') {
    let a = pawn(from, to, typeFrom, typeTo);
    if(a) {
      optionUpdate(from, to);    
    }
    return a;
  }
  if(peice === 'rook') {
    let a = rook(from, to, typeFrom, typeTo, typeFromXValue, typeFromYValue, typeToXValue, typeToYValue);
    if(a) {
      optionUpdate(from, to);
    }
    return a;
  }
  if(peice === 'bishop') {
    let a = bishop(from, to, typeFrom, typeTo, typeFromXValue, typeFromYValue, typeToXValue, typeToYValue);
    if(a) {
      optionUpdate(from, to);
    }
    return a;
  }
  if(peice === 'queen') { // knowing that queen has rulset of rook and bishop //
    let a = bishop(from, to, typeFrom, typeTo, typeFromXValue, typeFromYValue, typeToXValue, typeToYValue);
    if(a == false) {
      a = rook(from, to, typeFrom, typeTo, typeFromXValue, typeFromYValue, typeToXValue, typeToYValue);
    }
    if(a) {
      optionUpdate(from, to);
    }
    return a;
  }
  if(peice === 'king') {
    let a = king(from, to, typeFrom, typeTo);
    if(a) {
      optionUpdate(from, to);
    }
    return a;
  }
  if(peice === 'knight') {
    let a = knight(from, to, typeFrom, typeTo, typeFromXValue, typeToXValue, typeFromYValue, typeToYValue);
    if(a) {
      optionUpdate(from, to);
    }
    return a;
  }
}

let checkForBlackKing = false;
let checkForWhiteKing = false;

document.body.addEventListener('click', function(click) {
  
  if(click.target.classList.contains('black') || click.target.classList.contains('.bk')) {
    // check for check--
    let clickedE = document.querySelector('.bk');
    if(checkForBlackKing) {
      let all = document.querySelectorAll('span');
      let a = false;
      for(let i = 0; i < all.length; i++) {
        let previousE = all[i];
        a = ruleCheck(clickedE, previousE, false, true);
       
      }
      if(a == false) {
        kingsMove = false;
        alert('Player White wins!');
        location.reload();
      } else {
        checkForBlackKing = false;
      }
    } else {
      let all = document.querySelectorAll('.white');
      for(let i = 0; i < all.length; i++) {
        let previousE = all[i];
        let peice = all[i].classList[0];
        let a = ruleCheck(clickedE, previousE, false);
        if(a) {
          alert(`Check by ${peice}`);
          kingsMove = true;
          // for black king;;
          checkForBlackKing = true;
        }
      }
    }
  } 
  
  if(click.target.classList.contains('white') || click.target.classList.contains('.wk')) {
     // check for check--
    let clickedE = document.querySelector('.wk');
    if(checkForWhiteKing) {
      let all = document.querySelectorAll('span');
      let a = false;
      for(let i = 0; i < all.length; i++) {
        let previousE = all[i];
        a = ruleCheck(clickedE, previousE, false, true);
      }
      if(a == false) {
        kingsMove = false;
        alert('Player Black wins!');
        location.reload();

      } else {
        checkForWhiteKing = false;
      }
    } else {
      let all = document.querySelectorAll('.black');
      for(let i = 0; i < all.length; i++) {
       let previousE = all[i];
       let peice = all[i].classList[0];
       let a = ruleCheck(clickedE, previousE, false);
       if(a) {
          alert(`Check by ${peice}`);
          kingsMove = true;
          checkForWhiteKing = true;
        }
      }   
    }
  }
});



document.querySelector('main').addEventListener('click', function(e) {
  if(document.querySelector('.bk') && document.querySelector('.wk')) {
    if(((e.target.classList.contains('white')) && (counter == 0)) || (e.target.classList.contains('black')) && (counter == 1)) {
      // white
      if(document.body.querySelector('.open')) {
        document.body.querySelector('.open').classList.remove('open');    
      }
      e.target.classList.add('open');

    }  else if(((!(e.target.classList.contains('black')) && !(e.target.classList.contains('white'))) && document.querySelector('.open')) || (e.target.classList.contains('show')) && document.querySelector('.open')) {
      // empty
      console.log(e.target);
      console.log(document.querySelector('.open'));

      if(ruleCheck(e.target, document.body.querySelector('.open'))) {
        //console.log('true');
        changePecies(e.target);
      }
      //    changePecies(e.target); only call it if 
    }    
  } else {
    if(!(document.querySelector('.bk'))) {
      alert('Player white wins');
      location.reload();
    } else if(!(document.querySelector('.wk'))){
      alert('Player black wins');
      location.reload();
    }
  }
});

let all = document.querySelectorAll('span');
for(let i = 0; i < all.length; i++) {
  if(parseInt(all[i].getAttribute('data-x')) % 2 == 0) {
    if(i % 2 == 0) {
      all[i].style.backgroundColor = 'gray';
    } else {
      all[i].style.backgroundColor = 'orange';
    }
  } else {
    if(i % 2 == 0) {
      all[i].style.backgroundColor = 'orange';
    } else {
      all[i].style.backgroundColor = 'grey';
    }
  }
}

// for win condition::--


// for pawn --
// can only aceess data-position + 8 and if a data-position is of black then can only minus eight position
// if there is oposition color then can access data-position +9 and +7 if there is noPawn true then can only 

// for rook --
// can only move to the positions +1 to +7 , -1 to -7 and +8 to +8*6 or -8 to -8*6 if there is another white or black element btwn first click and last click then wron move.


// knight-- position 58-- adding 15 or 17 or minusing 15 or 17
// test- 22 - posibles--32 , 16, 5, 28, 37, 39, 7, 12, 
// num + 10 = 32, num - 8 = 16, num - 17 = 5, num + 6 = 28, num + 15 = 37 , num + 17 = 39, num - 15 = 7, num - 10 = 12 

// bishop--- position is n then it can move to n + m where m is 8*level + level or - level
// level can be negative
// 21 -- 35 level 2 39
// 21 -- 12 / 14 level - 1
// if position is on boundry values then acordingly..

//to = from+m || from-m
// m = 8*data-x + data-x || 8*data-x - data-x 
// King can only move one place in any direction only if has a check..
// position = currentPosition + 1 || + 8 || +9 || +7|| -1 || -7,-8,-9

// it can have position add up to 8-currentPosition or minus upto 8-currentPosition
// it can have addition of multiple of 8 or minus of multiple of 8..
//it can have (position is n then it can move to n + m where m is 8*level + level or - level) level can be minus

// have to update to values in an object which have 1 to 64 with true or false values!!









// // dataset??
