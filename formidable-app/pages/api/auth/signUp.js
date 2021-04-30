import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../../../util/mongodb'

export default async (req,res) => {
  const { db } = await connectToDatabase();
  
  // Might not need to make this check. Could possibly use a 'unique: true' instead.
  const user = await db
    .collection('users')
    .findOne({email: req.email});

  if (user) {
    res.status(409).json( {error: 'Email already in use'} );
  } else {

    const saltRounds = 10;
    const hash = await bcrypt.hash(req.password, saltRounds);
    user = {
      name: req.name,
      email: req.email,
      password: hash
    }

    db
      .collection('users')
      .insertOne(req, (err, result) => {
        if(err) {
          return console.log(err);
        }
  
        console.log(result);
      });
    }

  res.status(200).json( { message: 'Registration successfull'} );
}