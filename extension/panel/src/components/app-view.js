'use strict';

import React from 'react';
import {RouteHandler} from 'react-router';
import Locator from 'capacitor-locator';
import PluginList from 'src/components/plugin-list';
import PluginStore from 'src/stores/plugin';

/**
 * Display the current list of plugins and the currently-selected plugin
 */
export default class AppView extends React.Component {
  constructor(props) {
    super(props);
    this._pluginStore = Locator.get(PluginStore);
    this.state = {plugins: this._pluginStore.data};
    const listener = this._updatePlugins.bind(this);
    this._pluginStore.emitter.on('change', listener);
    this._dispose = () => {
      this._pluginStore.emitter.removeListener('change', listener);
    };
  }

  _updatePlugins() {
    this.setState({plugins: this._pluginStore.data});
  }

  componentWillUnmount() {
    this._dispose();
  }

  render() {
    return (
      <div className='app-view'>
        <PluginList plugins={this.state.plugins}/>
        <RouteHandler/>
      </div>
    );
  }
}
