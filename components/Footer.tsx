import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import { useState } from 'react';
import { VscInfo } from 'react-icons/vsc';

const Footer = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    border: '2px solid #fff',
    borderRadius: '4px',
    boxShadow: 24,
    width: '80%',
    maxWidth: '500px',
    color: 'white',
    p: 1,
  };

  return (
    <footer className='absolute bottom-0 p-2 flex justify-between w-full text-white'>
      <div>
        <button className='text-white hover:text-blue-700 ease-in-out duration-200' onClick={handleOpen}>
          <VscInfo size={44} />
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <div className='border-b-2 border-blue-400 mb-4 p-3'>
              <h2 className='text-2xl mb-1 text-blue-700'>Search A Phrase</h2>
              <p className='w-4/5'>
                Use this to search for articles in the Wikipedia database. You can search for a single word or
                a phrase
              </p>

              <Image src='/resources/info/info_search.jpeg' alt='Search Bar Info' width={666} height={111} />
            </div>
            <div className='p-3'>
              <h2 className='text-2xl mb-1 text-blue-700'>Useful Tools</h2>
              <p className='w-4/5'>
                This will open a drawer that contains controls you can use to manilpulate the search results.
                You can replace a single word or phrase, replace all instances of a word or phrase, reset the
                search results, or clear the search results.
              </p>

              <Image src='/resources/info/info_tools.jpeg' alt='Tools Info' width={142} height={99} />
            </div>
          </Box>
        </Modal>
      </div>
      <div className='flex flex-col justify-center'>
        <a
          className='text-white hover:text-blue-800'
          href='https://rubenverster.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          &copy; Ruben Verster
        </a>
      </div>
    </footer>
  );
};

export default Footer;
