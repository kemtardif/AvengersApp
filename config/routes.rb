Rails.application.routes.draw do
  get 'avengers/index'
  post 'avengers/create'
  get '/show/:id', to: 'avengers#show'
  delete '/destroy/:id', to: 'avengers#destroy'
  namespace :api do
    namespace :v1 do
      get 'recipes/index'
      post 'recipes/create'
      get '/show/:id', to: 'recipes#show'
      delete '/destroy/:id', to: 'recipes#destroy'
    end
  end
  root 'homepage#index'

  ##Catch-all route redirecting unknown routes to homepage, with the ugly second line needed for Active record to display images
  get '/*path' => 'homepage#index', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
