class Api::StoriesController < ApplicationController

    def index 
        if params[:username]
            @stories = User.find_by(username: params[:username]).stories
        elsif params[:topicName]
            @stories = Topic.find_by(name: params[:topicName]).stories
        elsif params[:title]
            @stories = [Story.find_by(title: params[:title])]
        else
            @stories = Story.all.includes(:author)
        end
    end


    def show
        @story = Story.find_by(id: params[:id])
    end


    def create
        @story = Story.new(story_params)
        if @story.save
            render :show
        else
            render json: @story.errors.full_messages, status: 422
        end
    end


    def destroy
        @story = Story.find_by(id: params[:id])

        if @story && @story.destroy
            head :no_content
        else
            render json: ['Something went wrong'], status: 422
        end
    end

    def update
        @story = Story.find_by(id: params[:id]) 

        if @story.update(story_params)
            render :show
        else
            render json: ['Something went wrong'], status: 422
        end
    end


    private

    def story_params
        params.require(:story).permit(:title, :body, :detail, :author_id, :topic_id)
    end


end
