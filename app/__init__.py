import os

from flask import Flask

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from . import notflix
    app.register_blueprint(notflix.bp)

    from . import lights
    app.register_blueprint(lights.bp)

    from . import spotifynt
    app.register_blueprint(spotifynt.bp)

    from . import home
    app.register_blueprint(home.bp)

    @app.route('/test')
    def hello():
        return 'OK'

    return app