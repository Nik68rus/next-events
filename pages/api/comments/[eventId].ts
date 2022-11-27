import { isEmail } from './../../../helpers/validator';
import { NextApiRequest, NextApiResponse } from 'next';
import { IComment } from '../../../types';
import { MongoClient } from 'mongodb';
import getDb from '../../../helpers/db';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: IComment;
  query: {
    eventId: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const { eventId } = req.query;

  let mongoUtils;

  try {
    mongoUtils = await getDb();
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: 'Database connection failed!' });
  }

  if (req.method === 'GET') {
    try {
      const comments = await mongoUtils.db
        .collection('comments')
        .find({ eventId })
        .sort({ _id: -1 })
        .toArray();
      res.status(200).json({ ok: true, message: 'GetComments', comments });
    } catch {
      res.status(500).json({ ok: false, message: 'Something went wrong!' });
    }
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (!isEmail(email) || name.trim() === '' || text.trim() === '') {
      res.status(422).json({ ok: false, message: 'Invalid input' });
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    try {
      const result = await mongoUtils.db
        .collection('comments')
        .insertOne(newComment);

      res.status(201).json({
        ok: true,
        message: 'PostComments',
        comment: { id: result.insertedId, ...newComment },
      });
    } catch (err) {
      res.status(500).json({ ok: false, message: 'Something went wrong!' });
    }
  }

  mongoUtils.client.close();
}
