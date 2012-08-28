// Assignment 4
// Visual Frameworks (VFW)
// Mobile Development
// Full Sail University
// Author: Bodunrin Ladele

//Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){



//getElementById Function
function ge(x){
	var theElement = document.getElementById(x);
	return theElement;
	}

//Create select field element and populate with options.
function makeCats(){
	var formTag = document.getElementsByTagName("form"), //formTag is an array of all the form tags.
		selectLi = ge('select'),
		makeSelect = document.createElement('select');
		makeSelect.setAttribute("id", "eventTypes");
	for(var i=0, j=eventTypes.length; i<j; i++){
		var makeOption = document.createElement('option');
		var optText = eventTypes[i];
		makeOption.setAttribute("value", optText);
		makeOption.innerHTML = optText;
		makeSelect.appendChild(makeOption);
	}
	selectLi.appendChild(makeSelect);
}
	
	//Find value of selected radio button.
function getSelectedRadio(){
	var radio = document.forms[0].role;
	for(var i=0; i<radio.length; i++){
		if(radio[i].checked){
			roleValue = radio[i].value;
		}
	}
}


function toggleControls(n){
	switch(n){
		case "on":
			ge('loveLog').style.display = "none";
			ge('clear').style.display = "inline";
			ge('displaylink').style.display = "none";
			ge('addNew').style.display = "inline";
			break;
		case "off":
			ge('loveLog').style.display = "block";
			ge('clear').style.display = "inline";
			ge('displaylink').style.display = "inline";
			ge('addNew').style.display = "none";
			ge('items').style.display = "none";
			break;
		default:
			return false;
	}
}


function storeData(key){
	//If theres no key, this is a new item and new key is needed.
	if(!key){
		var id  			= Math.floor(Math.random()*1000000001);
	}else {//Set id to existing key being edited(save over the data). Same key will be passed through handler, validate, store data function.
		id = key;
	}
	
	//Gather up all our form fiel value and store in an object.
	//Object properties contain array with the form lable and input value.
	getSelectedRadio();
	var item 				= {};
		item.eventTypes		= ["Event Type: ", ge('eventTypes').value];
		item.title			= ["Event Title: ", ge('title').value];
		item.location		= ["Location: ", ge('location').value];
		item.date			= ["Event Date: ", ge('date').value];
		item.role			= ["Role: ", roleValue];	
		item.wow			= ["Wow Factor: ", ge('wow').value];
		item.notes			= ["The Details: ", ge('notes').value];
		//Save data into Local Storage: Use Stringify to convert our object to a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Love Log Saved!");
}

function getData(){
	toggleControls("on");
	if(localStorage.length === 0){
		alert("There are no logs in Local Storage, so default data has been added.");
		autoFillData();
	}
	//Write Data from Local Storage to the browser.
	var makeDiv = document.createElement('div');
	makeDiv.setAttribute("id", "items");
	var makeList = document.createElement('ul');
	makeDiv.appendChild(makeList);
	document.body.appendChild(makeDiv);
	ge('items').style.display = "display";
	for(var i = 0, len=localStorage.length; i<len; i++){
		var makeli = document.createElement('li');
		var linksLi = document.createElement('li');
		makeList.appendChild(makeli);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		//Convert the string from local storage value back to an abject by using JSON.parse()
		var obj = JSON.parse(value);
		var makeSublist = document.createElement('ul');
		makeli.appendChild(makeSublist);
		for(var n in obj){
			var makeSublistLi = document.createElement('li');
			makeSublist.appendChild(makeSublistLi);
			var optSubText = obj[n][0] + " " + obj[n][1];
			makeSublistLi.innerHTML = optSubText;
			makeSublist.appendChild(linksLi);
		}
		makeEventLinks(localStorage.key(i), linksLi); //Creat edit and delet buttons/link for each item in local storage.

	}
}

//Auto Populate Local Storage
function autoFillData() {
	/*Actual JSON Object data required for this to work is coming from our json.js file, which is loaded from
	our HTML page. Store the JSON Object in local storage. */
	for(var n in json) {
		var id = Math.floor(Math.random()*1000000001);
		localStorage.setItem(id, JSON.stringify(json[n]));
	}
}

//Make Item Links
//Create the edit and delet links for each stored item when displayed.
function makeEventLinks(key, linksLi) {
	//add edit single item link
	var editLink = document.createElement('a');
	editLink.href = "#"; 
	editLink.key = key;
	var editText = "Edit Log";
	editLink.addEventListener("click", editLog);
	editLink.innerHTML = editText;
	linksLi.appendChild(editLink);

	//add line break
	var breakTag = document.createElement('br');
	linksLi.appendChild(breakTag);

	//add delete single item link
	var deleteLink = document.createElement('a');
	deleteLink.href = "#";
	deleteLink.key = key;
	var deleteText = "Delete Log";
	deleteLink.addEventListener("click", deleteLog);
	deleteLink.innerHTML = deleteText;
	linksLi.appendChild(deleteLink);
}

//Edit a single log.
function editLog() {
	//Grab the data from our item from local storage.
	var value = localStorage.getItem(this.key);
	var item = JSON.parse(value);

	//Show the form.
	toggleControls("off");

	//populate the form fields with current localStorage values.
	ge('eventTypes').value 	= item.eventTypes[1];
	ge('title').value 		= item.title[1];
	ge('location').value 	= item.location[1];
	ge('date').value 		= item.date[1];

	var radio = document.forms(0).role;
	for(var i=0; i<radio.length; i++) {
		if(radio[i.value == "Recipient" && item.role[1]] == "Recipient") {
			radio[i].setAttribute("checked", "checked");
		} else if(radio[i].value == "Donor" && obj.sex[1] == "Donor"){
			radio[i].setAttribute("checked", "checked");
		}
	}

	ge('wow').value 			= item.wow[1];
	ge('notes').value 		= item.notes[1];

	//Remove the initial listner fromt the input 'save log' button.
	save.removeEventListener("click", storeData);
	//Change Submit Button Value to Edit Button
	ge('submit').value = "Edit Log";
	var editSubmit = ge('submit');
	/*Save the key value established in this function as a property of the editSubmit event
	so we can ust that value when we save the data edited.*/
	editSubmit.addEventListener("click", validate);
	editSubmit.key = this.key; 
}

function deleteLog(){
	var ask = confirm("Are you sure you want to delete this log?");
	if(ask) {
		localStorage.removeItem(this.key);
		alert("Log was deleted.");
		window.location.reload();
	}else{
		alert("Love log was NOT deleted.")
	}
}

function clearLogs(){
	if(localStorage.length === 0){
		alert("There is no data to clear.")
	}else{
		localStorage.clear();
		alert("All love logs are deleted!");
		window.location.reload();
		return false;
	}
}

function validate(e) {
	//Define the element that we want to check.
	var getType  = ge('eventTypes');
	var getTitle = ge('title');
	var getDate  = ge('date');
	


	//Reset Error Messages.
	errMsg.innerHTML = " ";
		getType.style.border 	= "1px solid black";
		getTitle.style.border 	= "1px solid black";
		getDate.style.border 	= "1px solid black";

	//Get Error Messages.
	var messageAry = [];
	//Event Type Validation
	if(getType.value === "--Choose An Event Type--") {
		var typeError = "Please choose an event type.";
		getType.style.border = "1px solid red";
		messageAry.push(typeError);
	}
	//Title Validation
	if(getTitle.value === "") {
		var titleError = "Please enter a title.";
		getTitle.style.border = "1px solid red";
		messageAry.push(titleError);
	}
	//Date Validation
	if(getDate.value === "") {
		var dateError = "Please enter a date.";
		getDate.style.border = "1px solid red";
		messageAry.push(dateError);
	}

	//If there were any errors, display on the screen.
	if(messageAry.length >= 1) {
		for(var i=0, j=messageAry.length; i < j; i++) {
			var txt = document.createElement('li');
			txt.innerHTML = messageAry[i];
			errMsg.appendChild(txt);
		}
		e.preventDefault();
		return false;
	}else{//if all is ok, save the data. Send the key value (which cam from the editData function).
			// This key value was passed through the editSubmit event listener as a property.
		storeData(this.key);
	}
	
}

//Variable defaults
var eventTypes = ["--Choose An Event Type--", "Agape[of the soul]", "Eros[of passion]", "Philia[of the mind]", "Storge[parental]", "Xenia[hospitality]"],
	roleValue,
	errMsg = ge('errors')
;

makeCats();


// Search
function getSearch(){
	alert("search");
	var category = ge('eventTypes').value;
	var term = ge('search').value;

	//By Category Only
	if(category != "--Choose An Event Type--" && term === ""){ 
		for(i=0, j=localStorage.length; i<j; i++){
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			if(category === obj.eventTypes[1]){
				for (n in obj){
					console.log(obj[n][1]);
				}
			}
		}
	}

	//By Term Only
	if(term != "" && category === "--Choose An Event Type--"){
		for(i=0, j=localStorage.length; i<j; i++) {
			var key = localStorage.key(i);
			var value = localStorage.getItem[key];
			var obj = JSON.parse(value);
			for (n in obj){
				if(term === obj[n][1]){
					for(g in ogj){
						console.log(obj[g][1]);
					}
				}
			}
		}
	}

	//By Category & Term
	if(term != "" && category != "--Choose An Event Type--"){
		for(i=0, j=localStorage.length; i<j; i++){
			var key = localStorage.key(i);
			var value = localStorage.getItem[key];
			var obj = JSON.parse(value);
			for (n in obj){
				if (term === obj[n][1] && category === obj.eventTypes[1]);
				for (g in obj){
					console.log(obj[g][1]);
				}
			}
		}
	}


}


//Set Link & Submit Click Events 
var displaylink = ge('displaylink');
displaylink.addEventListener("click", getData);
var clearLink = ge('clear');
clearLink.addEventListener("click", clearLogs);
var save = ge('submit');
save.addEventListener("click", validate);
var search = ge('search');
search.addEventListener("click", getSearch);

});