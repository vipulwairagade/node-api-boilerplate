/* eslint-disable */
/**
 * Kyle Ladd, 2015
 * See project's Github page for usage details.
 * https://github.com/kyleladd
 */
/**
 * Originally forked from
 * Selman Kahya, 2013
 * See project's Github page for usage details.
 * https://github.com/Selmanh
 */

/**
 * takes nested mysql result array as a parameter,
 * converts it to a nested object
 *
 * @param {Array} rows
 * @param {Array} nestingOptions
 * @return {Object}
 */
 export const convertToNested = (rows, nestingOptions) => {

	if (rows == null || nestingOptions == null)
			return rows;

	var levels = nestingOptions;

	// put similar objects in the same bucket (by table name)
	var buckets = new Array();

	for (var i = 0; i < levels.length; i++) {
			var result = new Array();

			var level = levels[i];
			var pkey = level.pkey;
			var tableName = level.tableName;

			for (var j = 0; j < rows.length; j++) {
					var object = rows[j][tableName];

					// check if object has key property
					if (object == null){
							console.log("Error: couldn't find " + tableName + " property in mysql result set")
							continue;
					}

					// if object isn't in result array, then push it
					if(!isExist(result, pkey, object[pkey]) && object[pkey] != null)
							result.push(object);
			}
			// Buckets should have two properties, a table name (to identify for relationships) and values.
			buckets.push({table:tableName,values:result});
	}

	// we have similar objects in the same bucket
	// now, move lower level objects into related upper level objects where relationship key values match
	for (var i = buckets.length-1; i >= 1; i--) {
			// For each upper bucket
			for (var u = i-1; u >= 0; u--) {
					if(levels[u].hasOwnProperty('fkeys')){
							//Go through upper buckets foreign keys
							for (var f = 0; f < levels[u].fkeys.length; f++) {
									// if upper bucket has a foreign key to this bucket's table
									if(buckets[i].table == levels[u].fkeys[f].table){
											// For each element in this table
											for (var ft = 0; ft < buckets[i].values.length; ft++){
													// Go through each element in upper table matching values with this bucket's values
													for (var utv = 0; utv < buckets[u].values.length; utv++){
															// Relationship match
															if(buckets[i].values[ft][levels[i].pkey] == buckets[u].values[utv][levels[u].fkeys[f].col]){
																	// Shouldn't be a list because there can only one, fk can only match one pk
																	buckets[u].values[utv][buckets[i].table] = buckets[i].values[ft];
															}
													}
											}
									}
							}
					}
			}
			//CHECK TO SEE IF THIS BUCKET HAS THE FOREIGN KEY USED IN AN UPPER LEVEL
			if(levels[i].hasOwnProperty('fkeys')){
					for (var cf = 0; cf < levels[i].fkeys.length; cf++) {
							// For each upper bucket
							for (var ub = i-1; ub >= 0; ub--) {
									if( levels[i].fkeys[cf].table == levels[ub].tableName){
											// For each element in this table
											for (var ct = 0; ct < buckets[i].values.length; ct++){
													// Go through each element in matching table
													for (var utbv = 0; utbv < buckets[ub].values.length; utbv++){
															if(buckets[i].values[ct][levels[i].fkeys[cf].col] == buckets[ub].values[utbv][levels[ub].pkey]){
																	//If there is a match, create an empty list with the tablename if it doesn't already exist
																	if(!buckets[ub].values[utbv].hasOwnProperty(levels[i].tableName)){
																			buckets[ub].values[utbv][levels[i].tableName] = [];
																	}
																	// Append object where relationship key values match
																	buckets[ub].values[utbv][levels[i].tableName].push(buckets[i].values[ct]);
															}
													}
											}
									}
							}
					}
			}
	}
	// at the end, we have all the nested objects in the first bucket
	return buckets[0].values;
};

/**
* checks if one of the objects in an array has the given property,
* and the value of that property equals to given value
*
* @param {Array} array
* @param {String} key
* @param {String} value
* @return {Array}
*/
//
var isExist = function(array, key, value){

	for (var i = 0; i < array.length; i++) {
			if(array[i][key] == value)
					return true;
	}

	return false;
}