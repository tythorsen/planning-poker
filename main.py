import logging, os, sys, webapp2
from webapp2_extras.routes import DomainRoute, PathPrefixRoute, RedirectRoute

# For importing 3rd party modules
cd = os.path.abspath(os.path.dirname(__file__))
sys.path.insert(0, os.path.join(cd, 'lib'))

class HomeHandler(webapp2.RequestHandler):
     def get(self, *args, **kwargs):
         self.response.write("Hello, planning poker!")

routes = [
    RedirectRoute(r"/", redirect_to="/planning-poker/", name="local_root_redirect"),
    RedirectRoute(r"/planning-poker", redirect_to="/planning-poker/", name="strict_slash_redirect"),
    webapp2.Route(r"/planning-poker/<page_path:(.*)>", handler=HomeHandler, name="home"),
]

app = webapp2.WSGIApplication(routes, debug=False)
