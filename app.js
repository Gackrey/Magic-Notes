let create = document.getElementById('create');
shownotes();
create.addEventListener('click', function () {
    let addtxt = document.getElementById('addtxt');
    let title = document.getElementById('title');
    let notes = localStorage.getItem('notes');
    let radio = document.getElementById('yes').checked;
    let imp = '';
    if(radio==true){
        imp='text-white bg-dark';
    }
    else{
        imp='';
    }
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.push([title.value,addtxt.value,imp]);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    addtxt.value = '';
    title.value = '';
    shownotes();
});

function shownotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let html = "";
    notesobj.forEach(function (element, index) {
        html += `
        <div class="notecard card mx-2 my-2" style="width: 18rem;">
            <div class="card-body ${element[2]}">
                    <h5 class="card-title">${element[0]}</h5>
                    <p class = "card-text">${element[1]}</p>
                    <button id = "${index}" onclick = "deletenode(this.id)" class="btn btn-primary">Delete</button>
            </div>
        </div> `;
    });
    let noteselm = document.getElementById('notes');
    if (notesobj.length != 0) {
        noteselm.innerHTML = html;
    }
    else {
        noteselm.innerHTML = `No Notes are currently present. Click on Add Notes`;
    }
}

function deletenode(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    shownotes();
}
let searchbtn = document.getElementById('searchbtn');
searchbtn.addEventListener('click',function(e){
    let searchstr = document.getElementById('searchtxt');
    e.preventDefault();
    let inpval = searchstr.value;
    let notecard = document.getElementsByClassName('notecard');
    Array.from(notecard).forEach(function (element) {
        let cardtxt = element.getElementsByClassName('card-title')[0].innerHTML;
        if (cardtxt.includes(inpval)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    });
});