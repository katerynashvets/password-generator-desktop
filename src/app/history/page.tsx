import Password from '../../components/Password';

export default function History() {
  return (
    <div className=''>
      <span className='block font-bold text-2xl'>History</span>
      <span className='block text-lg text-[var(--text-secondary)] my-1'>
        You recently generated passwords. They are stored only on this device.
      </span>
      <div className='px-5 shadow-sm border-1 border-[var(--border-container)] rounded-lg mt-5'>
        <div className='flex justify-between my-6 px-2 items-center'>
          <div className='flex gap-2 text-[var(--text-red)] text-lg cursor-pointer'>
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
              className='lucide lucide-trash2-icon lucide-trash-2'
            >
              <path d='M10 11v6' />
              <path d='M14 11v6' />
              <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6' />
              <path d='M3 6h18' />
              <path d='M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
            </svg>
            <span>Clear all</span>
          </div>
          <div className='flex gap-2 text-[var(--text-secondary)] border-1 border-[var(--border-container)] rounded-lg w-[40%] xl:w-[30%] px-2 py-2'>
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
              className='lucide lucide-search-icon lucide-search'
            >
              <path d='m21 21-4.34-4.34' />
              <circle cx='11' cy='11' r='8' />
            </svg>
            <span>Search</span>
          </div>
        </div>
        <div className='flex flex-col gap-2 mb-5'>
          <Password name='pL8#ZsQ!x2@HfN7mKc1' time='Just now' />
          <Password name='pL8#ZsQ!x2@HfN7mKc2' time='Just now' />
          <Password name='pL8#ZsQ!x2@HfN7mKc3' time='Just now' />
          <Password name='pL8#ZsQ!x2@HfN7mKc4' time='Just now' />
        </div>
      </div>
    </div>
  );
}
