'use client';

import Switch from '@mui/material/Switch';
import { useTheme } from '../../components/ThemeProvider';

export default function Settings() {
  const { isDark, setIsDark } = useTheme();
  const label = { slotProps: { input: { 'aria-label': 'Color switch demo' } } };
  return (
    <div className=''>
      <div className='flex justify-between items-center'>
        <div>
          <span className='block font-bold text-2xl'>Settings</span>
          <span className='block text-lg text-[var(--text-secondary)] my-1'>
            Customize the default options and appearance.
          </span>
        </div>

        <button className='text-[var(--text-light)] bg-[var(--text-active)] py-2 xl:py-3 rounded-lg cursor-pointer px-10'>
          Save
        </button>
      </div>

      <div className='px-10 shadow-sm border-1 border-[var(--border-container)] rounded-lg mt-5 py-5 text-lg'>
        <span className='font-semibold'>Default generation options</span>
        <div className='flex flex-col gap-1 xl:gap-2 mt-3 xl:mt-4'>
          <div className='flex justify-between items-center'>
            <span>Default length</span>
            <input
              type='number'
              defaultValue={12}
              max={64}
              min={8}
              className='border-1 border-[var(--border-container)] rounded-lg w-16 px-2 py-2 flex'
            />
          </div>
          <div className='flex justify-between items-center'>
            <span>Include uppercase letters (A-Z)</span>
            <Switch {...label} defaultChecked />
          </div>
          <div className='flex justify-between items-center'>
            <span>Include lowercase letters (a-z)</span>
            <Switch {...label} defaultChecked />
          </div>
          <div className='flex justify-between items-center'>
            <span>Include numbers (0-9)</span>
            <Switch {...label} defaultChecked />
          </div>
          <div className='flex justify-between items-center'>
            <span>Include symbols (!@#$%^&*)</span>
            <Switch {...label} defaultChecked />
          </div>
          <div className='flex justify-between items-center'>
            <span>Exclude similar characters (e.g. O, 0, I, l)</span>
            <Switch {...label} defaultChecked />
          </div>
        </div>
      </div>
      <div className='px-10 shadow-sm border-1 border-[var(--border-container)] rounded-lg mt-5 py-5 text-lg'>
        <span className='font-semibold'>Appearance</span>
        <div className='flex justify-between items-center mt-2'>
          <span>Theme</span>
          <div
            className={`flex bg-[var(--background-navi-secondary)] rounded-lg text-[#64687b] ${isDark ? 'border-1 border-[#727282]' : ''}`}
          >
            <button
              className={`py-2 px-3 flex items-center gap-3 ${isDark ? 'bg-[var(--background-selected)] text-[#5b66db] rounded-l-lg border-r-1 border-r-[#727282]' : ' text-[var(--text-primary)]'}`}
              onClick={() => setIsDark(true)}
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
                className='lucide lucide-moon-star-icon lucide-moon-star'
              >
                <path d='M18 5h4' />
                <path d='M20 3v4' />
                <path d='M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401' />
              </svg>
              <span>Dark</span>
            </button>
            <button
              className={`py-2 px-3 flex items-center gap-3 ${isDark ? 'text-[var(--text-primary)] bg-[var(--background-navi)] rounded-r-lg' : 'bg-[var(--background-navi)] text-[#5b66db] rounded-r-lg border-1 border-[#e6e7f7]'} `}
              onClick={() => setIsDark(false)}
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
                className='lucide lucide-sun-medium-icon lucide-sun-medium'
              >
                <circle cx='12' cy='12' r='4' />
                <path d='M12 3v1' />
                <path d='M12 20v1' />
                <path d='M3 12h1' />
                <path d='M20 12h1' />
                <path d='m18.364 5.636-.707.707' />
                <path d='m6.343 17.657-.707.707' />
                <path d='m5.636 5.636.707.707' />
                <path d='m17.657 17.657.707.707' />
              </svg>
              <span>Light</span>
            </button>
          </div>
        </div>
      </div>
      <div className='px-10 shadow-sm border-1 border-[var(--border-container)] rounded-lg mt-5 py-5 text-lg'>
        <span className='font-semibold'>Other</span>
        <div className='flex flex-col gap-3 mt-2'>
          <div className='flex justify-between items-center'>
            <span>Clear history on exit</span>
            <Switch {...label} />
          </div>
        </div>
      </div>
    </div>
  );
}
