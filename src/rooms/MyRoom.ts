import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {
  maxClients = 4;

  onCreate (options : any) {
    console.log("Room created! ", options);

    this.setState(new MyRoomState());

    this.onMessage("move", (client, data) => {
        const player = this.state.players.get(client.sessionId);
        this.state.movePlayer(data, player, this.state);
        // Broadcast message to everyone except the original client, movement is already done client-side
        this.broadcast("move", {key: client.sessionId, x: player.x, y : player.y}, { except: client });
    });
  }

  onAuth(client : Client, options : any, req : any) {
    return true;
  }

  onJoin (client: Client) {
    console.log('Player joined, ID: ' + client.sessionId);
    this.state.createPlayer(client.sessionId);
  }

  onLeave (client : Client) {
    console.log('Player left, ID: ' + client.sessionId);
    this.state.removePlayer(client.sessionId);
  }

  onDispose () {
    console.log("Room destroyed.");
  }

}