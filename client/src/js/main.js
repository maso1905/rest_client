"use strict"

// Variables
let courseEl = document.getElementById("courses");
let addCoursebtn = document.getElementById("addCourse");
let nameInput = document.getElementById("name");
let codeInput = document.getElementById("code");
let progInput = document.getElementById("prog");
let syllabusInput = document.getElementById("syllabus");

// Event listener
window.addEventListener('load', getCourses());
addCoursebtn.addEventListener('click', addCourse);

// Functions
function getCourses() {
    courseEl.innerHTML = '';
    fetch('http://studenter.miun.se/~maso1905/dt173g/rest/miun_courses/course.php')
    .then(response => response.json())
    .then(data => {
        data.forEach(course => {
            courseEl.innerHTML +=
                `<div class="course">              
                    <table>
                        <tr>
                            <td> ${course.code}</td>
                            <td>${course.name}</td>
                            <td>${course.prog}</td>
                            <td><a href="${course.syllabus}">Länk</a></td>
                            <br>
                            <td><button id="${course.id}" onClick="deleteCourse(${course.id})">x</button></td>
                        </tr>
                    </table>  
                </div>
                `
        })
    })
}

// Delete course function
function deleteCourse(id){
    fetch('http://studenter.miun.se/~maso1905/dt173g/rest/miun_courses/course.php?id=' + id, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        getCourses();
    })
    .catch(error => {
        console.log('Error: ', error);
    })
}

// Add course function
function addCourse() {
    let name = nameInput.value;
    let code = codeInput.value;
    let prog = progInput.value;
    let syllabus = syllabusInput.value;
    let course = {'name': name, 'code': code, 'prog': prog, 'syllabus': syllabus};

    fetch('http://studenter.miun.se/~maso1905/dt173g/rest/miun_courses/course.php', {
        method: 'POST',
        body: JSON.stringify(course),
    })
    .then(response => response.json())
    .then(data => {
        getCourses();
    })
    .catch(error => {
        console.log('Error: ', error);
    })

}