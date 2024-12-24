const routeNotFound = (req, res, next) => {
  return res
    .status(404)
    .json({ msg: "The route you are looking for does not exist" });
};

export default routeNotFound;
