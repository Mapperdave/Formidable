import { connectToDatabase } from '../../util/mongodb'
import { ObjectID } from 'mongodb'

export default async (req, res) => {

  const { db } = await connectToDatabase();

  const form = await db
  .collection('forms')
  .findOne( { _id: ObjectID(req.query.form) } ) // Here, req.query.form is undefined for the first call and works second time
  .catch(err => {
    res.status(400).json( {error: 'Unexpected error'} );
    console.log(err);
  });
  
  if (form.published) {
    res.status(200).json(form);
  } else {
    res.status(403).json({
      message:
      'The requested form is not published.',
    });
  }
}