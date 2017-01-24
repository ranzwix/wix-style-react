# Input component

> General input container.

## Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| value | string | - | - | Inputs value |
| theme | string | normal | - | The theme of the input, can be one of `normal`, `paneltitle` |
| defaultValue | string | - | - | Default value for those who wants to use this component un-controlled |
| tabIndex  | number | - | - | Standard component tabIndex |
| placeholder  | string | - | - | Placeholder to display |
| readOnly  | bool | false | - | Sets the input to readOnly |
| error  | bool | false | - | Is input value erroneous |
| menuArrow | bool | false | - | Should the component include a menu arrow |
| autoFocus | bool | false  | - | Standard React Input autoFocus (focus the element on mount) |
| autoSelect | bool | false | - | Standard React Input autoSelect (select the entire text of the element on focus) |
| onChange  | func | - | - | Standard input onChange callback |
| onBlur | func | - | -  | Standard input onBlur callback |
| onFocus | func | - | - | Standard input onFocus callback |
| onEnterPressed | func | - | - | Called when user presses -enter- |
| onEscapePressed | func | - | - | Called when user presses -escape- |
| onKeyDown | func | - | - | Standard input onKeyDown callback |
| onClear | func | - | - | Displays a X button on a non-empty input, and calls this callback when pressed. This callback should normally erase the value of the controlled object, and call focus |
| size | string | normal | - | Specifies the size of the input (small, normal, large) |
| dataHook | string | normal | - | Specifies a data-hook for tests |
| prefix | node | - | - | Component you want to show as the prefix of the input |
| suffix | node | - | - | Component you want to show as the suffix of the input |

## Functions

| function name | description |
|---------------|-------------|
| focus | Focuses on the input |
| blur | Blurs the input (loses focus) |
| select | Selects all text in the input |
