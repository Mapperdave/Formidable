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
  console.log(form);
  res.status(200).json(form);
}