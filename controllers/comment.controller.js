const { QueryTypes } = require("sequelize");
const { Comment, sequelize } = require("../models");

const createComment = async (req, res) => {
	const {name, email, productId, message } = req.body;
	try {
		const newComment = await Comment.create({ name, email, productId, message });
		res.status(201).send(newComment);
	} catch(error) {
    res.status(500).send(error);
	}
};

const getCommentByProduct = async (req, res) => {
	const {id} = req.params;
  const query = `select * from comments where productId = ${id}`
	try {
		const [listComment] = await sequelize.query(query);
		const obj = {};
		obj.listComment = listComment;
		res.status(200).send(obj);
	} catch (error) {
		res.status(500).send(error);
	}
};

const getAllComment = async (req, res) => {
	const {page, size} = req.query;
	const offset = page*size;
	let subQuery = `select count (*) as totalRow from comments`;
	let query = `select cmt.status as status, cmt.name, cmt.email, cmt.message, cmt.id as id, prds.name as productName, prds.code as productCode from comments cmt join products prds on cmt.productId = prds.id`;
	query += ` limit ${size} offset ${offset}`;

	try {
		const [listComment] = await sequelize.query(query);
		const totalRow = await sequelize.query(subQuery, { type: QueryTypes.SELECT });
		const obj = {};
		obj.listComment = listComment;
		obj.totalRow = totalRow[0].totalRow
		res.status(200).send(obj);
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = {
  createComment,
  getCommentByProduct,
  getAllComment
};