Signals
==========

provider pub-sub event, we can communicate message between each react components

Usage
----------

Register signals

``` xml
<Signals onFirstSignalName={this.firstHandler} onSecondSignalName={this.secondHandler}/>

```

Notify signal

- By statics method:

``` javascript

var Signals = require('Signals);
Signals.notify('firstHandler', data);

```

- By DOM custom event:

``` javascript
var event = new CustomEvent('react-signal', {
    bubbles: false,
    detail: {
        name: 'secondHandler',
        data: data
    }
});
document.dispatchEvent(event);

```
