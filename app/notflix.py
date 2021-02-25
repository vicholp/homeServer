from flask import current_app, Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify, send_from_directory

import functools
import requests


bp = Blueprint('notflix', __name__, url_prefix='/notflix')


@bp.route('/', methods=["GET"])
def index():
    return render_template('notflix/index.html')

@bp.route('/movie', methods=["GET"])
def movie():
    return render_template('notflix/movie.html')

@bp.route('/search', methods=["GET"])
def search():
    return render_template('notflix/search.html')

@bp.route('/player', methods=["GET"])
def player():
    return render_template('notflix/player.html')
