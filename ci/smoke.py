"""Smoke test for the asakusa_lab image, run against a live container.

It is fed to the container over stdin (`docker exec -i <name> python - < ci/smoke.py`),
so it never has to be copied into the image, and it can be run by hand the same way.

Two properties matter here and are easy to lose:

* It talks HTTP to the server the image's own CMD started, instead of driving the
  app in-process through Flask's test client. Only the former proves the container
  actually comes up — a broken `__main__` block, a bad WORKDIR or a typo in CMD all
  pass an in-process check while production serves nothing.
* Failures leave through SystemExit, never `assert`. Asserts vanish under
  PYTHONOPTIMIZE=1 (a common slim-image tweak), which would silently turn this gate
  permanently green.

Every route is checked before reporting, so one run shows the full extent of the
breakage rather than only the first broken page.
"""

import urllib.error
import urllib.request

BASE_URL = "http://127.0.0.1:5000"
TIMEOUT = 5

# Every HTML route in app.py. The static handler /pages/<page_name>/<path:filename>
# is deliberately absent: it hands out files from disk and renders no template.
ROUTES = [
    "/",
    "/asakusa",
    "/canns",
    "/cutter",
    "/funnel",
    "/glaze_blend",
    "/mixer",
    "/slip_casting",
]


def check(route):
    """Return None when the route answers 200, otherwise a short reason string."""
    try:
        with urllib.request.urlopen(BASE_URL + route, timeout=TIMEOUT) as response:
            status = response.status
    except urllib.error.HTTPError as error:
        # A 4xx/5xx is an answer, not a transport problem: report the code as is.
        return "HTTP {}".format(error.code)
    except Exception as error:
        # Connection refused, timeout, DNS — anything that kept us from an answer.
        return "{}: {}".format(type(error).__name__, error)
    if status != 200:
        return "HTTP {}".format(status)
    return None


def main():
    failures = []
    for route in ROUTES:
        reason = check(route)
        if reason is None:
            print("ok   {}".format(route))
        else:
            print("FAIL {} -> {}".format(route, reason))
            failures.append("{} ({})".format(route, reason))

    if failures:
        print("smoke FAILED: {}/{} routes broken: {}".format(
            len(failures), len(ROUTES), ", ".join(failures)))
        raise SystemExit(1)

    print("smoke ok: {}/{} routes".format(len(ROUTES), len(ROUTES)))


if __name__ == "__main__":
    main()
