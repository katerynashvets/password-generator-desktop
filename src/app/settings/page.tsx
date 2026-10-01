'use client';
import { FormikErrors, useFormik } from 'formik';
import { useState } from 'react';
import { useTheme } from '../../components/ThemeProvider';
import { useSettingsStore } from '../../store/settingsStore';
import { SettingsType } from '../../types/Settings';

export default function Settings() {
  const { isDark, setIsDark } = useTheme();
  const settings = useSettingsStore((s) => s.settings);
  const saveSettings = useSettingsStore((s) => s.saveSettings);
  const [notification, setNotification] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<boolean>(false);

  const disableNotification = () => {
    setError(false);
    setConfirmation(false);
    setNotification('');
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: settings,
    validate: (values) => {
      const errors: FormikErrors<SettingsType> = {};

      if (
        !Number.isInteger(Number(values.defaultLength)) ||
        Number(values.defaultLength) < 8 ||
        Number(values.defaultLength) > 64
      ) {
        errors.defaultLength = 'Length must be between 8 and 64.';
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        await saveSettings(values);
        setNotification('Setting are updated successfully.');
        setConfirmation(true);
        setTimeout(() => disableNotification(), 3000);
      } catch {
        setNotification('Settings could not be saved');
        setError(true);
        setTimeout(() => disableNotification(), 3000);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className='relative' noValidate>
      {(error || confirmation) && (
        <div
          className={`absolute px-6 py-1 text-lg text-[#fcfcfe] rounded-lg right-[40%] ${error ? 'bg-[#e74542]' : confirmation ? 'bg-[#6cc681]' : 'bg-[#ffb305]'}`}
        >
          {notification}
        </div>
      )}

      <div className='flex justify-between items-center'>
        <div>
          <span className='block font-bold text-2xl'>Settings</span>
          <span className='block text-lg text-[var(--text-secondary)] my-1'>
            Customize the default options and appearance.
          </span>
        </div>

        <button
          className='text-[var(--text-light)] bg-[var(--text-active)] py-2 xl:py-3 rounded-lg cursor-pointer px-10'
          type='submit'
        >
          Save
        </button>
      </div>

      <div className='px-10 shadow-sm border-1 border-[var(--border-container)] rounded-lg mt-5 py-5 text-lg'>
        <span className='font-semibold'>Default generation options</span>
        <div className='flex flex-col gap-1 xl:gap-2 mt-3 xl:mt-4'>
          <div className='flex justify-between items-center'>
            <span>Default length</span>
            <div className='flex flex-col items-end'>
              <input
                id='defaultLength'
                name='defaultLength'
                type='number'
                value={formik.values.defaultLength}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                max={64}
                min={8}
                aria-invalid={Boolean(formik.errors.defaultLength)}
                aria-describedby='defaultLength-error'
                className='border-1 border-[var(--border-container)] rounded-lg w-12 px-2 py-2 flex'
              />
              {formik.errors.defaultLength &&
                (formik.touched.defaultLength || formik.submitCount > 0) && (
                  <span
                    id='defaultLength-error'
                    className='mt-1 text-sm text-[#e74542]'
                  >
                    {formik.errors.defaultLength}
                  </span>
                )}
            </div>
          </div>

          <div className='flex justify-between items-center'>
            <span>Include uppercase letters (A-Z)</span>
            <label className='switch w-12 h-5 relative inline-block'>
              <input
                type='checkbox'
                name='includeUppercase'
                id='includeUppercase'
                checked={formik.values.includeUppercase}
                onChange={formik.handleChange}
                className='opacity-0 w-0 h-0'
              />
              <span className='slider absolute cursor-pointer rounded-[50px] bg-[var(--background-navi-secondary)]'></span>
            </label>
          </div>
          <div className='flex justify-between items-center'>
            <span>Include lowercase letters (a-z)</span>
            <label className='switch w-12 h-5 relative inline-block'>
              <input
                type='checkbox'
                name='includeLowercase'
                id='includeLowercase'
                checked={formik.values.includeLowercase}
                onChange={formik.handleChange}
                className='opacity-0 w-0 h-0'
              />
              <span className='slider absolute cursor-pointer rounded-[50px] bg-[var(--background-navi-secondary)]'></span>
            </label>
          </div>
          <div className='flex justify-between items-center'>
            <span>Include numbers (0-9)</span>
            <label className='switch w-12 h-5 relative inline-block'>
              <input
                type='checkbox'
                name='includeNumbers'
                id='includeNumbers'
                checked={formik.values.includeNumbers}
                onChange={formik.handleChange}
                className='opacity-0 w-0 h-0'
              />
              <span className='slider absolute cursor-pointer rounded-[50px] bg-[var(--background-navi-secondary)]'></span>
            </label>
          </div>
          <div className='flex justify-between items-center'>
            <span>Include symbols (!@#$%^&*)</span>
            <label className='switch w-12 h-5 relative inline-block'>
              <input
                type='checkbox'
                name='includeSymbols'
                id='includeSymbols'
                checked={formik.values.includeSymbols}
                onChange={formik.handleChange}
                className='opacity-0 w-0 h-0'
              />
              <span className='slider absolute cursor-pointer rounded-[50px] bg-[var(--background-navi-secondary)]'></span>
            </label>
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
              type='button'
              className={`py-2 px-3 flex items-center gap-3 ${isDark ? 'bg-[var(--background-selected)] text-[#5b66db] rounded-l-lg border-r-1 border-r-[#727282]' : ' text-[var(--text-primary)]'}`}
              onClick={() => (
                setIsDark(true),
                formik.setFieldValue('theme', 'dark')
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
                className='lucide lucide-moon-star-icon lucide-moon-star'
              >
                <path d='M18 5h4' />
                <path d='M20 3v4' />
                <path d='M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401' />
              </svg>
              <span>Dark</span>
            </button>
            <button
              type='button'
              className={`py-2 px-3 flex items-center gap-3 ${isDark ? 'text-[var(--text-primary)] bg-[var(--background-navi)] rounded-r-lg' : 'bg-[var(--background-navi)] text-[#5b66db] rounded-r-lg border-1 border-[#e6e7f7]'} `}
              onClick={() => (
                setIsDark(false),
                formik.setFieldValue('theme', 'light')
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
    </form>
  );
}
