const _ = require('lodash');

function upperCamelCase(name) {
  return _.upperFirst(_.camelCase(name))
}

export default function (options, components) {
  const componentNames = [];
  for (const componentsKey in components) {
    componentNames.push(upperCamelCase(componentsKey));
  }
  options.forEach(function (option) {
    for (const key in option.component || {}) {
      if (Object.hasOwnProperty.call(option.component, key)) {
        const childComponent = option.component[key];
        if (_.isObject(childComponent) && !_.isFunction(childComponent) && _.isString(childComponent.name)) {
          components[childComponent.name] = childComponent
        }
      }
    }
    const tag = upperCamelCase(option.tag);
    let has = false;
    for (let i = 0; i < componentNames.length; i++) {
      if (has) {
        continue;
      }
      const componentName = componentNames[i];
      has = componentName === tag;
    }
    if (!has) {
      components[tag] = option.component;
    }
  });
}