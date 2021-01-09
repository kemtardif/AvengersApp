Rails.application.routes.draw do
  devise_for :users

  get 'avengers/index'
  post 'avengers/create'
  get 'avengers/show/:id', to: 'avengers#show'
  delete 'avengers/destroy/:id', to: 'avengers#destroy'
  put 'avengers/update/:id', to: 'avengers#update'

  root 'homepage#index'

  ##Catch-all route redirecting unknown routes to homepage, with the ugly second line needed for Active record to display images
  match '*path' => 'homepage#index',via: :all, constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
