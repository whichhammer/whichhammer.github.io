import {ModelProps} from "@/components/Model";

type ModelValue = {
  id: number,
  value: number
};

export class RadarDataMetric {
  subject: string;
  values: ModelValue[] = [];
  fullMark: number;

  constructor(subject: string, fullMark: number = 1) {
    this.subject = subject;
    this.fullMark = fullMark;
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
    }
    this.values.push({
      id: model.id,
      value: v,
    });
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

  private calculateFullMark() {
    this.fullMark = Math.max(...this.values.map(v => v.value));
    return this.fullMark;
  }
}