json.extract! @topic, :id, :name
json.stories do
    @topic.stories.each do |story|
        json.set! story.id do
            json.extract! story, :id, :title, :author_id, :topic_id
        end
    end
end
