import { connectToDatabase } from '../../util/mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const movies = await db
    .collection("users")
    .find({})
    // .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  res.status(200).json(movies);
};