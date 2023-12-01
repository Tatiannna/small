# Small

Small is a Medium clone. Medium is recognized for hosting high quality, insightful publications covering a wide range of interesting topics. Users can read, save, create, and interact with publications.

## Feature List

1. Stories
    - Created by a logged-in User
    - Must be associated with a Topic 

2. Responses
    - Responses can be made to Stories
    - Responses can be replied to in another Response

3. Claps
    - Users can "applaud" Stories and Story Responses with Claps

4. Followers
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
| `follower_id`     | bigint       |
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
| `clapper_id`     | bigint       |
|  `receiver_id`   | bigint        |
|  `receiver_type`   | string        |
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


### `topics`
| column name | data type |
| ----------- | ----------- |
| `id`    | bigint       |           
| `name`     | string       |           
| `created_at`   | datetime        |           
| `updated_at`   | datetime        |           

- index and uniqueness on name
- has_many :stories, :followers
- belongs_to :story_id, :user, :parent_response

## Backend Routes

`users`
- `GET /api/users/:user_name` - displays User profile information, including publications list
- `POST /api/users` - sign up
- `DELETE /api/users/:username` - delete account
- `GET /api/users/:id/saves` - shows Stories that a User saved
- `POST /api/users/:id/saves` - Saves a story for a logged in User
- `DELETE /api/users/:user_id/save/:id`  - removes a saved Story from a user's list of saved Stories

`session`
- `GET /api/session` - show login form
- `POST /api/session` - log in
- `DELETE /api/session` - log out

`stories`
- `GET /api/stories` - shows all Stories authored by this user
- `GET /api/stories/:id` - shows story details
- `POST /api/stories/:id` - creates a Story
- `PATCH /api/stories/:id` - edits a Story
- `DELETE /api/stories/:id` - deletes a Story
- `GET /api/stories/topics` - topics index
- `GET /api/stories/topics/:id` - all stories with this topic

`responses`
- `GET /api/stories/:id/responses` - see all Responses to this Story
- `POST /api/stories/:story_id/responses` - creates a Response to a Story
- `DELETE /api/stories/:story_id/responses/:id` - deletes a response to a Story
- `PATCH /api/stories/:story_id/responses/:id` - edit a Response to a Story

`claps`
- `POST /api/stories/:story_id/claps` - "applaud" a Story
- `DELETE /api/stories/:story_id/claps/:id` - Remove Clap from a Story
- `POST /api/stories/:story_id/responses/:id/claps` - "applaud" a Response
- `DELETE /api/stories/:story_id/responses/:resonse_id/claps/:id` - Remove Clap from a Story


## Frontend Routes

- `/`
Home
Header
- `/login`, `/signup` 
( `/` modals)
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



