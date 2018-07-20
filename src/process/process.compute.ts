const Pcompute: any = createPureObject();

function createPureObject(): object {
  return Object.create(null);
}

/**
 * internal fn
 */
// Pcompute.sort = function(res) {
//   console.log("res-filters:", res);
//   let args = res.config.filters["sort"];
//   res.data = res.data.sort((a, b) => b[args[0]] - a[args[0]]);
//   return res;
// };

export default Pcompute;
