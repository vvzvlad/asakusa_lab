"""Smoke test for the asakusa_lab image, run against a live container.

It is fed to the container over stdin (`docker exec -i <name> python - < ci/smoke.py`),
so it never has to be copied into the image, and it can be run by hand the same way.

It talks HTTP to the server the image's own CMD started (not Flask's test client),
so it proves the container actually comes up. Failures leave through SystemExit,
never `assert`, which vanishes under PYTHONOPTIMIZE=1. Every route is checked
before reporting.
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
