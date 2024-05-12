const productModel = require("../models/ProductModel");
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
      name: "Rainy 75 White",
      price: 1900,
      image: "../../assets/images/rainy75white.png",
      category: 1,
      sale: 1,
      description: `RAINY75 - BÀN PHÍM CƠ KHUNG NHÔM QUỐC DÂN. Cáp Type-C có thể tháo rời và kích thước nhỏ giúp bạn dễ dàng mang theo khi sử dụng tại nhà/văn phòng hoặc đi công tác. Kết nối 3 chế độ : có dây Type C | 2.4Ghz | Bluetooth 3.0 & 5.0 dễ dàng dành cho bạn. Bàn phím cơ chơi game có đèn nền LED Rainbow + Keycap Doubleshot xuyên Led cùng keycap màu trắng mang đến cho bạn những hiệu ứng hình ảnh thú vị. Nó được trang bị 6 màu đèn nền và 20 chế độ đèn nền để cá nhân hóa diện mạo bàn phím cơ của bạn.
       
        `,
      title_description_1: "RAINY75 - BÀN PHÍM CƠ KHUNG NHÔM QUỐC DÂN",
      title_description_2:
        " RAINY75 - BÀN PHÍM CƠ KHUNG NHÔM QUỐC DÂN kết nối 3 chế độ : có dây Type C | 2.4Ghz | Bluetooth 3.0 & 5.0 dễ dàng dành cho bạn.",
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
    return res.json({ message: "Product deleted successfully" });
  }
}
8;
module.exports = new ProductController();
