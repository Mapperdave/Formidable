import { getSession, signIn } from 'next-auth/client';
import Layout from '../components/layout';
import axios from 'axios';
import bcrypt from 'bcryptjs';


export default function SingUp() {

  const handleSubmit = async (e) => {
    e.preventDefault();
  
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
      alert(err.response.data.error);
    });
  };

  return(
    <Layout>
      <div>
        <form onSubmit={handleSubmit}>
          <input id="email" name="email" type="email" placeholder="Email" required />
          <input id="password" name="password" type="password" placeholder="Password" required />
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