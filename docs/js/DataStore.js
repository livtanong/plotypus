// not really a store. hehe.

import _ from "lodash";

export function sineFunc(x, offset) {
	var offset = offset || 0
	return Math.sin(x + offset) * 4 + 4;
}

export function datagen(count, cats, series) {
	return _.flatten(_.times(count, function(n){
		return _.map(series, function(serie){		
		  return {
		    value: sineFunc(n, 0.5) + (Math.random() - 0.5) * 2,
		    category: n,
		    series: serie
		  }
		})
	}));
}

export let data = datagen(8, _.range(0, 8), ["a", "b", "c"]);