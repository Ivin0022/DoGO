from flask import Flask, escape, render_template, session, redirect, request, url_for
from flask_socketio import SocketIO
import json_handler

app = Flask(__name__)
app.config['SCERET_KEY'] = 'ashfksh'

io = SocketIO(app)


@app.route('/l')
def launcher():
    return render_template('launcher.html')


@app.route('/')
def home():
    return render_template('index.html')


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


app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

if __name__ == '__main__':
    io.run(app, debug=True)
    # app.run(debug=True)
