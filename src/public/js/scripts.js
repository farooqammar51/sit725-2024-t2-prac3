const tasks = [
  { title: "Buy groceries", details: "Milk, Bread, Eggs, and Fruits" },
  { title: "Workout", details: "30 minutes of cardio and strength training" },
  {
    title: "Finish project report",
    details: "Complete the final report for the client project",
  },
];

function addTaskToTable(title, details) {
  const tableBody = document.getElementById("task-table-body");
  const row = `
    <tr>
      <td>${title}</td>
      <td>${details}</td>
    </tr>
  `;
  tableBody.innerHTML += row;
}

const submitForm = () => {
  let temp = {};
  temp.name = $("#task-name").val();
  temp.details = $("#task-details").val();
  tasks.push(temp);
  temp.name != ""
    ? addTaskToTable(temp.name, temp.details)
    : console.log("No task name provided");
  temp.name = "";
  temp.details = "";
  cancelTask();
  console.log("Form Data Submitted: ", tasks);
};

const cancelTask = () => {
  document.getElementById("task-name").value = "";
  document.getElementById("task-details").value = "";
};

$(document).ready(function () {
  const tableBody = document.getElementById("task-table-body");

  tasks.forEach((task) => {
    const row = `
    <tr>
      <td>${task.title}</td>
      <td>${task.details}</td>
    </tr>
  `;
    tableBody.innerHTML += row;
  });

  $("#save-task").click(() => {
    submitForm();
  });

  $("#cancel-task").click(() => {
    cancelTask();
  });

  $(".modal").modal();
});
