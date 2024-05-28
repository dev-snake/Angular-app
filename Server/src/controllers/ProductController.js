const productModel = require("../models/ProductModel");
const orderModel = require("../models/OrderModel");
const userModel = require("../models/UserModel");
const nodemailer = require("nodemailer");
const juice = require("juice");
require("dotenv").config();
class ProductController {
  async getAllProducts(req, res) {
    try {
      const products = await productModel.find({});
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async createProduct(req, res) {
    const newProduct = new productModel({
      name: req.body.name,
      price: Number(req.body.price),
      category: +req.body.category,
      image: req.body.image,
      description: req.body.description || "",
      title_description_1: req.body.description,
      title_description_2: req.body.description,
      sale: req.body.sale || 0,
    });
    try {
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  }
  async deleteProduct(req, res) {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Product deleted successfully" });
  }
  async updateProduct(req, res) {
    const { productId } = req.params;

    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).json(updatedProduct);
  }
  async createOrder(req, res) {
    try {
      const { userId, email, products, total } = req.body;
      const user = await userModel.findById(userId);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD_EMAIL,
        },
      });
      const htmlContent = `
      <div >
        <h2 >Đơn hàng của bạn</h2>
        <table border='1'>
          <thead>
            <tr>
              <th >Tên</th>
              <th >Số lượng</th>
              <th >Giá</th>
              <th >Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            ${products
              .map(
                (item) => `
              <tr>
                <td >${item.name}</td>
                <td >${item.quantity}</td>
                <td >${item.price}</td>
                <td >${item.quantity * item.price}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        <p>Tổng tiền: ${total}</p>
      </div>
    `;

      const mailOptions = {
        from: "danvanhaufpt2019@gmail.com",
        to: email,
        subject: "Thông tin đặt hàng",
        html: htmlContent,
      };
      transporter.sendMail(mailOptions, (err, infor) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Email sent : ", infor.response);
        }
      });
      if (user) {
        user.orders.push(req.body);
        await user.save();
      }
      await orderModel(req.body).save();
      return res.status(201).json("ordered Successfully");
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  async getProductById(req, res) {
    const { category_id } = req.params;
    const getProducts = await productModel.find({
      category: Number(category_id),
    });
    return res.json(getProducts);
  }
  async getLimitedProducts(req, res) {
    const getProducts = await productModel.find().limit(10);
    return res.json(getProducts);
  }
}
module.exports = new ProductController();
