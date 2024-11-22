# My Blog Project

A modern blog application built with Django Rest Framework (DRF) backend and React frontend. The application uses PostgreSQL for database management and AWS S3 for media file storage.

## Tech Stack

### Backend
- Django Rest Framework (DRF)
- PostgreSQL
- AWS S3 for media storage
- Django CORS headers
- Django Debug Toolbar

### Frontend
- React
- Vite
- Modern UI components
- Responsive design

## Features

- Blog post creation and management
- Media file uploads to AWS S3
- Responsive UI
- Cross-Origin Resource Sharing (CORS) enabled
- Secure configuration settings
- Debug toolbar for development

## Prerequisites

Before running this project, make sure you have:

- Python 3.x
- Node.js and npm
- PostgreSQL
- AWS Account with S3 bucket configured
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ahmed8047762/AWS-services-DRF-integration
cd myblogproject
```

2. Set up the backend:
```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configurations

# Run migrations
python manage.py migrate
```

3. Set up the frontend:
```bash
cd frontend
npm install
```

## Configuration

1. Configure your `.env` file with necessary credentials:
   - AWS S3 credentials
   - Database settings
   - Django secret key
   - Other environment-specific variables

2. Configure AWS S3:
   - Create an S3 bucket
   - Set up appropriate IAM user with necessary permissions
   - Update bucket policy for public access if required

## Running the Application

1. Start the backend server:
```bash
python manage.py runserver
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Backend: http://localhost:8000
- Frontend: http://localhost:5173

## Development

- Backend API endpoints are available at `/api/`
- Django admin interface is available at `/admin/`
- Frontend development server runs on port 5173 by default

## Production Deployment

For production deployment:

1. Set appropriate environment variables:
   - Set `DEBUG=False`
   - Configure proper `ALLOWED_HOSTS`
   - Enable security settings
   - Set up proper CORS configuration

2. Configure proper security settings:
   - Enable SSL
   - Set secure cookie settings
   - Configure proper CORS origins

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
