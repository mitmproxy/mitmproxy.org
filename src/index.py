import sys
import countershape.layout
import countershape.model
import countershape.markup
from countershape.doc import *

MITMPROXY_SRC = os.path.abspath(
    os.path.expanduser(os.environ.get("MITMPROXY_SRC", ".."))
)
sys.path.insert(0, MITMPROXY_SRC)
from libmproxy import version

ns.VERSION = version.VERSION

this.titlePrefix = "mitmproxy - "

this.markup = countershape.markup.Markdown()
this.layout = countershape.Layout("_layout.html")
ns.ga = file("_ga.html").read()
ns.menu = countershape.widgets.PageIndex(
                [
                    '/index.html',
                    '/doc/index.html',
                    '/about.html',
                ],
                depth=1,
                divclass="nav",
                currentActive=True,
          )


pages = [
    Page("index.html", "home"),
    Directory("doc"),
    Page("about.html", "about"),
]

