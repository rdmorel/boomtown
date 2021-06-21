from locust import HttpUser, task, between

class TestUser(HttpUser):
    host = 'https://api.preprod.goboomtown.com/sdk/v1/kb/search'
    headers = {"X-Boomtown-Integration": "MF49ER", "X-Boomtown-Key": "4dZ8mxjtkdLW3KLZJdaP5uHWtjk4eLrBDnLJB2hA6EUS"}
    wait_time = between(5, 9)
    
    @task(3)
    def basicGet(self):
        self.client.get(self.host, headers = self.headers)

    @task(5)
    def query(self):
        self.client.get(self.host+'?query=test', headers=self.headers)

    @task(3)
    def paginate(self):
        self.client.get(self.host+'?start=0&limit=10', headers=self.headers)

    @task(1)
    def paginatedQuery(self):
        self.client.get(self.host+'?start=0&limit=10&query=test', headers=self.headers)

