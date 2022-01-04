const checkEmpty = (arrType) => {
    let valid = true;
    return (req, res, next) => {
        for(let i = 0; i < arrType.length; i++) {
            if (req.body[arrType[i]] === null || req.body[arrType[i]] === undefined || req.body[arrType[i]] === '') {
                res.status(403).send(`${arrType[i]} không được bỏ trống`);
                valid = false;
                return;
            }
        };
        if(valid) {
            next();
        }
      };
}
  
  module.exports = {
    checkEmpty,
  };

  
  