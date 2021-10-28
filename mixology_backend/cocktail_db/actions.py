import requests
from mixology_backend.config import BASE_URL


class Actions:
    def __init__(self):
        pass

    @staticmethod
    def fetch_most_popular():
        res = requests.get(f'{BASE_URL}/popular.php')

        return res.json()
