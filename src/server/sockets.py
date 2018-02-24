from flask_socketio import SocketIO
import json_handler


def socket_init(app):
    io = SocketIO(app)

    @io.on('connect')
    def connect(*args):
        io.emit('init-items-list', list(json_handler.getitems('todo.json')))

    @io.on('myevent')
    def hello(text):
        print('\n' + '---' * 10 + '\n')
        print(text)
        print('\n' + '---' * 10 + '\n')

        json_handler.append(text, 'todo.json')
        io.emit('take it', text)

    return io
