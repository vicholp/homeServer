from flask import current_app, Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify, send_from_directory

import functools
import requests


bp = Blueprint('spotifynt', __name__, url_prefix='/spotifynt')


@bp.route('/', methods=["GET"])
def index():
    return render_template('spotifynt/index.html')

