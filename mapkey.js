var mMapKey = function(){

  var _this = this;
	var _count = 0;
	var _character;
	var _characters;
	var _timeout;
	var _timeout2;

	var prefix = "mMapKey";

  var hotkeys = {

    specialKeys: {
      8: "backspace",
      9: "tab",
      10: "return",
      13: "return",
      16: "shift",
      17: "ctrl",
      18: "alt",
      19: "pause",
      20: "capslock",
      27: "esc",
      32: "space",
      33: "pageup",
      34: "pagedown",
      35: "end",
      36: "home",
      37: "left",
      38: "up",
      39: "right",
      40: "down",
      45: "insert",
      46: "del",
      59: ";",
      61: "=",
      96: "0",
      97: "1",
      98: "2",
      99: "3",
      100: "4",
      101: "5",
      102: "6",
      103: "7",
      104: "8",
      105: "9",
      106: "*",
      107: "+",
      109: "-",
      110: ".",
      111: "/",
      112: "f1",
      113: "f2",
      114: "f3",
      115: "f4",
      116: "f5",
      117: "f6",
      118: "f7",
      119: "f8",
      120: "f9",
      121: "f10",
      122: "f11",
      123: "f12",
      144: "numlock",
      145: "scroll",
      173: "-",
      186: ";",
      187: "=",
      188: ",",
      189: "-",
      190: ".",
      191: "/",
      192: "`",
      219: "[",
      220: "\\",
      221: "]",
      222: "'"
    },

    shiftNums: {
      "`": "~",
      "1": "!",
      "2": "@",
      "3": "#",
      "4": "$",
      "5": "%",
      "6": "^",
      "7": "&",
      "8": "*",
      "9": "(",
      "0": ")",
      "-": "_",
      "=": "+",
      ";": ": ",
      "'": "\"",
      ",": "<",
      ".": ">",
      "/": "?",
      "\\": "|"
    },

    // excludes: button, checkbox, file, hidden, image, password, radio, reset, search, submit, url
    textAcceptingInputTypes: [
      "text", "password", "number", "email", "url", "range", "date", "month", "week", "time", "datetime",
      "datetime-local", "search", "color", "tel"],

    // default input types not to bind to unless bound directly
    textInputTypes: /textarea|input|select/i,

    options: {
      filterInputAcceptingElements: true,
      filterTextInputs: true,
      filterContentEditable: true
    }
  };

	this.isEnabled = function(){
		var res = false;
		if(window.localStorage!==undefined){
			if (localStorage.getItem(getPrefixSaving(prefix))){
				res = true;
			}
		}
		return res;
	}

	this.setEnabled = function(){
		var res = false;
		if(window.localStorage!==undefined){
			if (!_this.isEnabled()){
				this.init();
				localStorage.setItem(getPrefixSaving(prefix), 1);
				res = true;
			}
		}
		return res;
	}

	this.setDisabled = function(){
		var res = false;
		if(window.localStorage!==undefined){
			if (_this.isEnabled()){
				localStorage.removeItem(getPrefixSaving(prefix));
				res = true;
			}
		}
		return res;
	}

  this.init = function(params){
		_characters = [];
		$(document).bind('keydown.mapkey', function(event){
			if (hotkeys.specialKeys[event.keyCode]){
				_characters.push(hotkeys.specialKeys[event.keyCode]);
			}else{
				_characters.push(String.fromCharCode(event.keyCode).toLowerCase());
			}
			_timeout2 = setTimeout(function(){
				_characters = [];
			}, 2000);
		});
		$(document).bind('keyup.mapkey', function(event){
			clearTimeout(_timeout);
			if (params && Array.isArray(params)){
				$.each(params, function( key, value ) {
					var _repeatkey = value.repeat ? value.repeat : 1;
					var _timeoutrepeat = value.timeout ? value.timeout : 400;
					if (value.multiple){
						if (value.keycode && Array.isArray(value.keycode)){
							$.each(value.keycode, function(key_1, value_1){
								if (JSON.stringify(_characters.reverse()) === JSON.stringify(value_1.split("+"))){
									if (value.callback && typeof 'function'){
										value.callback();
									}
								}
							});
						}
					}else{
						var eCode;
						if (hotkeys.specialKeys[event.keyCode]){
							eCode = hotkeys.specialKeys[event.keyCode];
						}else{
							eCode = String.fromCharCode(event.keyCode).toLowerCase();
						}
						if (!_character || _character == eCode){
							if (!_character){
								_character = eCode;
							}
							var _resKeyCode = false;
							if (value.keycode && Array.isArray(value.keycode)){
								if ($.inArray(_character, value.keycode) != -1){
									_resKeyCode = true;
								}
							}else if (value.keycode != null && typeof value.keycode == 'string'){
								if (_character == value.keycode){
									_resKeyCode = true;
								}
							}
							if (_resKeyCode){
								_count++;
								if (_count == _repeatkey){
									if (value.callback && typeof 'function'){
										value.callback();
									}
								}
							}
						}else{
							_character = eCode;
							_count = 0;
						}
					}
					_timeout = setTimeout(function(){
						_count = 0;
						_character = null;
						_characters = [];
					}, _timeoutrepeat);
				});
			}
		});
  }
	
	this.cancel = function(){
		$(document).unbind('keydown.mapkey');
		$(document).unbind('keyup.mapkey');
	}

}