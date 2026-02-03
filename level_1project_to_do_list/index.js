var usr_tsk_inpt = document.querySelector(".form-control");
var irt = document.querySelector("#insrt");

lst = {
  usr_tsk_arr: [],
  usr_impt_tsk_arr: [],
};
var tsk_ad_btn = document.getElementById("add_task_btn");
tsk_ad_btn.addEventListener("click", Tsk_add_arr);
function Tsk_add_arr() {
  if (usr_tsk_inpt.value.trim() === "") return;

  lst.usr_tsk_arr.push(usr_tsk_inpt.value);
  irt.innerHTML = "Adding Task - " + usr_tsk_inpt.value;
  usr_tsk_inpt.value = "";
}

var it_tsk_ad_btn = document.getElementById("impt_task_btn");
it_tsk_ad_btn.addEventListener("click", Impt_tsk_add_arr);
function Impt_tsk_add_arr() {
  if (usr_tsk_inpt.value.trim() === "") return;

  lst.usr_impt_tsk_arr.push(usr_tsk_inpt.value);
  irt.innerHTML = "🔴 Adding Important Task - " + usr_tsk_inpt.value;
  usr_tsk_inpt.value = "";
}

var view_tsk_btn = document.querySelector("#view_task_btn");
view_tsk_btn.addEventListener("click", Show);
function Show() {
  let html = "";

  if (lst.usr_impt_tsk_arr.length > 0) {
    html += "<b>🔴 Important Tasks</b><br>";
    html += lst.usr_impt_tsk_arr.map((task) => `-> ${task}`).join("<br>");
    html += "<br><br>";
  }

  if (lst.usr_tsk_arr.length > 0) {
    html += "<b>🟢 Normal Tasks</b><br>";
    html += lst.usr_tsk_arr.join("<br>");
  }

  irt.innerHTML = html;
}
