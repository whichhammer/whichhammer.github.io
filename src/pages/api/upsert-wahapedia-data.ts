import type {NextApiRequest, NextApiResponse} from 'next'
import { Wahapedia } from '@/lib/data/Wahapedia';
import { PrismaClient } from '@prisma/client'



export default function handler(req:NextApiRequest, res:NextApiResponse) {

  // const { APP_KEY } = process.env;
  // @ts-ignore
  // const { ACTION_KEY } = req.headers.authorization.split(" ")[1];

  try {
    // if (ACTION_KEY === APP_KEY) {
      // Process the POST request

      const w = new Wahapedia();
      w.process(new PrismaClient());
      res.status(200).json({ success: 'true' })

    // } else {
    //   res.status(401)
    // }
  } catch(err) {
    res.status(500)
  }
}