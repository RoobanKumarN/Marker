let myLeads = [];
let myNotes = [];
const link = document.getElementById("links");
const Notes = document.getElementById("notes");
const ulLinks = document.getElementById("Links-el");
const ulNotes = document.getElementById("Notes-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const NotesFromLocalStorage = JSON.parse(localStorage.getItem("myNotes"));

// -- Save -- //
// -- Links Inputs --//

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  renderLinks(myLeads);
}

inputBtn.addEventListener("click", function () {
  const entry = link.value;
  if (entry) {
    const isLink = isURL(entry);
    myLeads.push({ content: entry, type: isLink ? "link" : "text" });
    link.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLinks(myLeads);
  }
});

function isURL(str) {
  const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/;
  return urlRegex.test(str);
}

function renderLinks(Leads) {
  let linkList = "";
  for (let i = 0; i < Leads.length; i++) {
    if (Leads[i].type === "link") {
      linkList += `<li><a target="_blank" href="${Leads[i].content}">${Leads[i].content}</a></li>`;
    } else if (Leads[i].type === "text") {
      linkList += `<li>${Leads[i].content}</li>`;
    }
  }
  ulLinks.innerHTML = linkList;
}
// -- Delete -- //

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  renderLinks(myLeads);
});

// -- Notes --//

if (NotesFromLocalStorage) {
  myNotes = NotesFromLocalStorage;
  renderNotes(myNotes);
}

inputBtn.addEventListener("click", function () {
  myNotes.push(Notes.value);
  Notes.value = "";
  localStorage.setItem("myNotes", JSON.stringify(myNotes));
  renderNotes(myNotes);
});

function renderNotes(Note) {
  let NotesList = "";
  for (let j = 0; j < Note.length; j++) {
    NotesList += `<li>${Note[j]}</li>`;
  }
  ulNotes.innerHTML = NotesList;
}

// -- Delete -- //

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myNotes = [];
  renderNotes(myNotes);
});

// -- Save from Tabs --//

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLinks(myLeads);
  });
});

/*-- youTube -- */
