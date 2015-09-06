'use strict';

import {EventEmitter} from 'events';
import React from 'react';
import Router from 'react-router';
import {PanelHelpers} from 'capacitor-devtools-helpers';
import Locator from 'capacitor-locator';

import PluginStore from 'src/stores/plugin';
import routes from 'src/routes';
import PluginManager from 'src/services/plugin-manager';

export default {
  startPanel(root, portName, content, injected) {
    const emitter = new EventEmitter();
    const pluginManager = new PluginManager({emitter});

    window.registerPlugin = function (...args) {
      Locator.get(PluginStore).registerPlugin(...args);
    };

    PanelHelpers.initializePanel(portName, emitter, content, injected).then(function () {
      pluginManager.forwardEvents();
      Router.run(routes, (Handler) => {
        React.render(<Handler/>, root);
      });
    });
  }
};
