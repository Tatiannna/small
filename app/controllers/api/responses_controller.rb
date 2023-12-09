class Api::ResponsesController < ApplicationController

    def index
        @responses = Response.select{|r| r.story_id == Integer(params[:story_id])}
    end
    
    def show
        @response = Response.find_by(id: params[:id])
    end

    def update
    end

    def destroy
    end

end
