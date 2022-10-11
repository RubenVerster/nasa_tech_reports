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
        <meta name='description' content='Search Wikipedia For Knowledge' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>Wiki-Replace</h1>

        <ToastContainer
          position={'bottom-right'}
          autoClose={4444}
          hideProgressBar={true}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={false}
          theme={'dark'}
        />
        <Controls />
        <SearchResults />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
