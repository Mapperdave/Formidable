import { connectToDatabase } from '../../util/mongodb';
import { ObjectID } from 'mongodb';
import { getSession } from 'next-auth/client';

export default async (req, res) => {

  const session = await getSession({ req });
  const { db } = await connectToDatabase();

  if ( session ) {

    const user = await db
    .collection('users')
    .findOne( { email: session.user.email } )
    .catch(err => {
      res.status(400).json( {error: 'Unexpected error'} );
      console.log(err);
    });

    const cursor = await db
    .collection('forms')
    .find({'_id': {'$in': user.forms}});

    let forms = [];
    await cursor.forEach(form => forms.push({_id: form._id, name: form.name}));
    res.status(200).json(forms);

  }  else {
    res.status(403).json({
      message:
        'You must be sign in to view the protected content on this page.',
    });
  }
}