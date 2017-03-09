# GoogleAddressInput component

> Address input box (using Google Maps)

## Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| countryCode | string | - | - | Country code used to help with suggestions and geocoding |
| onSet | func | - | - | Callback for results. Will return an object containing: originValue (value in the search), googleResult (google geocode result for the search), address (which will include: formatted (google formatted address), country, countryCode, street, number, postalCode, latLng (lat, lng)) |
| Client | func | - | + | Google map client implementation (should implement autocomplete and geocode functions). Normally you would use wix-style-react/clients/GoogleMapsClient |
| placeholder | string | - | - | Placeholder for the input box |
| defaultValue | string | - | - | Initial value to display |
| value | string | - | - | Controlled mode - value to display |
| valuePrefix | string | - | - | Value to place before every search term (normally should not be used) |
| types | array | - | - | Limit the autocomplete to specific types (see [here](https://developers.google.com/places/supported_types#table3) for list) |
| filterTypes | array | - | - | Lower level filtering of autocomplete result types (see [here](https://developers.google.com/places/supported_types) for list) |
| error | string | false | - | Should display error marker |
| onChange | func | - | - |  |
| onFocus | func | - | - |  |
| onBlur | func | - | - |  |
| magnifyingGlass | bool | true | - | Show or hide magnifying glass icon |
| readOnly | bool | false | - | Sets the input to readOnly |
| footer | any | - | - | Display a footer as the last suggestion in the list |
| footerOptions  | object | - | - | Set the footer's options (e.g. disabled, overrideStyles, etc. ) |
| clearSuggestionsOnBlur | bool | true | - | Clear the suggestions list upon input blur |
