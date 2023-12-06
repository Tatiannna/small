json.extract! @topic, :id, :name
json.stories @topic.stories.pluck(:id)