const addBtn = document.getElementById("addBtn");
const saveBtn = document.getElementById("saveBtn");
const subjects = document.getElementById("subjects");

let selectedSemester = "1-1";

// ======================
// CREATE SUBJECT CARD
// ======================

function createSubjectCard(subject = "", grade = "S", credits = "") {

```
const card = document.createElement("div");

card.classList.add("subject-card");

card.innerHTML = `
    <input type="text"
           placeholder="Subject Name"
           value="${subject}">

    <div class="subject-row">

        <select>
            <option value="S" ${grade==="S"?"selected":""}>S</option>
            <option value="A" ${grade==="A"?"selected":""}>A</option>
            <option value="B" ${grade==="B"?"selected":""}>B</option>
            <option value="C" ${grade==="C"?"selected":""}>C</option>
            <option value="D" ${grade==="D"?"selected":""}>D</option>
            <option value="E" ${grade==="E"?"selected":""}>E</option>
            <option value="F" ${grade==="F"?"selected":""}>F</option>
        </select>

        <input type="number"
               placeholder="Credits"
               value="${credits}">

        <button type="button"
                class="delete-btn">🗑️</button>

    </div>
`;

subjects.appendChild(card);

card.querySelector("select")
    .addEventListener("change", calculateSGPA);

card.querySelector('input[type="number"]')
    .addEventListener("input", calculateSGPA);
```

}

// ======================
// ADD SUBJECT
// ======================

addBtn.addEventListener("click", () => {
createSubjectCard();
});

// ======================
// DELETE SUBJECT
// ======================

subjects.addEventListener("click", (e) => {

```
const deleteBtn = e.target.closest(".delete-btn");

if(deleteBtn){

    deleteBtn.closest(".subject-card").remove();

    calculateSGPA();
}
```

});

// ======================
// SEMESTER SELECTION
// ======================

const semesterButtons =
document.querySelectorAll(".semester-btn");

semesterButtons.forEach(button => {

```
button.addEventListener("click", () => {

    semesterButtons.forEach(btn =>
        btn.classList.remove("active")
    );

    button.classList.add("active");

    selectedSemester =
    button.textContent.trim();

    loadSemester(selectedSemester);

});
```

});

// ======================
// SAVE SEMESTER
// ======================
saveBtn.addEventListener("click", () => {

    alert("Button Clicked");

    calculateSGPA();

    ...
});
saveBtn.addEventListener("click", () => {

```
calculateSGPA();

const semesterData = {

    sgpa:
    document.getElementById("sgpa").textContent,

    subjects: []

};

document.querySelectorAll(".subject-card")
.forEach(card => {

    semesterData.subjects.push({

        subject:
        card.querySelector(
        'input[type="text"]'
        ).value,

        grade:
        card.querySelector("select")
        .value,

        credits:
        card.querySelector(
        'input[type="number"]'
        ).value

    });

});

localStorage.setItem(
    selectedSemester,
    JSON.stringify(semesterData)
);

calculateCGPA();

alert(
    selectedSemester +
    " saved successfully!"
);
```

});

// ======================
// LOAD SEMESTER
// ======================

function loadSemester(semester){

```
subjects.innerHTML = "";

const data =
JSON.parse(
    localStorage.getItem(semester)
);

if(!data){

    createSubjectCard();

    calculateSGPA();

    return;
}

data.subjects.forEach(item => {

    createSubjectCard(
        item.subject,
        item.grade,
        item.credits
    );

});

calculateSGPA();
```

}

// ======================
// SGPA
// ======================

function calculateSGPA(){

```
const gradeMap = {

    S:10,
    A:9,
    B:8,
    C:7,
    D:6,
    E:5,
    F:0

};

let totalCredits = 0;
let totalPoints = 0;
let backlogs = 0;

document.querySelectorAll(".subject-card")
.forEach(card => {

    const grade =
    card.querySelector("select").value;

    const credits =
    Number(
        card.querySelector(
        'input[type="number"]'
        ).value
    );

    if(!credits) return;

    totalCredits += credits;

    totalPoints +=
    gradeMap[grade] * credits;

    if(grade === "F"){
        backlogs++;
    }

});

let sgpa = 0;

if(totalCredits > 0){

    sgpa =
    totalPoints / totalCredits;

}

document.getElementById("sgpa")
.textContent =
sgpa.toFixed(2);

document.getElementById("credits")
.textContent =
totalCredits;

document.getElementById("backlogs")
.textContent =
backlogs;

let result = "FAIL";

if(sgpa >= 8.0){

    result =
    "FIRST CLASS WITH DISTINCTION";

}
else if(sgpa >= 6.5){

    result =
    "FIRST CLASS";

}
else if(sgpa >= 5.5){

    result =
    "SECOND CLASS";

}

document.getElementById("result")
.textContent =
result;
```

}

// ======================
// CGPA
// ======================

function calculateCGPA(){

```
const semesters = [

    "1-1","1-2",
    "2-1","2-2",
    "3-1","3-2",
    "4-1","4-2"

];

let totalSGPA = 0;
let count = 0;
let totalCredits = 0;

semesters.forEach(sem => {

    const data =
    JSON.parse(
        localStorage.getItem(sem)
    );

    if(data){

        totalSGPA +=
        Number(data.sgpa);

        count++;

        if(data.subjects){

            data.subjects.forEach(subject => {

                totalCredits +=
                Number(subject.credits);

            });

        }

    }

});

let cgpa = 0;

if(count > 0){

    cgpa =
    totalSGPA / count;

}

document.getElementById("cgpa")
.textContent =
cgpa.toFixed(2);

document.getElementById("totalCredits")
.textContent =
totalCredits;

document.getElementById("percentage")
.textContent =
((cgpa - 0.5) * 10)
.toFixed(2) + "%";
```

}

// ======================
// INITIAL LOAD
// ======================

loadSemester("1-1");

calculateSGPA();

calculateCGPA();
