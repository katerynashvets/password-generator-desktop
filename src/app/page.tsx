'use client';

import { useState } from 'react';
import Password from '../components/Password';
import { passGenerator } from '../helper/passGenerator';
import { PasswordType } from '../types/Password';

export default function Home() {
  const [length, setLength] = useState<number>(16);
  const [upperCase, setUpperCase] = useState<boolean>(true);
  const [lowerCase, setLowerCase] = useState<boolean>(true);
  const [numbers, setNumbers] = useState<boolean>(true);
  const [symbols, setSymbols] = useState<boolean>(true);
  const [charTypes, setCharTypes] = useState<number>(4);
  const [result, setResult] = useState<PasswordType>(
    passGenerator({
      length,
      upperCase,
      lowerCase,
      numbers,
      symbols,
    }),
  );

  const charsTypesCalc = () => {
    const charTypes = [upperCase, lowerCase, numbers, symbols];
    const result = charTypes.filter((type) => type == true).length;
    setCharTypes(result);
  };

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

      <div className='shadow-sm border-1 border-[var(--border-container)] rounded-md pt-4  xl:pt-6'>
        <div className='px-5 xl:px-10 text-[var(--text-primary)] text-4xl py-4 xl:py-6'>
          <div>{result.name}</div>
          <div className='flex items-center gap-1 mt-10'>
            <div className='w-20 rounded-xl h-2 bg-[#6cc681]'></div>
            <div className='w-20 rounded-xl h-2 bg-[#6cc681]'></div>
            <div className='w-20 rounded-xl h-2 bg-[#6cc681]'></div>
            <div className='w-20 rounded-xl h-2 bg-[#6cc681]'></div>
            <div className='w-20 rounded-xl h-2 bg-[#6cc681]'></div>
            <div className='w-20 rounded-xl h-2 bg-[#6cc681]'></div>
            <div className='w-20 rounded-xl h-2 bg-[#d5e4e0]'></div>
            <div className='text-base text-[var(--text-green)] font-semibold ml-4'>
              Strong
            </div>
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
            <span className='text-xl text-[var(--text-green)] font-semibold'>
              Very strong
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
              <input
                type='number'
                defaultValue={length}
                className='border-1 border-[var(--border-container)] rounded-lg w-12 py-[1px] flex'
              />
            </div>
            <div className='w-[50%]'>
              <input
                type='range'
                aria-label='Password length'
                defaultValue={length}
                onChange={(event) => setLength(Number(event.target.value))}
                step={1}
                min={8}
                max={64}
                className='w-full accent-[var(--text-active)]'
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 text-lg xl:text-xl'>
            <div className='flex items-center gap-4'>
              <input
                type='checkbox'
                className='w-4 h-4'
                checked={lowerCase}
                onChange={() => setLowerCase(!lowerCase)}
              />{' '}
              <span>Include lowercase letters (a-z)</span>
            </div>
            <div className='flex items-center gap-4'>
              <input
                type='checkbox'
                className='w-4 h-4'
                checked={upperCase}
                onChange={() => setUpperCase(!upperCase)}
              />{' '}
              <span>Include uppercase letters (A-Z)</span>
            </div>
            <div className='flex items-center gap-4'>
              <input
                type='checkbox'
                className='w-4 h-4'
                checked={numbers}
                onChange={() => setNumbers(!numbers)}
              />{' '}
              <span>Include numbers (0-9)</span>
            </div>
            <div className='flex items-center gap-4'>
              <input
                type='checkbox'
                className='w-4 h-4'
                checked={symbols}
                onChange={() => setSymbols(!symbols)}
              />{' '}
              <span>Include symbols (!@#$%^&*)</span>
            </div>
          </div>
          <button
            className='flex items-center gap-4 text-[var(--text-light)] bg-[var(--text-active)] w-full py-2 xl:py-3 flex justify-center rounded-lg cursor-pointer'
            onClick={() => (
              setResult(
                passGenerator({
                  length,
                  upperCase,
                  lowerCase,
                  numbers,
                  symbols,
                }),
              ),
              charsTypesCalc()
            )}
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
