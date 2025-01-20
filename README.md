# Habit Tracker API

A robust REST API for managing personal journal entries and habit tracking, built with Node.js and Prisma.

## Features

- **Journal Management**
  - Create, read, update, and delete journal entries
  - Add personal reflections to entries
  - Track mood and emotions

- **Habit Tracking**
  - Create and manage personal habits
  - Track daily/weekly progress
  - Categorize habits with custom colors
  - Set and monitor habit goals

## Tech Stack

- **Backend**: Node.js, Express
- **ORM**: Prisma
- **Database**: SQLite (default, supports PostgreSQL, MySQL)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-repo/journal-habit-api.git
cd journal-habit-api
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
# Create .env file in project root
DATABASE_URL="file:./dev.db"
```

4. Initialize database
```bash
npx prisma migrate dev --name init
```

5. Start the server
```bash
npm start
```

## API Documentation

### Journal Endpoints

#### Get Journal Entries
```http
GET /api/journal
```

Response:
```json
[
  {
    "id": "1",
    "date": "2025-01-20",
    "content": "Today was great",
    "mood": "good"
  }
]
```

#### Create Journal Entry
```http
POST /api/journal
```

Request Body:
```json
{
  "date": "2025-01-20",
  "content": "Today was productive",
  "mood": "great"
}
```

#### Update Journal Entry
```http
PUT /api/journal/:id
```

Request Body:
```json
{
  "content": "Updated content",
  "mood": "neutral"
}
```

#### Add Reflection
```http
PUT /api/journal/:id/reflection
```

Request Body:
```json
{
  "savedReflection": "Learned a lot today!"
}
```

#### Delete Journal Entry
```http
DELETE /api/journal/:id
```

### Habit Endpoints

#### Get All Habits
```http
GET /api/habits
```

#### Create Habit
```http
POST /api/habits
```

Request Body:
```json
{
  "name": "Exercise",
  "description": "Morning workout",
  "goal": 30,
  "frequency": "daily",
  "color": "blue",
  "category": "health"
}
```

#### Toggle Habit Completion
```http
PUT /api/habits/:id/toggle
```

Request Body:
```json
{
  "date": "2025-01-20"
}
```

#### Update Habit
```http
PUT /api/habits/:id
```

Request Body:
```json
{
  "goal": 60
}
```

#### Delete Habit
```http
DELETE /api/habits/:id
```

## Error Handling

The API implements standard HTTP status codes and returns error messages in the following format:

```json
{
  "error": "Description of the error"
}
```

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository.