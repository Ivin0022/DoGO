from flask import Flask, escape, render_template, session, redirect, request, url_for
from flask_login import LoginManager, UserMixin, login_user, login_required, current_user, logout_user


app = Flask(__name__)
app.config['SCERET_KEY'] = 'ashfksh'
app.secret_key = 'super secret string'

login_manager = LoginManager()
login_manager.init_app(app)


users = {
    'ivin': 'sam',
    'sam': 'a'
}


class User(UserMixin):
    pass


@login_manager.user_loader
def user_loader(email):
    if email not in users:
        return

    user = User()
    user.id = email
    return user


@login_manager.request_loader
def request_loader(req):
    email = req.form.get('email')
    if email not in users:
        return

    user = User()
    user.id = email

    # DO NOT ever store passwords in plaintext and always compare password
    # hashes using constant-time comparison!
    user.is_authenticated = req.form['password'] == users[email]

    return user


@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')

    email = request.form['email']
    if request.form['password'] == users[email]:
        user = User()
        user.id = email
        login_user(user)
        return redirect(url_for('protected'))

    return 'Bad login'


@app.route('/protected')
@login_required
def protected():
    return render_template('index.html', id=current_user.id)


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('login'))


@login_manager.unauthorized_handler
def unauthorized_handler():
    return 'Unauthorized'
