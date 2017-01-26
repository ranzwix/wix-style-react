import {labelDriverFactory} from './TextField';

const labelTestkitFactory = ({wrapper, hook}) => {
  const label = wrapper.find(`[data-hook="${hook}"]`);
  return labelDriverFactory(label.node);
};

export {labelTestkitFactory};
