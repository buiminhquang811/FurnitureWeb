const { QueryTypes } = require("sequelize");
const { Order, sequelize, OrderProduct, Product } = require("../models");

const createOrder = async (req, res) => {

  const {name, address, email, note, mobile, products } = req.body;
  const t = await sequelize.transaction();
  
	try {
		const newOrder = await Order.create({ name, address, email, note, mobile }, {transaction: t});
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
	const {page, size, name, email, phone, status} = req.query;
	const offset = page*size;
	let subQuery = `select count (*) as totalRow from orders`;
	subQuery += ` where 1 = 1`

	if(name && name.length) {
    subQuery += ` and name like '%${name}%'`;
  };
  if(email && email.length) {
    subQuery += ` and email like '%${email}%'`;
  };
	if(phone && phone.length) {
    subQuery += ` and mobile like '%${phone}%'`;
  };
  if(status) {
    subQuery += ` and status = '${status}'`;
  };

	let query = `select * from orders`;
	query += ` where 1 = 1`
	if(name && name.length) {
    query += ` and name like '%${name}%'`;
  };
  if(email && email.length) {
    query += ` and email like '%${email}%'`;
  };
	if(phone && phone.length) {
    query += ` and mobile like '%${phone}%'`;
  };
  if(status) {
    query += ` and status = '${status}'`;
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
	query += ` order by odpd.quantity asc`
	try {
		const [listProducts] = await sequelize.query(query);
    const obj = {};
    obj.product = listProducts;
		res.status(200).send(obj);
	} catch (error) {
		res.status(500).send(error);
	}
};

const rejectOrder = async(req, res) => {
	const { id } = req.params;
	try {
		const newOrder = await Order.findOne({
			where: {
				id,
			},
		});
		newOrder.status = -1;
		await newOrder.save();
		res.status(200).send(newOrder);
	} catch (error) {
		res.status(500).send(error);
	}
}

const updateOrder = async (req, res) => {
  const { id } = req.params;
	const t = await sequelize.transaction();
	try {
		let queryGetTotalProduct = `select prd.name as productName, prd.code as productCode, prd.id as productId,
		odpd.quantity, odpd.price, odpd.id as id from orderproducts odpd join products prd on odpd.productId = prd.id 
		join orders ods on odpd.orderId = ods.id `;
		queryGetTotalProduct += `where ods.id = ${id}`;
		queryGetTotalProduct += ` order by odpd.quantity asc`;
		const [listProducts] = await sequelize.query(queryGetTotalProduct);
		if(listProducts.length) {
			//check if all is oke
			let valid = true;
			for(let i = 0; i < listProducts.length; i++) {
				const newProduct = await Product.findOne({
					where: {
						id: listProducts[i].productId,
					},
				});
				newProduct.amount = newProduct.amount - listProducts[i].quantity;
				if(newProduct.amount < 0) {
					valid = false;
					res.status(500).send({ message: `Số lượng sản phẩm ${listProducts[i].productName} trong kho không đủ`});
					return t.rollback();
				}
			};

			//update db
			if(valid) {
				for(let i = 0; i < listProducts.length; i++) {
					const newProduct = await Product.findOne({
						where: {
							id: listProducts[i].productId,
						},
					});
					newProduct.amount = newProduct.amount - listProducts[i].quantity;
					if(newProduct.amount < 0) {
						res.status(500).send({ message: `Số lượng sản phẩm ${listProducts[i].productName} trong kho không đủ`});
						return t.rollback();
					} else {
						await newProduct.save();
					}
				};
				const newOrder = await Order.findOne({
					where: {
						id,
					},
				});
				newOrder.status = 2;
				await newOrder.save();
				res.status(200).send(newOrder);
				return t.commit();
			}
		
		}		
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = {
  createOrder,
  getAllOrder,
  getOneOrder,
  updateOrder,
	rejectOrder
};