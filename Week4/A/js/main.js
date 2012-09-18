
//
var parseLogForm = function(data) {
	console.log(data);
};

$(document).ready(function(){

	var lLform = $('#lovelogform'),
		logerrorslink = $('#logerrorslink')
	;

	lLform.validate({
		invalidHandler: function(form, validator){
			logerrorslink.click();
			var html = '';
			for(var key in validator.submitted){
				var label = $('label[for^="'+ key +'"]').not('[generated]');
				var legend = label.closest('fieldset').find('.ui-controlgroup-label');
				var fieldName =  legend.length ? legend.text() : label.text();
				html += '<li>'+ fieldName +'</li>';
			};
			$("#newLogerrors ul").html(html);
		},
		submitHandler: function(){
			var data = lLform.serializeArray();
			parseLogForm(data);
		}
	});

});