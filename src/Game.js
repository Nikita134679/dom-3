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
    this.isGameOver = false; // Флаг окончания игры
  }

  init() {
    this.gameField.createField(); // Создаём поле
    this.goblin.createGoblin(); // Создаём гоблина
    this.startGame(); // Запускаем игру
    this.addClickListeners(); // Добавляем слушатели кликов
  }

  startGame() {
    this.intervalId = setInterval(() => {
      if (this.isGameOver) return; // Если игра завершена, не перемещаем гоблина

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
        if (this.isGameOver) return; // Не принимаем клики после окончания игры

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
      this.isGameOver = true; // Устанавливаем флаг окончания игры
      clearInterval(this.intervalId); // Останавливаем игру
      const missedShots = this.maxMisses - this.score; // Вычисляем промахи
      alert(`Игра окончена! Ваш счёт: ${this.score}\nПромахов: ${missedShots}`);
      this.resetGame();
    }
  }


  resetGame() {
    this.score = 0;
    this.misses = 0;
    this.isGameOver = false; // Сбрасываем флаг окончания игры
    this.updateScoreboard(); // Сбрасываем счётчики
    this.startGame(); // Перезапускаем игру
  }
}
