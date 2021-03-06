import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../../../util/mongodb'

const options = {
  providers: [
    Providers.Credentials({
      id: 'domain-login',
      name: "Email",
      async authorize (credentials) {
        
        const { db } = await connectToDatabase();
        return new Promise((resolve, reject) => {
          db
          .collection('users')
          .findOne({email: credentials.email}, (err, user) => {
            if (user) {
              bcrypt.compare(credentials.password, user.password, (err, result) => {
                if (err) {
                  console.log('Error when comparing passwords');
                  reject(null);
                } 
                if (!result) {
                  console.log('Wrong password');
                  reject(null);
                } else {
                  resolve(user);
                }
              })
            } else {
              console.log('User not found');
              reject(null);
            }
          })
        
        })
      },
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john@example.com" },
        password: {  label: "Password", type: "password" }
      },
    }),


    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],

  database: process.env.DATABASE_URL,
  secret: process.env.SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    maxAge: 13337,

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    // secret: process.env.JWT_SECRET,
    // signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    signIn: '../../login',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // async signIn(user, account, profile) { 
    //   // console.log(user);
    //   // console.log(account);
    //   // console.log(profile);
    //   return true;
    // },
    async redirect(url, baseUrl) { return baseUrl },
    // async session(session, user) { 
    //   console.log('User in session: \n', user);
    //   console.log('Session in session: \n', session);
    //   return Promise.resolve(session);
    // },
    // async jwt(token, user, account, profile, isNewUser) {
    //   console.log('Token: \n', token);
    //   console.log('User: \n', user);
    //   console.log('Account: \n', account);
    //   console.log('Profile: \n', profile);
    //   console.log('isNewUser: \n', isNewUser);
    //   return token;
    // }
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {
    // async signIn(message) { console.log(message) },
  },

  // Enable debug messages in the console if you are having problems
  debug: false,
};

export default (req,res) => NextAuth(req,res,options)