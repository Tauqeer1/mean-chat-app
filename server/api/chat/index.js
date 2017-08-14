const express = require('express');
const chatController = require('./chat.controller');



const router = express.Router();

router.get('/', chatController.index);

//Get all chats in specified room
router.get('/:room', chatController.show);

// Save chat
router.post('/', chatController.create);
router.put('/:id', chatController.update);
router.delete('/:id', chatController.delete);

module.exports = router;
