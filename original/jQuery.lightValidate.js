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
