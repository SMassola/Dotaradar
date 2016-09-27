# DotaRadar

[DotaRadar][heroku]
[heroku]: http://dotaradar.herokuapp.com/

## Description
DotaRadar is a data visualization web app that pulls data from Steam's API and displays it on a radar chart.
DotaRadar is implemented following the principles of mobile first design.

Currently, DotaRadar displays hero data from the last 100 Dota 2 matches each user has played.

![mobile]
[mobile]: ./app/assets/images/dotaradar_14.png
Mobile Version

![desktop]
[desktop]: ./app/assets/images/dotaradar_12.png
Desktop Version

## Implementation
DotaRadar utilizes omniauth-steam to authenticate users via Steam account. Upon log in, users can request Dota 2 match data of themselves
and their Steam friends list. Data is rendered on a D3.js radar chart and also stored in Rails cache.

React components are constantly updated when data is requested or removed.

## Technologies Used
DotaRadar is built using the following technologies

- [X] React Framework
- [X] Rails Framework
- [X] JavaScript
- [X] D3.js
- [X] jQuery
- [X] Ruby
- [X] HTML
- [X] CSS
