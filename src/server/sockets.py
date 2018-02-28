from flask_socketio import SocketIO
from json_handler import createJSON


items = createJSON('toooodo')


def socket_init(app):
    io = SocketIO(app)

    @io.on('connect')
    def connect(*args):
        io.emit('init-list-items', list(items.get()))

    @io.on('add-list-item')
    def hello(text):
        io.emit('add-list-item-client', items.add(text))

    @io.on('delete-list-item')
    def deleteItem(itemId):
        print('delete')
        items.delete(*itemId.split())
        io.emit('delete-list-item-client', itemId)
    return io
