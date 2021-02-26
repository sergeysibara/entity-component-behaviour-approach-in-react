// Map behaviours renderData to object with isolated renderData objects.
// For example: { behaviour1RenderData, behaviour2RenderData }
const mapToIsolatedRenderDataObjects = container => {
  let retData = container.behaviourArray.reduce((renderData, beh) => {
    renderData[beh.name] = container.getBehaviourRenderData(beh);
    return renderData;
  }, {});
  return retData;
};

// Return all behaviours renderData props mixed in single object.
// Caution! Can use only if you are sure that all component behaviours do not return a fields with same names.
const mapToMixedRenderData = component => {
  const behavioursRenderData = mapToIsolatedRenderDataObjects(component);
  let retRenderData = Object.values(behavioursRenderData).reduce(
    (mixedData, behRenderData) => {
      Object.assign(mixedData, behRenderData);
      return mixedData;
    },
    {}
  );
  return retRenderData;
};

export { mapToIsolatedRenderDataObjects, mapToMixedRenderData };
