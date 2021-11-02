export const calculateTotalPings = (data) => {
  const { polygon, kovan, bsc } = data;
  let pC =
    polygon[0] && polygon[0].attributes.current_count
      ? parseInt(polygon[0].attributes.current_count)
      : 0;
  let kC =
    kovan[0] && kovan[0].attributes.current_count
      ? parseInt(kovan[0].attributes.current_count)
      : 0;
  let bC =
    bsc[0] && bsc[0].attributes.current_count
      ? parseInt(bsc[0].attributes.current_count)
      : 0;
  return pC + kC + bC;
};
