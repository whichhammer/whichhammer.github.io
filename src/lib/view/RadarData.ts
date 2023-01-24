import {ModelProps} from "@/components/Model";
import {RadarDataMetric} from "@/lib/view/RadarDataMetric";

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
  }

  addModel(model: ModelProps) {
    this.metrics.map(metric => metric.addModel(model));
  }

  getViewData() {
    const data: any[] = [];
    this.metrics.map(metric => data.push(metric.getViewData()));
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

  getMaxFullMark(): number {
    let max = 0;
    this.metrics.map(metric => {
      if (metric.fullMark > max) {
        max = metric.fullMark;
      }
    });
    return max;
  }

}