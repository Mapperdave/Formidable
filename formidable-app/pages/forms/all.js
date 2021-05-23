import React, { useState } from 'react';
import { getSession } from 'next-auth/client';
import axios from 'axios';
import FormRespons from '../../components/form_respons';
import useSWR from 'swr';
import styles from '../../styles/Answer.module.css';
import Layout from '../../components/layout';

const fetcher = url => axios.get(url).then(res => res.data);

export default function Responses({ user }) {
 
  console.log(user);
  // const url = `http://localhost:3000/api/get_all_forms?formId=${email}`;

  // const { data, error } = useSWR( url, fetcher );

  // // What the user sees if loading failed
  // if (error) {
  //   return(
  //     <div>
  //       Failed to load the form...
  //     </div>
  //   )
  // }
  // // What the user sees while loading
  // if (!data) {
  //   return(
  //     <div className={styles.loader}></div>
  //   )
  // }

  // console.log(data);

  return (
    <Layout>
      
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  return {props: { user: session.user }};
}
