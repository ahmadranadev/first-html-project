let myLeads = [];
const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const ulEL = document.getElementById('ul-el');
const deleteBtn = document.getElementById('delete-btn');
const tabBtn = document.getElementById('save-btn');
let leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));
if (leadsFromLocalStorage) {
	myLeads = leadsFromLocalStorage;
	render(myLeads);
}

tabBtn.addEventListener('click', function () {
	chrome.tabs.query({ active: true, currentwindow: true }, function (tabs) {
		myLeads.push(tabs[0].url);
		saveBtn.value = '';
		localStorage.setItem('myLeads', JSON.stringify(myLeads));
		render(myLeads);
	});
});
function render(leads) {
	let listItems = '';
	for (let i = 0; i < leads.length; i++) {
		listItems += `
		    <li>
		        <a target = "_blank" href =" ${leads[i]}">
		        ${leads[i]}
				</a>
		    </li>`;
	}
	ulEL.innerHTML = listItems;
}

deleteBtn.addEventListener('click', function () {
	localStorage.clear();
	myLeads = [];
	render(myLeads);
});

inputBtn.addEventListener('click', function () {
	myLeads.push(inputEl.value);
	inputEl.value = '';
	localStorage.setItem('myLeads', JSON.stringify(myLeads));
	render(myLeads);
});
