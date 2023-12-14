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
            render :show
        else
            render json: @response.errors.full_messages, status: 422
        end
    end

    def update
        @response = Response.find_by(id: params[:id])

        if @response && @response.update(response_params)
            render :show
        else
            render json: ['Something went wrong'], status: 422
 
        end

    end

    def destroy
        @response = Response.find_by(id: params[:id])

        if @response && @response.destroy
            head :no_content
        else
            render json: ['Something went wrong'], status: 422
        end
    end

    private

    def response_params
        params.require(:response).permit(:body, :story_id, :user_id )
    end

end
