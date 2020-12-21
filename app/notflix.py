import functools
import requests

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

bp = Blueprint('notflix', __name__, url_prefix='/notflix')

@bp.route('/test', methods=('GET', 'POST'))
def test():
    if request.method == 'GET':
        return {'response': "OK"}

@bp.route('/', methods=["GET"])
def index():
    return render_template('notflix/index.html')




        