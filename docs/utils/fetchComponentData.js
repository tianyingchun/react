export default function fetchComponentData(dispatch, components, params) {
  const needs = components.reduce( (prev, current) => {

    // if we attached @connect to component class the component will be wrapped in connectorDecorator
    if(current && current.name === 'ConnectorDecorator') {
      current = current.DecoratedComponent;
    }

    return (current.needs || [])
      .concat((current.WrappedComponent ? current.WrappedComponent.needs : []) || [])
      .concat(prev);
    }, []);

  const promises = needs.map(need => dispatch(need(params)));

  return Promise.all(promises);
}
