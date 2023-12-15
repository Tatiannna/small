class Api::TopicsController < ApplicationController

    def index
        if params[:topicName]
            @topics = Topic.find_by(name: params[:topicName])
            if @topics.length > 0
                [@topics]
            else
                @topics = []
            end
        else
            @topics = Topic.all
        end
    end

    def show
            @topic = Topic.find_by(id: params[:id])
    end
    
end
