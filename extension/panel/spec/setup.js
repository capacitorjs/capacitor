'use strict';

import ShallowTestUtils from 'react-shallow-testutils';
import Locator from 'capacitor-locator';
import ChaiImmutable from 'chai-immutable';

window.chai.use(ChaiImmutable);

beforeEach(function () {
  this.sandbox = sinon.sandbox.create();
  Locator.__reset();
  this.ShallowUtils = ShallowTestUtils;
  this.renderer = new this.ShallowUtils.Renderer();
});

afterEach(function () {
  this.sandbox.restore();
});
