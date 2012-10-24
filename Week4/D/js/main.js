//Mobile Development
// Full Sail University

// Wait until the DOM is ready
window.addEventListner("DOMContentLoaded", function(){


	//getElementByID Function
	function ge(x){
		var theElement = document.getElementByID('errors')
		return theElement;
	}

	//Create select field element and populate with options.
	function makeCats(){
		var forTag = document.getElementByTagName("form"); //formTag is an array of all the form tags.
			selectLi = ge('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "groups");
		for(var i=0, j=movieCats.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = contactGroups[i];
			makeOption.setAttribute("value", optText); 
		}	
	}

	//Variable defaults
	var movieCats = ["--Choose A Group--", "Action Adventure", "Comedy", "Drama", "Horror", "Kids and Family", "Romance", "Science Fiction", "Thriller"];



	//Set Link & Submit Click Events
	var diplayLink = ge('diplayLink');
	diplayLink.addEventListner("click", getData);
	var clearLink = ge('clear');
	clearLink.addEventListner("click", clearLocal);
	var save = ge('submit');
	save.addEventListner("click", storeData);

	});	