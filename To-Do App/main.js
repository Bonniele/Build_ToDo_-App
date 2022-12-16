let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add"); // to set data dismiss when click add 
// form valation creating
form.addEventListener("submit",(e) =>{ //can call anything - e like a variable
    e.preventDefault(); //to get a solid click,count the clicks,not reseting the form
    console.log("button clicked");
    formValidation();
});
//function - either success or fail
let formValidation =()=>{
    //failed state
    if(textInput.value ===""){
        msg.innerHTML="task can't be blank";
        console.log("fail");

    }else{
        //success state
        console.log("success");
        acceptData();
        add.setAttribute("data-bs-dismiss","modal"); //back to tasks area- close the tasks form
        //data-bs dismiss (attribute) = modal(value) makes it close 
        add.click();
        //use IIFE-immediately invoked function
        //run only 1 when we have a success state
        (()=>{
            add.setAttribute("data-bs-dismiss",""); //keep value blank so when text empty we keep the task screen
        })();

        
    }
}
//function to collect data
let data =[{}]; //to store objects in an array
let acceptData=()=>{
    //use data.push for array storage
    data.push({
        text: textInput.value,
        date:  dateInput.value,
        description: textarea.value,
    });
    //store data in local storage under inspect Application
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    createPost();
};
let createPost =()=>{
    //template literals to define string - use back-ticks `-allow
    //variable in strings
    //use += to keep the previous content
    tasks.innerHTML ="";
    data.map((totalPost,indexNumberOfPost)=>{
        return(tasks.innerHTML += `
        <div id=${indexNumberOfPost}>
                <span class="fw-bold">${totalPost.text}</span>
                <span class="small text-secondary">${totalPost.date}</span>
                <p>${totalPost.description}</p>
                <span class="options">
                  <i onClick="editPost(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                  <i onClick="deletePost(this)" class="fas fa-trash-alt"></i> 
                </span>
        </div>
        `);

    });
    
    resetForm();
}
let resetForm =() =>{
    textInput.value = ""; //reset the message box - set input to blank
    dateInput.value = "";
    textarea.value = "";

};
let deletePost =(e)=>{
    e.parentElement.parentElement.remove(); //call parentElment 2 times to reach to span
    data.splice(e.parentElement.parentElement.id,1);
    localStorage.setItem("data",JSON.stringify(data));
    console.log(data);
}
//edit function- return the text back to chat box to edit
let editPost =(e)=>{
    let selectedTask = e.parentElement.parentElement;
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
    //selectedTask.remove();
    deletePost(e);
}

//to retreive data
(()=>{
    data =JSON.parse(localStorage.getItem("data"))|| [];
    createPost();
    //console.log(data);
})();