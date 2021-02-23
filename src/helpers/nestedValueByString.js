const reachNestedValue = (obj, desc) => {
  var arr = desc.split(".");
  while(arr.length && (obj = obj[arr.shift()]));
  return obj;
};

export { reachNestedValue };
