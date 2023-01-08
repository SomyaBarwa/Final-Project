const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector("#btnn");

addNoteButton.addEventListener("click",() => addNote());
console.log("addNoteButton");

/*
$.ajax({
    type: 'GET',
    url: '/notes/data',
    success: function(rows) {
        rows.forEach(note => {
            const noteElement = createNoteElement(note.id, note.content);
            notesContainer.insertBefore(noteElement, addNoteButton);  
        });
    }
});
*/ 

fetch('/notes/data')
  .then(response => response.json())
  .then(data => {
    data.forEach(note => {
        const noteElement = createNoteElement(note.id, note.note);
        notesContainer.insertBefore(noteElement, addNoteButton);  
    }); // the JSON object
});


function createNoteElement(id,content) {
    const element = document.createElement("textarea")
    element.classList.add("note");
    element.value = content;
    element.id=id;
    element.placeholder="empty";
    element.setAttribute("name", "note");
    element.addEventListener("change", ()=> {
        fetch('/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: element.id,
                body: element.value
            })            
        })
        .then(data => console.log(data))

    });
    element.addEventListener("dblclick", () => {
        const doDelete = confirm("are you sure??");
        if(doDelete) {
            deleteNote(id,element);
        }
    });
    return element;
}
function addNote() {
    const noteObject = {
        id: Math.floor(Math.random()*100000),
        content:""
    };
    const noteElement=createNoteElement(noteObject.id , noteObject.content);
    notesContainer.insertBefore(noteElement,addNoteButton);
}

function deleteNote(id,element) {
    fetch('/notes/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({uid: id})

      })
      .then(function(data) {
        console.log(data);
      });
      notesContainer.removeChild(element);
}


