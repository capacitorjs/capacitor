'use strict';

import React from 'react';
import {Link} from 'react-router';

export default class PluginList extends React.Component {
  static get propTypes() {
  }

  render() {
    const pluginLinks = this.props.plugins.map(function (plugin, index) {
      return (
        <li className='plugin-item' key={plugin.channelName}>
          <Link to='plugin' params={{pluginId: index}}>{plugin.displayName}</Link>
        </li>
      );
    });
    return <ul className='plugin-list'>{pluginLinks}</ul>;
  }
}
