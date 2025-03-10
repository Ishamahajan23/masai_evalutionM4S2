let body = document.querySelector("body");
let h1 = document.querySelectorAll("h1");
let theme = document.getElementById("theme");
theme?.addEventListener("change", (event) => {
    event.preventDefault();
    if (theme.value == "light") {
        body.style.backgroundColor = "white";
        h1.forEach((element) => {
            element.style.color = "black";
        });
    } else if (theme.value == "Dark") {
        body.style.backgroundColor = "black";
        h1.forEach((element) => {
            element.style.color = "white";
        });
    }
});

let submitBtn = document.getElementById("submit");
let BaseUrl = "https://student-profile-dashboard-default-rtdb.firebaseio.com/students.json";

async function fetchUrl() {
    let res = await fetch(BaseUrl);
    let data = await res.json();
    displayData(data);
}
fetchUrl();

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let email = document.getElementById("email").value;
    let courseValue = document.getElementById("course").value;
    let male = document.getElementById("male");
    let female = document.getElementById("female");
    let other = document.getElementById("notToShow");
    let gender = "";

    if (male.checked) {
        gender = male.value;
    } else if (female.checked) {
        gender = female.value;
    } else if (other.checked) {
        gender = other.value;
    } else {
        gender = "Not selected";
    }

    let html = document.getElementById("html");
    let css = document.getElementById("css");
    let cloud = document.getElementById("cloud");
    let js = document.getElementById("js");
    let skillSet = [html, css, cloud, js];
    let skills = skillSet.filter((element) => element.checked).map((element) => element.name);

    let profileImg = document.getElementById("profileImg").value;
  
        let student = {
            id: Math.random(),
            name: name,
            age: age,
            email: email,
            course: courseValue,
            gender: gender,
            skills: skills,
            profileImg: profileImg
        };
        console.log(student);
        localStorage.setItem('student', JSON.stringify(student));
        fetch(BaseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        });
   
   
});

function displayData(data) {
    let table = document.querySelector("table tbody");
    let studentData = Object.values(data);
    table.innerHTML = "";
    studentData.forEach((student) => {
        table.innerHTML += `
         <tr>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>${student.gender}</td>
            <td>${student.skills.join(", ")}</td>
            <td><img src="${student.profileImg}" alt="Profile Image" width="50"></td>
        </tr>`;
    });
}

let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", async () => {
    let searchName = document.getElementById("searchName").value.toLowerCase();
    let res = await fetch(BaseUrl);
    let data = await res.json();
    let studentArr = Object.values(data);
    let studentData = studentArr.filter((student) => student.name.toLowerCase().includes(searchName));
    displayData(studentData);
});

let sortBtn = document.getElementById("sortBtn");
sortBtn.addEventListener("click", async () => {
    let res = await fetch(BaseUrl);
    let data = await res.json();
    let studentArr = Object.values(data);
    studentArr.sort((a, b) => a.name.localeCompare(b.name));
    displayData(studentArr);
});

let loadDataBtn = document.getElementById("loadDataBtn");
loadDataBtn.addEventListener("click", fetchUrl);

let hamburgerMenu = document.getElementById("hamburger-menu");
hamburgerMenu.addEventListener("click", () => {
    let navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        if (link.style.display === "block") {
            link.style.display = "none";
        } else {
            link.style.display = "block";
        }
    });
});

window.addEventListener("load", () => {
    let savedStudent = localStorage.getItem('student');
    if (savedStudent) {
        let student = JSON.parse(savedStudent);
        displayData([student]);
    }
});