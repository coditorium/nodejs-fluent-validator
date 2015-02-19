'use strict';

module.exports = template;

function template(txt, values, opts) {
	var marker = (opts && opts.marker) ? opts.marker : '$',
		escapedMarker = escapeRegExp(marker),
		tokens = matchRegExpGroup(txt, new RegExp(escapedMarker + '{\\ *([^' + escapedMarker + '}]+)\\ *}', 'g'));
	opts = opts || {};

	tokens.forEach(function(token) {
		var tokenChunks = token.split('|'),
			tokenValue = tokenChunks[0],
			tokenDefValue = tokenChunks.length > 0 ? tokenChunks[1] : null,
			pick = deepPick(values, tokenValue);
		if (pick) {
			txt = insertValue(txt, marker, token, pick);
		} else if (tokenDefValue) {
			txt = insertValue(txt, marker, token, tokenDefValue);
		} else if (!opts.throwUnresolved) {
			txt = insertValue(txt, marker, token, '');
		} else {
			throw new Error('Unresolved template variable: ' + token);
		}
	});
	return txt;
}

function insertValue(txt, marker, token, pickValue) {
	var value = pickValue;
	value = JSON.stringify(value);
	txt = txt.replace(escapedRegExp('\"' + marker + '{' + token + '}\"', 'g'), value);
	value = pickValue;
	txt = txt.replace(escapedRegExp(marker + '{' + token + '}', 'g'), value);
	return txt;
}

function escapedRegExp(str, opts) {
	return new RegExp(escapeRegExp(str), opts);
}

function escapeRegExp(str) {
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function matchRegExpGroup(txt, regexp) {
	var tokens = [],
		match = regexp.exec(txt);
	while(match != null) {
		tokens.push(match[1]);
		match = regexp.exec(txt);
	}
	return tokens;
}

function deepPick(obj, prop) {
	var splitted = prop.split('.'),
		lastProp = splitted.shift(),
		lastObj = obj;

	splitted.forEach(function(item) {
		lastObj = (lastObj) ? lastObj[lastProp] : null;
		lastProp = item;
	});
	return (!lastObj || lastObj[lastProp] === undefined) ? null : lastObj[lastProp];
}
