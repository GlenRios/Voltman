from app.Configurations.conf_app import create_app
from app.seed.poblate import poblate

app = create_app()

# poblate(20, 400, 250, 1500, 2000)

if __name__ == "__main__":
    app.run(port= 5050, debug=True)