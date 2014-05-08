require 'sinatra'
require 'sinatra/json'
require 'open-uri'
require 'nokogiri'

get '/' do 
  erb :index
end

get '/episodes' do
  url = 'http://www.earwolf.com/alleps-ajax.php?show=9'
  doc = Nokogiri::HTML(open(url))
  episodes = []

  doc.css("li").each do |ep|
    episode = {}
    guests = []

    ep.css("span").each { |guest| guests << guest.text }

    episode["number"] = ep.text.slice(/(?<=#).+(?= -)/)
    episode["title"] = ep.css("a").text
    episode["guests"] = guests
    episodes << episode
  end

  json episodes
end