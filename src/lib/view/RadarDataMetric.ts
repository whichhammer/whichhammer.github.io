import {ModelProps} from "@/components/Model";

type ModelValue = {
  id: number,
  value: number
};

export class RadarDataMetric {
  subject: string;
  values: ModelValue[] = [];

  constructor(subject: string) {
    this.subject = subject;
  }

  addModel(model: ModelProps) {
    let v: number = 0;
    switch (this.subject) {
      case 'Movement':
        v = model.m;
        break;
      case 'Weapons Skill':
        v = model.ws;
        break;
      case 'Ballistic Skill':
        v = model.bs;
        break;
      case 'Strength':
        v = model.s;
        break;
      case 'Toughness':
        v = model.t;
        break;
      case 'Wounds':
        v = model.w;
        break;
      case 'Attacks':
        v = model.a;
        break;
      case 'Leadership':
        v = model.ld;
        break;
      case 'Saves':
        v = model.sv;
        break;
      case 'Cost':
        v = model.cost;
        break;
    }
    this.values.push({
      id: model.id,
      value: v,
    });
  }

  public getMin(): number {
    switch (this.subject) {
      case 'Weapons Skill':
      case 'Ballistic Skill':
      case 'Saves':
        return 7;
      default:
        return 0;
    }
  }

  public getMax(): number | null{
    switch (this.subject) {
      case 'Weapons Skill':
      case 'Ballistic Skill':
      case 'Saves':
        return 0;
      default:
        return null;
    }
  }

  getViewData() {
    const data = {
      subject: this.subject,
      fullMark: this.calculateFullMark(),
    };
    // @ts-ignore
    this.values.map(value => data[value.id] = value.value);

    return data;
  }

  public calculateFullMark() {
    const fullMark = Math.max(...this.values.map(v => v.value));
    // check against some min maximum (...) values
    switch (this.subject) {
      case 'Weapons Skill':
      case 'Ballistic Skill':
      case 'Saves':
        if (fullMark < 6) {
          return 6;
        }
        break;
      case 'Strength':
      case 'Toughness':
      case 'Movement':
        if (fullMark < 8) {
          return 8;
        }
        break;
      case 'Leadership':
        if (fullMark < 10) {
          return 10;
        }
        break;
      case 'Wounds':
      case 'Attacks':
        if (fullMark < 6) {
          return 6;
        }
        break;
      case 'Cost':
        if (fullMark < 60) {
          return 60;
        }
        break;
    }
    return fullMark;
  }
}