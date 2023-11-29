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
- `GET /api/user/:user_name` - displays User profile information, including publications list
- `POST /api/users` - sign up
- `DELETE /api/users/:username` - delete account

`session`
- `GET /api/session` - show login form
- `POST /api/session` - log in
- `DELETE /api/session` - log out

`topics`
- `GET /api/topics` - Topics index
- `GET /api/topic/:id` - shows list of Stories with this topic_id

`stories`
- `GET /api/user/:user_id/story/stories` - shows all Stories authored by this user
- `GET /api/user/:user_id/story/:story_id` - shows the Story authored by this User
- `POST /api/user/:user_id/story/stories` - creates a Story
- `PATCH /api/user/:user_id/story/:story_id` - edits a Story
- `DELETE /api/user/:user_id/story/:story_id` - deletes a Story

`claps`
- `POST /api/user/:user_id/story/:story_id/claps` - "applaud" a Story
- `DELETE /api/user/:user_id/story/:story_id/claps/:clap_id` - Remove Clap from a Story

`responses`
- `GET /api/user/:user_id/:story_id/story/responses` - see all Responses to this Story
- `POST /api/user/:user_id/:story_id/story/responses` - creates a Response to a Story
- `DELETE /api/user/:user_id/:story_id/story/responses/:id` - deletes a response to a Story
- `PATCH /api/user/:user_id/:story_id/story/responses/:id` - edit a Response to a Story

`saves`
- `GET /api/user/:user_id/saves` - shows Stories that a User saved
- `POST /api/user/:user_id/saves` - Saves a story for a logged in User
- `DELETE /api/user/:user_id/save/:save_id`  - removes a saved Story from a user's list of saved Stories


## Frontend Routes

- `/`
Home
Header
- `/login`
SessionForm
- `/signup`
SessionForm
- `/:username`
UserDetail
AuthoredStoryList
- `/topics`
ShowTopics
- `/:topic_name/stories`
PreviewStoriesWithTopic
- `/:username/:story_title`
ShowStory
- `/:username/:story_title/responses`
StoryResponses
- `/:username/saves`
SavedStories
- `/new-story`
StoryForm





## Top Level State Shape


```js
{
  entities: {
    users: {
      1: {
        id: 1,
        username: 'Jackson5',
        email: 'jackson522@gmail.com',
        about: 'Im an actor'
        }
    },

    topics: {
      1: {
        id: 1,
        name: 'Artificial Intelligence',
      }
    },

    stories: {
      1: { 
        id: 1,
        title: "How I Retired at 40",
        author_id: 5,
        body: "It all started with 3 decisions I made at age 17...",
        topid_id: 4
      }
    },

    follows: {
      1: {
        id: 1,
        user_id: 5,
        followed_id: 6,
        followed_type: 'topic'
      }
    },

    claps: {
      1: {
        id: 1,
        user_id: 3,
        story_id: 4
      }
    },

    responses: {
      1: {
        id: 1,
        story_id: 3,
        user_id: 7,
        parent_id: 3,
        body: "This was an insightful article! While...."
        
      }
    },

    saves: {
      1: {
        id: 1,
        user_id: 4,
        story_id: 5
      }
    }
  }
  session: {
		currentUser: 1
	},

	ui: {
		modalOpen: true
	},

	errors: {
		userErrors: [],
		sessionErrors: [],
		postErrors: []
	}

}
```



