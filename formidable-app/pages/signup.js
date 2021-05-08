import React from "react";
import { getSession, signIn } from 'next-auth/client';
import Head from 'next/head'
import Layout from '../components/layout';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import styles from '../styles/login.module.css';

export default function SingUp() {

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*console.log(e.target)
    if(e.target.password.value != e.target.pswrepeat.value) {
      //e.target.pswrepeat.setCustomValidity("Passwords must match.")
    }
    else {*/
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);

      await axios.post('./api/signup', {
        email: email,
        password: hash
      })
      .then(() => {signIn("domain-login", { email, password });})
      .catch(err => { 
        // TODO: Make this error respone look good
        //e.target.email.setCustomValidity(err.response.data.error)
        alert(err.response.data.error);
      });
    //} 
  };

  return(
    <Layout>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className={styles.logInContentBox}>
        <h2>Create an account down below!</h2>
        <form className={styles.signUpForm} onSubmit={handleSubmit}>
          <input id="email" name="email" type="email" placeholder="Email" required />
          <input id="password" name="password" type="password" placeholder="Password" minLength="3" required />
          <input id="pswrepeat" name="pswrepeat" type="password" placeholder="Repeat password" minLength="3" required />
          <button type="submit">Sign up</button>
        </form>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return {props: {}};
}