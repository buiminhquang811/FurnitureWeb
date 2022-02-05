const { Product, sequelize } = require("../models");

const createProduct = async (req, res) => {
  console.log("REQ::::", req);
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
	try {
		const [listProducts] = await sequelize.query(
		`select id, name, code, categoryId, amount, description, price, saleOffPrice, producerId, note, isFeaturedProduct,createdBy, updatedAt, thumbnailImg, productImg1, productImg2, productImg3, productImg4 from products`
		);
		res.status(200).send(listProducts);
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

module.exports = {
  createProduct,
  getAllProduct,
  updateProduct
};