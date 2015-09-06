'use strict';

import {EventEmitter} from 'events';
import {InjectedHelpers} from 'capacitor-devtools-helpers';
import CapacitorBridge from 'src/capacitor-bridge';

const emitter = new EventEmitter();
InjectedHelpers.proxyEvents(emitter);
const bridge = new CapacitorBridge(emitter);
bridge.proxyEvents();

window.__capacitor = {
  registerPlugin: bridge.registerPlugin.bind(bridge)
};

window.postMessage({
  name: 'github.com/capacitorjs/capacitor:ready'
}, '*');
