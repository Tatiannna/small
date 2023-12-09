@responses.each do |response|
    json.set! response.id do
        json.extract! response, :id, :body, :user_id, :story_id
    end
end