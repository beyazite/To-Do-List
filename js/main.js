let textArea = document.getElementById("task");
let added = document.querySelector("#added");
let toastLive = document.getElementById("liveToast");
let listDOM = document.getElementById("list");
let liTasks = document.getElementsByTagName("li");
let taskStore = [];
let button1 = document.getElementsByClassName("button1");
 

// localStorage.a li elemanlarını ekle
function locStor() {
    for(let i=0; i<liTasks.length; i++){
        taskStore.push(liTasks[i].innerText);
    }
    localStorage.setItem("TaskList",JSON.stringify(taskStore));
}

locStor(); // call the function to add initial elements to localStorage


function newElement() {
    if(textArea.value.trim()){
        added.classList.remove("text-danger")
        added.classList.add("text-success");
       added.innerText = "Listeye Eklendi."; // HTML file has two different toast but use one and manipulate its innerText with if else.
       // add element to li and add onclick attribute with setAttribute
       const listEl = document.createElement("li");
       listEl.setAttribute("onclick","done(this)");
    //    listEl.addEventListener("click",done(this));
       listEl.innerHTML = ` ${textArea.value} <button type="button" onclick="deleteLi(this)" class="btn-close float-end" aria-label="Close"></button>`;
       listDOM.appendChild(listEl);
       localStorage.clear(); // without this, initial li items + added new items with initial ones add together. this clears to localStorage first.
       taskStore = []; // adds current taskStore elements(initial one + new one).
       locStor(); // function requires to add new item to the end of localStorage with locStor()
    } else {
        added.classList.remove("text-success")
       added.classList.add("text-danger");
       added.innerText = "Listeye Boş Ekleme Yapamazsınız!";
    }

    // following two lines run toasts
    const toast = new bootstrap.Toast(toastLive);
    toast.show();
    textArea.value = ""; // value in textArea is erased.
} 

// check status activated with toggle(checked rules are in css file)
function done(li){
    li.classList.toggle("checked");
 }



function deleteLi(li) {
   li.parentNode.remove(); // parentNode.remove accesses button's parent li element and removes it.
   // same as locStor().
  localStorage.clear();
  taskStore = [];
  locStor();
}

// use liTasks instead of taskStore to reach li items.
function chooseAll() { 
    for(let i= 0; i<liTasks.length; i++) {
        liTasks[i].classList.add("checked");
    }
 }

 // DO NOT use for loop!!! It prevents adding new items after deleting all li items!
function deleteAll() { 
    if(confirm("Hepsini Silmek İstediğinize Emin Misiniz?")) {
    while(listDOM.firstElementChild != null) {
        listDOM.removeChild(listDOM.firstElementChild);
    }

    localStorage.clear();
    
         textArea.value = "";
        
    }
}


