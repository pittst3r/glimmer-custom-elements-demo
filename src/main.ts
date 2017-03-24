import Application, {
  ApplicationOptions
} from '@glimmer/application';
import Resolver, {
  ResolverConfiguration,
  BasicModuleRegistry
} from '@glimmer/resolver';
import config from './config/environment';
import moduleMap from './config/module-map';
import customElementDefinitions from './config/custom-element-definitions';

const resolverConfiguration: ResolverConfiguration = {
  app: { name: config.modulePrefix, rootName: config.modulePrefix },
  types: config.moduleConfiguration.types,
  collections: config.moduleConfiguration.collections
};

interface CustomElementDefinition {
  name: string
}

interface ApplicationOptionsWithCustomElements extends ApplicationOptions {
  customElementDefinitions: CustomElementDefinition[]
}

class ApplicationWithCustomElements extends Application {
  constructor(options: ApplicationOptionsWithCustomElements) {
    super(options);

    this.registerCustomElements(options.customElementDefinitions);
  }

  private registerCustomElements(customElementDefinitions: CustomElementDefinition[]): void {
    customElementDefinitions.forEach(({ name }) => {
      this.registerCustomElement(name);
    });
  }

  private registerCustomElement(name: string): void {
    let app = this;

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
}

export default class App extends ApplicationWithCustomElements {
  constructor() {
    let moduleRegistry = new BasicModuleRegistry(moduleMap);
    let resolver = new Resolver(resolverConfiguration, moduleRegistry);

    super({
      rootName: config.modulePrefix,
      resolver,
      customElementDefinitions
    });
  }
}
