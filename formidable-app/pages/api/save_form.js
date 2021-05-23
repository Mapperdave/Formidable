import { connectToDatabase } from '../../util/mongodb';
import { ObjectID } from 'mongodb';
import { getSession } from 'next-auth/client';

export default async (req, res) => {

  const session = await getSession({ req });
  const { db } = await connectToDatabase();

  if (session) {
    const userId = await db
    .collection('users')
    .findOne( { email: session.user.email } )
    .then(res => {
      return Promise.resolve(res._id);
    })
    .catch(err => {
      res.status(400).json( {error: 'Unexpected error'} );
      console.log(err);
    });
    
    const timestamp = new Date();
    let form = req.body.form;
    form.userId = ObjectID(userId);
    form.answers = [],
    form.createdAt = timestamp;
    form.updatedAt = timestamp;
    
    const formId = await db
    .collection('forms')
    .insertOne(form)
    .then(res => {
      return Promise.resolve(res.insertedId);
    })
    .catch(err => {
      res.status(400).json( {error: 'Unexpected error'} );
      console.log(err);
    });
    
    db
    .collection('users')
    .updateOne( 
      { _id: ObjectID(userId) }, 
      { 
        $push: { forms: ObjectID(formId) },
        $set: { updatedAt: timestamp},
      },
      { upsert: true } // Creates the forms array if it doesn't exist
      )
      .catch(err => {
        res.status(400).json( {error: 'Unexpected error'} );
        console.log(err);
      });
      
      res.status(200).send();
    } else {
      res.status(403).json({
        message:
          'You must be sign in to save forms.',
      });
    }
  }