Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # get 'vulnerabilities/index'
      # get '/show/:id', to: 'vulnerabilities#show'

      get 'categories/:cat_id', to: 'categories#show'
    end
  end

  get '/categories/:cat_id', to: 'categories#show'
  get '/categories', to: 'categories#index'

  # get '/*path' => 'dashboard#index' # Catch all
  root 'categories#index' # Homepage

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
