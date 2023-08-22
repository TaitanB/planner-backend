const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    // console.log(req.body);
    try {
      await ctrl(req, res, next);
    } catch (error) {
      console.log("ctrlWrapper");
      console.log(error);
      next(error);
    }
  };

  return func;
};

module.exports = ctrlWrapper;
