export const createFeatureErrorBuilder = <Feature extends string>(feature: Feature) => {
  return <MsgT extends string>(msg: MsgT): `${Feature}.${MsgT}` => `${feature}.${msg}`;
};
