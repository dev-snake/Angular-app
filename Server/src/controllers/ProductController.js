const productModel = require("../models/ProductModel");
const userModel = require("../models/UserModel");
const nodemailer = require("nodemailer");
const voucherModel = require("../models/VoucherModel");
require("dotenv").config();
class ProductController {
  async increaseView(req, res) {
    try {
      const { productId } = req.params;
      const product = await productModel.findById(productId);
      product.views += 1;
      await product.save();
      console.log("productId", productId);
      return res.status(200).json({ message: "View increased" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
  async getAllProducts(req, res) {
    try {
      const products = await productModel.find({});
      res.status(200).json(products);
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
      const { userId, email, products, total, discount, amount, voucherCode } =
        req.body;
      products.forEach(async (item) => {
        const product = await productModel.findById(item._id);
        product.quantity_sold += item.quantity;
        product.save();
      });
      const voucher = await voucherModel.findOne({ code: voucherCode });
      if (!voucher) {
        return res.status(400).json({ message: "Voucher not found" });
      }
      if (voucher) {
        voucher.quantityUsed += 1;
        await voucher.save();
      }
      const user = await userModel.findById(userId);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD_EMAIL,
        },
      });
      const style =
        'style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px;"';
      const styleTable =
        'style="width:100% ; border:1px solid #333; text-align:center; border-radius: 5px;"';
      const styleTh = 'style="border:1px solid #333; padding: 10px;"';
      const htmlContent = `
      <div  ${style} >
      <h3 >Chi tiết đơn hàng</h3>
      <p>Ngày đặt hàng: ${new Date().toLocaleString()}</p>
      <p>Email: ${email}</p>
      <p>Tên người nhận: ${user ? user.lastname + user.firstname : ""}</p>
      <p>Địa chỉ: ${user ? user.address : ""}</p>
      <p>Số điện thoại: ${user ? user.phonenumber : ""}</p>
      <h4 >Danh sách sản phẩm</h4>
        <table ${styleTable}>
          <thead>
            <tr>
              <th ${styleTh}>Tên</th>
              <th ${styleTh}>Số lượng</th>
              <th ${styleTh}>Giá</th>
              <th ${styleTh}>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            ${products
              .map(
                (item) => `
              <tr>
                <td >${item.name}</td>
                <td >${item.quantity}</td>
                <td >${item.price} đ</td>
                <td >${item.quantity * item.price}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        <p>Giảm giá: ${discount} đ</p>
        <p>Giá gốc: ${total} đ</p>
        <p>Giá Sau khi giảm giá: ${amount} đ</p>
      </div>
      </div>
    `;
      const mailOptions = {
        from: process.env.EMAIL,
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
      // await orderModel(req.body).save();
      console.log(req.body);
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
