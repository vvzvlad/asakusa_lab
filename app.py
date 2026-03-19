import os

from flask import Flask, render_template
from loguru import logger

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/asakusa")
def asakusa():
    return render_template("asakusa.html")


@app.route("/canns")
def canns():
    return render_template("canns.html")


@app.route("/cutter")
def cutter():
    return render_template("cutter.html")


@app.route("/funnel")
def funnel():
    return render_template("funnel.html")


@app.route("/glaze_blend")
def glaze_blend():
    return render_template("glaze_blend.html")


@app.route("/mixer")
def mixer():
    return render_template("mixer.html")


if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    logger.info(f"Starting server on port {port}")
    app.run(host="0.0.0.0", port=port)
