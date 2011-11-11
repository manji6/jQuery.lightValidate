$(function(){

	$("#type").val("");test("normal system test", function(){
		// change Value
		$("#sample input[name=username]").val("manji6");
		$("#sample input[name=date]").val("2011/12/12");
		$("#type").val("two");
	
		// Run lightValidate
		ok($.lightValidate([{
			element: "#sample input[name=username]",
			type: "require"
		},{
			element: "#sample input[name=email]",
			type: "require"
		},{
			element: "#sample input[name=date]",
			type: "regex",
			regex: /^[1-9]{1}[0-9]{3}[\/\-\.]+[0-1]+[0-9]{1}[\/\-\.]+[0-3]+[0-9]{1}$/
		},{
			element: "#type",
			type: "group",
			group: ["one","two","three"]
		}],function(error){
		}),"normal system test");
	});

	test("abnormal system test", function(){

		// change Value
		$("#sample input[name=username]").val("");
		$("#sample input[name=date]").val("2011");
		$("#type").val("");

	
		// Run lightValidate
		ok(!$.lightValidate([{
			element: "#sample input[name=username]",
			type: "require"
		},{
			element: "#sample input[name=email]",
			type: "require"
		},{
			element: "#sample input[name=date]",
			type: "regex",
			regex: /^[1-9]{1}[0-9]{3}[\/\-\.]+[0-1]+[0-9]{1}[\/\-\.]+[0-3]+[0-9]{1}$/
		},{
			element: "#type",
			type: "group",
			group: ["one","two","three"]
		}],function(error){
			var flg = false;
			var expect = ["#sample input[name=username]","#sample input[name=date]","#type"];
			for(var i=0,len=error.length;i<len;i++){
				if($.inArray(error[i].element,expect) === false){
					flg = true;
				}
			}
			ok(!flg,"abnormal system test detail ver.(each parameter)");
			return false;
		}),"abnormal system test");
	});
});
