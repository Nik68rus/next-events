import { isEmail } from './../../helpers/validator';
import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import getDb from '../../helpers/db';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    email: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email } = req.body;
    if (!isEmail(email)) {
      return res.status(422).json({ ok: false, message: 'Email is invalid' });
    }

    let mongoUtils;

    try {
      mongoUtils = await getDb();
    } catch (err) {
      return res
        .status(500)
        .json({ ok: false, message: 'Database connection failed!' });
    }

    try {
      const isSubscribed = await mongoUtils.db
        .collection('emails')
        .findOne({ email });
      if (isSubscribed) {
        res.status(201).json({ ok: false, message: 'User already exists!' });
      } else {
        const result = await mongoUtils.db
          .collection('emails')
          .insertOne({ email });
        res.status(201).json({
          ok: true,
          message: 'Signup success!',
          id: result.insertedId,
        });
      }
      mongoUtils.client.close();
    } catch (err) {
      res.status(500).json({ ok: false, message: 'Something went wrong!' });
    }
  }
}
