import Ball from './Ball.js';
import Paddle from './Paddle.js';

const ball = new Ball(document.getElementById('ball'));
const playerPaddle = new Paddle(document.getElementById('playerPaddle'));
const computerPaddle = new Paddle(document.getElementById('computerPaddle'));
const playerScore = document.getElementById('playerScore');
const computerScore = document.getElementById('computerScore');

let lastTime;
const update = (time) => {
	if (lastTime != null) {
		const delta = time - lastTime;

		ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
		computerPaddle.update(delta, ball.y);

		const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hue'));

		document.documentElement.style.setProperty('--hue', hue + delta * 0.01);

		if (isLose()) {
			handleLose();
		}
	}

	lastTime = time;
	requestAnimationFrame(update);
};

const isLose = () => {
	const rect = ball.rect();

	return rect.right >= innerWidth || rect.left <= 0;
};

const handleLose = () => {
	const rect = ball.rect();

	if (rect.right >= innerWidth) {
		playerScore.textContent = parseInt(playerScore.textContent) + 1;
	} else {
		computerScore.textContent = parseInt(computerScore.textContent) + 1;
	}

	ball.reset();
	computerPaddle.reset();
};

document.addEventListener('mousemove', (e) => {
	playerPaddle.position = (e.y / innerHeight) * 100;
});

requestAnimationFrame(update);
