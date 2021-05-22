import { connectToDatabase } from '../../util/mongodb'
import { ObjectID } from 'mongodb'

export default async (req, res) => {

  const { db } = await connectToDatabase();

  const form = await db
  .collection('forms')
  .findOne( { _id: ObjectID(req.query.formId) } )
  .catch(err => {
    res.status(400).json( {error: 'Unexpected error'} );
    console.log(err);
  });

  const cursor = await db
  .collection('form_answers')
  .find({'_id': {'$in': form.answers}});

  let responses = [];
  await cursor.forEach(r => responses.push(r));
  
  res.status(200).json({form: form, responses: responses});
}