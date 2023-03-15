import prisma from '../../lib/prisma';

import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from "fs";
import * as path from "path";

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const results = await prisma.datasheet_model.findMany({
    include: {
      datasheet: true,
    },
    where: {
      datasheet: {
        image: {
          not: null
        }
      }
    },
    orderBy: [
      {
        name: 'asc',
      },
    ]
  });
  const FEED_PATH = path.resolve(path.join(process.cwd(), 'data', 'feed-update.json'));
  try {
    fs.writeFileSync(
      FEED_PATH,
      JSON.stringify(results), {
        flag: 'w'
      }
    )
  } catch (error: any) {
    res.status(500).json({ name: error.toString() });
  }

  res.status(200);
}


