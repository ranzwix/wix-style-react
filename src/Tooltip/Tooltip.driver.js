import React from 'react';
import {mount} from 'enzyme';

import Tooltip from './Tooltip';
import TooltipContentStyles from './TooltipContent.scss';

export default class TooltipDriver {
  constructor() {
    document.body.innerHTML = '';
  }
  _props = {content: <div/>};
  _component = null;

  given = {
    props: props => {
      this._props = {...this._props, ...props};
      return this;
    }
  };

  when = {
    created: children => {
      this._component = mount(<Tooltip {...this._props}>{children}</Tooltip>);
      return this;
    },
    clicked: () => {
      this._component.find(Tooltip).simulate('click');
      return this;
    },
    focused: () => {
      this._component.find(Tooltip).simulate('focus');
      return this;
    },
    blured: () => {
      this._component.find(Tooltip).simulate('blur');
      return this;
    },
    mouseEntered: () => {
      this._component.find(Tooltip).simulate('mouseenter');
      return this;
    },
    mouseLeft: () => {
      this._component.find(Tooltip).simulate('mouseleave');
      return this;
    }
  };

  get = {
    isShown: () => this._component.instance().isShown(),
    willBeShown: () => this._component.instance().willBeShown(),
    willBeHidden: () => this._component.instance().willBeHidden(),
    isThemeError: () => document.body.getElementsByClassName(TooltipContentStyles.tooltip)[0].classList.contains(TooltipContentStyles.error)
  }
}
