

module.exports = (io) => {

  io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('save-message', (data) => {
      console.log('save-message data', data);
      // console.log('save-message data', res);
      io.emit('new-message', data);
    });


  })

};
