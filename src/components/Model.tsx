import React from "react";

export type ModelProps = {
  id: number;
  name: string;
  m: number;
  ws: number;
  bs: number;
  s: number;
  t: number;
  w: number;
  a: number;
  ld: number;
  sv: number;
  cost: number;
  datasheet: DatasheetProps;
  models_per_unit: number;
};

export type DatasheetProps = {
  id: number;
  name: string;
  image: string;
  link: string;
  parent_faction_name: string;
  cost: number;
  cost_per_unit: boolean;
}

const Model: React.FC<{ m: ModelProps, idx: number }> = ({ m, idx }) => {
  return (
    <div className="col-6" key={idx}>
      <h2>
        {m.name}
      </h2>
      <small>{m.datasheet.parent_faction_name}</small>
      <div style={{position: 'relative'}}>
        {/*<Image fill={true} style={{maxWidth: '100%', maxHeight: '120px'}} src={m.datasheet.image} alt={m.name} />*/}
        <img src={m.datasheet.image} style={{maxWidth: '100%', maxHeight: '120px'}} alt={m.name} />
      </div>
      <p>
        <a className="btn btn-primary btn-sm" role="button" href={m.datasheet.link} target={"_blank"}  rel="noreferrer">View details <i className="bi bi-box-arrow-up-right"></i></a>
      </p>
    </div>
  );
};

export default Model;