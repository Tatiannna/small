Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"


  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show]
    resource :session, only: [:show, :create, :destroy]
    get 'stories/topics', to: 'topics#index'
    get 'stories/topics/:id', to: 'topics#show'
    resources :stories, only: [:index,  :create, :destroy, :update]
    resources :stories, only: [:show] do
      resources :responses, only: [:show, :create, :update, :destroy]
    end

  end



  get '*path',
    to: 'static_pages#frontend',
    constraints: lambda { |req| !req.xhr? && req.format.html? }

  root 'static_pages#frontend', 
    constraints: lambda { |req| !req.xhr? && req.format.html? }
end
