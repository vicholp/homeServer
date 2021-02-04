from flask import current_app, Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify, send_from_directory

import functools
import requests


bp = Blueprint('home', __name__, url_prefix='/')


@bp.route('/test', methods=('GET', 'POST'))
def test():
    return {'response': "OK"}

@bp.route('/', methods=["GET"])
def index():
    return render_template('home/index.html')
