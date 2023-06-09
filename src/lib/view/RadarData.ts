import {ModelProps} from "@/components/Model";
import {RadarDataMetric} from "@/lib/view/RadarDataMetric";

export type RadarIndicator = {
  name: string,
  min: number,
  max: number,
  inverse: boolean,
}

export class RadarData {
  models: ModelProps[] | undefined;
  metrics: RadarDataMetric[] = [];

  constructor() {
    this.init();
  }

  init() {
    this.metrics = [];
    this.metrics.push(new RadarDataMetric('Movement'));
    this.metrics.push(new RadarDataMetric('Weapons Skill'));
    this.metrics.push(new RadarDataMetric('Ballistic Skill'));
    this.metrics.push(new RadarDataMetric('Strength'));
    this.metrics.push(new RadarDataMetric('Toughness'));
    this.metrics.push(new RadarDataMetric('Wounds'));
    this.metrics.push(new RadarDataMetric('Attacks'));
    this.metrics.push(new RadarDataMetric('Leadership'));
    this.metrics.push(new RadarDataMetric('Saves'));
    this.metrics.push(new RadarDataMetric('Cost'));
  }

  addModel(model: ModelProps) {
    this.metrics.map(metric => metric.addModel(model));
  }

  getIndicators(): RadarIndicator[]  {
    const indicators: RadarIndicator[] = [];
    this.metrics.map(metric => indicators.push(
      <RadarIndicator>{
        name: metric.subject,
        min: metric.calculateMinMark(),
        max: metric.calculateMaxMark(),
        inverse: metric.isInversed()
      }
    ));

    return indicators;
  }

    getModelValues(model: ModelProps): number[] {
    const cost = () => {
      if (model.cost === 0) {
        if (model.datasheet.cost_per_unit) {
          return model.datasheet.cost / model.models_per_unit;
        } else {
          return model.datasheet.cost;
        }
      }
      return model.cost
    }

    return [
      model.m,
      model.ws,
      model.bs,
      model.s,
      model.t,
      model.w,
      model.a,
      model.ld,
      model.sv,
      cost()
    ]
  }

  getViewData() {
    const data: any[] = [];
    this.metrics.map(metric => data.push());
    return data;
  }

  getModels(): ModelProps[] {
    return this.models || [];
  }

  setModels(models: ModelProps[]) {
    this.init();
    this.models = models;
    this.models.map(model => this.addModel(model));
  }

}