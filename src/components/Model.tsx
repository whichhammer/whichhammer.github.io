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
};

export type DatasheetProps = {
  id: number;
  name: string;
  image: string;
  link: string;
  parent_faction_name: string;
}

const Model: React.FC<{ m: ModelProps, idx: number }> = ({ m, idx }) => {
  return (
    <div className="col-6" key={idx}>
      <h2>
        {m.name}
      </h2>
      <small>{m.datasheet.parent_faction_name}</small>
      <div style={{position: 'relative'}}>
        <img style={{maxWidth: '100%', maxHeight: '120px'}} src={m.datasheet.image} alt={m.name} />
      </div>
      <p>
        <a className="btn btn-link" role="button" href={m.datasheet.link} target={"_blank"}>View details <i className="bi bi-box-arrow-up-right"></i></a>
      </p>
    </div>
  );
};

export default Model;