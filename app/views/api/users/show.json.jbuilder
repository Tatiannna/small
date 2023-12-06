json.extract! @user, :id, :email, :username, :created_at, :updated_at
json.stories @user.stories.pluck(:id)

