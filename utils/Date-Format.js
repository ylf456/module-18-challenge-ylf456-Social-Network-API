const formatted_date = function () {
  const Today = Date.now();
  //console.log("getter function");
  //console.log(Today);
  const date = new Date(Today);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const MDDYYYY = date.toLocaleDateString("en-US", options);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const formatted_date = `${MDDYYYY} ${hours}:${minutes}:${seconds}`;
  console.log(formatted_date);
  return formatted_date;
};

module.exports = formatted_date;