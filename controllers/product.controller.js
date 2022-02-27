const { Product, sequelize } = require("../models");
const { QueryTypes } = require("sequelize");

const createProduct = async (req, res) => {
  const {files} = req;
  const {userName} = req.user;
  let {name, code, categoryId, amount, description, price, saleOffPrice, producerId, note, isFeaturedProduct} = req.body;
  if(!saleOffPrice) {
    saleOffPrice = null;
  }
  if(!producerId) {
    producerId = null;
  }
  const thumbnailImg = files[0] ? `http://localhost:4000/${files[0].path}` : null;
  const productImg1 = files[1] ? `http://localhost:4000/${files[1].path}` : null;
  const productImg2 = files[2] ? `http://localhost:4000/${files[2].path}` : null;
  const productImg3 = files[3] ? `http://localhost:4000/${files[3].path}` : null;
  const productImg4 = files[4] ? `http://localhost:4000/${files[4].path}` : null;
	try {
		const newProduct = await Product.create({ 
      name, code, categoryId, amount, description, price, saleOffPrice, producerId, note, isFeaturedProduct, 
      createdBy: userName, thumbnailImg, updatedBy: userName, productImg1, productImg2, productImg3, productImg4
    });
		res.status(201).send(newProduct);
	} catch(error) {
    res.status(500).send(error);
	}
};

const getAllProduct = async (req, res) => {
  const {page, size, term} = req.query;
	const offset = page*size;
	let subQuery = `select count (*) as totalRow from products`;
	if(term && term.length) {
		subQuery += ` where name like '%${term}%'`;
	};
  let query = `select products.id, products.name as name, products.code, categories.name as categoryName,
  categoryId, producerId, producers.name as producerName, amount, price, saleOffPrice, thumbnailImg, description,
  products.createdBy, products.updatedBy, products.createdAt, products.updatedAt from products
   left join categories on products.categoryId = categories.id left join producers on products.producerId = producers.id`;
  if(term && term.length) {
		query += ` where products.name like '%${term}%'`;
	};
	query += ` limit ${size} offset ${offset}`;
	try {
		const [listProducts] = await sequelize.query(query);
    const totalRow = await sequelize.query(subQuery, { type: QueryTypes.SELECT });
    const obj = {};
    obj.listProducts = listProducts;
		obj.totalRow = totalRow[0].totalRow
		res.status(200).send(obj);
	} catch (error) {
		res.status(500).send(error);
	}
};

const updateProduct = async (req, res) => {
	const {userName} = req.user;
	const {name, code, categoryId, amount, description, price, saleOffPrice, producerId, note, isFeaturedProduct } = req.body;
	const { id } = req.params;
	try {
		const newProduct = await Product.findOne({
      where: {
        id,
      },
    });
		newProduct.name = name;
		newProduct.code = code;
    newProduct.categoryId = categoryId;
    newProduct.amount = amount;
    newProduct.description = description;
    newProduct.price = price;
    newProduct.saleOffPrice = saleOffPrice;
    newProduct.producerId = producerId;
    newProduct.note = note;
    newProduct.isFeaturedProduct = isFeaturedProduct;

    const {files} = req;
    if(files && files.length) {
     newProduct.thumbnailImg = files[0] ? `http://localhost:4000/${files[0].path}` : null;
     newProduct.productImg1 = files[1] ? `http://localhost:4000/${files[1].path}` : null;
     newProduct.productImg2 = files[2] ? `http://localhost:4000/${files[2].path}` : null;
     newProduct.productImg3 = files[3] ? `http://localhost:4000/${files[3].path}` : null;
     newProduct.productImg4 = files[4] ? `http://localhost:4000/${files[4].path}` : null;
    };

		newProduct.updatedBy = userName;
		await newProduct.save();
		res.status(201).send(newProduct);
	} catch(error) {
    res.status(500).send(error);
	}
};

const getOneProduct = async (req, res) => {
  const { id } = req.params;
  let query = `select products.id, products.name as name, products.code, categories.name as categoryName,
  categoryId, producerId, producers.name as producerName, amount, price, saleOffPrice, thumbnailImg, 
  productImg2, productImg1, productImg3, productImg4, description,
  products.createdBy, products.updatedBy, products.createdAt, products.updatedAt from products
   left join categories on products.categoryId = categories.id left join producers on products.producerId = producers.id`;
	query += ` where products.id = ${id}`;
	try {
		const [listProducts] = await sequelize.query(query);
    const obj = {};
    obj.product = listProducts[0];
		res.status(200).send(obj);
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = {
  createProduct,
  getAllProduct,
  updateProduct,
  getOneProduct
};