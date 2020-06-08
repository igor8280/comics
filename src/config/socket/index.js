class Socket {
    constructor({ fastify }) {
        this.io = require('socket.io')(fastify.server);
        this.users = [];
    }

    setup() {
        // console.log('this.io --- ', this.io);
        this.io.on('connection', socket => {
            console.log('socket ID --- ', socket.id);
            console.log('User connected!');

            socket.on('joinRoom', payload => {
                // console.log('room name', payload);
                socket.join(payload.room);
                socket.room = payload.room;

                if (this.users.findIndex(el => el.id === socket.id))
                    this.users.push({socketId: socket.id, user: payload.user});

                // this.io.emit('userEntered', {'users': this.users});
                socket.to(payload.room).emit('userEntered', {'users': this.users});
                console.log('this.users---', this.users);
            });

            socket.on('chatMessage', (msg, fn) => {
                console.log('--- message --- ', msg);
                socket.to(socket.room).emit('chatMessage', msg);
                // this.io.emit('chatMessage', msg);
                fn('Message received.');
            });

            socket.on('disconnect', () => {
                let index = this.users.findIndex(el => el.id === socket.id);
                this.users.splice(index, 1);
                console.log('User disconnected');
                console.log('disconnect remove---', this.users);
            });
        });
    }
}

module.exports = Socket;
