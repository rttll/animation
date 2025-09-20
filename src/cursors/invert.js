import '/src/style.css';

const circle = document.querySelector('.circle');

function moveCircle(e) {
  const x = e.clientX;
  const y = e.clientY;

  circle.style.left = `${x - 25}px`;
  circle.style.top = `${y - 25}px`;
}

document.addEventListener('mousemove', moveCircle);
