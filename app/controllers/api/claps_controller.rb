class Api::ClapsController < ApplicationController

    def index
        @claps = Clap.select{|clap| clap.story_id == Integer(params[:story_id])}
    end

    def create
        @clap = Clap.new(clap_params)
    end

    def destroy
        @clap = Clap.find_by(id: params[id])

        if @clap && @clap.destroy
            head :no_content
        else
            render json: ['Something went wrong'], status: 422
        end
    end

    private

    def clap_params
        params.require(:claps).premit(:story_id, :user_id)
    end
end
