import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';

export type Faction = {
  id: string;
  name: string;
  link: string;
  is_subfaction: string;
  parent_id: string;
  _: string;
};


export class Factions {

  readonly csvFilePath = path.resolve(__dirname + '/../../../../data/Factions.csv');
  readonly factions: Map<string, Faction> = new Map();

  init() {

    const headers = ['id', 'name', 'link', 'is_subfaction', 'parent_id', ''];

    const fileContent = fs.readFileSync(this.csvFilePath, { encoding: 'utf-8' });

    parse(fileContent, {
      delimiter: '|',
      columns: headers,
    }, (error, result: Faction[]) => {
      if (error) {
        console.error(error);
      }
      result.map((faction) => {
        this.factions.set(faction.id, faction);
      });
    });
  }

  lookup(id: string): Faction | undefined {
    return this.factions.get(id);
  }
}