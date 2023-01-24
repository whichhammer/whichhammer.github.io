import {PrismaClient} from "@prisma/client";
import fs from "fs";
import * as csvParser from "csv-parser";

export class DatasheetModelImporter {
  client: PrismaClient;
  readonly datasheetPath = __dirname + '/../../../../data/Datasheets_models.csv';

  constructor(client: PrismaClient) {
    this.client = client;
  }

  upsert(client: PrismaClient) {
    const results: any[] = [];
    fs.createReadStream(this.datasheetPath)
      .pipe(csvParser.default({
        separator: '|',
        headers: [
          'datasheet_id',
          'model_id',
          'name',
          'm',
          'ws',
          'bs',
          's',
          't',
          'w',
          'a',
          'ld',
          'sv',
          'cost',
          'cost_description',
          'models_per_unit',
          'cost_including_wargear',
          'base_size',
          'base_size_desc'
        ],
        skipLines: 1,
        quote: undefined,
        mapHeaders: ({header, index}) => header.toLowerCase(),
        mapValues: ({header, index, value}) => {
          switch (header) {
            case 'datasheet_id':
            case 'model_id':
            case 'cost':
              return value == '' ? 0 : parseInt(value);
            case 't':
            case 'w':
            case 'ld':
            case 's':
              if (value === '' || value === '-') {
                return null;
              }
              return parseInt(value);
            case 'm':
            case 'ws':
            case 'bs':
            case 'sv':
              if (value === '' || value === '-') {
                return null;
              }
              // these columns are 2" or 3+ etc
              return parseInt(value.slice(0, -1));
            case 'cost_including_wargear':
              if (value === 'false') {
                return false;
              } else if (value === 'true') {
                return true;
              }
              return null;
            case 'cost_description':
            case 'base_size_descr':
              return value == '' ? null : value;
            default:
              return value.replace(/(<([^>]+)>)/gi, "");
          }
        }
      }))
      .on('data', (data: any) => results.push(data))
      .on('end', () => this.saveToDb(client, results));
  }

  async saveToDb(client: PrismaClient, results:any[]) {
    const upserts: any[] = [];
    results.forEach(datasheetModel => {
      if ('_18' in datasheetModel) {
        delete datasheetModel['_18'];
      }
      if ('_19' in datasheetModel) {
        delete datasheetModel['_19'];
      }
      if ('_20' in datasheetModel) {
        delete datasheetModel['_20'];
      }
      if ('_21' in datasheetModel) {
        delete datasheetModel['_21'];
      }
      if ('_22' in datasheetModel) {
        delete datasheetModel['_22'];
      }
      datasheetModel['id'] = undefined;
      upserts.push(client.datasheet_model.upsert({
        where: {
          datasheet_id_model_id: {
            datasheet_id: datasheetModel['datasheet_id'],
            model_id: datasheetModel['model_id']
          }
        },
        update: datasheetModel,
        create: datasheetModel
      }).catch(e => {
        console.log('Error trying to write');
        console.log(datasheetModel);
        console.log(e);
        process.exit(1);
      }));
    });
    await Promise.all(upserts);
  }
}