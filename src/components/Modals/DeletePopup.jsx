import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

import { classNames } from '../../utils/helper';

const DeletePopup = ({ open, setOpen, setDelete, title, message }) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-20' onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-20 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md'>
                <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                      <ExclamationTriangleIcon
                        className='h-6 w-6 text-red-600'
                        aria-hidden='true'
                      />
                    </div>
                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'>
                      <Dialog.Title
                        as='h3'
                        className='text-lg font-medium leading-6 text-gray-900'
                      >
                        Delete {title}
                      </Dialog.Title>
                      <div className='mt-2'>
                        <p className='text-sm text-gray-500'>{message}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                  <button
                    type='submit'
                    className={classNames(
                      'inline-flex w-full justify-center rounded-lg border border-transparent px-6 py-2 text-base font-medium text-white shadow-sm  focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm',
                      'bg-red-600 hover:bg-red-700'
                    )}
                    onClick={() => {
                      setOpen(false);
                      setDelete(false);
                    }}
                  >
                    Delete
                  </button>

                  <button
                    type='button'
                    className='mt-3 inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-6 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-0 focus:ring-black sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

DeletePopup.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  setDelete: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.any,
};

export default DeletePopup;
