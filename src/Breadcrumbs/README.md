# Breadcrumbs component


## Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| items | array of objects (see item)| - | + | Specifies items for breadcrumbs |
| onClick | func | - | - | callback on item click |
| activeId | string, int | - | - | id of current active item |
| size | string ('medium', 'large') | 'medium' | - | size of items |
| theme | string ('onWhiteBackground', 'onGrayBackground', 'onDarkBackground') | 'onGrayBackground' | - | Specifies breadcrubms background and font colors |

## Item
| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| id | string or number| - | + | Specifies the item id |
| value | string or node | - | + | Callback on item click |
| link | string | - | - | Optional link to be called on click |

## Breadcrumbs Path Factory
```javascript
  /**
  * path: The path of the breadcrumbs - aaa/bbb/ccc will result 3 items of value aaa, bbb, ccc and link of '/aaa', '/aaa/bbb/', '/aaa/bbb/ccc'
  * baseUrlLink: Make the links relative to the new baseUrlLink instead of the current url
  * baseUrlVale: When given, the baseUrlLink will become the first option of the breadcrumbs
  * pathSeparator: allow to pass path with custom separator (i.e. 'aaa-bbb-ccc')
  */
  breadcrumbsPathFactory(path, baseUrlLink = '', baseUrlValue = null, pathSeparator = '/')
```


