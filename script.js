const board = document.querySelector('.board');
      let currentPlayer = 'x';
      let winner = null;
      let cells = [];

      function createBoard() {
        for (let i = 0; i < 9; i++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.addEventListener('click', cellClick);
          cells.push(cell);
          board.appendChild(cell);
        }
      }

      const resetButton = document.querySelector('#reset');
      resetButton.addEventListener('click', resetGame);

      function resetGame() {
        cells.forEach((cell) => {
          cell.textContent = '';
          cell.classList.remove('player-x', 'player-o', 'winner');
        });
        currentPlayer = 'x';
        winner = null;
      }

      function cellClick(e) {
        if (winner) return;
        const cell = e.target;
        if (cell.textContent !== '') return;
        cell.classList.add(`player-${currentPlayer}`);
        cell.textContent = currentPlayer;
        checkWin();
        switchPlayer();
      }

      function switchPlayer() {
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
      }

      function checkWin() {
        const winCombos = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < winCombos.length; i++) {
          const [a, b, c] = winCombos[i];
          if (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[b].textContent === cells[c].textContent
          ) {
            winner = currentPlayer;
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            alert(`Player ${currentPlayer} has won!`);
            break;
          }
        }
      }

      createBoard();