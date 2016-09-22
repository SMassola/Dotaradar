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

  private

  def request_params
    params.require(:request).permit(:userId)
  end

end
