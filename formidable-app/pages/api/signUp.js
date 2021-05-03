import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../../util/mongodb'

export default async (req,res) => {

  const { db } = await connectToDatabase();

  // Might not need to make this check. Could possibly use a 'unique: true' instead.
  const user = await db
    .collection('users')
    .findOne({email: req.body.email});

  if (user) {
    res.status(409).json( {error: 'Email already in use'} );
    console.log('Email already in use')
  } else {

    
    const timestamp = new Date();
    const newUser = {
      email: req.body.email,
      password: req.body.password,
      createAt: timestamp,
      updatedAt: timestamp
    }

    db
      .collection('users')
      .insertOne(newUser, (err, result) => {
        if(err) {
          res.status(400).json( {error: 'Unexpected error'} );
          console.log(err);
        }
      });
    }

    res.status(200).send();
}