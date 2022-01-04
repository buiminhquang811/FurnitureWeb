const checkExist = (Model) => {
    return async (req, res, next) => {
      const { id } = req.params;
      // kiểm tra xem data có tồn hay ko
      const data = await Model.findOne({
        where: {
          id,
        },
      });
      if (data) {
        next();
      } else {
        res.status(404).send(`Không tìm thấy dữ liệu`);
      }
    };
  };
  
  module.exports = {
    checkExist,
  };
  