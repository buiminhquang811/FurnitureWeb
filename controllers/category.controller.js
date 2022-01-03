const { Category, sequelize } = require("../models");

const createCategory = async (req, res) => {
	const {userName} = req.user;
	const {name, note, parentId } = req.body;
	try {
		const newCate = await Category.create({ name, note, parentId, createdBy: userName });
		res.status(201).send(newCate);
	} catch(error) {
    res.status(500).send(error);
	}
}

module.exports = {
  createCategory,
};