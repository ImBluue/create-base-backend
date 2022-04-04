const { StatusCodes: status } = require('http-status-codes');

const userModel = require('../models/users.js');

const has = require('../util/has.js');

const getUserById = async (req, res) => {
  if (!has(req.params, 'id')) {
    res
      .status(status.BAD_REQUEST)
      .json({ status: false, message: 'You must specify the id' });
    return;
  }

  const { id } = req.params;

  const data = await userModel.findOne({ where: { id } });

  if (!data) {
    res
      .status(status.BAD_REQUEST)
      .json({ status: false, message: 'User not found' });
    return;
  }

  res.json({ status: true, message: 'Returning user', data });
};

const getUsers = async (req, res) => {
  const data = await userModel.findAll();

  res.json({ status: true, message: 'Returning users', data });
};

const addUser = async (req, res) => {
  if (!has(req.body, ['name', 'email'])) {
    res.status(status.BAD_REQUEST).json({
      status: false,
      message: 'You must specify the name and email',
    });
    return;
  }

  const { name, email } = req.body;

  await userModel.create({ name, email });

  res.json({ status: true, message: 'User Added' });
};

const updateUser = async (req, res) => {
  if (!has(req.body, ['id', 'name', 'email'])) {
    res.status(status.BAD_REQUEST).json({
      status: false,
      message: 'You must specify the id, name and email',
    });
    return;
  }

  const { id, name, email } = req.body;

  await userModel.update({ name, email }, { where: { id } });

  res.json({ status: true, message: 'User updated' });
};

const deleteUser = async (req, res) => {
  if (!has(req.params, 'id')) {
    res
      .status(status.BAD_REQUEST)
      .json({ status: false, message: 'You must specify the id' });
    return;
  }

  const { id } = req.params;

  await userModel.destroy({ where: { id } });

  res.json({ status: true, message: 'User deleted' });
};

module.exports = {
  getUserById,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
