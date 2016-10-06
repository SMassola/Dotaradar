class Api::RequestsController < ApplicationController

  def friends
    @friends = []
    url = URI.parse("https://api.steampowered.com/ISTEAMUser/GetFriendList/v0001/?key=#{ENV['STEAM_WEB_API_KEY']}&steamid=#{params[:userId]}&relationship=friend")
    res = Net::HTTP::get(url)
    friends = JSON.load(res) || []
    friend_objects = friends["friendslist"]["friends"]
    steam_ids_str = ""

    friend_objects.each do |friend|
      steam_ids_str += friend["steamid"] + ","
    end

    url = URI.parse("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=#{ENV['STEAM_WEB_API_KEY']}&steamids=#{steam_ids_str}")
    res = Net::HTTP::get(url)
    friends = JSON.load(res) || []
    @friends = friends
    render :friends
  end

  def matches
    @user_id = params[:userId]
    @matches = Rails.cache.fetch(@user_id) { match_request }

    render :matches
  end

  def match_request
    url = URI.parse("https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V0001/?key=#{ENV['STEAM_WEB_API_KEY']}&account_id=#{params[:userId]}")
    res = Net::HTTP::get(url)
    matches = JSON.load(res) || []
    @user_matches = matches['result']['matches']

    url = URI.parse("http://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/?key=#{ENV['STEAM_WEB_API_KEY']}&itemizedonly=true")
    res = Net::HTTP::get(url)
    heroes = JSON.load(res) || []
    @heroes = heroes['result']['heroes']

    hero_hash = {}
    @heroes.each do |hero|
      hero_hash[hero["id"]] = hero["name"].gsub(/_/, ' ').gsub("npc dota hero ", "").split.map(&:capitalize).join(" ")
    end

    @user_matches.each do |match|
      player_index = match["players"].find_index { |player| player["account_id"] + 76561197960265728 == params[:userId].to_i }
      match["teammate"] = []
      match["enemy"] = []
      match["players"].each_with_index do |player, i|
        if player_index == i
          player["hero_name"] = hero_hash[player["hero_id"]]
          match["user"] = player
        elsif player_index/5 == i/5
          player["hero_name"] = hero_hash[player["hero_id"]]
          match["teammate"] << player
        else
          player["hero_name"] = hero_hash[player["hero_id"]]
          match["enemy"] << player
        end
      end
    end

    return @user_matches
  end

  private

  def request_params
    params.require(:request).permit(:userId)
  end

end
