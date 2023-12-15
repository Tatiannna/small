@stories.each do |story|
    json.set! story.id do
        json.extract! story, :id, :title, :detail, :body, :author_id, :topic_id, :created_at
        json.username story.author.username
    end
end

