import React, { useEffect, useRef } from 'react';
import './MatrixBackground.css';

const CHARACTERS = {
  katakana:
    'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン',
  latin: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  nums: '0123456789',
};
const ALPHABET = CHARACTERS.katakana + CHARACTERS.latin + CHARACTERS.nums;
const FONT_SIZE = 16;
const COLOR_GRADIENT = {
  top: 'rgba(0, 255, 0, 0.9)',
  middle: 'rgba(0, 255, 0, 0.7)',
  bottom: 'rgba(0, 255, 0, 0.5)',
};

const RESET_PROBABILITY = 0.975;
const ANIMATION_SPEED_MS = 60;

const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix effect settings
    const columns = Math.floor(canvas.width / FONT_SIZE);
    const rainDrops: number[] = [];

    // Initialize rain drops with varying speeds
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = Math.random() * canvas.height;
    }

    const draw = () => {
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = COLOR_GRADIENT.top;
      context.font = FONT_SIZE + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = ALPHABET.charAt(
          Math.floor(Math.random() * ALPHABET.length)
        );

        const y = rainDrops[i] * FONT_SIZE;

        // Create gradient effect - brighter at the top, dimmer at the bottom
        // prettier-ignore
        const gradient = context.createLinearGradient(0, y - FONT_SIZE, 0, y + FONT_SIZE);
        gradient.addColorStop(0, COLOR_GRADIENT.top);
        gradient.addColorStop(0.5, COLOR_GRADIENT.middle);
        gradient.addColorStop(1, COLOR_GRADIENT.bottom);

        context.fillStyle = gradient;
        context.fillText(text, i * FONT_SIZE, y);

        if (
          rainDrops[i] * FONT_SIZE > canvas.height &&
          Math.random() > RESET_PROBABILITY
        ) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, ANIMATION_SPEED_MS);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-canvas" />;
};

export default MatrixBackground;
