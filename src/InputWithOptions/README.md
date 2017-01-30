# InputWithOptions component

> options component for Input. (Focus to see in action)

## Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| options | array | [] | - | Array of objects to display as options when focused. Objects can include *text* and *node* |
| onSelect | func | noop | - | Callback when the user selects one of the selections. Called with the selection. |
| onManuallyInput | func | noop | - | Callback when the user pressed the Enter key or Tab key after he wrote in the Input field - meaning the user selected something not in the list, this function will return a suggested option as the second parameter if found one |
| selectedId | string/number | - | - | The id of the selected option in the list |
| closeOnSelect | bool | true | - | Should the options container close on selection |
| inputElement | element | - | - | Set the component input element |
| disabled | bool | false | - |  when set to true this component is disabled
| fixedHeader | node | - | - | A fixed header to the list |
| fixedFooter | node | - | - | A fixed footer to the list |
| ***All of the Input's and DropdownLayout Props are also available for this component*** | | | | |


## Functions

| function name | description |
|---------------|-------------|
| focus | Focuses on the input |
| blur | Blurs the input (loses focus) |
| select | Selects all text in the input |
