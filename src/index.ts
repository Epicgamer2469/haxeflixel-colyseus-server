import { listen } from "@colyseus/arena";

// Import arena config
import arenaConfig from "./arena.config";

// Create and listen on 2567 (or PORT environment variable.)
listen(arenaConfig);
//console.log(`Listening on ws://localhost:${ arenaConfig }`)