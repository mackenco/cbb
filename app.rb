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

get '/guests' do 
  url = 'http://www.earwolf.com/alleps-ajax.php?show=9'
  doc = Nokogiri::HTML(open(url))
  guests = {}

  doc.css("li").each do |ep|
    title = ep.css("a").text

    ep.css("span").each do |g|
      guest = g.text
      if guests[guest] 
        guests[guest][:count] += 1
        guests[guest][:list] << title
      else
        guests[guest] = {count: 1, list: [title]}
      end
    end

  end

  json guests
end