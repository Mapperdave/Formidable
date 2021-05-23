import { connectToDatabase } from '../../util/mongodb';
import { ObjectID } from 'mongodb';
import { getSession } from 'next-auth/client';

export default async (req, res) => {

  const session = await getSession({ req });
  const { db } = await connectToDatabase();

  if ( session ) {

  }  else {
    res.status(403).json({
      message:
        'You must be sign in to view the protected content on this page.',
    });
  }
}