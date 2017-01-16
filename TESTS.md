# TestKit (work in progress)
This package comes with test-kits for the different components. Each component has a `<componentName>TestkitFactory` method which exposes an api for the specific component. It will receive a wrapper (for now we only support Enzyme wrapper) and component dataHook as an input , and returns an object which contains all API methods.

For example:

Using wix style Button in your production code:

```js
<myForm>
  ...
  <Button dataHook="my-button" />
  ...
```

Inside your test:

```javascript
import ReactTestUtils from 'react-addons-test-utils';
import {buttonTestkitFactory} from 'wix-style-react/dist/testkit';

const myFormWrapper = ReactTestUtils.renderIntoDocument(<myForm...>);

//Initial the testkit:
const buttonTestkit = buttonTestkitFactory({wrapper: myFormWrapper, dataHook: 'my-button'});//testkit factory should receive a DOM element wrapper and an dataHook and expose an api for it

//Use the testkit
buttonTestkit.click();

```

If you are using Enzyme:

```javascript
import {mount} from 'enzyme';
import {buttonTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';

const myFormWrapper = mount(<myForm...>);

//Initial the testkit:
const buttonTestkit = buttonTestkitFactory({wrapper: myFormWrapper, dataHook: 'my-button'});//testkit factory should receive an Enzyme wrapper and an dataHook and expose an api for it

//Use the testkit
buttonTestkit.click();

```
