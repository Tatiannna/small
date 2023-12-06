class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  def show
    @user = User.find_by(id: params[:id])
  end
  

  def create
    
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render :show
    else
      render json: @user.errors, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password)
  end
end
