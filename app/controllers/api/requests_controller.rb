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
    url = URI.parse("https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?key=#{ENV['STEAM_WEB_API_KEY']}&account_id=#{params[:userId]}")
    res = Net::HTTP::get(url)
    matches = JSON.load(res) || []
    @user_matches = matches['result']['matches']
    # start_match = @matches[-1]["match_id"] - 1

    # url = URI.parse("https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?key=#{ENV['STEAM_WEB_API_KEY']}&account_id=#{params[:userId]}&start_at_match_id=#{start_match}")
    # res = Net::HTTP::get(url)
    # matches = JSON.load(res) || []
    # @matches.concat(matches['result']['matches'])

    url = URI.parse("http://api.steampowered.com/IEconDOTA2_570/GetHeroes/v1/?key=#{ENV['STEAM_WEB_API_KEY']}&itemizedonly=true")
    res = Net::HTTP::get(url)
    heroes = JSON.load(res) || []
    @user_heroes = heroes['result']['heroes']


    @user_matches.each do |match|
      match["players"].each do |player|
        account_id_64 = 76561197960265728 + player["account_id"]
        if account_id_64 == params[:userId].to_i
          match["user"] = player
          @user_heroes.each do |hero|
            if hero["id"] == match["user"]["hero_id"]
              match["user"]["hero_name"] = hero["name"].gsub(/_/, ' ').gsub("npc dota hero ", "").split.map(&:capitalize).join(" ")
            end
          end
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
