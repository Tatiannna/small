class Api::ResponsesController < ApplicationController

    def index
        @responses = Response.select{|r| r.story_id == Integer(params[:story_id])}
    end
    
    def show
        @response = Response.find_by(id: params[:id])
    end

    def create
        @response = Response.new(response_params)

        if @response.save!
            @responses = [@response]
            render :index
        else
            render json: @response.errors.full_messages, status: 422
        end
    end

    def update
    end

    def destroy
    end

    private

    def response_params
        params.require(:response).permit(:body, :story_id, :user_id )
    end

end
