Rails.application.routes.draw do
  root 'static_pages#root'
  post 'auth/steam/callback' => 'static_pages#auth_callback'
  get 'logout' => 'static_pages#logout'
end
