import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Password from '../components/Password';

export default function Home() {
  return (
    <div className='h-full flex flex-col gap-2'>
      <div>
        <span className='block font-bold text-2xl'>
          Generate a secure password
        </span>
        <span className='block text-lg text-[var(--text-secondary)] my-1'>
          Customize your password and generate a strong, random one.
        </span>
      </div>

      <div className='shadow-sm border-1 border-[var(--border-container)] rounded-md pt-6'>
        <div className='px-10 text-[var(--text-primary)] text-4xl py-6'>
          <div>pL8#ZsQ!x2@HfN7mKc9</div>
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
        <div className='w-full flex justify-between border-t-1 border-t-[var(--border-container)] px-10'>
          <div className='flex flex-col w-[30%] justify-center my-6 gap-2 border-r-1 border-r-[var(--border-container)]'>
            <span className='text-[var(--text-secondary)] text-lg'>Length</span>
            <span className='text-xl font-semibold'>24</span>
          </div>
          <div className='flex flex-col w-[30%] justify-center my-6 gap-2 border-r-1 border-r-[var(--border-container)]'>
            <span className='text-[var(--text-secondary)] text-lg '>
              Character types
            </span>
            <span className='text-xl font-semibold'>4/4</span>
          </div>
          <div className='flex flex-col w-[30%] justify-center my-6 gap-2'>
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
        <div className='w-[49%] h-full shadow-sm border-1 border-[var(--border-container)] rounded-md px-10 flex flex-col justify-around pb-5'>
          <span className='block font-bold text-lg'>Options</span>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <span>Length</span>
              <input
                type='number'
                defaultValue={12}
                className='border-1 border-[var(--border-container)] rounded-lg w-9 py-[1px] flex'
              />
            </div>
            <div className='w-[50%]'>
              <Box sx={{ width: '100%' }}>
                <Slider
                  aria-label='Small steps'
                  defaultValue={12}
                  step={1}
                  marks
                  min={8}
                  max={64}
                  valueLabelDisplay='auto'
                />
              </Box>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-4'>
              <input type='checkbox' className='w-4 h-4' />{' '}
              <span>Include uppercase letters (A-Z)</span>
            </div>
            <div className='flex items-center gap-4'>
              <input type='checkbox' className='w-4 h-4' />{' '}
              <span>Include lowercase letters (a-z)</span>
            </div>
            <div className='flex items-center gap-4'>
              <input type='checkbox' className='w-4 h-4' />{' '}
              <span>Include numbers (0-9)</span>
            </div>
            <div className='flex items-center gap-4'>
              <input type='checkbox' className='w-4 h-4' />{' '}
              <span>Include symbols (!@#$%^&*)</span>
            </div>
          </div>
          <button className='flex items-center gap-4 text-[var(--text-light)] bg-[var(--text-active)] w-full py-3 flex justify-center rounded-lg'>
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
        <div className='w-[49%] h-full shadow-sm border-1 border-[var(--border-container)] rounded-md pt-4 px-10 flex flex-col gap-5'>
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
