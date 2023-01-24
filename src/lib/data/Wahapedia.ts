import { PrismaClient } from '@prisma/client';
import { DatasheetImporter } from "@/lib/data/DatasheetImporter";
import { DatasheetModelImporter } from "@/lib/data/DatasheetModelImporter";

export class Wahapedia {

  async process(client: PrismaClient) {
    const datasheetImporter = new DatasheetImporter(client);
    const datasheetModelImporter = new DatasheetModelImporter(client);

    await datasheetImporter.upsert(client);
    console.log('Got all Datasheets');
    await datasheetModelImporter.upsert(client);
    console.log('done');
    // await client.$disconnect()
    //   .catch(async (e) => {
    //     console.error(e)
    //     await client.$disconnect()
    //     process.exit(1)
    //   });
  }
}