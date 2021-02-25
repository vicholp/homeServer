from flask import current_app, Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify, send_from_directory

from hurry.filesize import size
from hurry.filesize import alternative

import functools
import requests
import psutil


bp = Blueprint('server', __name__, url_prefix='/server')


@bp.route('/', methods=["GET"])
def index():

  return render_template('server/index.html')

@bp.route('/info/cpu', methods=["GET"])
def getCpu():
  print(psutil.cpu_freq(percpu=True))
  return jsonify(psutil.cpu_freq(percpu=True))

@bp.route('/info/disks', methods=["GET"])
def getDisks():
  return jsonify(psutil.disk_usage('/'))

@bp.route('/info/network', methods=["GET"])
def getNet():
  return jsonify(psutil.cpu_freq(percpu=True))

@bp.route('/info/ram', methods=["GET"])
def getRam():
  return jsonify(psutil.disk_usage('/'))







