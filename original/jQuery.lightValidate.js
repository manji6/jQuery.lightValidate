/**
 * jQuery.lightValidate
 *
 * 
 * @author Ryosuke Sawada a.k.a "manji6" <ryosuke.sawada@gmail.com>
 * @requires jQuery
 * @license MIT License
**/


	/**
	 * run lightValidate
	 *
	 * @param {Array}   condition ValidateConditionObject
	 * @param {function} callback  ErrorCallbackFunction
	**/
	jQuery.lightValidate = function(condition,callback){

		// エラーデータを格納
		var error_data = [];

		// condition配列をループして処理を行う
		for(var i=0,len=condition.length;i<len;i++){

			// 対称要素を取得
			var $target_elem = jQuery(condition[i].element);

			// 対象要素自体が無い場合は処理を飛ばす
			if($target_elem.size === 0){
				continue;
			}

			// タイプ別に処理を振り分ける
			// 配列の場合はそれぞれ処理をする
			if(typeof condition[i].type === "string"){
				condition[i].type = [condition[i].type];
			}
			for(var item=0,leng=condition[i].type.length;item<leng;item++){
				switch(condition[i].type[item]){

					// 選択グループ内に属すか
					case "group":

						if(jQuery.inArray($target_elem.val(),condition[i].group) === -1){
							error_data.push({
								element: condition[i].element,
								name: (condition[i].name)? condition[i].name : null,
								reason: "notfound"
							});
						}
						break;

					// カスタム(regex)
					case "regex":
						if($target_elem.val().match(condition[i].regex) === null){
							error_data.push({
								element: condition[i].element,
								name: (condition[i].name)? condition[i].name : null,
								reason: "failed"
							});
						}
						break;

					// 必須値(nullの時エラー)
					case "require":
					default:
						if($target_elem.val() === "" || $target_elem.val() === null){
							error_data.push({
								element: condition[i].element,
								name: (condition[i].name)? condition[i].name : null,
								reason: "empty"
							});
						}
						break;
				}
			}
		}

		//エラーデータ配列がnullではないなら、エラーコールバック関数を実行
		if(error_data.length > 0){
			callback.call(this,error_data);
			return false;
		}
		return true;
	}


