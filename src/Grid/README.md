# Grid and Card

A grid container is based on rows with a 12 column layout.

For full documentation read [Bootstrap docs](https://v4-alpha.getbootstrap.com/layout/grid)

## wix-style-react additions to bootstrap

#### Container

Use for main content area.

Use ".wix-container" instead of bootstrap's ".container". 

.wix-container adds to main content area: min width of 894px and max width of 1254px.

#### Card

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| title | string | - | - | The title of the card |
| subtitle | string | - | - | The subtitle of the card |
| withoutDivider | bool | - | - | Whether to draw divider between the titles and the content or not |
| link | Object of Card Link | - | - | show a link in the header, will be shown only if a title is set |

#### Card Link

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| link | string | - | - | The link itself |
| title | string | - | - | the title to this link |

#### Row

A simple row according to the bootstrap docs

#### Col

A simple column according to the bootstrap docs

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| span | number | - | + | The columns span of this column |
