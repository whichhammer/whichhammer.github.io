import {PrismaClient} from "@prisma/client";
import fs from "fs";
import * as csvParser from "csv-parser";
import {Factions} from "@/lib/data/Factions";

export class DatasheetImporter {
  client: PrismaClient;
  factions: Factions;
  readonly datasheetPath = __dirname + '/../../../../data/Datasheets.csv';

  constructor(client: PrismaClient) {
    this.client = client;
    this.factions = new Factions();
    this.factions.init();
  }

  async upsert(client: PrismaClient) {
    const results: any[] = [];
    fs.createReadStream(this.datasheetPath)
      .pipe(csvParser.default({
        separator: '|',
        headers: [
          'id',
          'name',
          'link',
          'faction_id',
          'source_id',
          'role',
          'unit_composition',
          'transport',
          'power_points',
          'priest',
          'psyker',
          'open_play_only',
          'crusade_only',
          'virtual',
          'cost',
          'cost_per_unit'
        ],
        skipLines: 1,
        quote: undefined,
        mapHeaders: ({header, index}) => header.toLowerCase(),
        mapValues: ({header, index, value}) => {

          switch (header) {
            case 'id':
            case 'source_id':
            case 'cost':
            case 'power_points':
              return value == '' ? 0 : parseInt(value);
            case 'open_play_only':
            case 'crusade_only':
            case 'virtual':
            case 'cost_per_unit':
              if (value === 'false') {
                return false;
              } else if (value === 'true') {
                return true;
              }
              return null;
            case 'transport':
            case 'priest':
            case 'psyker':
              return value == '' ? null : value;
            default:
              return value;
          }
        }
      }))
      .on('data', async (data: any) => {
        data['parent_faction_name'] = this.factions.lookup(data['faction_id'])?.name;
        results.push(data);
      })
      .on('end', () => this.saveToDb(client, results));
  }

  async saveToDb(client: PrismaClient, results:any[]) {
    const upserts: any[] = [];
    results.forEach(datasheet => {
      if ('_16' in datasheet) {
        delete datasheet['_16'];
      }
      upserts.push(client.datasheet.upsert({
          where: {id: datasheet['id']},
          update: datasheet,
          create: datasheet
        })
        .catch(e => {
          console.log('Error trying to write');
          console.log(datasheet);
          console.log(e);
          process.exit(1);
        })
      );
    });

    await Promise.all(upserts);
  }
}