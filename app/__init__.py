from flask import Flask

import os


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    app.templates_auto_reload = True

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from . import notflix
    from . import huei
    from . import spotifynt
    from . import home
    from . import server
    app.register_blueprint(notflix.bp)
    app.register_blueprint(huei.bp)
    app.register_blueprint(spotifynt.bp)
    app.register_blueprint(home.bp)
    app.register_blueprint(server.bp)

    return app
