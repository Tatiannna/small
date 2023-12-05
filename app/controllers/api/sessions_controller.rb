class Api::SessionsController < ApplicationController


  def show
    @user = current_user
    if @user
      render 'api/users/show'
    else
      render json: { user: nil}
    end
    
  end

  def create

    @user = User.find_by_credentials(params[:email], params[:password])
    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json: { errors: ['Invalid credentials'] }, status: 401
    end

  end

  def destroy
    logout!
    render json: "logged out successfully"
  end

  private


end
