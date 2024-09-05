var task = {
  title: String,
  details: String,
  dueDate: Date,
  priority: String,
};

function addTasksToTable(data) {
  const tableBody = document.getElementById("task-table-body");
  tableBody.innerHTML = "";
  if (data.length != 0) {
    data.forEach((task) => {
      const row = `
      <tr>
        <td>${task.title}</td>
        <td>${task.details}</td>
        <td>${task.dueDate}</td>
        <td>${task.priority}</td>
      </tr>
    `;
      tableBody.innerHTML += row;
    });
  } else {
    const row = `<tr class="center-align">--No record found--</tr>`;
    tableBody.innerHTML += row;
  }
}

const submitForm = () => {
  const task = {
    title: $("#task-name").val(),
    details: $("#task-details").val(),
    dueDate: $("#task-date").val(),
    priority: $("#task-priority").val(),
  };
  console.log(task);
  postTask(task);
};

const cancelTask = () => {
  document.getElementById("task-name").value = "";
  document.getElementById("task-details").value = "";
  document.getElementById("task-date").value = "";
  document.getElementById("task-priority").value = "";
};

const getList = () => {
  $.get("api/to-do", (response) => {
    if (response.statusCode == 200) {
      addTasksToTable(response.data);
    }
  });
};

function postTask(task) {
  $.ajax({
    url: "api/to-do",
    type: "POST",
    data: task,
    success: (result) => {
      if (result.statusCode == 201) {
        //alert("New task created!");
        var toastHTML =
          '<span>New task created!</span><button onclick="undoTask()" class="btn-flat toast-action">Undo</button>';
        M.toast({
          html: toastHTML,
          classes: "rounded, #00796b teal darken-2",
          completeCallback: function () {
            getList(), cancelTask();
          },
        });
      }
    },
  });
}

function undoTask() {
  console.log("Delete created task....");
}

$(document).ready(function () {
  $(".datepicker").datepicker();
  $("select").formSelect();
  $(".modal").modal();
  $("#save-task").click(() => {
    submitForm();
  });
  $("#cancel-task").click(() => {
    cancelTask();
  });
  // $("#undo-task").click(() => {
  //   undoTask();
  // });
  getList();
});

let socket = io();
socket.on("taskProgress", (progressUpdate) => {
  console.log("===== Task Progress Update =====");
  console.log("Task ID: " + progressUpdate.taskId);
  console.log("Progress: " + progressUpdate.progress);
  console.log("Message: " + progressUpdate.message);
  console.log("Timestamp: " + new Date().toLocaleString());
  console.log("===============================");
});
