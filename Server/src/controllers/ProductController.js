const { request } = require("express");
const productModel = require("../models/ProductModel");
const {
  log,
} = require("@angular-devkit/build-angular/src/builders/ssr-dev-server");
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
    const product = new productModel({
      name: "DUAL MODE",
      price: 1900,
      image: "../../assets/images/banphimcoblue.png",
      category: 1,
      sale: 1,
      description: `[82 phím có LED Rainbow] Bàn phím chơi game 82 phím có thể tiết kiệm không gian bàn làm việc. Cáp Type-C có thể tháo rời và kích thước nhỏ giúp bạn dễ dàng mang theo khi sử dụng tại nhà/văn phòng hoặc đi công tác. Kết nối 3 chế độ : có dây Type C | 2.4Ghz | Bluetooth 3.0 & 5.0 dễ dàng dành cho bạn. Bàn phím cơ chơi game có đèn nền LED Rainbow + Keycap Doubleshot xuyên Led cùng keycap màu trắng mang đến cho bạn những hiệu ứng hình ảnh thú vị. Nó được trang bị 6 màu đèn nền và 20 chế độ đèn nền để cá nhân hóa diện mạo bàn phím cơ của bạn.
      [Switch Hotswap] Chức năng có thể thay thế nóng có thể cho phép bạn tùy chỉnh bàn phím cơ của mình với bố cục kết hợp khác nhau trên keycaps và công tắc 3 chân. Red Switch có đặc điểm là tuyến tính và mượt mà hơn, âm thanh phím nhẹ với lực cản tối thiểu nhưng thao tác nhanh mà không cần một cảm giác xúc giác; dễ dàng chạm vào bàn phím chơi game。
      
       
        `,
      title_description_1:
        "Bàn phím cơ Dual Mode Mechanical Gaming Newmen GM326 75%, 82 phím",
      title_description_2: "THỜI THƯỢNG HƠN NEWMEN GE369RGB.",
    });
    try {
      const newProduct = await product.save();
      res.status(201).json(newProduct);
    } catch (error) {
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
}
8;
module.exports = new ProductController();
