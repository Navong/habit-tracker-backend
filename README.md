# Habit Tracker API

This API allows users to manage journal entries and habit tracking using Node.js and Prisma.

## Features
- CRUD operations for journal entries
- CRUD operations for habits
- Toggle habit completion
- Save reflections on journal entries

## Technologies Used
- Node.js
- Express
- Prisma
- SQLite (default database, can be replaced with PostgreSQL, MySQL, etc.)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/journal-habit-api.git
   cd journal-habit-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
   Create a `.env` file and add the following:
   ```env
   DATABASE_URL="file:./dev.db"
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Journal Entry Routes

- **Get all journal entries**  
  `GET /api/journal`  
  _Response:_
  ```json
  [
    { "id": "1", "date": "2025-01-20", "content": "Today was great", "mood": "good" }
  ]
  ```

- **Add a new journal entry**  
  `POST /api/journal`  
  _Body:_
  ```json
  { "date": "2025-01-20", "content": "Today was productive", "mood": "great" }
  ```

- **Update a journal entry**  
  `PUT /api/journal/:id`  
  _Body:_
  ```json
  { "content": "Updated content", "mood": "neutral" }
  ```

- **Delete a journal entry**  
  `DELETE /api/journal/:id`

- **Save journal reflection**  
  `PUT /api/journal/:id/reflection`  
  _Body:_
  ```json
  { "savedReflection": "Learned a lot today!" }
  ```

### Habit Routes

- **Get all habits**  
  `GET /api/habits`  

- **Add a new habit**  
  `POST /api/habits`  
  _Body:_
  ```json
  { "name": "Exercise", "description": "Morning workout", "goal": 30, "frequency": "daily", "color": "blue", "category": "health" }
  ```

- **Toggle habit completion**  
  `PUT /api/habits/:id/toggle`  
  _Body:_
  ```json
  { "date": "2025-01-20" }
  ```

- **Delete a habit**  
  `DELETE /api/habits/:id`

- **Update a habit**  
  `PUT /api/habits/:id`  
  _Body:_
  ```json
  { "goal": 60 }
  ```

## Error Handling
The API returns appropriate HTTP status codes and error messages in the following format:
```json
{
  "error": "Description of the error"
}
```

## License
This project is licensed under the MIT License.

