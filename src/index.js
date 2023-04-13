import './style.css';
import { createBoard} from './board'
import knightPiece from './knight.png'

createBoard()
const knightImg = new Image();
knightImg.src = knightPiece;
const targetSquare = (c, r) => {
    
    const square = document.getElementById(`${c}-${r}`);
    const knight = document.createElement('img');
    knight.classList.add('knight-piece');
    knight.setAttribute('src', knightImg.src)
    square.appendChild(knight)
}

const knightTravails = (start, end) => {
    const queue = [start];
    const visited = new Set();
    const parents = new Map();
    visited.add(start);
  
    while (queue.length > 0) {
      const curr = queue.shift();
      const [x, y] = curr.split("-").map(Number);
  
      if (curr === end) {
        const path = [end];
        let parent = parents.get(end);
        while (parent) {
          path.unshift(parent);
          parent = parents.get(parent);
        }
        return path;
      }
  
      for (const [dx, dy] of [
        [-1, -2],
        [-2, -1],
        [-2, 1],
        [-1, 2],
        [1, 2],
        [2, 1],
        [2, -1],
        [1, -2],
      ]) {
        const nextX = x + dx;
        const nextY = y + dy;
        const next = `${nextX}-${nextY}`;
  
        if (nextX >= 0 && nextX < 8 && nextY >= 0 && nextY < 8 && !visited.has(next)) {
          queue.push(next);
          visited.add(next);
          parents.set(next, curr);
        }
      }
    }
  
    return null;
  };

  const result = document.querySelector('.result');
  let counter = -1;

  const knightMove = (from, to) => {
    const startPosition = `${from[0]}-${from[1]}`;
    const endPosition = `${to[0]}-${to[1]}`; 
    const path = knightTravails(startPosition, endPosition);

    if (path) {
      let str = path.map(square => {
        const [x, y] = square.split("-").map(Number);
        targetSquare(x, y);
        let c = inverseConvert(x, y);
        return `[${c[0]}${c[1]}]`;
      }).join(" ");

      counter = path.length - 1;
      result.textContent = `> knightMoves( ${start.value} to ${end.value} ) => You made it in ${counter} moves! Here's your path: ${str}`;
    }
  };

  

const form = document.querySelector('form');
const start = document.getElementById('start');
const end = document.getElementById('end');
const startError = document.querySelector('#start + span.error');
const endError = document.querySelector('#end + span.error');

start.addEventListener('input', () => {
  if (start.value.length >= 2 && !start.checkValidity()) {
    showError();
  } else {
    startError.textContent = '';
    startError.className = 'error';
  }
});
end.addEventListener('input', () => {
  if (end.value.length >= 2 && !end.checkValidity()) {
    showError();
  } else {
    endError.textContent = '';
    endError.className = 'error';
  }
});

form.addEventListener('submit', (event) => {
  if (!start.checkValidity()) {
    showError();
    event.preventDefault();
  } else if (!end.checkValidity()) {
    showError();
    event.preventDefault();
  } else {
    let startMove = convert(start.value);
    let endMove = convert(end.value);
    knightMove(startMove , endMove); 
    start.disabled = true;
    end.disabled = true;
  document.getElementById('move').disabled = true;
    event.preventDefault();
  }
  
});
const showError = () => {
  if (start.validity.valueMissing) {
    startError.textContent = "Enter a starting position.";
  } 
  else if (start.validity.patternMismatch) {
    startError.textContent = "Enter a valid position";
  } else if (end.validity.valueMissing) {
    endError.textContent = "Enter a target position.";
  } 
  else if (end.validity.patternMismatch) {
    endError.textContent = "Enter a valid position";
  }
}

const convert = (square) => {
  let letter = square[0].toLowerCase();
  let number = parseInt(square[1]) - 1 ;
  letter = letter.charCodeAt() - 97;
  return [letter, number];
}

const inverseConvert = (character, digit) => {
  let letter = String.fromCharCode(character + 97);
  let number = digit + 1;
  return [letter, number];
}

const reload = document.getElementById('reset');
reload.addEventListener('click', () => {
  location.reload();
})