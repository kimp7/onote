source 'https://rubygems.org'

gem 'rails', '4.1.7'
gem 'mysql2'
gem 'sass-rails'
gem 'uglifier'
gem 'coffee-rails'
gem 'jquery-rails'
gem 'jbuilder'
gem 'haml'
gem 'sdoc', '~> 0.4.0',          group: :doc
gem 'spring',        group: :development
gem 'unicorn'
gem 'carrierwave'
gem 'devise'
gem 'omniauth'
gem 'omniauth-facebook', '~> 1.4.1'
gem 'kaminari'
gem 'koala'
gem 'geocoder'
gem 'turbolinks'

# for Rails 4.0
# gem 'simple_form', github: 'plataformatec/simple_form', tag: 'v3.1.0.rc1'
# You'll need to include the following dependencies of Summernote
gem 'font-awesome-rails'
# This is the right gem to use summernote editor in Rails projects.
gem 'summernote-rails'




group :development do
  gem 'guard-rails'
  gem 'pry'
  gem 'capistrano'
  gem 'capistrano-rbenv'
  gem 'capistrano-bundler'
  gem 'capistrano-rails'
  gem "rails-erd"
  gem 'quiet_assets'
end

group :production do
  gem 'rb-readline'
end

group :test do
  gem 'capybara'
  gem 'guard-rspec'
  gem "email_spec"
  gem 'diff-lcs', '>= 1.1.3'
  gem 'rspec-mocks'
  gem 'listen', '~> 2.7.7'
  gem 'formatador', '>= 0.2.4'
  gem 'database_cleaner', '~> 1.3.0'
  # gem 'rb-inotify', '>= 0.9'
end

group :test, :development do
  gem 'rspec-rails'
  gem 'factory_girl_rails'
end