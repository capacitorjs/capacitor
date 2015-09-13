'use strict';

import React from 'react';
import Locator from 'capacitor-locator';
import PluginStore from 'src/stores/plugin';

export default class PluginContainer extends React.Component {
  constructor() {
    super();
    this.pluginStore = Locator.get(PluginStore);
    this.boundDisplayPluginIframe = this.displayPluginIframe.bind(this);
  }

  render() {
    return <div className="plugin-container"></div>
  }

  componentDidMount() {
    this.displayPluginIframe();
    window.addEventListener('resize', this.boundDisplayPluginIframe);
  }

  componentWillUnmount() {
    iframe.style.display = 'none';
    window.removeEventListener('resize', this.boundDisplayPluginIframe);
  }

  /**
   * Iframes lose state when their parent element is changed
   * Instead of moving iframes around in the DOM tree, move them around via styles
   */
  displayPluginIframe() {
    const node = React.findDOMNode(this);
    const bounds = node.getBoundingClientRect();
    const iframe = this.plugin.iframe;
    iframe.style.display = 'block';
    iframe.style.position = 'absolute';
    iframe.style.left = bounds.left + 'px';
    iframe.style.top = bounds.top + 'px';
    iframe.style.width = bounds.right - bounds.left + 'px';
    iframe.style.height = bounds.bottom - bounds.top + 'px';
  }

  get plugin() {
    return this.pluginStore.data.get(this.props.params.pluginId);
  }
}
