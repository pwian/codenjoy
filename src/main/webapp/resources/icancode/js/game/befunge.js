/*
 * This work by http://www.elated.com is licensed under a Creative Commons Attribution 3.0 Unported License (http://creativecommons.org/licenses/by/3.0/)
 * Saved from url=(0131)http://www.elated.com/res/File/articles/development/javascript/jquery/drag-and-drop-with-jquery-your-essential-guide/card-game.html
 **/
 
$(init);

function init() {

	var goThere = null;
	
	var log = function(message) {
		$('#console').append(message + '</br>');
	}
	
	var cameFrom = function() {
		if (goThere == null) {
			return null;
		}

		return Direction.get(goThere).inverted().name();
	}
	var previousDirection = function() {
		if (goThere == null) {
			return null;
		}

		return goThere;
	}
	var robotGo = function(direction) {
		goThere = direction;
	}

	var cursor = null;
	var value = null;
	var running = false;
	
	var finishCommand = function() {
		value = null;
		running = false;
		log('// FINISH');
	}
	
	var commands = [
			{id:1, type:1, title:'˃', process: function(x, y) { // move cursor right
				direction = Direction.RIGHT;
				log('// change processor direction to RIGHT');
			}}, 
			{id:2, type:1, title:'˂', process: function(x, y) { // move cursor left
				direction = Direction.LEFT;
				log('// change processor direction to LEFT');
			}}, 
			{id:3, type:1, title:'˄', process: function(x, y) { // move cursor up
				direction = Direction.UP;
				log('// change processor direction to UP');
			}}, 
			{id:4, type:1, title:'˅', process: function(x, y) { // move cursor down
				direction = Direction.DOWN;
				log('// change processor direction to DOWN');
			}}, 
			{id:5, type:1, title:'»', process: function(x, y) { // start cursor // var value = null;
				cursor = pt(x, y);
				direction = Direction.RIGHT;
				value = null;
				running = true;
				log('// BEGIN');
			}}, 
			{id:6, type:1, title:'•', process: finishCommand}, // finish cursor
			
			{id:7, type:5, title:'←', process: function(x, y) { // robot.goLeft();
				robotGo('LEFT');
				log('robot.goLeft();');
			}},			
			{id:8, type:5, title:'→', process: function(x, y) { // robot.goRight();
				robotGo('RIGHT');
				log('robot.goRight();');
			}},			
			{id:9, type:5, title:'↑', process: function(x, y) { // robot.goUp();
				robotGo('UP');
				log('robot.goUp();');		
			}},			
			{id:10, type:5, title:'↓', process: function(x, y) { // robot.goDown();
				robotGo('DOWN');
				log('robot.goDown();');
			}},			
			{id:11, type:5, title:'Go', process: function(x, y) { // robot.go(value);
				robotGo(value);
				log('robot.go("' + value + '");');	
			}},			
			
			{id:12, type:7, title:'If', process: function(x, y) { // if (value == getNextValue()) { } else { }
				var leftOperand = value;
				var point = direction.change(cursor);
				var rightValue = board.process(point.getX(), point.getY());
				var expression = (leftOperand == rightValue);
				if (expression) {
					log('if ("' + leftOperand + '" == "' + rightValue + '") { !!! } else { ... }');	
					direction = direction.contrClockwise();
				} else {
					log('if ("' + leftOperand + '" == "' + rightValue + '") { ... } else { !!! }');	
					direction = direction.clockwise();
				}
			}},			
			{id:13, type:7, title:'Sc', process: function(x, y) { // value = robot.getScanner().at(value);
				value = "WALL"; // TODO implement me
				log('value = robot.getScanner().at("' + value + '");')
			}},			
			{id:14, type:7, title:'Cf', process: function(x, y) { // value = robot.cameFrom();
				value = cameFrom();
				log('value = cameFrom() = ' + value);
			}},			
			{id:15, type:7, title:'Pd', process: function(x, y) { // value = robot.previousDirection();
				value = previousDirection();
				log('value = previousDirection() = ' + value);
			}},			
			
			{id:16, type:4, title:'L', process: function(x, y) { // value = 'LEFT'
				value = 'LEFT';
				log('value = "LEFT"');
			}},			
			{id:17, type:4, title:'R', process: function(x, y) { // value = 'RIGHT'
				value = 'RIGHT';
				log('value = "RIGHT"');
			}},			
			{id:18, type:4, title:'U', process: function(x, y) { // value = 'UP'
				value = 'UP';
				log('value = "UP"');
			}},			
			{id:19, type:4, title:'D', process: function(x, y) { // value = 'DOWN'
				value = 'DOWN';
				log('value = "DOWN"');
			}},			
			
			{id:20, type:6, title:'Nu', process: function(x, y) { // value = null
				value = null;
				log('value = null');
			}},			
			
			{id:21, type:3, title:'W', process: function(x, y) { // value = 'WALL'
				value = 'WALL';
				log('value = "WALL"');
			}},			
			{id:22, type:3, title:'N', process: function(x, y) { // value = 'NONE'
				value = 'NONE';
				log('value = "NONE"');
			}},			
			{id:23, type:3, title:'S', process: function(x, y) { // value = 'START'
				value = 'START';
				log('value = "START"');
			}},			
			{id:24, type:3, title:'E', process: function(x, y) { // value = 'END'
				value = 'END';
				log('value = "END"');
			}},			
			{id:25, type:3, title:'G', process: function(x, y) { // value = 'GOLD'
				value = 'GOLD';
				log('value = "GOLD"');
			}},			
			{id:26, type:3, title:'B', process: function(x, y) { // value = 'BOX'
				value = 'BOX';
				log('value = "BOX"');
			}},			
			{id:27, type:3, title:'H', process: function(x, y) { // value = 'HOLE'	
				value = 'HOLE';
				log('value = "HOLE"');
			}}			
		];

	var mapSlots = [];
	var size = 10;
	for (var y = 0; y < size; y++) {
		mapSlots[y] = [];
		for (var x = 0; x < size; x++) {
			var element = $('<div></div>')
				.data('data-point', pt(x, y))
				.appendTo('#cardSlots');
			mapSlots[y][x] = element;
		}
	}
	
	for (var index = 0; index < commands.length; index++) {
		for (var count = 0; count < 2; count++) {
			$('<div></div>')
				.data('data-type', commands[index])
				.appendTo('#cardPile');
			
		}
	}

	var mapCards = [];
	var createNewOnPile = function(element) {
		var type = $(element).data('data-type');
		var appended = $('<div class="type-' + type.type + '">' + type.title  + '</div>')
			.data('data-type', type)
			.appendTo(element);	
		mapCards.push(appended);
	}
	
	$('#cardPile>div').each(function(index, element) {
		createNewOnPile(element);	
	});
	
	var initBoard = function() {
		var processCard = function(card, x, y) {
			if (!!card) {
				card.data('data-type').process(x, y);
			} else if (card == null) {
				log('// skip empty cell');
			} else {
				// do nothing - we are out of the board
			}
		}
	
		var getSlot = function(x, y) {
			return mapSlots[y][x];
		}
	
		var getCard = function(x, y) {
			if (pt(x, y).isBad(size)) {
				log('// out of the board'); 
				finishCommand();
				return false;
			}
			var card = getSlot(x, y).data('parked');
			if (!card) {
				return null;
			}
			return card;
		}
		
		var find = function(id) {
			for (var index in mapCards) {
				var card = mapCards[index];
				if (card.data('data-type').id != id) {
					continue;
				}
				
				var slot = card.data('parkedTo');
				if (isOnCardPile(slot)) {
					continue;
				}
				
				return card;
			}
			log('Card with id ' + id + ' not found!');
		}
		
		var start = function() {
			var startCard = find(5)
			var point = startCard.data('parkedTo').data('data-point');
			animate(point.getX(), point.getY());
			processCard(startCard, point.getX(), point.getY());
		}
		
		var animateDiv = function(div, style, value) {
			var oldValue = div.css(style);
			var css = {};
			css[style] = value;
			div.animate(css, {duration : "fast", complete: function () {
				css[style] = oldValue;
				div.animate(css, "fast");
			}});
		}
		
		var animate = function(x, y) {
			var div = getCard(x, y);
			if (div == null) {
				div = getSlot(x, y);
			}
			animateDiv(div, "background-color", "#000");
		}
		
		var goNext = function() {
			cursor = direction.change(cursor);	
			animate(cursor.getX(), cursor.getY());
			log('// processor go ' + direction.name());
			process(cursor.getX(), cursor.getY());
		}
		
		var process = function(x, y) {
			var card = getCard(x, y);
			processCard(card, x, y);
			return value;
		}
		
		return {
			start : start,
			goNext : goNext, 
			process : process
		}
	}
	
	var park = function(card, slot) {
		var fromSlot = card.data('parkedTo');
		if (!!fromSlot) {
			fromSlot.data('parked', null);
		}
		var initialSlot = card.data('initial');
		if (!initialSlot) {
			card.data('initial', slot);
		}
		slot.data('parked', card);
		card.data('parkedTo', slot);
		card.position({of: slot, my: 'left top', at: 'left top'});
	}
		
	var isOnCardPile = function(slot) {
		return slot.parent().attr('id') == 'cardPile';
	}

	var doNotRevert = false;
	$('#cardPile>div>div').draggable({
		cursor: 'move',
		revert: function (event, ui) {
			if (typeof event == 'object') {
				var slot = event;
				var card = $(this);
				var parked = slot.data('parked');
				if (!parked) {
					return false;
				}
				
				if (parked[0] == card[0]) {
					return false;
				}
				
				if (doNotRevert) {
					doNotRevert	= false;
					return false;
				}
		
				return true;
			}
			return !event;
		}
	})
	
	var moveToInitial = function(card) {
		var slot = card.data('initial');
		park(card, slot);
	}
	
	$('#cardPile>div>div').each(function(index, element) {
		var card = $(this);
		var slot = card.parent();
		park(card, slot);
	}).dblclick(function(element) {
		var card = $(this);
		if (isOnCardPile(card.data('parkedTo'))) {
			return;
		} 
		moveToInitial(card);
	});

    $('#cardSlots>div, #cardPile>div').droppable({
		hoverClass: 'hovered',
		drop: function (event, ui) {
			var slot = $(this);
			if (slot.hasClass('ui-draggable')) {
				slot = slot.data('parkedTo');
			}
			var card = ui.draggable;

			var busy = !!slot.data('parked')
			if (busy) {
				if (isOnCardPile(slot)) {
					doNotRevert = true;
					moveToInitial(card);
				}
				return;
			}			
			
			if (isOnCardPile(slot)) {
				moveToInitial(card);
			} else {
				park(card, slot);
			}
		}
	});
	
	var board = null;
	
	$('#nextStep').click(function() {
		if (board == null || !running) {
			board = initBoard();
			$('#console').html('');
			board.start();
		} else {
			board.goNext();
		}
	});	
	
}