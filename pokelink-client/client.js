import deepmerge from "deepmerge";
import io from "socket.io-client";

import defaultSettings from "./settings/defaultSettings";
import clientSettings from "./settings/clientSettings";

import EventEmitter from "./events";

const events = [];

class Client {
  constructor(type = "party", themeSettings = {}) {
    this.type = type;
    this.settings = deepmerge(
      deepmerge(defaultSettings, themeSettings),
      clientSettings
    );

    (this.connection = null), (this.players = []);
    this.connected = false;
    this.username = null;
    this.currentUser = this.settings.currentUser;
    this.events = new EventEmitter();
  }

  setup(cb) {
    const serverPort = this.settings.port;
    let username = this.settings.currentUser + "-browser";
    const host = this.settings.server || "http://127.0.0.1";

    if (this.type === "badges") {
      username = `badges-${username}`;
    }

    this.username = username;
    const address = host + ":" + serverPort;

    this.connection = io.connect(address, {
      // secure: true,
      reconnection: true,
      rejectUnauthorized: false,
    });

    this.connection.on("connect", (socket) => {
      this.log("Client Connected");
      this.connected = true;

      this.connection
        .on("client:party:updated", (data) => {
          let event = {
            event: "client:party:updated",
            payload: data,
          };
          events.push(event);
          this.handleRemotePlayerParty(socket, data, cb);
        })
        .on("client:badges:updated", (data) => {
          let event = {
            event: "client:badges:updated",
            payload: data,
          };
          events.push(event);
          this.handleRemotePlayerTrainer(socket, data, cb);
        })
        .on("client:players:list", (players) => {
          let event = {
            event: "client:players:list",
            payload: players,
          };
          events.push(event);
          console.log(event);
          this.addPlayersInBulk(socket, players, cb);
        })
        .on("player:trainer:updated", (data) => {
          let event = {
            event: "player:trainer:updated",
            payload: data,
          };
          events.push(event);
          console.log(event);
          this.handleRemotePlayerTrainer(socket, data, cb);
        })
        .on("player:settings:updated", (data) => {
          let event = {
            event: "player:settings:updated",
            payload: data,
          };
          events.push(event);
          console.log(event);
          this.handleRemotePlayerSettings(socket, data, cb);
        })
        .on("player:party:death", (data) => {
          let event = {
            event: "player:party:death",
            payload: data,
          };
          events.push(event);
          console.log(event);
          this.events.emit("player:party:death", event);
        })
        .on("player:party:revive", (data) => {
          let event = {
            event: "player:party:revive",
            payload: data,
          };
          events.push(event);
          console.log(event);
          this.events.emit("player:party:revive", event);
        });
    });

    return this;
  }

  on(eventName, callback) {
    this.events.on(eventName, callback);

    return this;
  }

  join() {}

  handleRemotePlayerTrainer(socket, payload) {
    if (this.settings.debug) {
      console.log("Player Trainer Updated");
      console.log(payload);
    }
    this.events.emit("player:trainer:updated", payload);
  }

  handleRemotePlayerParty(socket, payload, cb) {
    if (this.settings.debug) {
      console.log("Party Updated");
    }
    let newPlayerParty = [];

    if (this.players.hasOwnProperty(payload.username) === false) {
      this.players[payload.username] = payload.update.party;
    }

    payload.update.party.forEach((mon) => {
      newPlayerParty[mon.slotId - 1] = mon;
    });

    newPlayerParty = { ...this.players[payload.username], ...newPlayerParty };
    this.players = { ...this.players, [payload.username]: newPlayerParty };

    this.log("Client Rcv: Player %s updated their party", payload.username);
    cb(payload.username, Object.values(this.players[payload.username]));
    this.events.emit("client:party:updated", this.players[payload.username]);
  }

  handleRemotePlayerSettings(socket, payload, cb) {
    if (this.settings.currentUser !== payload.username) return;

    this.settings = deepmerge(this.settings, payload.updatedSettings.settings);

    const transformedParty = Object.values(this.players[payload.username]).map(
      (poke) => {
        if (poke !== null && poke.pokemon !== null)
          delete poke["pokemon"]["transformed"];

        return poke;
      }
    );

    console.info(transformedParty);

    console.info(`Settings updated`);
    cb(payload.username, transformedParty);
    this.events.emit("client:party:updated", transformedParty);
    this.events.emit("settings:updated", this.settings);
  }

  addPlayersInBulk(socket, players, cb) {
    if (this.settings.debug) {
      console.log("Initial Bulk Load");
      console.log(players);
    }
    players.forEach((player) => {
      let tempPlayer = {
        id: player.id,
        username: player.username,
        update: {
          party: player.party,
        },
      };

      if (player.username === this.settings.currentUser) {
        this.settings.game = {
          id: player.trainer.game.id,
          name: player.trainer.game.friendlyName,
          generation: player.trainer.game.generation,
        };
        if (this.settings.debug) {
          console.log([
            "setting game to gen: " +
              this.settings.game.generation +
              " - " +
              this.settings.game.name,
          ]);
        }
        this.events.emit("player:trainer:updated", player);
        this.events.emit("client:party:updated", player.party);
      }

      this.handleRemotePlayerParty(
        socket,
        tempPlayer,
        (username, newPlayerList) => {
          cb(username, newPlayerList);
        }
      );
    });
    this.events.emit("client:players:list", players);
  }

  log(title, msg, ...params) {
    params = params || [];
    console.log.apply(this, [title, msg].concat(params));
  }
}

export default Client;
