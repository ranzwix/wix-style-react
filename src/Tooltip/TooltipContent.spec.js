import React from 'react';
import {shallow} from 'enzyme';
import {spy} from 'sinon';

import TooltipContent from './TooltipContent';
import styles from './TooltipContent.scss';

class TooltipContentDriver {

  given = {
    props: props => {
      this._props = {children: 'It works on my machine', ...props};
    }
  }

  when = {
    created: props => {
      if (props) {
        this.given.props(props);
      }
      this._component = shallow(<TooltipContent {...this._props}/>);
    },
    mouseEntered: () => {
      this._component.find(`.${styles.root}`).simulate('mouseenter');
    },
    mouseLeft: () => {
      this._component.find(`.${styles.root}`).simulate('mouseleave');
    }
  }

  get = {
    component: () => this._component.find(`.${styles.tooltip}`),
    arrow: () => this._component.find(`.${styles.arrow}`),
    text: () => this._component.text(),
    hasLightTheme: () => this.get.component().hasClass(styles.light),
    hasDarkTheme: () => this.get.component().hasClass(styles.dark),
    style: () => this._component.find(`.${styles.root}`).props().style,
    arrowStyle: () => this.get.arrow().props().style,
    isArrowAtTop: () => this.get.arrow().hasClass(styles.top),
    isArrowAtLeft: () => this.get.arrow().hasClass(styles.left),
    isArrowAtRight: () => this.get.arrow().hasClass(styles.right),
    isArrowAtBottom: () => this.get.arrow().hasClass(styles.bottom),
    isBouncing: () => {
      const component = this._component.find(`.${styles.fadeIn}`).childAt(0);
      return [
        component.hasClass('bounce-on-left'),
        component.hasClass('bounce-on-right'),
        component.hasClass('bounce-on-top'),
        component.hasClass('bounce-on-bottom')
      ].some(i => i);
    }
  }

}

describe('TooltipContent', () => {

  let driver;

  beforeEach(() => driver = new TooltipContentDriver());

  it('should render given children', () => {
    driver.when.created({children: 'First, solve the problem. Then, write the code.'});
    expect(driver.get.text()).toEqual('First, solve the problem. Then, write the code.');
  });

  it('should allow using dark theme', () => {
    driver.when.created({theme: 'dark'});
    expect(driver.get.hasDarkTheme()).toEqual(true);
    expect(driver.get.hasLightTheme()).toEqual(false);
  });

  it('should allow using light theme', () => {
    driver.when.created({theme: 'light'});
    expect(driver.get.hasDarkTheme()).toEqual(false);
    expect(driver.get.hasLightTheme()).toEqual(true);
  });

  it('should notify when mouse entered', () => {
    const onMouseEnter = spy();
    driver.when.created({onMouseEnter});
    driver.when.mouseEntered();
    expect(onMouseEnter.calledOnce).toEqual(true);
  });

  it('should notify when mouse left', () => {
    const onMouseLeave = spy();
    driver.when.created({onMouseLeave});
    driver.when.mouseLeft();
    expect(onMouseLeave.calledOnce).toEqual(true);
  });

  it('should allow setting custom style', () => {
    driver.when.created({style: {border: 0}});
    expect(driver.get.style()).toEqual({border: 0});
  });

  it('should allow setting custom arrow style', () => {
    driver.when.created({arrowStyle: {border: 0}});
    expect(driver.get.arrowStyle()).toEqual({border: 0});
  });

  it('should allow setting arrow at top', () => {
    driver.when.created({arrowPlacement: 'top'});
    expect(driver.get.isArrowAtTop()).toEqual(true);
  });

  it('should allow setting arrow at right', () => {
    driver.when.created({arrowPlacement: 'right'});
    expect(driver.get.isArrowAtRight()).toEqual(true);
  });

  it('should allow setting arrow at bottom', () => {
    driver.when.created({arrowPlacement: 'bottom'});
    expect(driver.get.isArrowAtBottom()).toEqual(true);
  });

  it('should allow setting arrow at left', () => {
    driver.when.created({arrowPlacement: 'left'});
    expect(driver.get.isArrowAtLeft()).toEqual(true);
  });

  it('should not bounce by default', () => {
    driver.when.created({});
    expect(driver.get.isBouncing()).toEqual(false);
  });

  it('should bounce once property set', () => {
    driver.when.created({bounce: true});
    expect(driver.get.isBouncing()).toEqual(true);
  });
});
