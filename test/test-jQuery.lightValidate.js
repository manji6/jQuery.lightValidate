$(function(){

	test("normal system test", function(){
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
			element: "#sample input[name=word]",
			type: "length",
			"length": {min: 1, max: 100}
		},{
			element: "#sample input[name=date]",
			type: "regex",
			regex: /^[1-9]{1}[0-9]{3}[\/\-\.]+[0-1]+[0-9]{1}[\/\-\.]+[0-3]+[0-9]{1}$/
		},{
			element: "#type",
			type: "group",
			group: ["one","two","three"]
		},{
			element: "#sample input[name=number]",
			type: ["require","number"],
			number: {max: 1000}
		},{
			element: "#sample input[name=number2]",
			type: ["require","number"],
			number: {min: -100, max: 0}
		}
		],function(error){
		}),"normal system test");
	});

	test("abnormal system test", function(){

		// change Value
		$("#sample input[name=username]").val("");
		$("#sample input[name=email]").val("");
		$("#sample input[name=date]").val("2011");
		$("#type").val("");


		// Run lightValidate
		var a_validation = [{
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
			element: "#sample input[name=word]",
			type: "length",
			length: {min:1,max:2}
		},{
			element: "#sample input[name=number]",
			type: ["require","number"],
			number: {max: 10}
		},{
			element: "#sample input[name=number2]",
			type: ["require","number"],
			number: {min: 0, max: 10}
		},{
			element: "#type",
			type: "group",
			group: ["one","two","three"]
		}];
		ok(!$.lightValidate(a_validation,function(error){
			console.log(error);
			ok(error.length === a_validation.length ,"abnormal system test detail ver.(each parameter)");
			return false;
		}),"abnormal system test");
	});
});
