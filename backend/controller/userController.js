const { User } = require('../models');
const { where } = require('sequelize');

class UserController {
  static async fetchAllUser(req, res, next) {
    try {
      const fetchAllUser = await User.findAll();
      res.status(200).json({
        message: 'All users have been fetched',
        statusCode: 200,
        fetchAllUser
      });
    } catch (error) {
      next(error)
    }
  }

  static async fetchUserById(req, res, next) {
    try {
      const { id } = req.params;
      const fetchUserById = await User.findByPk(id);

      if (!fetchUserById) {
        throw ({ name: 'NotFound' }, id);
      }

      res.status(200).json({
        message: `Successfully fetched user with id: ${id}`,
        statusCode: 200,
        fetchUserById
      });
    } catch (error) {
      next(error)
    }
  }

  static async addUser(req, res, next) {
    try {
      const { name, email, age } = req.body;
      const newUser = await User.create({ name, email, age });
      res.status(201).json({
        message: 'User has been created',
        statusCode: 201,
        newUser
      });
    } catch (error) {
      next(error)
    }
  }

  static async updateUserById(req, res, next) {
    try {
      const { id } = req.params;
      const { name, email, age } = req.body;
      const user = await User.findByPk(id);

      if (!user) {
        throw ({ name: 'NotFound' }, id);
      }

      await user.update({ name, email, age }, {
        where: { id }
      });

      const updatedUser = await User.findByPk(id);
      res.status(200).json({
        message: `User with id: ${id} has been updated`,
        statusCode: 200,
        updatedUser
      });
    } catch (error) {
      next(error)
    }
  }

  static async deleteUserById(req, res, next) {
    try {
      const { id } = req.params;
      const findUser = await User.findByPk(id);

      if (!findUser) {
        throw ({ name: 'NotFound' }, id);
      }

      const deleteUser = await User.destroy({
        where: { id }
      });

      res.status(200).json({
        message: `User with id: ${id} has been deleted`,
        statusCode: 200
      });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController;