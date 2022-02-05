const authorize = (arrType) => (req, res, next) => {
    const { user } = req;
    if (arrType.findIndex((ele) => ele === user.role) > -1) {
      next();
    } else {
      res.status(403).send("Bạn không có quyền thực hiện chức năng này");
    }
  };
  
  module.exports = {
    authorize,
  };
  