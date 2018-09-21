import logging, os, yaml
from google.appengine.api import app_identity

if os.environ.get('SERVER_SOFTWARE', '').startswith('Dev'):
    environment = "local"
else:
    try:
        environment = app_identity.get_application_id()
    except:
        environment = "local"

config_file = "%s.yaml" % environment
curr_path = os.path.dirname(__file__)
config_path = os.path.join(curr_path, "config", config_file)

stream = file(config_path, 'r')
config = yaml.load(stream)
config["environment"] = environment

stream.close()
