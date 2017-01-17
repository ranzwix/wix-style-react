# Contribution
You are more than welcome to contribute by creating pull-requests.

Please see [Button](https://github.com/wix/wix-style-react/tree/master/src/Button) component for reference

### Components design (in progress)
* This library is using es6 + jsx - please follow it
* All assets are in src/assets folder
* Each component must have e2e, unit testing and testkit provided
* One React component per js file
* Most of the components needs be a [controlled components](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/), if you still think that a component should be uncontrolled after you read the article you are welcome to push a pr for it.
* Components needs to support rtl and ltr props

### Adding new component
* Check [Adding new components](https://github.com/wix/wix-style-react/projects/1) project if someone already working on your component or there is an open issue for that component
* If no one is working on it and no issue exists, create a new issue for your component, add it to [Adding new components](https://github.com/wix/wix-style-react/projects/1) -> “In Progress” and assign it to yourself.
* Add the component docs to [stories](https://github.com/wix/wix-style-react/tree/master/stories)
    * A story consists of properties, usage examples and code examples, please refer to [Button docs](https://github.com/wix/wix-style-react/tree/master/stories/Button) for example.
    * Make sure to add your component to [Storybook config](https://github.com/wix/wix-style-react/blob/master/.storybook/config.js)      
* Add component test, e2e and drivers to the component's folder.
* Add index.js file to the component's folder and export your component.
* Export your testkitFactory from the following files:
    * 'wix-style-react/testkit/index.js'
    * 'wix-style-react/testkit/enzyme.js'
    * 'wix-style-react/testkit/protractor.js'


### Enhancing an existing component:
* Check [Enhancing existing components](https://github.com/wix/wix-style-react/projects/2) project if someone already working on your request or there is an open issue for it
* If no one is working on it and no issue exists, create a new issue, add it to [Enhancing existing components](https://github.com/wix/wix-style-react/projects/2) -> “In Progress” and assign it to yourself.
