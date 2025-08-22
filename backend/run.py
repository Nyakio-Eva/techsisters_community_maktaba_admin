
from app import create_app
from app.models import db

app = create_app()

# Create tables within app context (replaces before_first_request)
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, port=5000)
    
    