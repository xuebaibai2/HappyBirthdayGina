import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { TimeElapse } from './TimeElapse';

const LoveWords = () => {
  const together = new Date('2022-03-15T21:02:00');
  const canvasRef = useRef(null);
  const merrywrapRef = useRef(null);
  const giftBoxRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [fireworks, setFireworks] = useState([]);
  const [particles, setParticles] = useState([]);
  const [merrywrap, setMerrywrap] = useState('merrywrap');
  const [days, setDays] = useState(TimeElapse(together));
  var stepMinutes = [2000, 2000, 1000, 1000];
  let step = 1;

  const cw = window.innerWidth;
  const ch = window.innerHeight;

  let hue = 120,
  limiterTotal = 5,
  limiterTick = 0,
  timerTotal = 80,
  timerTick = 0,
  mousedown = false,
  mx,
  my;

  setInterval(() => {
    setDays(TimeElapse(together));
  }, 1000);

  useEffect(() => {
    setCtx(canvasRef.current.getContext('2d'));
    requestAnimFrame();
  }, []);

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function calculateDistance(p1x, p1y, p2x, p2y) {
    var xDistance = p1x - p2x,
    yDistance = p1y - p2y;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  }

  function createParticles(x, y) {
    // increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
    var particleCount = 30;
    while (particleCount--) {
      // particles.push(new Particle(x, y));
      setParticles([...particles, new Particle(x, y)]);
    }
  }

  const requestAnimFrame = () => {
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  };

  function loop() {
    // this function will run endlessly with requestAnimationFrame
    // window.requestAnimationFrame(loop);
    // requestAnimFrame(loop);
    
    // increase the hue to get different colored fireworks over time
    hue += 0.5;
  
    // normally, clearRect() would be used to clear the canvas
    // we want to create a trailing effect though
    // setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
    ctx.globalCompositeOperation = 'destination-out';
    // decrease the alpha property to create more prominent trails
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, cw, ch);
    // change the composite operation back to our main mode
    // lighter creates bright highlight points as the fireworks and particles overlap each other
    ctx.globalCompositeOperation = 'lighter';
    // loop over each firework, draw it, update it
    var i = fireworks.length;
    while (i--) {
      fireworks[i].draw();
      fireworks[i].update(i);
    }
  
    // loop over each particle, draw it, update it
    var i = particles.length;
    while (i--) {
      particles[i].draw();
      particles[i].update(i);
    }
  
    // launch fireworks automatically to random coordinates, when the mouse isn't down
    if (timerTick >= timerTotal) {
      if (!mousedown) {
        // start the firework at the bottom middle of the screen, then set the random target coordinates, the random y coordinates will be set within the range of the top half of the screen
        // fireworks.push(new Firework(cw / 2, ch, random(0, cw), random(0, ch / 2)));
        var _fireworks = new Firework(cw / 2, ch, random(0, cw), random(0, ch / 2));
        console.log('_fireworks', _fireworks);
        setFireworks([...fireworks, _fireworks]);
        timerTick = 0;
      }
    } else {
      timerTick++;
    }
  
    // limit the rate at which fireworks get launched when mouse is down
    if (limiterTick >= limiterTotal) {
      if (mousedown) {
        // start the firework at the bottom middle of the screen, then set the current mouse coordinates as the target
        // fireworks.push(new Firework(cw / 2, ch, mx, my));
        setFireworks([...fireworks, new Firework(cw / 2, ch, mx, my)]);
        limiterTick = 0;
      }
    } else {
      limiterTick++;
    }
  }

 class Firework {
    constructor(sx, sy, tx, ty) {
      // actual coordinates
      this.x = sx;
      this.y = sy;
      // starting coordinates
      this.sx = sx;
      this.sy = sy;
      // target coordinates
      this.tx = tx;
      this.ty = ty;
      // distance from starting point to target
      this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
      this.distanceTraveled = 0;
      // track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
      this.coordinates = [];
      this.coordinateCount = 3;
      // populate initial coordinate collection with the current coordinates
      while (this.coordinateCount--) {
        this.coordinates.push([this.x, this.y]);
      }
      this.angle = Math.atan2(ty - sy, tx - sx);
      this.speed = 2;
      this.acceleration = 1.05;
      this.brightness = random(50, 70);
      // circle target indicator radius
      this.targetRadius = 1;
    }

    update = (index) => {
      // remove last item in coordinates array
      this.coordinates.pop();
      // add current coordinates to the start of the array
      this.coordinates.unshift([this.x, this.y]);

      // cycle the circle target indicator radius
      if (this.targetRadius < 8) {
        this.targetRadius += 0.3;
      } else {
        this.targetRadius = 1;
      }

      // speed up the firework
      this.speed *= this.acceleration;

      // get the current velocities based on angle and speed
      var vx = Math.cos(this.angle) * this.speed,
      vy = Math.sin(this.angle) * this.speed;
      // how far will the firework have traveled with velocities applied?
      this.distanceTraveled = calculateDistance(this.sx, this.sy, this.x + vx, this.y + vy);

      // if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
      if (this.distanceTraveled >= this.distanceToTarget) {
        createParticles(this.tx, this.ty);
        // remove the firework, use the index passed into the update function to determine which to remove
        const _fireworks = fireworks;
        _fireworks.splice(index, 1);
        setFireworks([_fireworks]);
      } else {
        // target not reached, keep traveling
        this.x += vx;
        this.y += vy;
      }
    };

    draw = () => {
      ctx.beginPath();
      // move to the last tracked coordinate in the set, then draw a line to the current x and y
      ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
      ctx.stroke();
    
      ctx.beginPath();
      // draw the target for this firework with a pulsing circle
      ctx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI * 2);
      ctx.stroke();
    };
  }

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      // track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
      this.coordinates = [];
      this.coordinateCount = 5;
      while (this.coordinateCount--) {
        this.coordinates.push([this.x, this.y]);
      }
      // set a random angle in all possible directions, in radians
      this.angle = random(0, Math.PI * 2);
      this.speed = random(1, 10);
      // friction will slow the particle down
      this.friction = 0.95;
      // gravity will be applied and pull the particle down
      this.gravity = 1;
      // set the hue to a random number +-20 of the overall hue variable
      this.hue = random(hue - 20, hue + 20);
      this.brightness = random(50, 80);
      this.alpha = 1;
      // set how fast the particle fades out
      this.decay = random(0.015, 0.03);
    }

    update = (index) => {
      // remove last item in coordinates array
      this.coordinates.pop();
      // add current coordinates to the start of the array
      this.coordinates.unshift([this.x, this.y]);
      // slow down the particle
      this.speed *= this.friction;
      // apply velocity
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed + this.gravity;
      // fade out the particle
      this.alpha -= this.decay;
    
      // remove the particle once the alpha is low enough, based on the passed in index
      if (this.alpha <= this.decay) {
        var _particles = particles;
        _particles.splice(index, 1);
        setParticles(_particles);
      }
    };

    draw = () => {
      ctx.beginPath();
      // move to the last tracked coordinates in the set, then draw a line to the current x and y
      ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
      ctx.stroke();
    }
  }
  
  function reveal() {
    loop();
  
    var w, h;
    if (window.innerWidth >= 1000) {
      w = 295;h = 185;
    } else
    {
      w = 255;h = 155;
    }
  
    // var ifrm = document.createElement("iframe");
    // ifrm.setAttribute("src", "https://www.youtube.com/embed/gbICivOO26U?controls=0&loop=1&autoplay=1");
    // //ifrm.style.width = `${w}px`;
    // //ifrm.style.height = `${h}px`;
    // ifrm.style.border = 'none';
    // document.querySelector('#video').appendChild(ifrm);
  }

  const openBox = () => {
    
    setMerrywrap(`merrywrap step-${step}`);
    if (step === 3) {
      merrywrapRef.current.style.backgroundColor = 'transparent';
    }
    if (step === 4) {
      reveal();
      return;
    }
    setTimeout(openBox, stepMinutes[step - 1]);
    step++;
  }

  return (
    <>
    <Helmet>
      <link rel="stylesheet" href="./css/LoveWords.css"></link>
    </Helmet>
    <div className='moon'>
            <div className='crater1'></div>
            <div className='crater2'></div>
            <div className='crater3'></div>
        </div>
        
        <canvas width={cw} height={ch} id="canvas" ref={canvasRef}></canvas>
        
        
        {/* <img src="https://dl.dropbox.com/s/2k0mtrxc2dqurmh/jumping.png" alt="Jumping-people" id="people" /> */}
        
        <div id="merrywrap" className={merrywrap} ref={merrywrapRef}>
            <div className="giftbox" ref={giftBoxRef} onClick={openBox}>
                <div className="cover">
                    <div></div>
                </div>
                
                <div className="box"></div>
            </div>
            
            <div className="icons">
                <div className="row">
                    <span>*</span>
                    <span>*</span>
                    <span>*</span>
                    <span>*</span>
                </div>
                <div className="row">
                    <span>生</span>
                    <span>日</span>
                    <span>快</span>
                    <span>乐</span>
                </div>
                <div className="row">
                    <span>*</span>
                    <span>*</span>
                    <span>*</span>
                    <span>*</span>
                </div>
                
            </div>
        </div>        
        <div id="video"></div>
        <div className="text-story">
        <div id="clock-box">
        <span>我们已经在一起...</span>
         第 <span className="digit"> {days.days} </span> 天 <span className='digit'> {days.hours} </span> 小时 <span className="digit">" {days.minutes} "</span> 分钟 <span className="digit"> {days.seconds} </span> 秒
        </div>
        </div>
    </>
  );
};

export default LoveWords;
