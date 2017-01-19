# Tooltip component

> A Tooltip component

## Properties

| propName        | propType                                                    | defaultValue | isRequired | description |
|-----------------|-------------------------------------------------------------|--------------|------------|-------------|
| children        | element                                                     |              |            |             |
| content         | node                                                        |              | true       |             |
| placement       | string (top, right, bottom, left)                           | top          |            |             |
| alignment       | string (top, right, bottom, left, center)                   | center       |            |             |
| theme           | string (light, dark, error (For Restaurants. Unapproved yet)) | light        |            |             |
| showDelay       | number                                                      | 200          |            |             |
| hideDelay       | number                                                      | 500          |            |             |
| showTrigger     | string (custom, mouseenter, mouseleave, click, focus, blur) | mouseenter   |            |             |
| hideTrigger     | string (custom, mouseenter, mouseleave, click, focus, blur) | mouseleave   |            |             |
| active          | bool                                                        | false        |            |             |
| bounce          | bool                                                        | false        |            |             |
| moveBy          | object ({x: Number, y: Number})                             |              |            |             |
| disabled        | bool                                                        | false        |            |             |
| moveArrowTo     | Number                                                      |              |            | Allows to position the arrow relative to tooltip. Positive value calculates position from left/top. Negative one calculates position from right/bottom. |
