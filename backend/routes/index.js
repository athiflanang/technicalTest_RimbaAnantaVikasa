const router = require('express').Router();
const userController = require('../controller/userController');
const errorHandler = require('../middleware/errorHandler');

router.get('/user', userController.fetchAllUser)
router.get('/user/:id', userController.fetchUserById)
router.post('/user', userController.addUser)
router.put('/user/:id', userController.updateUserById)
router.delete('/user/:id', userController.deleteUserById)

router.use(errorHandler)

module.exports = router;
