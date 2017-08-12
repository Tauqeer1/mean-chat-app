const Chat = require('./chat.model');

module.exports = {
  index(req, res) {

  },

  show(req, res) {
    Chat.find({room: req.params.room}).exec((err, chats) => {
      if (err) {
        console.error('err', err);
        return res.json({success: false, data: null, error: err});
      }
      return res.json({success: true, data: chats, error: null});
    });
  },
  create(req, res) {
    Chat.create(req.body).exec((err, chat) => {
      if(err) {
        console.error('err', err);
        return res.json({success: false, data: null, error: err});
      }
      return res.json({success: true, data: chat, error: null});
    })
  },
  update(req, res) {

  },
  delete(req, res) {

  }
};
