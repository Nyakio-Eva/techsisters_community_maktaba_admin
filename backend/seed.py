# seed.py
from app import create_app
from app.models import db, Admin, Reader, Book, BookLog
from datetime import datetime, timedelta
import random

app = create_app()

def seed_database():
    with app.app_context():
        # Drop and create all tables
        db.drop_all()
        db.create_all()
        
        # Create admin
        admin = Admin(name='Library Admin', email='admin@library.com')
        admin.set_password('admin123')
        db.session.add(admin)
        
        # Create readers
        readers_data = [
            ('John Doe', 'john@email.com'),
            ('Jane Smith', 'jane@email.com'),
            ('Mike Johnson', 'mike@email.com'),
            ('Sarah Wilson', 'sarah@email.com'),
            ('David Brown', 'david@email.com')
        ]
        
        readers = []
        for name, email in readers_data:
            reader = Reader(name=name, email=email)
            reader.set_password('password123')
            readers.append(reader)
            db.session.add(reader)
        
        # Create books
        books_data = [
            ('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565'),
            ('To Kill a Mockingbird', 'Harper Lee', '9780446310789'),
            ('1984', 'George Orwell', '9780451524935'),
            ('Pride and Prejudice', 'Jane Austen', '9780486284736'),
            ('The Catcher in the Rye', 'J.D. Salinger', '9780316769174'),
            ('Lord of the Flies', 'William Golding', '9780571056866'),
            ('The Lord of the Rings', 'J.R.R. Tolkien', '9780618640157'),
            ('Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', '9780747532699'),
            ('The Da Vinci Code', 'Dan Brown', '9780307474278'),
            ('The Alchemist', 'Paulo Coelho', '9780061122415')
        ]
        
        books = []
        for title, author, isbn in books_data:
            book = Book(title=title, author=author, isbn=isbn)
            books.append(book)
            db.session.add(book)
        
        db.session.commit()
        
        # Create some borrowing history
        for i in range(15):
            reader = random.choice(readers)
            book = random.choice(books)
            
            # Some books are currently borrowed, others returned
            is_returned = random.choice([True, False, False])  # 1/3 chance of being returned
            
            borrowed_date = datetime.utcnow() - timedelta(days=random.randint(1, 30))
            
            log = BookLog(
                reader_id=reader.reader_id,
                book_id=book.book_id,
                borrowed_at=borrowed_date,
                status='returned' if is_returned else 'borrowed'
            )
            
            if is_returned:
                log.returned_at = borrowed_date + timedelta(days=random.randint(1, 14))
                book.status = 'available'
            else:
                book.status = 'borrowed'
            
            db.session.add(log)
        
        db.session.commit()
        print("Database seeded successfully!")

if __name__ == '__main__':
    seed_database()