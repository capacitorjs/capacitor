'use strict';

import {TunnelUtils} from 'capacitor-devtools-helpers';
import Locator from 'capacitor-locator';
import PluginStore from 'src/stores/plugin';

export default class PluginManager {
  constructor({emitter, root}) {
    this.emitter = emitter;
    this.root = root;
    this.channels = {};
    this.pluginStore = Locator.get(PluginStore);
    this.emitter.on('plugin:upload', this.initializePlugin.bind(this));
  }

  initializePlugin({displayName, channelName, source}) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.className = 'plugin-iframe';
    this.root.appendChild(iframe);
    const contentWindow = iframe.contentWindow;

    contentWindow.eval(source);
    this.pluginStore.registerPlugin({displayName, channelName, iframe, contentWindow});
    this.channels[channelName] = contentWindow;
    const tunnel = TunnelUtils.tunnelEvents(contentWindow, 'tunnel:agent', (message) => {
      this.emitter.emit('tunnel:injected', 'tunnel:agent', {
        event: message.event,
        payload: message.payload,
        channelName: channelName
      });
    });
    contentWindow.addEventListener('message', tunnel);
    contentWindow.postMessage({
      name: 'tunnel:plugin',
      event: 'plugin:start'
    }, '*');
  }

  forwardEvents() {
    this.emitter.on('tunnel:plugin', ({channelName, event, payload}) => {
      const channel = this.channels[channelName];
      if (channel) {
        channel.postMessage({
          name: 'tunnel:plugin',
          event,
          payload
        }, '*');
      }
    });
  }
}
