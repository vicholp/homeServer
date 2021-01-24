import functools
import requests

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

bp = Blueprint('spotifynt', __name__, url_prefix='/spotifynt')

@bp.route('/', methods=["GET"])
def index():
    return render_template('spotifynt/index.html')

@bp.route('/test', methods=["GET"])
def aa():
    return render_template('spotifynt/test.html')




