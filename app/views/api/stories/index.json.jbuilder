@stories.each do |story|
    json.set! story.id do
        json.extract! story, :id, :title, :detail, :author_id, :topic_id, :created_at
    end
end

