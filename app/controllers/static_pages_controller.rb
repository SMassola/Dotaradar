class StaticPagesController < ApplicationController
  skip_before_filter :verify_authenticity_token, only: :auth_callback

  def root
  end

  def auth_callback
    auth = request.env['omniauth.auth']
    @user = { :nickname => auth.info['nickname'],
                                          :image => auth.info['image'],
                                          :uid => auth.uid }
    render :root
  end
end
