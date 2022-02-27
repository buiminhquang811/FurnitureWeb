const { QueryTypes } = require("sequelize");
const { Order, sequelize, OrderProduct } = require("../models");

const createOrder = async (req, res) => {

  const {name, address, email, note, mobile, products } = req.body;
  const t = await sequelize.transaction();
  
	try {
		const newOrder = await Order.create({ name, address, email, note, mobile }, {transaction: t});
    console.log({newOrder});
    for(let i = 0; i < products.length; i++) {
      const {productId, quantity, price} = products[i];
      const newOd = await OrderProduct.create({ productId, quantity, price, orderId: newOrder.id }, {transaction: t});
      console.log({newOd});
    };
    await t.commit();
		res.status(201).send(newOrder);
	} catch(error) {
    res.status(500).send(error);
    await t.rollback();
	}
};


const getAllOrder = async (req, res) => {
	const {page, size, term} = req.query;
	const offset = page*size;
	let subQuery = `select count (*) as totalRow from orders`;
	if(term && term.length) {
		subQuery += ` where name like '%${term}%'`;
	};

	let query = `select * from orders`;
	if(term && term.length) {
		query += ` where name like '%${term}%'`;
	};
	query += ` limit ${size} offset ${offset}`;

	try {
		const [listProducer] = await sequelize.query(query);
		const totalRow = await sequelize.query(subQuery, { type: QueryTypes.SELECT });
		const obj = {};
		obj.listOrder = listProducer;
		obj.totalRow = totalRow[0].totalRow
		res.status(200).send(obj);
	} catch (error) {
		console.log({error})
		res.status(500).send(error);
	}
};

const getOneOrder = async (req, res) => {
  const { id } = req.params;
  let query = `select prd.name as productName, prd.code as productCode, 
  odpd.quantity, odpd.price, odpd.id as id from orderproducts odpd join products prd on odpd.productId = prd.id 
  join orders ods on odpd.orderId = ods.id `;
	query += `where ods.id = ${id}`;
	try {
		const [listProducts] = await sequelize.query(query);
    const obj = {};
    obj.product = listProducts;
		res.status(200).send(obj);
	} catch (error) {
		res.status(500).send(error);
	}
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
	try {
    const newOrder = await Order.findOne({
      where: {
        id,
      },
    });
    newOrder.status = 2
    await newOrder.save();
		res.status(200).send(newOrder);
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = {
  createOrder,
  getAllOrder,
  getOneOrder,
  updateOrder,
};