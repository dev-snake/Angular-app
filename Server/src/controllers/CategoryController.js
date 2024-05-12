const categoryModel = require("../models/CategoryModel");
class CategoryController {
  async index(req, res) {
    const categories = await categoryModel.find();
    return res.json(categories);
  }
  async create(req, res) {
    const newCategory = {
      category_id: 4,
      category_name: "Phụ kiện khác",
    };
    await categoryModel.create(newCategory);
    return res.json("Create category successfully");
  }
}
module.exports = new CategoryController();
