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
    console.log('req', req.body);
    // return res.json({success: true, data: req.body, error: null});

    Chat.create(req.body)
      .then(chat => {
        console.log('chat', chat);
        return res.json({success: true, data: chat, error: null});
      })
      .catch(err => {
        console.error('err', err);
        return res.json({success: false, data: null, error: err});
      });
  },
  update(req, res) {

  },
  delete(req, res) {

  }
};
