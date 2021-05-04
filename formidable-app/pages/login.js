import React from 'react';
import Head from 'next/head'
import { signIn, getSession, getProviders, getCsrfToken } from 'next-auth/client';
import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/login.module.css';

// TODO: Make email and password states so that they don't disappear when wrong info is given
// TODO: Get the CSRF-token back and use it to validate the request
export default function SignIn({providers}){

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signIn("domain-login", { email, password })
    .catch(err => alert('Incorrect email or password'));  // TODO: Make this alert good lookin'
  };

  return (
    <Layout>
      <Head>
        <title>Log In</title>
      </Head>
      <div className={styles.logInContentBox}>
        <h2>Already have an account?</h2>
        <form onSubmit={handleSubmit}>
          <input id="email" name="email" type="email" placeholder="Email" required />
          <input id="password" name="password" type="password" placeholder="Password" required />
          <button type="submit">Log In</button>
        </form>
        {Object.values(providers).map(provider => {
          if(provider.name === "Email") {
            return;
          }
          return(
            <div key={provider.name}>
              <button className={styles.providerButton} onClick={() => signIn(provider.id)}>
                Log in with {provider.name}
              </button>
            </div>
          );
        })}
      </div>

    </Layout>
  )
}

export async function getServerSideProps(context){

  const session = await getSession(context);
  
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }
  return {
    props: { 
      providers: await getProviders(context),
    }
  }
}
