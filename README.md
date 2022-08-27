
# HaxeFlixel Colyseus Server
This repo exists as a resource to get started with using Colyseus alongside HaxeFlixel to make multiplayer games. I struggled a lot while trying to get started and I wanted to make something to hopefully lower that amount of pain for anyone trying something similar in the future (and also my future self who will most likely forget how to use this).

I'm still fairly new to this so my explanations aren't very in-depth and some might be actually just be wrong, but hopefully they make some sort of sense.

This is the server side to [@EpicGamer2469/haxeflixel-colyseus-client](https://github.com/Epicgamer2469/haxeflixel-colyseus-client)
### Other Resources
[Colyseus Documentation](http://docs.colyseus.io/)
[Blank Colyseus App](https://github.com/colyseus/create-colyseus-app)

**Other Projects**
 - [Tankmas](https://github.com/oscarcederberg/tankmas2021-server) 
 - [Bass Master Online](https://github.com/AustinEast/bass-master-online)

## How do I get started?
This project uses [Haxe/HaxeFlixel](https://haxeflixel.com/documentation/getting-started/) for the client side, and [Node](https://nodejs.org/en/) for the server side so you should install both.

I would recommend using the repository template here so there's less trouble setting one up if you plan to use Heroku to deploy online in the future, as you can just plug it in and it will be able to update straight from the repo, you can do whatever you want for the client side though.

### Server
The only parts of the server you should need to mess with for your game is the stuff in the `/src` folder.
- `arena.config.ts`: Use this file to define room handlers.
- `rooms/MyRoom.ts`: A default room, this is what receives the messages from the client, you can call functions from the current game state for running logic.
- `rooms/schema/MyRoomState.ts` This holds functions and data structures to be used for your server's logic.

### Client
All of the game and message logic is inside of `PlayState.hx`, most functions should be somewhat self explanatory and there are comments to help guide you. The `schema/` folder holds data structures very similar to the ones in the server's `MyRoomState.ts`, these are mostly used in the Client object's functions for reference.

## Running the Server

### Local
In the server directory, open a PowerShell window or `cd` inside of it using cmd.

First run `npm i` to install the server's dependencies (you should only need to do this once)
Then run `npm start` to run the server, once you see `Listening on ws://localhost:PORT` it should be up and ready to be connected to by clients.

### Online
For smaller scale projects you can use [Heroku](https://www.heroku.com/) which is free and what I'll be explaining here, but there are other options that Colyseus recommends listed on [this page](https://docs.colyseus.io/colyseus/deployment/).

In Heroku, make an account, and create a new app (which can be named whatever you like). 

Once you've done that, head to the app's dashboard and go to the `Settings` tab and under `Buildpacks` choose `Add buildpack` and select `nodejs` then `Save changes`
![Selecting the Nodejs buildpack](https://i.imgur.com/baitqYA.png)

Then, move to the the `Deploy` tab, here you can choose to use GitHub and connect your account and select your server repository.
![Choosing a deployment method](https://i.imgur.com/ZqafaCM.png)
Once you do that you can choose to use automatic deploys, which will essentially refresh you app every time you commit a change to the server's repo which is useful for testing.

From here, the server should start building itself from the repository, but you can choose to manually deploy it at the bottom of the page as well. To view the build progress you can check the most recent build log from the `Activity` tab. You can also view the active console of the server overall from the logs page.
![Viewing the logs page](https://i.imgur.com/qFusO6d.png)

Make sure to change the endpoint argument for the `Client` constructor in your client's `PlayState`
![enter image description here](https://i.imgur.com/QzTYb3r.png)

## Building the Game
In the game's root directory (with the `Project.xml`), open a PowerShell window or `cd` into it using cmd. Then you can compile to the target you want using `lime test` (from my experience, HashLink doesn't work sadly, so stick to these)
```
lime test html5
lime test windows
lime test neko
```
You should be able to open multiple instances of the game and see the multiplayer working in action for testing.
