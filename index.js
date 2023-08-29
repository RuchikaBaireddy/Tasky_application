//our application is a dynamic one .The following code is similiar but for only static one since we are manually adding more taskList
// const state={
//     taskList:[
//    {
//         image:"",
//         title:"",
//         task:"",
//         description:"",
//     },
//     taskList:{
//         image:"",
//         title:"",
//         task:"",
//         description:"",
//     },
//     taskList:{
//         image:"",
//         title:"",
//         task:"",
//         description:"",
//     }
// ]
//}

const state = {
    taskList:[],
};

//DOM manipulations
const taskContents=document.querySelector(".task_contents");
const taskModal=document.querySelector(".task_Modal_Body");

const htmlTaskContents=({id,title,description,type,url})=>`
<div class="col -md-6 col-lg-4 mt-3" id=${id} key=${id}>
  <div class=" card shadow task_card">
    <div class="card-header d-flex gap-2 justify-content-end task_card_header">
       <button type="button" class="btn btn-outline-info mr-2 name=${id}"><i class="fa-solid fa-pen-to-square"></i></button>
       <button type="button" class="btn btn-outline-danger mr-2 name=${id}"><i class="fa-duotone fa-trash"></i></button>
    </div>

    <div class="card-body">
       ${
        url &&
        `<img src=${url} alt="card image" class="card-img-top md-3 rounded-md"/>`
       }
       <h4 class="card-title">${title}</h4>
       <p class="card-text text-muted">${description}</p>
       <div class="tags d-flex flex-wrap">
          <span class=" badge text-white bg-primary m-1">${type}</span>
       </div>


    </div>
    <div class="card-footer">
    <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#showTAsk">
    Open Task
    </button>
    </div>
  </div>
</div>
`


const htmlModalContent = ({id,title,description,url}) =>{
   const date=new Date(parseInt(id));
   return`
   <div id=${id}>
   ${
      url &&
      `<img src=${url} alt="card image" class="img-fluid rounded place__holder__image mb-3"/>`
   }

   <strong class="text-sm text-muted">Created on ${date.toDateString()}</strong>
   <h4 class="my-2">${title}</h4>
   <p class="lead text-muted">${description}</p>
   `
};


const updateLocalStorage=() =>{
   localStorage.setItem("task", JSON.stringify({
      tasks:state.taskList,
}));
       
};


const loadInitialData=() =>{
   const localStorageCopy = JSON.parse(localStorage.task);

   if(localStorageCopy) state.taskList = localStorageCopy.tasks;

   state.taskList.map((cardDate) => {
      taskContents.insertAdjacentHTML("beforeend",htmlTaskContents(cardDate));

   });
};

const handleSubmit = () =>{
   const id =`${Date.now()}`
   const input={
      url:document.getElementById("image_Url").value,
      title:getElementById("task_title").value,
      description:getElementById("task_Description").value,
      type:getElementById("tags").value,
   };
   if(input.title==='' || input.description===''|| input.type===''){
      return alert("Please fill out all the necessary information")
   }

   taskContents.insertAdjacentHTML(
      "beforeend", htmlTaskContents({...input,id})
   );

   state.taskList.push({...input,id});
   updateLocalStorage();
}