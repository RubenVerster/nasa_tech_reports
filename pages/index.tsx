import type { NextPage } from 'next';
import Head from 'next/head';

import React from 'react';
import type { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../store/home';
import Form from '../components/Form';
import Footer from '../components/Footer';

const Home: NextPage = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

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
          <Form />
          <div>
            <button aria-label='Increment value' onClick={() => dispatch(increment())}>
              Increment
            </button>
            <span>{count}</span>
            <button aria-label='Decrement value' onClick={() => dispatch(decrement())}>
              Decrement
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
