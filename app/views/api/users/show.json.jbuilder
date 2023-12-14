json.extract! @user, :id, :email, :username, :created_at, :updated_at
json.stories @user.stories.pluck(:id)
json.clapped_stories @user.clapped_stories.pluck(:id)


