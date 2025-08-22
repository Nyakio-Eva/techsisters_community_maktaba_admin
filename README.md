
# Maktaba Book Lending System-Admin role 

A comprehensive digital library management system designed to streamline book lending operations and eliminate book losses through improved tracking and administration.

## Team Members

| Name | Role | Responsibilities |
|------|------|------------------|
| Evalyne Nyakio | Full-Stack Developer | Backend API development, Database design |
| Heeba Hassan | Frontend Developer | React UI/UX, Dashboard components |
| Rene Bosire | Backend Developer | Authentication |
| Maureen Rotich| Frontend Developer | React UI/UX, Login component |



## Project Overview

### Problem Statement
Traditional library systems suffer from poor book tracking mechanisms, leading to significant book losses, inefficient lending processes, and lack of real-time visibility into library operations. Manual record-keeping often results in discrepancies and makes it difficult for administrators to monitor book movements effectively.

### Our Solution
The Maktaba Book Lending System is a digitized library management platform that provides:
- Real-time book tracking and movement history
- Comprehensive admin dashboard with system analytics
- Role-based access control for secure operations
- Streamlined book lending and return processes

## Features Implemented

### Core Features
- **Admin Authentication**: Secure login system for library administrators
- **Dashboard Analytics**: Real-time system summary statistics and insights
- **Inventory Management**: Complete visibility of total library stock
- **Book Tracking**: Monitor all currently borrowed books with borrower details
- **Movement History**: Comprehensive audit trail of all book transactions (who borrowed what, when, and return status)
  
### Admin User Stories Implemented
- As an admin I can login to the dashboard to view the system summary statistics
- As an admin I can view the Total library stock
- As an admin I can view all Borrowed books from the library
- As an admin I can view the Book movement history (who borrowed what, when, and whether it was returned) in the library

### Technical Features
- RESTful API architecture
- Responsive React frontend
- Secure authentication system
- Real-time data updates
- Comprehensive error handling

## API Endpoints

### Authentication Endpoints
```
POST /api/auth/login - Admin login
```

### Dashboard Endpoints
```
GET /api/dashboard/stats - Get system summary statistics
GET /api/dashboard/stock - Get total library stock
GET /api/dashboard/borrowed - Get all currently borrowed books
GET /api/dashboard/movement-history - Get book movement history
```

### Books Management Endpoints
```
GET /api/books - Get all books
POST /api/books - Add new book (for testing)
PUT /api/books/<book_id>/borrow - Borrow a book (testing)
PUT /api/books/<book_id>/return - Return a book (testing)
```

## Setup Instructions

### Prerequisites
Before running this project, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**
- **pip** (Python package manager)
- **PostgreSQL** (v12 or higher)
- **Git**

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd techsisters_community_maktaba_admin
   ```

2. **Backend Setup (Flask)**
   ```bash
   # Navigate to backend directory
   cd backend
   
   # Create virtual environment
   python -m venv venv
   
   # Activate virtual environment
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   
   # Install dependencies
   pip install -r requirements.txt
   ```

3. **Frontend Setup (React)**
   ```bash
   # Navigate to frontend directory
   cd frontend
   
   # Install dependencies
   npm install
   # or
   yarn install
   ```

4. **Database Setup**
   ```bash
   # Ensure PostgreSQL is running
   # Create database
   createdb maktaba_db
   
   # Navigate to backend directory
   cd backend
   
   # Initialize database tables
   python init_db.py
   
   # Seed sample data (optional)
   python seed.py
   ```

5. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   FLASK_APP=app.py
   FLASK_ENV=development
   SECRET_KEY=your-secret-key-here
   DATABASE_URL=postgresql://username:password@localhost:5432/maktaba_db
   JWT_SECRET_KEY=your-jwt-secret-here
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   python run.py
   ```
   The Flask API will be available at `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm start
   # or
   yarn start
   ```
   The React application will be available at `http://localhost:3000`

3. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`
   - Use the admin credentials to login and access the dashboard

### Default Admin Credentials (for testing)
```
Username: admin@maktaba.com
Password: admin123
```
*Note: Change these credentials in production*

## Challenges Faced

### Technical Challenges
- **Authentication Integration**: Implementing secure JWT-based authentication between React frontend and Flask backend required careful token management and error handling.
- **Real-time Data Synchronization**: Ensuring dashboard statistics update in real-time when books are borrowed or returned presented coordination challenges between frontend and backend.
- **Database Design**: Designing an efficient schema to track book movements while maintaining data integrity and supporting complex queries for reporting.

### Solutions Implemented
- Implemented proper JWT token refresh mechanisms and secure storage
- Used React state management and periodic data fetching for real-time updates
- Created a database schema with proper foreign key relationships

## Future Improvements

### Planned Enhancements
- **Advanced Analytics**: Implement detailed reporting with charts and data visualization
- **User Management**: Expand system to include student/member registration and self-service features
- **Notification System**: Add email/SMS notifications for overdue books and reservation updates
- **Barcode Integration**: Implement barcode scanning for faster book check-in/check-out
- **Multi-library Support**: Scale system to support multiple library branches
- **Advanced Search**: Implement full-text search with filters and categories
- **Automated Reports**: Generate scheduled reports for library administrators
- **Integration APIs**: Connect with external library systems and catalogs

### Technical Improvements
- Implement caching mechanisms and database indexing for better performance
- Add comprehensive unit and integration tests
- Set up CI/CD pipeline for automated deployment
- Implement database migrations system
- Add API documentation with Swagger/OpenAPI

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all team members for their dedication and hard work
- Special thanks to TechSisters Kenya for providing the opportunity to work on this project
- Inspired by the need to modernize traditional library management systems
