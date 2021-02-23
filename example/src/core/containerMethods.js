const removeBehaviour = (container, behaviourInstance) =>{
  const foundIndex = container.behaviourList.indexOf(behaviourInstance);
  if (foundIndex > -1) {
    if (behaviourInstance.behaviourWillRemoved) {
      behaviourInstance.behaviourWillRemoved();
    }
    container.behaviourList.splice(foundIndex, 1);
    delete container.behs[behaviourInstance.name];
    delete container.behsParams[behaviourInstance.name];
  } else {
    console.warn(
      `removeBehaviour error: ${behaviourInstance.name} not found`
    );
  }
};

const  getBehaviourRenderData = (container, behaviour) => {
  const renderData = behaviour.mapToRenderData();
  const wrapRenderData = container.behsParams[behaviour.name].wrapRenderData;
  if (wrapRenderData) {
    return wrapRenderData(renderData);
  }
  return renderData;
};

export  { removeBehaviour, getBehaviourRenderData };
