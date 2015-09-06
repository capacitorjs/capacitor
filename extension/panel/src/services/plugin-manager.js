'use strict';

import {EventEmitter} from 'events';
import Locator from 'capacitor-locator';
import PluginStore from 'src/stores/plugin';

export default class PluginManager {
  constructor({emitter}) {
    this.emitter = emitter;
    this.channels = {};
    const pluginStore = Locator.get(PluginStore);

    this.emitter.on('plugin:upload', ({source}) => {
      window.eval(source);
    });

    pluginStore.emitter.on('add', (plugin) => {
      const emitter = new EventEmitter();
      plugin.start({emitter});
      this.channels[plugin.channelName] = emitter;
      emitter.on('tunnel:agent', (event, payload) => {
        this.emitter.emit('tunnel:injected', 'tunnel:agent', {
          event,
          payload,
          channelName: plugin.channelName
        })
      });
      emitter.emit('tunnel:agent', 'plugin:ready');
    });
  }

  forwardEvents() {
    this.emitter.on('tunnel:plugin', ({channelName, event, payload}) => {
      const channel = this.channels[channelName];
      if (channel) {
        channel.emit(event, payload);
      }
    });
  }
}
