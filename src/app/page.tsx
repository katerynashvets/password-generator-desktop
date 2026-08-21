export default function Home() {
  return (
    <div>
      <span className='block font-bold text-2xl'>
        Generate a secure password
      </span>
      <span className='block text-lg text-[var(--text-secondary)] my-1'>
        Customize your password and generate a strong, random one.
      </span>
      <div className='shadow-sm border-1 border-[var(--border-container)] rounded-md pt-6 mt-6'>
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
    </div>
  );
}
