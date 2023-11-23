# X-Small

Extra-Small, a Medium clone, is recognized for hosting high quality, insightful publications covering a wide range of topics inlcuding Mathematics, Religion, Fitness and Self Improvement.
Users can save, create and interact with publications.


## Feature List

1. Hosting

2. User account creation, login
   - Sign up, Sign In, Sign Out
   - Some features require login

3. Topics
    - Comes pre-made. Users cannot add to or delete topics

4. Stories
    - Created by a logged-in user
    - Must be associated with at least 1 topic

5. Claps

## Schema

### Users
| column name | data type | details |
| ----------- | ----------- |-----------|
| id          |             |          |
| username      | Title       |           |
| email   | Text        |           |
| password_digest  | Text        |           |
| session_token   | Text        |           |
| created_at   | Text        |           |
| updated_at   | Text        |           |


### Topics
| column name | data type | details |
| ----------- | ----------- |-----------|
| id     | bigint       |           |
| name     | string       |           |
| created_at   | Text        |           |
| updated_at   | Text        |           |



### Stories
| column name | data type | details |
| ----------- | ----------- |-----------|
| title      | Title       |           |
| author   | Text        |           |
|  body  | Text        |           |
| category  | Text        |           |


### Saved
| column name | data type | details |
| ----------- | ----------- |-----------|
| Header      | Title       |           |
| Paragraph   | Text        |           |
| created_at   | Text        |           |
| updated_at   | Text        |           |


### Claps
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |
| created_at   | Text        |           |
| updated_at   | Text        |           |


### Responses
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |
| created_at   | Text        |           |
| updated_at   | Text        |           |

## Backend Routes

Users
- GET /api/users - returns user information and Stories
- POST /api/users - sign up

Session
- GET /api/session - restore session
- POST /api/session - log in
- DELETE /api/session - log out

Topics
- GET /api/topics - topics index
- GET /api/topic/:id - shows stories with this topic

Stories
- GET /api/username/story-title - shows the story authored by this user
- POST /api/username/ - creates a Story
- PATCH /api/username/story-title - edits a Story

Claps
- POST /api/likes - applaud a Story
- DELETE /api/likes/:id - Remove applause from a Story