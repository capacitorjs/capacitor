'use strict';

import AppView from 'src/components/app-view';
import PluginContainer from 'src/components/plugin-container';
import React from 'react';
import {Route} from 'react-router';

export default (
  <Route name='home' path='/' handler={AppView}>
    <Route name='plugin' path='/plugin/:pluginId' handler={PluginContainer}/>
  </Route>
);
