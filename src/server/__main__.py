from flask import Flask, escape, render_template, session, redirect, request, url_for
from sockets import socket_init

app = Flask(__name__)
app.config['SCERET_KEY'] = 'ashfksh'

io = socket_init(app)


@app.route('/')
@app.route('/<name>')
def home(name=''):
    if 'username' in session:
        print('\n\n enter \n')
        return render_template('index.html', name=name)
    return redirect('/login')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session['username'] = request.form['username']
        return redirect('/' + session['username'])
    return render_template('login.html')


@app.route('/logout')
def logout():
    # remove the username from the session if it's there
    session.pop('username', None)
    return redirect('/')


app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'


if __name__ == '__main__':
    io.run(app, debug=True)
    # app.run(debug=True)
