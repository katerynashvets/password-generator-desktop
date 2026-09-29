'use client';

import { useState } from 'react';
import { PasswordType } from '../types/Password';

const particles = [
  { x: -28, y: -24 },
  { x: -8, y: -34 },
  { x: 16, y: -30 },
  { x: 30, y: -12 },
  { x: 28, y: 18 },
  { x: 10, y: 32 },
  { x: -16, y: 28 },
  { x: -30, y: 10 },
];

export default function Password({ name, time }: PasswordType) {
  const [copied, setCopied] = useState<boolean>(false);
  const [showParticles, setShowParticles] = useState<boolean>(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(name);
    setCopied(true);
    setShowParticles(true);
    setTimeout(() => {
      setShowParticles(false);
    }, 600);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className='w-full flex justify-between items-center bg-[var(--background-item)] px-5 py-4 rounded-lg'>
      <p>{name}</p>
      <div className='flex gap-6 items-center'>
        <span className='text-[var(--text-secondary)]'>{time}</span>
        <div className='relative flex items-center justify-center'>
          {showParticles &&
            particles.map((particle, index) => (
              <span
                key={index}
                className='copy-particle'
                style={
                  {
                    '--x': `${particle.x}px`,
                    '--y': `${particle.y}px`,
                    animationDelay: `${index * 15}ms`,
                  } as React.CSSProperties
                }
              ></span>
            ))}

          <button
            className='relative z-10 cursor-pointer'
            onClick={copyToClipboard}
          >
            {copied ? (
              <>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='var(--text-green)'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='lucide lucide-check'
                >
                  <path d='M20 6 9 17l-5-5' />
                </svg>
              </>
            ) : (
              <>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='lucide lucide-copy-icon lucide-copy '
                >
                  <rect width='14' height='14' x='8' y='8' rx='2' ry='2' />
                  <path d='M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
