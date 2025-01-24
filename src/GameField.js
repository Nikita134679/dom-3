export default class GameField {
    constructor(containerId, gridSize = 4) {
      this.container = document.getElementById(containerId);
      this.gridSize = gridSize;
      this.cells = [];
    }
  
    createField() {
      this.container.innerHTML = ''; // Очистка контейнера
      this.container.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr)`; // Сетка
  
      for (let i = 0; i < this.gridSize * this.gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        this.container.appendChild(cell);
        this.cells.push(cell);
      }
    }
  
    getRandomCell(excludeIndex = null) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * this.cells.length);
      } while (randomIndex === excludeIndex);
      return this.cells[randomIndex];
    }
  }
  