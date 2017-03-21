export default {
  modulePrefix: 'hello-glimmer',
  moduleConfiguration: {
    types: {
      application: { definitiveCollection: 'main' },
      component: { definitiveCollection: 'components' },
      renderer: { definitiveCollection: 'main' },
      service: { definitiveCollection: 'services' },
      template: { definitiveCollection: 'components' },
      util: { definitiveCollection: 'utils' },
      'component-manager': {
        definitiveCollection: 'component-managers'
      }
    },
    collections: {
      main: {
        types: ['application', 'renderer']
      },
      components: {
        group: 'ui',
        types: ['component', 'template']
      },
      services: {
        types: ['service']
      },
      'component-managers': {
        types: ['component-manager']
      }
    }
  }
}
