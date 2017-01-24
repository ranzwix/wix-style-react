# Dropdown component

> Dropdown Select Component

## Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| options | array of option | [] | - | Array of objects. Objects must have an Id and can can include *value* and *node*. If value is '-', a divider will be rendered instead. |
| onSelect | func | - | - | Callback function called whenever the user selects a different option in the list |
| selectedId | string/number | - | - | The id of the selected option in the list |
| placeholder | string | '' | - | Shown when no option is selected |
| fixedHeader | node | - | - | A fixed header to the list |
| fixedFooter | node | - | - | A fixed footer to the list |
| ***All of the InputWithOptions Props are also available for this component*** | | | | |


## Option

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| id | string or number | - | + | The id of the option, should be unique |
| value | string or node | - | + | Can be a text or a react elements, if text is '-', a divider will render at that position. |
| disabled | bool | false | - | Is this option is disabled or not |
