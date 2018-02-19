from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SCERET_KEY'] = 'ashfksh'

io = SocketIO(app)


@app.route('/')
def home():
    return render_template('index.html')


@io.on('myevent')
def hello(data):
    print('\n\n\n' + '---' * 10 + '\n\n\n')
    print(data)


if __name__ == '__main__':
    io.run(app, debug=True)
    # app.run(debug=True)
