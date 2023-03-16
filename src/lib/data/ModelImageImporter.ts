import { PrismaClient } from '@prisma/client';
import axios, { AxiosInstance } from 'axios';


export class ModelImageImporter {

  readonly googleApiKey = '';
  readonly googleSearchEngineId = '';
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://customsearch.googleapis.com/customsearch/v1',
      timeout: 1000,
      headers: {'Accept': 'application/json'}
    });
  }

  async process(client: PrismaClient): Promise<void> {

    await client.datasheet.findMany(
      {
        where: {
          image: null
        },
        take: 50
      }
    ).then((datasheets) => {
      console.log('found datasheets: ', datasheets.length);
      datasheets.map((datasheet) => {
        console.log('searching for: ', datasheet.name);
        console.log('image is currently: ', datasheet.image);
        this.httpClient.get('', {
          params: {
            key: this.googleApiKey,
            cx: this.googleSearchEngineId,
            q: 'Warhammer 40k ' + datasheet.parent_faction_name + ' ' + datasheet.name,
            filter: 1,
            googlehost: 'google.co.uk',
            imgType: 'photo',
            num: 1,
            safe: 'active',
            searchType: 'image',
          }
        }).then(async (response) => {
          console.log(response.data.items[0].title);
          const imageResult: string = response.data.items[0].link;
          await client.datasheet.update({
            where: {
              id: datasheet.id
            },
            data: {
              // @ts-ignore - no idea what's up here
              image: imageResult
            }
          })
          .then((updatedDatasheet) => {
            console.log('updated datasheet: ' + updatedDatasheet.name + ' with image: ' + updatedDatasheet.image);
          });
        })
        .catch(function (error) {
          // handle error
          console.log('error');
          console.log(error.code);
          console.log(error.config.params.q);
          if (error.response) {
            console.log(error.response.statusText);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }
        })
      });
    });
    // .finally(async () => {
    //   // always executed
    //   await client.$disconnect()
    //     .catch(async (e) => {
    //       console.error(e)
    //       await client.$disconnect()
    //       process.exit(1)
    //     });
    // });
  }
}