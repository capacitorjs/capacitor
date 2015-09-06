'use strict';

import React from 'react';
import Immutable from 'immutable';
import {EventEmitter} from 'events';
import Locator from 'capacitor-locator';
import AppView from 'src/components/app-view';
import PluginList from 'src/components/plugin-list';
import PluginStore from 'src/stores/plugin';

describe('AppView', function () {
  beforeEach(function () {
    this.pluginStore = {
      emitter: new EventEmitter(),
      data: new Immutable.List()
    };
    Locator.set(PluginStore, this.pluginStore);
    this.sandbox.spy(AppView.prototype, 'setState');
    this.app = this.renderer.render(AppView);
  });

  it('passes the plugins to the PluginList', function () {
    const pluginList = this.ShallowUtils.findWithType(this.app, PluginList);
    expect(pluginList.props.plugins).to.equal(this.pluginStore.data);
  });

  it('always updates', function () {
    expect(AppView.prototype.shouldComponentUpdate).not.to.be.defined;
  });

  it('tears down listeners on unmount', function () {
    const appView = new AppView();
    appView.setState = this.sandbox.stub();
    appView.componentWillUnmount();
    this.pluginStore.emitter.emit('change');
    expect(appView.setState).not.to.have.been.called;
  });

  describe('updating the plugins', function () {
    beforeEach(function () {
      this.pluginStore.data = new Immutable.List([{plugin: 1}, {plugin: 2}]);
      this.pluginStore.emitter.emit('change');
    });

    it('sets the plugins on the state', function () {
      expect(AppView.prototype.setState).to.have.been.calledOnce
        .and.calledWith({plugins: this.pluginStore.data});
    });

    it('passes the new plugins to the PluginList', function () {
      this.app = this.renderer.render(AppView);
      const pluginList = this.ShallowUtils.findWithType(this.app, PluginList);
      expect(pluginList.props.plugins).to.equal(this.pluginStore.data);
    });
  });
});
