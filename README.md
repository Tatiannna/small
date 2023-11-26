# Small

Small is a Medium clone. Medium is recognized for hosting high quality, insightful publications covering a wide range of interesting topics. Users can read, save, create, and interact with publications.

## Feature List

1. Hosting

2. User account creation, login
   - Sign up, Sign In, Sign Out
   - Some features require login

3. Topics
    - Topics organize and categoriize Stories
    - Not a CRUD feature. Users cannot create/delete topics

4. Stories
    - Created by a logged-in User
    - Must be associated with a Topic

5. Claps
    - Users "applaud" Stories with Claps

6. Responses
    - Responses can be made to Stories
    - Responses can be replied to in another Response

7. Followers
    - Users can follow other Users
    - Users can follow Topics

## Schema

### `users`
| column name | data type | 
| ----------- | ----------- |
| `id`        |    bigint         |          
| `username`      | string       |           
| `email`   | string        |     
| `about`   |  text     |   
| `password_digest`  | string        |           
| `session_token`   | string        |           
| `created_at`  | datetime        |           
| `updated_at`  | datetime        |           

- index on username, email, session_token
- unique: true on username, email, session_token
- has_many :stories, :claps, :responses

### `topics`
| column name | data type |
| ----------- | ----------- |
| `id`    | bigint       |           
| `name`     | string       |           
| `created_at`   | datetime        |           
| `updated_at`   | datetime        |           

- index and uniqueness on name
- has_many :stories, :followers


### `stories`
| column name | data type |
| ----------- | ----------- |
| `id`      | bigint       |
| `title`      | string       |           
| `author_id`   | bigint        |           
|  `body`  | text        |          
| `topic_id`  | bigint        |           
|`created_at`  | datetime        |           
| `updated_at`  | datetime        |           

- belongs_to :user, :topic
- has_many :claps, :responses


### `follows`
| column name      | data type |
| ----------- | ----------- |
| `id`      | bigint       |
| `user_id`     | bigint       |
|  `followed_id`   | bigint        |
|  `followed_type`   | string        |
|`created_at`  | datetime        |           
| `updated_at`  | datetime        |          

- belongs_to :follower
- belongs_to :followed

### `claps`
| column name      | data type |
| ----------- | ----------- |
| `id`      | bigint       |
| `user_id`     | bigint       |
|  `story_id`   | bigint        |
|`created_at`  | datetime        |           
| `updated_at`  | datetime        |           

- belongs_to :user, :story

### `responses`
| column name      | date type |
| ----------- | ----------- |
| `id`      | bigint       |
| `story_id`   | bigint        |
| `user_id`   | bigint        |
| `parent_id`   | bigint        |
| `body`   | text        |
| `created_at`   | datetime        |           
| `updated_at`   | datetime        |           

- belongs_to :story_id, :user, :parent_response

### `saves`
| column name | data type |
| ----------- | ----------- |
| `id`      | bigint       |
| `user_id`      | bigint       |           
| `story_id`   | bigint        |           
| `created_at`   | datetime        |           
| `updated_at`   | datetime        |           

- belongs_to :user, :story

## Backend Routes

`users`
- `GET /api/:username` - displays User profile information, including publications list
- `POST /api/users` - sign up
- `DELETE /api/users` - delete account 

`session`
- `GET /api/session` - show login form
- `POST /api/session` - log in
- `DELETE /api/session` - log out

`topics`
- `GET /api/topics` - Topics index
- `GET /api/topic/:id` - shows list of Stories with this topic_id

`stories`
- `GET /api/:username/stories` - shows all Stories authored by this user
- `GET /api/:username/:story_id` - shows the Story authored by this User
- `POST /api/:username/stories` - creates a Story
- `PATCH /api/:username/:story_id` - edits a Story
- `DELETE /api/:username/:story_id` - deletes a Story 

`claps`
- `POST /api/claps` - "applaud" a Story
- `DELETE /api/claps/:id` - Remove Clap from a Story

`responses`
- `GET /api/:story_id/responses` - see all Responses to this Story
- `POST /api/:story_id/responses` - creates a Response to a Story
- `DELETE /api/:story_id/:id` - deletes a response to a Story
- `PATCH /api/:story_id/:id` - edit a Response to a Story

`saves`
- `GET /api/:username/saves` - shows Stories that a User saved
- `POST /api/:username/saves` - Saves a story for a logged in User
- `DELETE /api/:username/saves`  - removes a saved Story from a user's list of saved Stories


