# x-small

Extra-Small is a Medium clone. Medium is recognized for hosting high quality, insightful publications covering a wide range of topics inlcuding Mathematics, Religion, Fitness and Self Improvement. Users can save, create and interact with publications.

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
    - test

6. Responses
    - test

7. Followers
    - test

## Schema

### `users`
| column name | data type | details |
| ----------- | ----------- |-----------|
| `id`        |             |          |
| `username`      | Title       |           |
| `email`   | Text        |           |
| `password_digest`  | Text        |           |
| `session_token`   | Text        |           |
| `created_at`  | Text        |           |
| `updated_at`  | Text        |           |

- index on username, email, session_token
- unique: true on username, email, session_token
- has_many :stories, :claps, :responses

### `topics`
| column name | data type | details |
| ----------- | ----------- |-----------|
| `id`    | bigint       |           |
| `name`     | string       |           |
| `created_at`   | Text        |           |
| `updated_at`   | Text        |           |

- index and uniqueness on name
- has_many :stories, :followers


### `stories`
| column name | data type | details |
| ----------- | ----------- |-----------|
| `id`      | Title       |
| `title`      | Title       |           |
| `author_id`   | Text        |           |
|  `body`  | Text        |           |
| `topic_id`  | Text        |           |
|`created_at`  | Text        |           |
| `updated_at`  | Text        |           |

- belongs to :user, :topic
- has many :claps, :responses


### `follows`
| Syntax      | Description |
| ----------- | ----------- |
| `id`      | Title       |
| `user_id`     | Title       |
|  `followed_id`   | Text        |
|  `followed_type`   | Text        |
|`created_at`  | Text        |           |
| `updated_at`  | Text        |           |


### `claps`
| Syntax      | Description |
| ----------- | ----------- |
| `id`      | Title       |
| `user_id`     | Title       |
|  `story_id`   | Text        |
|`created_at`  | Text        |           |
| `updated_at`  | Text        |           |

- belongs to :user, :story

### `responses`
| Syntax      | Description |
| ----------- | ----------- |
| `id`      | Title       |
| `story_id`   | Text        |
| `user_id`   | Text        |
| `parent_id`   | Text        |
| `body`   | Text        |
| `created_at`   | Text        |           |
| `updated_at`   | Text        |           |


### `saves`
| column name | data type | details |
| ----------- | ----------- |-----------|
| `id`      | Title       |
| `user_id`      | bigint       |           |
| `story_id`   | Text        |           |
| `created_at`   | Text        |           |
| `updated_at`   | Text        |           |

- belongs_to :user, :story


- 
## Backend Routes

`users`
- `GET /api/users` - returns user information and Stories
- `POST /api/users` - sign up

`session`
- `GET /api/session` - restore session
- `POST /api/session` - log in
- `DELETE /api/session` - log out

`topics`
- `GET /api/topics` - topics index
- `GET /api/topic/:id` - shows stories with this topic

`stories`
- `GET /api/username/story-title` - shows the story authored by this user
- `POST /api/username` - creates a Story
- `PATCH /api/username/story-title` - edits a Story

`claps`
- `POST /api/claps` - applaud a Story
- `DELETE /api/claps/:id` - Remove applause from a Story

`responses`
- `GET /api/story/responses`
- `POST /api/story/`
- `DELETE /api/story/:response`
- `PATCH /api/story/:response`

`saves`
- `GET /api/:user_id/saves` 
-  `POST /api/:user_id/saves` 
-  `DELETE /api/:user_id/saves` 


