import { connectToDatabase } from '../../util/mongodb'
import { ObjectID } from 'mongodb'

export default async (req, res) => {

  const { db } = await connectToDatabase();

  const timestamp = new Date();
  let answer = {};
  answer.answer = req.body.answer;
  answer.keys = req.body.keys;
  answer.formId = ObjectID(req.body.formId);
  answer.createdAt = timestamp;
  answer.updatedAt = timestamp;

  const answerId = await db
  .collection('form_answers')
  .insertOne(answer)
  .then(res => {
    return Promise.resolve(res.insertedId);
  })
  .catch(err => {
    res.status(400).json( {error: 'Unexpected error'} );
    console.log(err);
  });
  
  db
  .collection('forms')
  .updateOne( 
    { _id: ObjectID(req.body.formId) }, 
    { 
      $push: { answers: ObjectID(answerId) },
      $set: { updatedAt: timestamp},
    },
    { upsert: true }
  )
  .catch(err => {
    res.status(400).json( {error: 'Unexpected error'} );
    console.log(err);
  });

  res.status(200).send();
}