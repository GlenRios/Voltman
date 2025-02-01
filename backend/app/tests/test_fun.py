import json
from requests import Session

class Client(Session):
    """HTTP client. Inherits from Session"""

    def __init__(self, *args, url: str = None, **kwargs):
        self.BASE_URL: str = url
        self.URL_PARAMS: set = kwargs.pop("URL_PARAMS", [])

        self._url = self.BASE_URL
        self._res = None  # DEBUG: last response

        super().__init__(*args, **kwargs)

    def __getattr__(self, name):
        """Takes any attribute that is placed in settings.py PARAMS and adds it to
        the _url attribute"""
        if hasattr(type(self), name) and name not in self.URL_PARAMS:
            raise AttributeError(name, "Did you register this url param?")
        self._url += f"{name}/"
        return self

    def kwarg(self, *args):
        """
        Add an url kwarg to the path for complex urls:

        >>> self.kwarg(1)
        >>> self._url
        :[BASE_URL]1/

        Made specially to cast numerical ids to str.
        """
        for value in args:
            self._url += f"{value}/"
        return self

    # --- helper methods ---
    def check_for_errors(self, res):  # pylint: disable=C0116
        if res.status_code > 399:
            # there is an error
            message = ""
            try:
                for key, value in res.json().items():
                    # since the response often comes as a list
                    error = key.capitalize()
                    message = "".join(value)
                    message += (
                        f"{error}: {message}\nHeaders: {res.headers}\n"
                        f"Client headers: {self.headers}. Url: {res.url}"
                    )

                print(message)  # pylint: disable=E1101
                print(message)  # pylint: disable=E1101
            except json.decoder.JSONDecodeError:
                print(  # pylint: disable=E1101
                    f"Could't aqcuire JSON response. URL: {res.url}. \n"
                    f"Headers: {res.headers}. Code: {res.status_code}. Url: {res.url}"
                )
            return True
        return False

    def urlize_params(self, params: dict):
        """
        Transform a dict into its url-encoded equivalent

        >>> urlize_params({"key": "val", "foo": "bar"})
        ?key=val&foo=bar
        """
        url = "?"
        url += "&".join([f"{key}={val}" for key, val in params.items()])

        return url

    # --- core methods ---
    def request(self, method, url, data=None):
        """Base request function"""
        res = Session().request(method=method, url=url, json=data, headers=self.headers)
        self._res = res

        self._url = self.BASE_URL  # clean up

        if not self.check_for_errors(res):
            if (
                res.status_code != 204
            ):  # XXX no way around it. DELETE doesn't send a JSON response
                return res.json()
        return None

    # --- overriden convenience methods ---
    # XXX should I have avoided overriding them?
    # and made alternative methods in its place
    # (make, edit)
    def create(self, data):  # pylint: disable=C0116
        return self.request("POST", self._url, data=data)

    def update(self, id_, data):  # pylint: disable=C0116
        return self.request("PUT", self._url + f"{id_}/", data)

    def get(self, id_):  # pylint: disable=C0116
        return self.request("GET", self._url + f"{id_}/")

    def list(self, params: dict = None):  # pylint: disable=C0116
        params = {} or params
        url_params = ""
        if params:
            url_params = self.urlize_params(params)
        self._url = self._url.rstrip(
            "/"
        )  # list accepts url kwargs. so we can't add the slash
        return self.request("GET", self._url + url_params)

    def delete(self, id_):  # pylint: disable=C0116
        return self.request("DELETE", self._url + f"{id_}/")

    def patch(self, id_, data):
        return NotImplemented

    # short-circuit other methods to avoid confusion
    def options(self, *args, **kwargs):
        raise NotImplementedError

    def head(self, *args, **kwargs):
        raise NotImplementedError

BASE_URL = "http://localhost:5050/api/"

headers = {}
headers["Are-you-stupid"] = "Yeah"


client = Client(url=BASE_URL)
# header required to get superuser faculties to prepare the data

def create_user(name="SuperAdmin", group_id=1, company_id=1):
    # global
    data = {
        "Username": name,
        "Password": "123",
        "Type": "SuperAdmin",
        "Company": "company0",
    }
    return client.user.create(data)

def create_company(name="BlobCorp"):
    data = {
        "Name": name,
    }
    return client.branch.create(data)

def create_area(name="BlobCorp"):
    data = {
        "Name": name,
        "Company": "company0",
        "Responsible": "me",
    }
    return client.area.create(data)

## anon
# auth


# login
data = {
    "Username": "SuperAdmin",
    "Password": "voltman000",
}
token = client.user.login.create(data)
headers["Authorization"] = f'Bearer {token["token"]}'
client.headers.update(headers)

# user
user = create_user(name="Anon")
user["Username"] = "Anonon"
user["NewPassword"] = user["Password"]
client.user.update(user["id"], user)
res = any([u["Username"] == "Anonon" for u in client.user.list()])
client.user.delete(user["id"])
assert res, "PUT failed"

# branch
comp = create_company()
comp["Name"] = "Anonon"
client.branch.update(comp["id"], comp)
res = any([c["Name"] == "Anonon" for c in client.branch.list()])
client.branch.delete(comp["id"])
assert res, "PUT failed"

# area
area = create_area()
area["Name"] = "Anonon"
client.area.update(area["id"], area)
res = any([a["Name"] == "Anonon" for a in client.area.get(1)])
client.area.delete(area["id"])
assert res, "PUT failed"
