import type { NextPage } from 'next';
import Head from 'next/head';

import React from 'react';

import Controls from '../components/Controls';
import Footer from '../components/Footer';
import SearchResults from '../components/SearchResults';

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
          <Controls />
          <SearchResults />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
