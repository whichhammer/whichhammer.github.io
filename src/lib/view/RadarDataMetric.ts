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

  public calculateMaxMark() {
    const fullMark = this.getHighestValue();
    // check against some min maximum (...) values
    switch (this.subject) {
      case 'Weapons Skill':
      case 'Ballistic Skill':
      case 'Saves':
      case 'Cost':
        return 0;
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
    }
    return fullMark;
  }

  private getHighestValue(): number {
    return Math.max(...this.values.map(v => v.value));
  }

  public calculateMinMark() {
    const fullMark = this.getHighestValue();
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
      case 'Leadership':
      case 'Wounds':
      case 'Attacks':
        return 0;
      case 'Cost':
        if (fullMark < 60) {
          return 60;
        }
        return fullMark + 50;
    }
    return fullMark;
  }

  public isInversed(): boolean {
    switch (this.subject) {
      case 'Weapons Skill':
      case 'Ballistic Skill':
      case 'Saves':
      case 'Cost':
        return true;
      default:
        return false;
    }
  }
}