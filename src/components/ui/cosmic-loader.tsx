
import React, { useEffect, useRef } from 'react';

export const CosmicLoader = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 200;
    canvas.height = 200;
    
    const particles: Particle[] = [];
    const particleCount = 100;
    let angle = 0;
    
    class Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      speed: number;
      theta: number;
      distance: number;

      constructor() {
        this.distance = Math.random() * 50 + 20;
        this.theta = Math.random() * Math.PI * 2;
        this.x = canvas.width / 2 + Math.cos(this.theta) * this.distance;
        this.y = canvas.height / 2 + Math.sin(this.theta) * this.distance;
        this.radius = Math.random() * 3 + 1;
        this.color = `hsl(${Math.random() * 60 + 200}, 100%, 50%)`;
        this.speed = Math.random() * 0.02 + 0.01;
      }

      update() {
        this.theta += this.speed;
        this.distance = Math.max(10, this.distance - 0.1);
        this.x = canvas.width / 2 + Math.cos(this.theta) * this.distance;
        this.y = canvas.height / 2 + Math.sin(this.theta) * this.distance;
        
        if (this.distance <= 10) {
          this.distance = 70;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      if (!ctx) return;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      angle += 0.05;
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(angle);
      
      // Draw central vortex
      const gradient = ctx.createRadialGradient(0, 0, 5, 0, 0, 30);
      gradient.addColorStop(0, '#4F46E5');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, 30, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="rounded-full shadow-lg"
        style={{
          background: 'black',
          boxShadow: '0 0 20px #4F46E5'
        }}
      />
    </div>
  );
};
