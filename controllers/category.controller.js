const { Category, sequelize } = require("../models");

const createCategory = async (req, res) => {
	const {userName} = req.user;
	const {file} = req; 
	const urlImage = file ? `http://localhost:4000/${file.path}` : null;
	const {name, note, parentId } = req.body;
	try {
		const newCate = await Category.create({ name, note, parentId, createdBy: userName, featuredImage: urlImage, updatedBy: userName });
		res.status(201).send(newCate);
	} catch(error) {
    res.status(500).send(error);
	}
};

const getAllCategory = async (req, res) => {
	try {
		const [listCategory] = await sequelize.query(
		`select id, name, parentId, note, featuredImage, createdBy, updatedAt from categories`
		);
		res.status(200).send(listCategory);
	} catch (error) {
		res.status(500).send(error);
	}
};

const updateCategory = async (req, res) => {
	const {userName} = req.user;
	const {name, note, parentId } = req.body;
	const { id } = req.params;
	try {
		const newCate = await Category.findOne({
      where: {
        id,
      },
    });
		newCate.name = name;
		newCate.note = note;
		newCate.parentId = parentId ? parentId : null;
		const {file} = req; 
		newCate.featuredImage = file ? `http://localhost:4000/${file.path}` : newCate.featuredImage;
		newCate.updatedBy = userName;
		await newCate.save();
		res.status(201).send(newCate);
	} catch(error) {
    res.status(500).send(error);
	}
};

const deleteCategory = async (req, res) => {
	const { id } = req.params;
	try {
		await Category.destroy({
		  where: {
			id,
		  },
		});
		res.status(200).send("xóa thành công");
	  } catch (error) {
		res.status(500).send(error);
	  }
}

module.exports = {
  createCategory,
	getAllCategory,
	updateCategory,
	deleteCategory
};