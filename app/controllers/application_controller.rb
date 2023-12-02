class ApplicationController < ActionController::API

  include ActionController::RequestForgeryProtection
  
  protect_from_forgery with: :exception

  before_action :attach_authenticity_token


  def current_user
      @current_user ||= User.find_by(session_token = session[:session_token])
      # user whose `session_token` == token in `session` cookie
  end
      
  def login!(user)
    session[:session_token] = current_user.reset_session_token!
    # reset `user`'s `session_token` and store in `session` cookie
  end

  def logged_in?
    !!current_user
  end
  
  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
    # reset the `current_user`'s session cookie, if one exists
    # clear out token from `session` cookie
    @current_user = nil # so that subsequent calls to `current_user` return nil
  end
  
  def require_logged_in
    unless current_user
      render json: { message: 'Unauthorized' }, status: :unauthorized 
    end
  end

  private

  def attach_authenticity_token
    headers['X-CSRF-Token'] = masked_authenticity_token(session)
  end
      
end
