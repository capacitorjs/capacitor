'use strict';

import React from 'react';
import Locator from 'capacitor-locator';
import PluginStore from 'src/stores/plugin';

export default class PluginContainer extends React.Component {
  constructor() {
    super();
    this.pluginStore = Locator.get(PluginStore);
  }

  render() {
    return <div/>;
  }

  componentDidMount() {
    const node = React.findDOMNode(this);
    node.appendChild(this.plugin.render());
  }

  get plugin() {
    return this.pluginStore.data.get(this.props.params.pluginId);
  }
}
