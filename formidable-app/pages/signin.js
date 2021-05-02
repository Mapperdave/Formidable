import React from 'react';
import { signIn, getSession, getProviders, getCsrfToken } from 'next-auth/client';
import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/Home.module.css';

// <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

export default function SignIn({providers, csrfToken}){

  const handleSubmit = (e) => {
    e.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var result = signIn("domain-login", { email, password });
    console.log(result)
  };

  return (
    <Layout>
      <div className={styles.logInContentBox}>
        <form onSubmit={handleSubmit}>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <input id="email" name="email" type="email" placeholder="email" required />
          <input id="password" name="password" type="password" placeholder="password" required />
          <button type="submit">Sign In</button>
        </form>
        <div className="g-signin2" data-onsuccess="onSignIn"></div>
      </div>
      <>
        {Object.values(providers).map(provider => {
          if(provider.name === "Email") {
            return;
          }
          return(
            <div key={provider.name}>
              <button variant="outline" onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
            </div>
          );
        })}
      </>
    </Layout>
  )
}

export async function getServerSideProps(context){
  const {req, res} = context;
  const session = await getSession({req});

  if(session && res) {
    res.writeHead(302, {
      Location: '/',
    });
    res.end();
    return;
  }

  return {
    props: { 
      providers: await getProviders(context), 
      csrfToken: await getCsrfToken(context),
    }
  }
}
