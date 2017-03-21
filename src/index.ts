import App from './main';
import { ComponentManager } from '@glimmer/component';
import {
  UpdatableReference
} from '@glimmer/object-reference';

function initializeApp() {
  let app = new App();

  app.registerInitializer({
    initialize(registry) {
      registry.register(`component-manager:/${app.rootName}/component-managers/main`, ComponentManager)
    }
  });

  return app;
}

class FooBarElement extends HTMLElement {
  connectedCallback() {
    let app = initializeApp();

    app.rootRef = new UpdatableReference({
      customElement: {
        name: 'foo-bar',
        element: this
      }
    });

    app.boot();
  }
}

window.customElements.define('foo-bar', FooBarElement);
