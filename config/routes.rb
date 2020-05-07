Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'vulnerabilities/index'
      post 'vulnerabilities/create'
      get '/show/:id', to: 'vulnerabilities#show'
      delete 'vulnerabilities/destroy/:id', to: 'vulnerabilities#destroy'
    end
  end

  get '/*path' => 'dashboard#index' # Catch all
  root 'dashboard#index' # Homepage

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
