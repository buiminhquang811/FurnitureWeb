const { User, sequelize, Role } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const { fullName, userName, password, phoneNumber, email } = req.body;
  let {roleId} = req.body;
  roleId = roleId ? roleId : 2;
  try {
    // tạo ra một chuỗi ngẫu nhiên
    const salt = bcrypt.genSaltSync(10);
    // mã hóa salt + password
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({ fullName, userName, password: hashPassword, phoneNumber, email, roleId });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const [user] = await sequelize.query(
      `select userName, password, role from users inner join roles 
      on roleId = roles.id where userName = '${userName}'`
    );
    if(user && user.length) {
      const isAuth = await bcrypt.compareSync(password, user[0].password);
      if (isAuth) {
        const token = jwt.sign({ userName: user[0].userName, role: user[0].role }, "minh-quang-0811", { expiresIn: 60 * 60 });
        res.status(200).send({ message: "Đăng Nhập Thành Công ! ", token });
      } else {
        res.status(500).send({ message: "Tài khoản hoặc mật khẩu không đúng" });
      }
    } else {
      res.status(404).send({ message: "Không tìm thấy tài khoản phù hợp" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};



module.exports = {
  register,
  login
};