 import { has } = require('../util/lang');

 // https://github.com/jquense/react-widgets
 export default {

   componentWillUnmount() {
     var timers = this._timers || {};
     this._unmounted = true;
     for (var k in timers) {
       if (has(timers, k)) {
         clearTimeout(timers[k]);
       }
     }
   }

   setTimeout(key, cb, duration) {
     var timers = this._timers || (this._timers = Object.create(null));

     if (this._unmounted)
       return;

     clearTimeout(timers[key]);

     timers[key] = window.setTimeout(cb, duration);
   }

 };
