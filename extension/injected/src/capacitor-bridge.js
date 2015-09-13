'use strict';

import {EventEmitter} from 'events';

export default class CapacitorBridge {
  constructor(emitter) {
    this.emitter = emitter;
    this.channels = {}
  }

  proxyEvents() {
    this.emitter.on('tunnel:agent', ({channelName, event, payload}) => {
      const channel = this.channels[channelName];
      if (channel) {
        channel.emit(event, payload);
      }
    });
  }

  registerPlugin(agent, displayName, channelName, sourceFile) {
    return fetch(sourceFile).then(function (response) {
      return response.text();
    }).then((source) => {
      this.emitter.emit('tunnel:panel', 'plugin:upload', {displayName, channelName, source});

      agent.emitter.on('tunnel:plugin', (event, payload) => {
        this.emitter.emit('tunnel:panel', 'tunnel:plugin', {
          event,
          channelName,
          payload
        });
      });
      this.channels[channelName] = agent.emitter;
    });
  }
}
