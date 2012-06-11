/**
 * jQuery.lightValidate
 *
 *
 * @author Ryosuke Sawada a.k.a "manji6" <ryosuke.sawada@gmail.com>
 * @requires jQuery
 * @license MIT License
**/

(function(){
	/**
	 * run lightValidate
	 *
	 * @param {Array}   condition ValidateConditionObject
	 * @param {Function} callback  ErrorCallbackFunction
	**/
	jQuery.lightValidate = function(condition,callback){

		// エラーデータを格納
		var error_data = [];
		var error_data_element = [];
		if(typeof callback === "undefined"){
			var callback = function(){};
		}

		// condition配列をループして処理を行う
		condition_loop:for(var i=0,len=condition.length;i<len;i++){

			// 対称要素を取得
			var $target_elem = jQuery(condition[i].element);

			// 対象要素自体が無い場合は処理を飛ばす
			if($target_elem.size() === 0){
				continue;
			}

			// タイプ別に処理を振り分ける
			// 配列の場合はそれぞれ処理をする
			if(typeof condition[i].type === "string"){
				condition[i].type = [condition[i].type];
			}
			type_loop:for(var item=0,leng=condition[i].type.length;item<leng;item++){
				switch(condition[i].type[item]){

					// 選択グループ内に属すか
					case "group":
						if(jQuery.inArray($target_elem.val(),condition[i].group) === -1){

							error_data.push({
								element: condition[i].element,
								name: (condition[i].name)? condition[i].name : null,
								reason: "group"
							});
							continue condition_loop;
						}
						break;

					// カスタム(regex)
					case "regex":
						if($target_elem.val().match(condition[i].regex) === null){
							error_data.push({
								element: condition[i].element,
								name: (condition[i].name)? condition[i].name : null,
								reason: "regex"
							});
							continue condition_loop;
						}
						break;
					// 文字数(length:{min:xx,max:xx})
					case "length":
						if("length" in condition[i]){

							// 最小文字数
							if("min" in condition[i].length){
								if($target_elem.val().length < condition[i].length.min){
									error_data.push({
										element: condition[i].element,
										name: (condition[i].name)? condition[i].name : null,
										reason: "length_min",
										condition: condition[i].length
									});
									continue condition_loop;
								}
							}

							// 最大文字数
							if("max" in condition[i].length){
								if($target_elem.val().length > condition[i].length.max){
									error_data.push({
										element: condition[i].element,
										name: (condition[i].name)? condition[i].name : null,
										reason: "length_max",
										condition: condition[i].length
									});
									continue condition_loop;
								}
							}

						}
						break;

					// 数値の最小最大
					case "number":
						if("number" in condition[i]){

							// 数値型で判定の取れないものは事前にErrorとして弾く
							if(isFinite($target_elem.val()) === false){
								error_data.push({
									element: condition[i].element,
									name: (condition[i].name)? condition[i].name : null,
									reason: "number",
									condition: 'notNumber'
								});
								continue condition_loop;
							}

							var target_elem_value = parseInt($target_elem.val(),10);

							// 最小数
							if("min" in condition[i].number){
								if(target_elem_value < condition[i].number.min){
									error_data.push({
										element: condition[i].element,
										name: (condition[i].name)? condition[i].name : null,
										reason: "number_min",
										condition: condition[i].number
									});
									continue condition_loop;
								}
							}

							// 最大数
							if("max" in condition[i].number){
								if(target_elem_value > condition[i].number.max){
									error_data.push({
										element: condition[i].element,
										name: (condition[i].name)? condition[i].name : null,
										reason: "number_max",
										condition: condition[i].number
									});
									continue condition_loop;
								}
							}
						}
						break;

					// 必須値(nullの時エラー)
					case "require":
					default:
						if($target_elem.val() === "" || $target_elem.val() === null){
							error_data.push({
								element: condition[i].element,
								name: (condition[i].name)? condition[i].name : null,
								reason: "require"
							});
							continue condition_loop;
						}
						break;
				}
			}
		}

		// カスタムエラー処理用のコールバック関数を実行
		var b_custom_error = callback.call(this,error_data);

		// カスタムエラー処理がfalse or エラーデータが1件以上あるならエラーと判断し、戻り値はtrue,
		// 1件以上エラーが有る場合はfalse
		if(error_data.length > 0 || b_custom_error === false){
			return false;
		}
		return true;
	}
}).call(this);
