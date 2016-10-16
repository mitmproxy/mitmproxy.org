import sys
import countershape.layout
import countershape.model
import countershape.markup
from countershape.doc import *

from netlib import version

ns.VERSION = version.VERSION

this.titlePrefix = "mitmproxy - "

this.markup = countershape.markup.Markdown()
this.layout = countershape.layout.FileLayout("_layout.html")
ns.ga = file("_ga.html").read()
ns.menu = countershape.widgets.PageIndex(
                [
                    '/index.html',
                    '/about.html',
                ],
                depth=1,
                divclass="nav",
                currentActive=True,
          )


pages = [
    Page("index.html", "home"),
    Page("about.html", "about"),
]
