import './style.css';
import Game from './Game';
import goblinImg from './goblin.png';

const game = new Game('game-container', goblinImg);
game.init();