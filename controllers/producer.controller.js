const { Producer, sequelize } = require("../models");
const { QueryTypes } = require("sequelize");
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
	const {page, size, term} = req.query;
	const offset = page*size;
	let subQuery = `select count (*) as totalRow from producers`;
	if(term && term.length) {
		subQuery += ` where name like '%${term}%'`;
	};

	let query = `select id, name, address, note, link, createdBy, updatedAt, updatedBy, createdAt from producers`;
	if(term && term.length) {
		query += ` where name like '%${term}%'`;
	};
	query += ` limit ${size} offset ${offset}`;

	try {
		const [listProducer] = await sequelize.query(query);
		const totalRow = await sequelize.query(subQuery, { type: QueryTypes.SELECT });
		const obj = {};
		obj.listProducer = listProducer;
		obj.totalRow = totalRow[0].totalRow
		res.status(200).send(obj);
	} catch (error) {
		console.log({error})
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