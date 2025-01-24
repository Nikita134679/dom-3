import GameField from './GameField';
import Goblin from './Goblin';

export default class Game {
  constructor(containerId, goblinImage, maxMisses = 5) {
    this.gameField = new GameField(containerId);
    this.goblin = new Goblin(goblinImage);
    this.score = 0; // Количество успешных кликов
    this.misses = 0; // Количество пропущенных гоблинов
    this.maxMisses = maxMisses; // Лимит пропусков для завершения игры
    this.intervalId = null; // Таймер для перемещения гоблина
  }

  init() {
    this.gameField.createField(); // Создаём поле
    this.goblin.createGoblin(); // Создаём гоблина
    this.startGame(); // Запускаем игру
    this.addClickListeners(); // Добавляем слушатели кликов
  }

  startGame() {
    this.intervalId = setInterval(() => {
      const randomCell = this.gameField.getRandomCell(this.goblin.currentCell);

      this.goblin.moveToCell(randomCell);

      // Логика пропуска: увеличиваем счётчик пропущенных гоблинов
      if (this.goblin.currentCell) {
        this.misses += 1;
        this.updateScoreboard();
        this.checkGameOver();
      }
    }, 1000); // Гоблин перемещается каждые 1 сек
  }

  addClickListeners() {
    // Убедимся, что обработчики добавляются только один раз
    this.gameField.cells.forEach((cell) => {
      cell.addEventListener('click', () => {
        if (cell.contains(this.goblin.image)) {
          this.score += 1; // Увеличиваем счёт
          this.goblin.removeGoblin(); // Убираем гоблина
          this.updateScoreboard(); // Обновляем очки
        }
      });
    });
  }

  updateScoreboard() {
    // Обновляем очки и пропущенные попытки
    const scoreElement = document.getElementById('score');
    const missesElement = document.getElementById('misses');

    if (scoreElement) {
      scoreElement.textContent = `Очки: ${this.score}`;
    }
    if (missesElement) {
      missesElement.textContent = `Пропущено: ${this.misses}`;
    }
  }

  checkGameOver() {
    if (this.misses >= this.maxMisses) {
      clearInterval(this.intervalId); // Останавливаем игру
      alert(`Игра окончена! Ваш счёт: ${this.score}`);
      this.resetGame();
    }
  }

  resetGame() {
    this.score = 0;
    this.misses = 0;
    this.updateScoreboard(); // Сбрасываем счётчики
  }
}
