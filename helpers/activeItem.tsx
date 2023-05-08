const activeItem = (item, array) => {
  const abName = item.name;
  const match = array.find(arrItem => {
    return arrItem.name === abName;
  });
  return match;
};

export default activeItem;
