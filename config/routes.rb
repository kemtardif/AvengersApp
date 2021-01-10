Rails.application.routes.draw do
  devise_for :users
  
  namespace :api do
    namespace :v1 do
      resources :avengers
    end
  end

  root "homepage#index"
  ##Catch-all route redirecting unknown routes to homepage, with the ugly second line needed for Active record to display images
  match '*path' => 'homepage#index', via: :all, constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end
