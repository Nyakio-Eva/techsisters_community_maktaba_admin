
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from app.models import Book, BookLog, Reader, db
from sqlalchemy import func

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_stats():
    total_books = Book.query.count()
    total_readers = Reader.query.count()
    borrowed_books = Book.query.filter_by(status='borrowed').count()
    available_books = Book.query.filter_by(status='available').count()
    
    return jsonify({
        'total_books': total_books,
        'total_readers': total_readers,
        'borrowed_books': borrowed_books,
        'available_books': available_books
    })

@dashboard_bp.route('/stock', methods=['GET'])
@jwt_required()
def get_stock():
    books = Book.query.all()
    stock_data = []
    
    for book in books:
        stock_data.append({
            'book_id': book.book_id,
            'title': book.title,
            'author': book.author,
            'isbn': book.isbn,
            'status': book.status
        })
    
    return jsonify({
        'total_stock': len(stock_data),
        'books': stock_data
    })

@dashboard_bp.route('/borrowed', methods=['GET'])
@jwt_required()
def get_borrowed_books():
    borrowed_logs = db.session.query(BookLog, Book, Reader).join(
        Book, BookLog.book_id == Book.book_id
    ).join(
        Reader, BookLog.reader_id == Reader.reader_id
    ).filter(BookLog.status == 'borrowed').all()
    
    borrowed_data = []
    for log, book, reader in borrowed_logs:
        borrowed_data.append({
            'log_id': log.log_id,
            'book_title': book.title,
            'book_isbn': book.isbn,
            'reader_name': reader.name,
            'reader_email': reader.email,
            'borrowed_at': log.borrowed_at.isoformat()
        })
    
    return jsonify({'borrowed_books': borrowed_data})

@dashboard_bp.route('/movement-history', methods=['GET'])
@jwt_required()
def get_movement_history():
    logs = db.session.query(BookLog, Book, Reader).join(
        Book, BookLog.book_id == Book.book_id
    ).join(
        Reader, BookLog.reader_id == Reader.reader_id
    ).order_by(BookLog.borrowed_at.desc()).all()
    
    history_data = []
    for log, book, reader in logs:
        history_data.append({
            'log_id': log.log_id,
            'book_title': book.title,
            'book_isbn': book.isbn,
            'reader_name': reader.name,
            'reader_email': reader.email,
            'borrowed_at': log.borrowed_at.isoformat(),
            'returned_at': log.returned_at.isoformat() if log.returned_at else None,
            'status': log.status
        })
    
    return jsonify({'movement_history': history_data})