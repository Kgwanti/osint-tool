
import { useEffect, useRef } from 'react';
import { useTheme } from '@/components/ThemeProvider';

export const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: Star[] = [];
    const constellations: Constellation[] = [];
    const starCount = 300;

    class Star {
      x: number;
      y: number;
      size: number;
      brightness: number;
      twinkleSpeed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.brightness = Math.random() * 0.5 + 0.5;
        this.twinkleSpeed = 0.015 + Math.random() * 0.025;
      }

      update() {
        this.brightness += this.twinkleSpeed;
        if (this.brightness > 1 || this.brightness < 0) {
          this.twinkleSpeed = -this.twinkleSpeed;
        }
      }

      draw() {
        ctx!.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    class Constellation {
      stars: { x: number; y: number }[];
      alpha: number;
      fadeDirection: number;

      constructor() {
        this.stars = [];
        const numPoints = Math.floor(Math.random() * 5) + 3;
        for (let i = 0; i < numPoints; i++) {
          this.stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
          });
        }
        this.alpha = Math.random() * 0.5;
        this.fadeDirection = Math.random() > 0.5 ? 0.001 : -0.001;
      }

      update() {
        this.alpha += this.fadeDirection;
        if (this.alpha > 0.5 || this.alpha < 0) {
          this.fadeDirection = -this.fadeDirection;
        }
      }

      draw() {
        ctx!.strokeStyle = `rgba(255, 255, 255, ${this.alpha * 0.5})`;
        ctx!.beginPath();
        ctx!.moveTo(this.stars[0].x, this.stars[0].y);
        for (let i = 1; i < this.stars.length; i++) {
          ctx!.lineTo(this.stars[i].x, this.stars[i].y);
        }
        ctx!.closePath();
        ctx!.stroke();
      }
    }

    function init() {
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
      }
      for (let i = 0; i < 5; i++) {
        constellations.push(new Constellation());
      }
    }

    function animate() {
      ctx.fillStyle = theme === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      if (theme === 'dark') {
        stars.forEach(star => {
          star.update();
          star.draw();
        });
        
        constellations.forEach(constellation => {
          constellation.update();
          constellation.draw();
        });
      }
      
      requestAnimationFrame(animate);
    }

    init();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
    />
  );
};
