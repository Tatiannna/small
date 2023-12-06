json.extract! @user, :id, :email, :username, :created_at, :updated_at
json.stories do
    @user.stories.each do |story|
        json.set! story.id do
            json.extract! story, :id, :title, :author_id, :topic_id
        end
    end
end

