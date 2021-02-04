from flask import current_app, Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify, send_from_directory

import functools
import requests


bp = Blueprint('huei', __name__, url_prefix='/huei')


@bp.route('/', methods=["GET"])
def index():
    return render_template('huei/index.html')
