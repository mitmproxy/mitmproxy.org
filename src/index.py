import countershape.layout
import countershape.model
import countershape.markup
from countershape.doc import *
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

