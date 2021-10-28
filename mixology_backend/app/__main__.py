from flask import Flask
from mixology_backend.cocktail_db.actions import Actions


app = Flask('__init__')


@app.route('/most-popular')
def route_default():
    return Actions.fetch_most_popular()


app.run()
