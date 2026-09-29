'use client';

import { useState } from 'react';
import { passGenerator } from '../helper/passGenerator';
import { calcPassStrength, calcPassStrengthEnum } from '../lib/strength';
import { PasswordType } from '../types/Password';
import Password from './Password';

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

export default function PasswordGenerator() {
  const [length, setLength] = useState<number>(16);
  const [upperCase, setUpperCase] = useState<boolean>(true);
  const [lowerCase, setLowerCase] = useState<boolean>(true);
  const [numbers, setNumbers] = useState<boolean>(true);
  const [symbols, setSymbols] = useState<boolean>(true);
  const [charTypes, setCharTypes] = useState<number>(4);
  const [result, setResult] = useState<PasswordType>(() =>
    passGenerator({ length, upperCase, lowerCase, numbers, symbols }),
  );
  const [change, setChange] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [showParticles, setShowParticles] = useState<boolean>(false);
  const [openPass, setOpenPass] = useState<boolean>(false);
  const [changeLength, setChangeLength] = useState<boolean>(true);
  const [poolsize, setPoolsize] = useState<number>(70);
  const [strength, setStrength] = useState<calcPassStrengthEnum>(
    calcPassStrength(length, poolsize),
  );

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.name);
    setCopied(true);
    setShowParticles(true);
    setTimeout(() => {
      setShowParticles(false);
    }, 600);
    setTimeout(() => setCopied(false), 1000);
  };

  const charsTypesCalc = () => {
    const charTypes = [upperCase, lowerCase, numbers, symbols];
    const result = charTypes.filter((type) => type == true).length;
    setCharTypes(result);
  };

  const calcPoolsize = () => {
    let res = 0;
    if (lowerCase) {
      res += 26;
    }
    if (upperCase) {
      res += 26;
    }
    if (numbers) {
      res += 10;
    }
    if (symbols) {
      res += 8;
    }
    setPoolsize(res);
  };

  const changePassLength = () => {
    if (length > 7 && length < 65) {
      calcPoolsize();
      setLength(length);
      setResult(
        passGenerator({
          length,
          upperCase,
          lowerCase,
          numbers,
          symbols,
        }),
      );
      charsTypesCalc();
      setOpenPass(false);
      setStrength(calcPassStrength(length, poolsize));
    } else {
      setChangeLength(false);
      setTimeout(() => setChangeLength(true), 2000);
    }
  };

  const handleChange = (
    value: boolean,
    setValue: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    const charTypes = [upperCase, lowerCase, numbers, symbols];
    const res = charTypes.filter((type) => type === false).length;
    if (value === true) {
      if (res === 3) {
        setChange(false);
        setTimeout(() => setChange(true), 2000);
      } else {
        setValue(!value);
      }
    } else {
      setValue(!value);
    }
  };

  const levels = [
    calcPassStrengthEnum.veryWeak,
    calcPassStrengthEnum.weak,
    calcPassStrengthEnum.reasonable,
    calcPassStrengthEnum.strong,
    calcPassStrengthEnum.veryStrong,
  ];
  const colors = [
    'bg-[#ff4100]',
    'bg-[#e74542]',
    'bg-[#ffb600]',
    'bg-[#6cc681]',
    'bg-[#54a36e]',
  ];
  const level = levels.indexOf(strength) + 1;

  return (
    <div className='h-full flex flex-col gap-2 justify-around'>
      <div>
        <span className='block font-bold text-2xl'>
          Generate a secure password
        </span>
        <span className='block text-lg text-[var(--text-secondary)] my-1'>
          Customize your password and generate a strong, random one.
        </span>
      </div>

      <div className='shadow-sm border-1 border-[var(--border-container)] rounded-md pt-4 xl:pt-6'>
        <div className='px-5 xl:px-10 text-[var(--text-primary)] text-4xl py-4 xl:py-6'>
          <div className='flex items-center gap-10 w-full pr-5'>
            <input
              className='w-[100%] overflow-x-auto focus:outline-none'
              id='result-name'
              value={result.name}
              type={openPass ? 'text' : 'password'}
              readOnly
            />
            <div className='flex'>
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
                  className='relative z-10 cursor-pointer flex items-center justify-center'
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='36'
                        height='36'
                        viewBox='0 0 36 36'
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
                        width='36'
                        height='36'
                        viewBox='0 0 36 36'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='lucide lucide-copy-icon lucide-copy '
                      >
                        <rect
                          width='14'
                          height='14'
                          x='8'
                          y='8'
                          rx='2'
                          ry='2'
                        />
                        <path d='M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' />
                      </svg>
                    </>
                  )}
                </button>
              </div>
              <button
                onClick={() => setOpenPass(!openPass)}
                className='h-full flex items-center justify-center'
              >
                {openPass ? (
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
                    className='lucide lucide-eye preview-icon'
                  >
                    <path d='M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0' />
                    <circle cx='12' cy='12' r='3' />
                  </svg>
                ) : (
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
                    className='lucide lucide-eye-closed preview-icon'
                  >
                    <path d='m15 18-.722-3.25' />
                    <path d='M2 8a10.645 10.645 0 0 0 20 0' />
                    <path d='m20 15-1.726-2.05' />
                    <path d='m4 15 1.726-2.05' />
                    <path d='m9 18 .722-3.25' />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div id='parent-div' className='flex items-center gap-1 mt-10'>
            {colors.map((_, index) => (
              <div
                key={index}
                className={`w-20 rounded-xl h-2 ${
                  index < level ? colors[level - 1] : 'bg-[#d5e4e0]'
                }`}
              />
            ))}
            <span
              className={`text-base font-semibold ml-4 ${strength === calcPassStrengthEnum.veryWeak ? 'text-[#ff4100]' : strength === calcPassStrengthEnum.weak ? 'text-[#e74542]' : strength === calcPassStrengthEnum.reasonable ? 'text-[#ffb600]' : strength === calcPassStrengthEnum.strong ? 'text-[#6cc681]' : 'text-[#54a36e]'}`}
            >
              {strength}
            </span>
          </div>
        </div>
        <div className='w-full flex justify-between border-t-1 border-t-[var(--border-container)] px-5 xl:px-10'>
          <div className='flex flex-col w-[30%] justify-center my-3 xl:my-6 gap-2 border-r-1 border-r-[var(--border-container)]'>
            <span className='text-[var(--text-secondary)] text-lg'>Length</span>
            <span className='text-xl font-semibold'>{result.name.length}</span>
          </div>
          <div className='flex flex-col w-[30%] justify-center my-3 xl:my-6 gap-2 border-r-1 border-r-[var(--border-container)]'>
            <span className='text-[var(--text-secondary)] text-lg '>
              Character types
            </span>
            <span className='text-xl font-semibold'>{charTypes}/4</span>
          </div>
          <div className='flex flex-col w-[30%] justify-center my-3 xl:my-6 gap-2'>
            <span className='text-[var(--text-secondary)] text-lg'>
              Estimated strength
            </span>
            <span
              className={`text-xl font-semibold ${strength === calcPassStrengthEnum.veryWeak ? 'text-[#ff4100]' : strength === calcPassStrengthEnum.weak ? 'text-[#e74542]' : strength === calcPassStrengthEnum.reasonable ? 'text-[#ffb600]' : strength === calcPassStrengthEnum.strong ? 'text-[#6cc681]' : 'text-[#54a36e]'}`}
            >
              {strength}
            </span>
          </div>
        </div>
      </div>
      <div className='flex justify-between h-[50%]'>
        <div className='w-[49%] h-full shadow-sm border-1 border-[var(--border-container)] rounded-md px-5 xl:px-10 flex flex-col justify-around pb-5'>
          <span className='block font-bold text-lg'>Options</span>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4 text-lg xl:text-xl'>
              <span>Length</span>
              <div className='flex'>
                <button
                  onClick={() => setLength(length - 1)}
                  className='cursor-pointer'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 20 20'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='lucide lucide-minus preview-icon'
                  >
                    <path d='M5 12h14' />
                  </svg>
                </button>
                <input
                  value={length}
                  className='w-12 text-center focus:outline-none'
                  type='number'
                  min={8}
                  max={64}
                  onChange={(e) => setLength(Number(e.target.value))}
                />
                <button
                  onClick={() => setLength(length + 1)}
                  className='cursor-pointer'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 20 20'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='lucide lucide-plus preview-icon'
                  >
                    <path d='M5 12h14' />
                    <path d='M12 5v14' />
                  </svg>
                </button>
              </div>
            </div>

            <div className='w-[50%]'>
              <input
                type='range'
                aria-label='Password length'
                value={length}
                onChange={(event) => setLength(Number(event.target.value))}
                step={1}
                min={8}
                max={64}
                className='w-full accent-[var(--text-active)]'
              />
            </div>
          </div>
          {!changeLength && (
            <span className='text-[var(--text-red)] text-sm'>
              Length nust be more then 8 and less than 64
            </span>
          )}

          <div className='flex flex-col gap-2 text-lg xl:text-xl'>
            <div className='flex items-center gap-4'>
              <input
                type='checkbox'
                className='w-4 h-4'
                checked={lowerCase}
                onChange={() => handleChange(lowerCase, setLowerCase)}
              />{' '}
              <span>Include lowercase letters (a-z)</span>
            </div>
            <div className='flex items-center gap-4'>
              <input
                type='checkbox'
                className='w-4 h-4'
                checked={upperCase}
                onChange={() => handleChange(upperCase, setUpperCase)}
              />{' '}
              <span>Include uppercase letters (A-Z)</span>
            </div>
            <div className='flex items-center gap-4'>
              <input
                type='checkbox'
                className='w-4 h-4'
                checked={numbers}
                onChange={() => handleChange(numbers, setNumbers)}
              />{' '}
              <span>Include numbers (0-9)</span>
            </div>
            <div className='flex items-center gap-4'>
              <input
                type='checkbox'
                className='w-4 h-4'
                checked={symbols}
                onChange={() => handleChange(symbols, setSymbols)}
              />{' '}
              <span>Include symbols (!@#$%^&*)</span>
            </div>
          </div>
          {!change && (
            <span className='text-sm text-[var(--text-red)]'>
              At least one character type must be selected.
            </span>
          )}
          <button
            className='flex items-center gap-4 text-[var(--text-light)] bg-[var(--text-active)] w-full py-2 xl:py-3 flex justify-center rounded-lg cursor-pointer'
            onClick={changePassLength}
          >
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
              className='lucide lucide-refresh-ccw-icon lucide-refresh-ccw'
            >
              <path d='M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' />
              <path d='M3 3v5h5' />
              <path d='M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16' />
              <path d='M16 16h5v5' />
            </svg>{' '}
            <span className='text-xl'>Generate</span>
          </button>
        </div>
        <div className='w-[49%] h-full shadow-sm border-1 border-[var(--border-container)] rounded-md pt-4 px-5 xl:px-10 flex flex-col gap-5'>
          <div className='flex items-center justify-between'>
            <span className='block font-bold text-lg'>Recent passwords</span>
            <button className='text-[var(--text-active)] font-medium cursor-pointer'>
              Clear
            </button>
          </div>
          <div className='flex flex-col gap-2 h-[80%]'>
            <Password name='pL8#ZsQ!x2@HfN7mKc9' time='Just now' />
            <Password name='pL8#ZsQ!x2@HfN7mKc9' time='Just now' />
            <Password name='pL8#ZsQ!x2@HfN7mKc9' time='Just now' />
            <Password name='pL8#ZsQ!x2@HfN7mKc9' time='Just now' />
          </div>
        </div>
      </div>
    </div>
  );
}
