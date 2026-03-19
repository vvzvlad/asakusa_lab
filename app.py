import os

from flask import Flask, render_template, request, redirect
from loguru import logger

app = Flask(__name__)


@app.before_request
def redirect_glazymixer():
    # Redirect legacy domain glazymixer.vvzvlad.xyz to the main site's glaze_blend page
    if request.host == "glazymixer.vvzvlad.xyz":
        return redirect("https://asakusa-lab.cc/glaze_blend?from=glazymixer", code=301)


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
    show_old_domain_notice = request.args.get("from") == "glazymixer"
    return render_template("glaze_blend.html", show_old_domain_notice=show_old_domain_notice)


@app.route("/mixer")
def mixer():
    return render_template("mixer.html")


if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    logger.info(f"Starting server on port {port}")
    app.run(host="0.0.0.0", port=port)
