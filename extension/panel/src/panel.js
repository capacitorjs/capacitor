'use strict';

import {startPanel} from 'src/app';

const portName = 'github.com/capacitorjs/capacitor:panel';
const content = '/content/lib/content.js';
const injected = '/injected/lib/injected.js';

const root = document.getElementById('app-container');
startPanel(root, portName, content, injected);
