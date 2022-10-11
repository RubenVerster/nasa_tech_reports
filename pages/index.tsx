import type { NextPage } from 'next';
import Head from 'next/head';

import React from 'react';
import { ToastContainer } from 'react-toastify';

import Controls from '../components/Controls';
import Footer from '../components/Footer';
import SearchResults from '../components/SearchResults';

import 'react-toastify/dist/ReactToastify.css';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Wiki-Replace</title>
        <meta name='description' content='A boilerplate app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>Wiki-Replace</h1>

        <div>
          <ToastContainer
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
          />
          <Controls />
          <SearchResults />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
