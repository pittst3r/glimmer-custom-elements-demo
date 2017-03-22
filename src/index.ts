import App from './main';
import { ComponentManager } from '@glimmer/component';
import {
  UpdatableReference
} from '@glimmer/object-reference';

const app = new App();

app.registerInitializer({
  initialize(registry) {
    registry.register(`component-manager:/${app.rootName}/component-managers/main`, ComponentManager)
  }
});

app.boot();

createCustomElement('foo-bar');

function createCustomElement(name) {
  class CustomElementWrapper extends HTMLElement {
    connectedCallback() {
      let placeholder = document.createTextNode('');
      let parent = this.parentNode;

      parent.insertBefore(placeholder, this);
      parent.removeChild(this);

      app.renderComponent(name, parent, placeholder);
    }
  }

  window.customElements.define(name, CustomElementWrapper);
}
