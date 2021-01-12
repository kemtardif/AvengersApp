### AVENGERS CATALOGUE YAY #######

-Quick readme to describe various things regarding my code. First the gem I used :

```ruby
gem "figaro"
gem 'active_model_serializers'
gem 'rack-cors', :require => 'rack/cors'
gem 'devise'
gem 'toastr-rails'
gem 'jquery-rails'
gem 'twitter-bootstrap-rails'
gem 'devise-bootstrap-views'
gem 'cancancan'
```

-Figago : used to take of env variables
- active_model_serializers : used to get url of avenger images and render them on pages. File of interest : app/serializers/avenger_serializer.rb
-rack-cors : To avoid Cors policy stuff when fetching superhero api. File of interest : config/initializer:cors.rb
- Devise : Authentifcation. File of interest: app/models/user.rb
-toastr + jquery : flash messages, which still doesnt work :(
-twitter-bootstrap+jquery : cute login page.
-Cancancan : user and admin roles. File of interest app/models/ability.rb

-The avenger model has some validation and an attached file using active storage. I used postgres for the db :

```ruby
    has_one_attached :featured_image
    before_create :checkAvatar

    validates :name, presence: true, uniqueness: true
    validates :legalName, presence: true
    validates :status, presence: true

    private

    def checkAvatar 
        if !self.featured_image.attached?               
            self.featured_image.attach(io: File.open(Rails.root.join('app/assets/images/defaultHero.jpeg')), filename: 'defaultHero.jpeg', content_type: 'image/jpeg')
        end
    end
```

-CheckAvatar is used to set default image upon creation if none is uploaded.

-User and admin model are basic. Admin can manage; user can read, so it throws an error when trying to update, create or destroy.

-Routing for avengers controller endpoints are in the api/v1 namespace :

```ruby
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
```

-THe line req.path.exclude is there because active storage wasnt displaying avenger images on some pages, something to do with the asset pipeline, I dont know!

-THe next file of interest is app/controllers/api/v1/avengers_controller.rb, which is a standard controller. I made so that all major CRUD operations are there and used in the app. For example, instead of using something like Rails admin to play with the records, and admin edit them directly on the page and send using fetch a DELETE/PUT/POST request to those endpoints.

-The react front-end is in app/javascript. I will let you check it, just I`ll just show here the fetch request used on a specific avenger page :


```javascript
fetch(`/api/v1/avengers/${ id }`)
            .then((response) => {
              if ( response.ok ) {
                return response.json();
              }
              throw new Error("Problem with back-end call!");
            })
              .then( (response) => { 
                this.setState({   
                  id : response.id,   
                  name : response.name,
                  legalName : response.legalName,
                  status : response.status,
                })

                let baseUrl = `https://gateway.marvel.com:443/v1/public/characters?name=${ response.name }&`;
                const urlMarvel = baseUrl + 'ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
                const urlInfo = `https://superheroapi.com/api/1748179568683239/search/${ response.name }`

                return Promise.all([fetch(urlMarvel), fetch(urlInfo)]);
              })
                .then(([responseMarvel, responseInfo]) => {
                    if (responseMarvel.ok && responseInfo.ok ) {
                      return Promise.all([responseMarvel.json(), responseInfo.json()]);
                    }
                    throw new Error("Problem with api calls!");
                  })
                  .then(([respMarvel, respInfo]) => {
                    this.setState({   
                                      firstAppearance: respInfo.results[0].biography["first-appearance"],
                                      placeOfBirth: respInfo.results[0].biography["place-of-birth"],
                                      race:respInfo.results[0].appearance.race,
                                      description: respMarvel.data.results[0].description,
                                      thumbnail: respMarvel.data.results[0].thumbnail.path,
                                      extension:respMarvel.data.results[0].thumbnail.extension

                                  })
                        });
```
-We first call the back end to get the information fro, the database, set some state variables, then make two fetch to two apis wrapped in a promise. If succesfull, we then set the rest of the state variables and used them to render the page. Voila!
