

module.exports = (io) => {

  io.on('connection', (socket) => {
    console.log('user connected', socket);
    socket.on('disconnect', () => {
      console.log('user disconnected');
    })
  })

};
