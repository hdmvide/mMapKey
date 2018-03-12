# mMapKey

**mMapKey** is a jQuery plugin that permit, by the parameters configuration, apply a keyboard shortcuts on document of the your webage

An Example of a only shortcut with double press:

```code
<script src="mapkey.js" type="text/javascript"></script>
<script>
var mMapKey_Params = [
    {
        keycode: ["1"],
        repeat : 2,
        callback :  function(){
                                   alert("executed");
                                }
    }
    ... // array to map multiple shortcut 
]
</script>
```


An Example of a only shortcut with key combination. Key combination requires a multiple parameter without repeat parameter, because not permit repeat pressure:

```code
<script src="mapkey.js" type="text/javascript"></script>
<script>
var mMapKey_Params = [
    {
        keycode: ["ctrl+a", ...],
        callback : function(){
            alert("executed");
        }
    }
    ... // array to map multiple shortcut 
]
$(document).ready(function(){

    new mMapKey().init(mMapKey_Params);

});
</script>
```


## jQuery Compatibility

Works with jQuery 1.4.2 and newer.

It is known to be working with all the major browsers on all available platforms (Win/Mac/Linux)

 * IE 6/7/8+
 * FF 1.5/2/3+
 * Opera-9+
 * Safari-3+
 * Chrome-0.2+
