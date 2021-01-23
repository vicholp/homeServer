import os

from flask import Flask

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )
    app.templates_auto_reload  = True

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/test')
    def hello():
        return 'OK'

    from . import notflix
    from . import lights
    from . import spotifynt
    from . import home
    app.register_blueprint(notflix.bp)
    app.register_blueprint(lights.bp)
    app.register_blueprint(spotifynt.bp)
    app.register_blueprint(home.bp)

    return app
