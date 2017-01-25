import {configure} from '@kadira/storybook';
import {setOptions} from '@kadira/storybook-addon-options';

function loadStories() {
  require('../stories/stories.scss');

  require('../stories/Introduction');
  require('../stories/Input');
  require('../stories/InputWithOptions');
  require('../stories/AutoComplete');
  require('../stories/InputArea');
  require('../stories/GoogleAddressInput');
  require('../stories/ToggleSwitch');
  require('../stories/Checkbox');
  require('../stories/RadioGroup');
  require('../stories/Button');
  require('../stories/ButtonSelection');
  require('../stories/MessageBox');
  require('../stories/Modal');
  require('../stories/Loader');
  require('../stories/Toast');
  require('../stories/DatePicker');
  require('../stories/TimeInput');
  require('../stories/Tooltip');
  require('../stories/MultiSelect');
  require('../stories/Tag');
  require('../stories/SideBar');
  require('../stories/DataTable');
  require('../stories/DropdownLayout');
  require('../stories/Dropdown');
  require('../stories/Slider');
  require('../stories/Common');
  require('../stories/Composite');
  require('../stories/Label');
  require('../stories/TextField');
  require('../stories/TextArea');
  require('../stories/EndorseContentLayout');
  require('../stories/Icons');
	require('../stories/Breadcrubms');
  require('../stories/GridWithCardLayout');
}

configure(loadStories, module);

setOptions({
  showDownPanel: false
});
