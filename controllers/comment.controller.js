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
  const query = `select * from comments where productId = ${id} and status = 1`
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
	const {page, size, name, email, productCode, status} = req.query;
	const offset = page*size;

	let subQuery = `select count (*) as totalRow, cmt.status as status, cmt.name, cmt.email, 
	cmt.message, cmt.id as id, prds.name as productName, 
	prds.code as productCode from comments cmt join products prds on cmt.productId = prds.id`;
	subQuery += ` where 1 = 1`

	if(name && name.length) {
    subQuery += ` and cmt.name like '%${name}%'`;
  };
  if(email && email.length) {
    subQuery += ` and cmt.email like '%${email}%'`;
  };
	if(productCode && productCode.length) {
    subQuery += ` and prds.code like '%${productCode}%'`;
  };
  if(status) {
    subQuery += ` and cmt.status = '${status}'`;
  };

	let query = `select cmt.status as status, cmt.name, cmt.email, cmt.message, cmt.id as id, prds.name as productName, prds.code as productCode from comments cmt join products prds on cmt.productId = prds.id`;
	
	query += ` where 1 = 1`
	if(name && name.length) {
    query += ` and cmt.name like '%${name}%'`;
  };
  if(email && email.length) {
    query += ` and cmt.email like '%${email}%'`;
  };
	if(productCode && productCode.length) {
    query += ` and prds.code like '%${productCode}%'`;
  };
  if(status) {
    query += ` and cmt.status = '${status}'`;
  };
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

const showComment = async(req, res) => {
	const { id } = req.params;
	try {
		const newComment = await Comment.findOne({
			where: {
				id,
			},
		});
		newComment.status = 1;
		await newComment.save();
		res.status(200).send(newComment);
	} catch (error) {
		res.status(500).send(error);
	}
};

const hideComment = async(req, res) => {
	const { id } = req.params;
	try {
		const newComment = await Comment.findOne({
			where: {
				id,
			},
		});
		newComment.status = -1;
		await newComment.save();
		res.status(200).send(newComment);
	} catch (error) {
		res.status(500).send(error);
	}
}



module.exports = {
  createComment,
  getCommentByProduct,
  getAllComment,
	showComment,
	hideComment,
};