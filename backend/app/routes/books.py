# app/routes/books.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.models import Book, BookLog, Reader, db
from datetime import datetime

books_bp = Blueprint('books', __name__)

@books_bp.route('', methods=['GET'])
@jwt_required()
def get_books():
    books = Book.query.all()
    books_data = []
    
    for book in books:
        books_data.append({
            'book_id': book.book_id,
            'title': book.title,
            'author': book.author,
            'isbn': book.isbn,
            'status': book.status
        })
    
    return jsonify({'books': books_data})

@books_bp.route('', methods=['POST'])
@jwt_required()
def add_book():
    data = request.get_json()
    
    if not all(k in data for k in ('title', 'author', 'isbn')):
        return jsonify({'error': 'Title, author, and ISBN required'}), 400
    
    book = Book(
        title=data['title'],
        author=data['author'],
        isbn=data['isbn']
    )
    
    try:
        db.session.add(book)
        db.session.commit()
        return jsonify({'message': 'Book added successfully', 'book_id': book.book_id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to add book'}), 500

@books_bp.route('/<int:book_id>/borrow', methods=['PUT'])
@jwt_required()
def borrow_book(book_id):
    data = request.get_json()
    reader_id = data.get('reader_id')
    
    if not reader_id:
        return jsonify({'error': 'Reader ID required'}), 400
    
    book = Book.query.get_or_404(book_id)
    reader = Reader.query.get_or_404(reader_id)
    
    if book.status == 'borrowed':
        return jsonify({'error': 'Book is already borrowed'}), 400
    
    # Update book status
    book.status = 'borrowed'
    
    # Create log entry
    log = BookLog(
        reader_id=reader_id,
        book_id=book_id,
        status='borrowed'
    )
    
    try:
        db.session.add(log)
        db.session.commit()
        return jsonify({'message': 'Book borrowed successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to borrow book'}), 500

@books_bp.route('/<int:book_id>/return', methods=['PUT'])
@jwt_required()
def return_book(book_id):
    book = Book.query.get_or_404(book_id)
    
    if book.status == 'available':
        return jsonify({'error': 'Book is not borrowed'}), 400
    
    # Find the active borrowing log
    active_log = BookLog.query.filter_by(
        book_id=book_id,
        status='borrowed'
    ).first()
    
    if not active_log:
        return jsonify({'error': 'No active borrowing record found'}), 400
    
    # Update book status
    book.status = 'available'
    
    # Update log
    active_log.returned_at = datetime.utcnow()
    active_log.status = 'returned'
    
    try:
        db.session.commit()
        return jsonify({'message': 'Book returned successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to return book'}), 500