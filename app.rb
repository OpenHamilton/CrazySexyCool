require 'sinatra'
require 'json'

get '/' do
  @waterfalls = File.open( './public/waterfalls.geojson' )
  @waterfalls = JSON.parse( @waterfalls.read )

  erb :index
end
