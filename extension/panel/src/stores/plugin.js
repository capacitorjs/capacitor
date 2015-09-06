'use strict';

import {EventEmitter} from 'events';
import Immutable from 'immutable';

export default class PluginStore {
  constructor() {
    this._plugins = new Immutable.List();
    this.emitter = new EventEmitter();
  }

  get data() {
    return this._plugins;
  }

  registerPlugin(channelName, plugin) {
    plugin.channelName = channelName;
    this._plugins = this._plugins.push(plugin);
    this.emitter.emit('add', plugin);
    this.emitter.emit('change');
  }
}
