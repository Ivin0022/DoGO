from flask_socketio import SocketIO
from json_handler import createJSON
import view

items = createJSON('toooodo')


io = SocketIO(view.app)


@io.on('connect')
def connect(*args):
    io.emit('init-list-items', list(items.get()))


@io.on('add-list-item')
def hello(text):
    io.emit('add-list-item-client', items.add(text))


@io.on('edit-list-item')
def edit(data):
    items.update(data['id'], status=data)


@io.on('delete-list-item')
def deleteItem(itemId):
    print('delete')
    items.delete(*itemId.split())
    io.emit('delete-list-item-client', itemId)

if __name__ == '__main__':
    io.run(view.app, debug=True)