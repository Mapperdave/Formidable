import { connectToDatabase } from '../../util/mongodb';
import { ObjectID } from 'mongodb';
import { getSession } from 'next-auth/client';

export default async (req, res) => {

  const session = await getSession({ req });
  const { db } = await connectToDatabase();

  if (session) {

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
  } else {
    res.status(403).json({
      message:
        'You must be sign in to view the protected content on this page.',
    });
  }
}