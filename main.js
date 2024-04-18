//유저가 값을 입력한다
//+ 버튼을 클릭하면(클릭 이벤트), 할일이 추가된다
//delete버튼을 누르면 할일이 삭제된다
//check버튼을 누르면 할일이 끝나면서 밑줄이 간다
//1. check 버튼을 누르면 할일이 삭제된다
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안끝난걸로 간주하고 그대로
//진행중 끝남 탭을 누르면, 언더바가 이동한다
//끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
//전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input")
let addButton = document.getElementById("add-button")
let tabs = document.querySelectorAll(".task-tabs div")
let taskList = []
let mode = 'all'
let filterList = []
let UnderLine = document.getElementById("under-line")
addButton.addEventListener("click", addTask)
taskInput.addEventListener("focus", function () { taskInput.value = "" }) // 할일을 입력하고 나면 입력창이 자동으로 비워지게

taskInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    addTask(event)
  }
})

for (let i = 1; i < tabs.length; i++) { // 모두, 진행중, 끝남 탭을 누르는 것에 대해 id를 검사함
  tabs[i].addEventListener('click', function (event) {
    filter(event)
  })
}

function addTask() { // 할 일 추가 버튼
  if (taskInput.value == "") {
    alert('할 일을 입력해주세요')
    return
  }
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  }
  taskList.push(task)
  taskInput.value = "" // 할일을 입력하고 나면 입력창이 자동으로 비워지게
  render()
}

function render() {

  let list = []
  if (mode === "all") {
    list = taskList
  } else if (mode === "ongoing") {
    list = filterList
  } else if (mode === "done") {
    list = filterList
  }

  let resultHTML = ""
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task-gray">
      <div class="task-done">${list[i].taskContent}</div>
      <div>
        <button onclick="toggleComplete('${list[i].id}')" class="check1-button"><i class="fa-regular fa-square-check fa-xl"></i></button>
        <button onclick="deleteTask('${list[i].id}')" class="check1-button"><i class="fa-solid fa-trash-can fa-xl"></i></button>
      </div>
    </div>`
    } else {
      resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')" class="check2-button"><i class="fa-regular fa-square fa-xl"></i></button>
          <button onclick="deleteTask('${list[i].id}')" class="check2-button"><i class="fa-solid fa-trash-can fa-xl"></i></button>
        </div>
      </div>`
    }

  }

  document.getElementById("task-board").innerHTML = resultHTML

}

function toggleComplete(id) {

  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete
      break
    }
  }
  filter()
}

function randomIDGenerate() { //랜덤 id 추출
  return Math.random().toString(36).substr(2, 16);
}

function deleteTask(id) { //삭제 버튼
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1)
    }
  }
  filter()
}

function filter(e) {

  if (e) {
    mode = e.target.id;
    UnderLine.style.width = e.target.offsetWidth + "px";
    UnderLine.style.left = e.target.offsetLeft + "px";
    UnderLine.style.top =
      e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
  }

  filterList = []
  if (mode === "all") {
    render()
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i])
      }
    }
    render()
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i])
      }
    }
    render()
  }
}