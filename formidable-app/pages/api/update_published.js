import { connectToDatabase } from '../../util/mongodb'
import { ObjectID } from 'mongodb'
import { getSession } from 'next-auth/client';

export default async (req, res) => {

  const { db } = await connectToDatabase();
  const session = await getSession({ req });

  if (session) {

    /// This check is to see if the signed in user owns the requested form
    const form = await db
    .collection('forms')
    .findOne( { _id: ObjectID(req.body.formId)} )
    .catch(err => {
      res.status(400).json( {error: 'Unexpected error'} );
      console.log(err);
    });

    const user = await db
    .collection('users')
    .findOne( { email: session.user.email } )
    .catch(err => {
      res.status(400).json( {error: 'Unexpected error'} );
      console.log(err);
    });
   
    if (String(form.userId) != String(user._id)) {
      res.status(403).json({
        message:
          'No form id matching the request.',
      });
    } else {

      const timestamp = new Date();

      db
      .collection('forms')
      .findOneAndUpdate(
        { _id: ObjectID(req.body.formId) },
        [
          { $set: { published: { $not: '$published' } } },
          { $set: { updatedAt: timestamp} }
        ] 
      )
      .catch(err => {
        res.status(400).json( {error: 'Unexpected error'} );
        console.log(err);
      });

      res.status(200).send();
    }
  } else {
    res.status(403).json({
      message:
        'You must be signed in.',
    });
  }
}