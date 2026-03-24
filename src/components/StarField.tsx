import { useEffect, useRef } from 'react';

interface Star {
    x: number;
    y: number;
    z: number;
    px: number;
    py: number;
}

const NUM_STARS = 180;
const SPEED = 6;

export default function StarField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;
        let W = window.innerWidth;
        let H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;

        const stars: Star[] = Array.from({ length: NUM_STARS }, () => ({
            x: (Math.random() - 0.5) * W,
            y: (Math.random() - 0.5) * H,
            z: Math.random() * W,
            px: 0,
            py: 0,
        }));

        function resetStar(s: Star) {
            s.x = (Math.random() - 0.5) * W;
            s.y = (Math.random() - 0.5) * H;
            s.z = W;
            s.px = 0;
            s.py = 0;
        }

        function draw() {
            ctx!.fillStyle = 'rgba(0, 0, 0, 0)';
            ctx!.clearRect(0, 0, W, H);

            const cx = W / 2;
            const cy = H / 2;

            for (const s of stars) {
                s.px = (s.x / s.z) * W + cx;
                s.py = (s.y / s.z) * H + cy;
                s.z -= SPEED;

                if (s.z <= 0 || s.px < 0 || s.px > W || s.py < 0 || s.py > H) {
                    resetStar(s);
                    continue;
                }

                const sx = (s.x / s.z) * W + cx;
                const sy = (s.y / s.z) * H + cy;
                const size = Math.max(0.4, (1 - s.z / W) * 2.5);
                const alpha = (1 - s.z / W);

                // Trail line
                ctx!.beginPath();
                ctx!.moveTo(s.px, s.py);
                ctx!.lineTo(sx, sy);
                ctx!.strokeStyle = `rgba(57, 255, 80, ${alpha * 0.6})`;
                ctx!.lineWidth = size * 0.8;
                ctx!.stroke();

                // Star dot with neon glow
                ctx!.beginPath();
                ctx!.arc(sx, sy, size, 0, Math.PI * 2);
                ctx!.fillStyle = `rgba(57, 255, 80, ${alpha})`;
                ctx!.shadowColor = '#39FF50';
                ctx!.shadowBlur = 8;
                ctx!.fill();
                ctx!.shadowBlur = 0;
            }

            animId = requestAnimationFrame(draw);
        }

        draw();

        const handleResize = () => {
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = W;
            canvas.height = H;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.45 }}
        />
    );
}
