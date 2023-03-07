//유저가 값을 입력한다
//+버튼을 클릭하면 할일이 추가한다.
//delete 버튼을 누르면 할일이 추가한다.
//check버튼을 누르면 할일이 끝나면서 밑줄이간다.
//1.check 버튼 클릭 순간 true로 바뀜
//2.true로 바뀐 순간 밑줄 체크
//3.false로 바뀐 순간 밑줄 제거
//진행중이 끝남 탭을 누르면 언더바가 이동한다.
//끝남탭은 끝난 아이템만 진행중인 탭은 징행중인 아이템만
//전체탭을 누르면 다시 전체템으로 이동한다.


let taskInput = document.getElementById("task-input");
let addbutton = document.getElementById("add-button");
let tabs= document.querySelectorAll(".task-tabs div");
let taskList=[]
let mode="all";
let filterList=[];

addbutton.addEventListener("click",addTask)
console.log(tabs)


for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){filter(event)})
}
function addTask(){
    let task = {
        id:randomIDGenerate(),
        taskContent:taskInput.value,
        isComplete:false
    }
    taskList.push(task)
    console.log(taskList)
    render();

}


function toogleComplete(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id ==id){
            taskList[i].isComplete= !taskList[i].isComplete;
            break;
        }
    }
    render()
    console.log(taskList)
    
}

function randomIDGenerate(){
    return Math.random().toString(36).substr(2, 16);
}

function DeleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id==id){
            taskList.splice(i,1)
            break;
        }

    }
    render()
    console.log(taskList);
    
}

function filter(event){
    mode=event.target.id
    console.log("클릭됨",event.target.id);
    if(mode=="all"){
        render();
    }else if(mode == "ongoing"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete==false){
                filterList.push(taskList[i]);
            }
        }
        render();
    }else if(mode =="done"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

function render(){
    let list=[];
    if(mode=="all"){
        list=taskList;
    }else if(mode=="ongoing" || mode=="done"){
        list = filterList;
    }
    let resultHTML='';
    for(let i=0;i<list.length;i++){
        if(list[i].isComplete==true){
            resultHTML += `<div class="task">
            <div>
                <div class="task-done">${list[i].taskContent}</div>
            </div>
            <div>
                <button onclick="toogleComplete('${list[i].id}')">check</button>
                <button onclick="DeleteTask(${list[i].id})">Delete</button>
            </div>
        </div>`;
        }else{
            resultHTML += `<div class="task">
            <div>
                <div>${list[i].taskContent}</div>
            </div>
            <div>
                <button onclick="toogleComplete('${list[i].id}')">check</button>
                <button onclick="DeleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
        }

    
    }


    document.getElementById("task-board").innerHTML=resultHTML;
}
    