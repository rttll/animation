import '/src/style.css';

const COLORS = [
  'red',
  'orange',
  'yellow',
  'lightgreen',
  'green',
  'blue',
  'indigo',
  'violet',
  'purple',
  'pink',
  'black',
];

class Cursor {
  constructor() {
    this._isActive = false;
    this.mouse = { x: 0, y: 0 };

    this.points = [];
    this._count = 10;
    this._radiusBase = 10;

    this._spring = 0.005;
    this._damping = 0.9;

    this._init();
    console.log('hi');
  }

  update() {
    const _updatePoint = (point, leader) => {
      // spring is amplified by index
      // points in the back spring back and forth for longer.
      const _stagger = 1; //point.id + 1 * 0.9;

      const { x: cvx, y: cvy } = point.v;
      let rx = cvx * 0.02;
      let ry = cvy * 0.02;
      if (rx === 0) rx = 1;
      if (ry === 0) ry = 1;

      point.v.x += (leader.x - point.x) * this._spring * _stagger + rx;
      point.v.y += (leader.y - point.y) * this._spring * _stagger + ry;

      point.v.x *= this._damping;
      point.v.y *= this._damping;

      point.x += point.v.x;
      point.y += point.v.y;
    };

    this.points.forEach((point) => {
      const leader = point.id === 0 ? this.mouse : this.points[point.id - 1];
      _updatePoint(point, leader);
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Loop backwards so first is on top.
    for (let i = this.points.length - 1; i >= 0; i--) {
      const point = this.points[i];
      this.ctx.fillStyle = point.color;
      this.ctx.beginPath();
      this.ctx.arc(point.x, point.y, this._radiusBase, 0, Math.PI * 2);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }

  loop() {
    if (!this._isActive) return;

    this.update();
    this.draw();
    requestAnimationFrame(this.loop.bind(this));
  }

  activate() {
    this._isActive = true;
    window.addEventListener('mousemove', this._onMouseMove.bind(this));
    this.loop();
  }

  deactivate() {
    this._isActive = false;
    window.removeEventListener('mousemove', this._onMouseMove.bind(this));
  }

  _onMouseMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  _init() {
    const canvas = document.createElement('canvas');
    canvas.id = 'cursor';
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1000';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '1';
    document.body.appendChild(canvas);

    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = 'black';

    for (let i = 0; i < this._count; i++) {
      this.points.push({
        id: i,
        x: 0,
        y: 0,
        v: { x: 0, y: 0 },
        color: COLORS[i % COLORS.length],
      });
    }

    this.activate();
    console.log('Cursor initialized');
  }
}

const c = new Cursor();
