var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require("object-assign");

var CHANGE_EVENT = 'change';

var _CalData = {
	InpLevel: 1,
	InpExp: 33,
	InpRarity: 2,
	InpPrompt: 0,
	InpFeed5: 0,
	InpFeed20: 0,
	InpFeed100: 0,
	InpFeed5x: 0,
	InpFeed20x: 0,
	InpFeed100x: 0,
	};

// ===============================================================================
// APP STORE FUNCTIONS
// ===============================================================================
function _RarityC(InpRarity){
	_CalData.InpRarity = InpRarity;
}


function _PromptC(InpPrompt){
	_CalData.InpPrompt = InpPrompt;
}

function _LevelInput(InpLevel){
	_CalData.InpLevel = InpLevel;
}



// ===============================================================================
// APP STORE MAIN
// ===============================================================================
// define a Store object the extends EventEmitter from node.js event lib
var AppStore = assign({}, EventEmitter.prototype, {
	getValue: function(){
		return _CalData;
	},

  // trigger a value changed event!!
	emitChange: function() {
    	this.emit(CHANGE_EVENT);
  },
  
  // the callback function will be defined and be passed from view 
  // in our example, the callback function be defined in DemoApp.react.js and named _onChange
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});



// ===============================================================================
// APP DISPATCHER
// ===============================================================================
//Use dispatcher to listen some events
AppDispatcher.register(function(action){
	switch(action.actionType){
		case "LevelInput":
			_LevelInput(action.InpLevel);
			AppStore.emitChange();
			break;
		
		case "RarityChange":
			_RarityC(action.InpRarity);
			AppStore.emitChange();
			break;
			
		case "PromptChange":
			_PromptC(action.InpPrompt);
			AppStore.emitChange();
			break;
			
			
		default:
	}
});

module.exports = AppStore;