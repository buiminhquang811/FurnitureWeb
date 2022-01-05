const { Producer, sequelize } = require("../models");

const createProducer = async (req, res) => {
	const {userName} = req.user;
	const {name, address, link, note } = req.body;
	try {
		const newProducer = await Producer.create({ name, address, link, note, createdBy: userName, updatedBy: userName });
		res.status(201).send(newProducer);
	} catch(error) {
    res.status(500).send(error);
	}
};

const getAllProducer = async (req, res) => {
	try {
		const [listProducer] = await sequelize.query(
		`select id, name, address, note, link, createdBy, updatedAt from producers`
		);
		res.status(200).send(listProducer);
	} catch (error) {
		res.status(500).send(error);
	}
};

const updateProducer = async (req, res) => {
	const {userName} = req.user;
	const {name, address, link, note } = req.body;
	const { id } = req.params;
	try {
		const newProducer = await Producer.findOne({
      where: {
        id,
      },
    });
		newProducer.name = name;
		newProducer.address = address;
    newProducer.link = link;
    newProducer.note = note;
		newProducer.updatedBy = userName;
		await newProducer.save();
		res.status(201).send(newProducer);
	} catch(error) {
    res.status(500).send(error);
	}
};

const deleteProducer = async (req, res) => {
	const { id } = req.params;
	try {
		await Producer.destroy({
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
  createProducer,
	getAllProducer,
	updateProducer,
	deleteProducer
};