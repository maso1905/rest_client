"use strict"; // Variables

var courseEl = document.getElementById("courses");
var addCoursebtn = document.getElementById("addCourse");
var nameInput = document.getElementById("name");
var codeInput = document.getElementById("code");
var progInput = document.getElementById("prog");
var syllabusInput = document.getElementById("syllabus"); // Event listener

window.addEventListener('load', getCourses());
addCoursebtn.addEventListener('click', addCourse); // Functions

function getCourses() {
  courseEl.innerHTML = '';
  fetch('http://studenter.miun.se/~maso1905/dt173g/rest/miun_courses/course.php').then(function (response) {
    return response.json();
  }).then(function (data) {
    data.forEach(function (course) {
      courseEl.innerHTML += "<div class=\"course\">              \n                    <table>\n                        <tr>\n                            <td> ".concat(course.code, "</td>\n                            <td>").concat(course.name, "</td>\n                            <td>").concat(course.prog, "</td>\n                            <td><a href=\"").concat(course.syllabus, "\">L\xE4nk</a></td>\n                            <br>\n                            <td><button id=\"").concat(course.id, "\" onClick=\"deleteCourse(").concat(course.id, ")\">x</button></td>\n                        </tr>\n                    </table>  \n                </div>\n                ");
    });
  });
} // Delete course function


function deleteCourse(id) {
  fetch('http://studenter.miun.se/~maso1905/dt173g/rest/miun_courses/course.php?id=' + id, {
    method: 'DELETE'
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    getCourses();
  })["catch"](function (error) {
    console.log('Error: ', error);
  });
} // Add course function


function addCourse() {
  var name = nameInput.value;
  var code = codeInput.value;
  var prog = progInput.value;
  var syllabus = syllabusInput.value;
  var course = {
    'name': name,
    'code': code,
    'prog': prog,
    'syllabus': syllabus
  };
  fetch('http://studenter.miun.se/~maso1905/dt173g/rest/miun_courses/course.php', {
    method: 'POST',
    body: JSON.stringify(course)
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    getCourses();
  })["catch"](function (error) {
    console.log('Error: ', error);
  });
}
//# sourceMappingURL=main.js.map
