class Api::ResponsesController < ApplicationController

    def index

    end
    
    def show
        @response = Response.find_by(id: params[:id])
    end

    def create

    end

    def updaye

    end

    def destroy

    end

end
