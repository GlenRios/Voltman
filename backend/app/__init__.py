from Configurations.conf_app import create_app
from seed.poblate import poblate

app = create_app()

if __name__ == "__main__":
    app.run(port= 5050,debug=True)