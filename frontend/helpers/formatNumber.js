export const nFormatter = (num) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "tyś" },
    { value: 1e6, symbol: "mln" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(1).replace(rx, "$1") + item.symbol
    : "0";
};
