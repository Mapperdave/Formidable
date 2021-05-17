import { connectToDatabase } from '../../util/mongodb'
import { ObjectID } from 'mongodb'

export default async (req, res) => {

  const { db } = await connectToDatabase();

  const userId = await db
  .collection('users')
  .findOne( { email: req.body.email } )
  .then(res => {
    return Promise.resolve(res._id);
  })
  .catch(err => {
    res.status(400).json( {error: 'Unexpected error'} );
    console.log(err);
  });
  
  const timestamp = new Date();
  let form = req.body.form;
  delete form.keys;
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
    { email: req.body.email }, 
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
}