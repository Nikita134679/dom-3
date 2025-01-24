export default class Goblin {
    constructor(imageSrc) {
      this.imageSrc = imageSrc;
      this.image = null;
      this.currentCell = null;
    }
  
    createGoblin() {
      this.image = document.createElement('img');
      this.image.src = this.imageSrc;
      this.image.alt = 'Goblin';
      this.image.classList.add('goblin');
    }
  
    moveToCell(cell) {
      if (this.currentCell) {
        this.currentCell.innerHTML = ''; // Убираем гоблина из текущей клетки
      }
      cell.appendChild(this.image); // Добавляем гоблина в новую клетку
      this.currentCell = cell;
    }
  
    removeGoblin() {
      if (this.currentCell) {
        this.currentCell.innerHTML = ''; // Убираем гоблина
        this.currentCell = null;
      }
    }
  }
  