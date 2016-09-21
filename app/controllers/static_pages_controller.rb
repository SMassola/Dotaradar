class StaticPagesController < ApplicationController
  skip_before_filter :verify_authenticity_token, only: :auth_callback

  def root
    @user = session[:user]
  end

  def auth_callback
    auth = request.env['omniauth.auth']

    @user = {
      :nickname => auth.info['nickname'],
      :image => auth.info['image'],
      :uid => auth.uid
    }

    session[:user] = @user
    redirect_to root_url
  end

  def logout
    session[:user] = nil
    redirect_to root_url
  end
end
