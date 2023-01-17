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
};

const Model: React.FC<{ m: ModelProps }> = ({ m }) => {
  return (
    <div>
      <h2>{m.name}</h2>
      <small>id {m.id}</small>
    </div>
  );
};

export default Model;