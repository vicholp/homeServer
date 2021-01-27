import functools
import requests

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

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




