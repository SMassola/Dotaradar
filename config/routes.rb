Rails.application.routes.draw do
  root 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :requests, only: [] do
      collection do
        get 'friends', action: :friends
      end
    end
  end

  post 'auth/steam/callback' => 'static_pages#auth_callback'
  get 'logout' => 'static_pages#logout'
end
