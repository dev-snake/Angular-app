const categoryModel = require("../models/CategoryModel");
class CategoryController {
  async index(req, res) {
    const categories = await categoryModel.find();
    return res.json(categories);
  }
  async create(req, res) {
    const length = await categoryModel.find().countDocuments();
    const newCategory = {
      category_name: req.body.category_name,
      category_id: length + 1,
    };
    await categoryModel.create(newCategory);
    return res.json("Create category successfully");
  }
  async delete(req, res) {
    try {
      const { category_id } = req.params;
      await categoryModel.findOneAndDelete({ category_id });
      return res.json("Delete category successfully");
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  }
  async update(req, res) {
    try {
      const { category_id } = req.params;
      await categoryModel.findOneAndUpdate({ category_id }, req.body, {
        new: true,
      });
      return res.json("Update category successfully");
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  }
}
module.exports = new CategoryController();
