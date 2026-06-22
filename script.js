// Add Subject

const addBtn = document.getElementById("addBtn");
const subjects = document.getElementById("subjects");

addBtn.addEventListener("click", () => {

    const card = document.createElement("div");

    card.classList.add("subject-card");

    card.innerHTML = `
        <input type="text" placeholder="Subject Name">

        <div class="subject-row">
            <select>
                <option>Grade</option>
                <option>S</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
                <option>E</option>
                <option>F</option>
            </select>

            <input type="number" placeholder="Credits">

            <button type="button" class="delete-btn">🗑️</button>
        </div>
    `;

    subjects.appendChild(card);

    // Attach listeners to NEW card
    const gradeSelect = card.querySelector("select");
    const creditInput = card.querySelector('input[type="number"]');

    gradeSelect.addEventListener("change", calculateSGPA);
    creditInput.addEventListener("input", calculateSGPA);
});
// Delete Subject

subjects.addEventListener("click", (e) => {

    const deleteBtn = e.target.closest(".delete-btn");

    if (deleteBtn) {

       deleteBtn.closest(".subject-card").remove();
calculateSGPA();

    }

});


// Semester Selection

let selectedSemester = "1-1";

const semesterButtons = document.querySelectorAll(".semester-btn");

semesterButtons.forEach(button => {

    button.addEventListener("click", () => {

        semesterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedSemester =
button.textContent;

loadSemester(
selectedSemester
);

console.log(
"Selected Semester:",
selectedSemester
);

});
function loadSemester(semester){

    subjects.innerHTML = "";

    const data =
        JSON.parse(localStorage.getItem(semester)) || [];

    data.forEach(item => {

        const card = document.createElement("div");

        card.classList.add("subject-card");

        card.innerHTML = `
            <input type="text" value="${item.subject}">

            <div class="subject-row">

                <select>
                    <option value="S" ${item.grade==="S"?"selected":""}>S</option>
                    <option value="A" ${item.grade==="A"?"selected":""}>A</option>
                    <option value="B" ${item.grade==="B"?"selected":""}>B</option>
                    <option value="C" ${item.grade==="C"?"selected":""}>C</option>
                    <option value="D" ${item.grade==="D"?"selected":""}>D</option>
                    <option value="E" ${item.grade==="E"?"selected":""}>E</option>
                    <option value="F" ${item.grade==="F"?"selected":""}>F</option>
                </select>

                <input type="number"
                       value="${item.credits}">

                <button type="button"
                        class="delete-btn">🗑️</button>

            </div>
        `;

        subjects.appendChild(card);

        card.querySelector("select")
            .addEventListener("change",
            calculateSGPA);

        card.querySelector(
            'input[type="number"]'
        ).addEventListener(
            "input",
            calculateSGPA
        );

    });

    calculateSGPA();
}


// Save Semester

const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", () => {

    const semesterData = [];

    document.querySelectorAll(".subject-card")
    .forEach(card => {

        semesterData.push({

            subject:
            card.querySelector(
            'input[type="text"]'
            ).value,

            grade:
            card.querySelector(
            "select"
            ).value,

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

    alert(
        selectedSemester +
        " saved successfully!"
    );

});
function calculateSGPA(){

    const gradeMap = {
        "S":10,
        "A":9,
        "B":8,
        "C":7,
        "D":6,
        "E":5,
        "F":0
    };

    let totalCredits = 0;
    let totalPoints = 0;
    let backlogs = 0;

    document.querySelectorAll(".subject-card").forEach(card => {

        const grade =
        card.querySelector("select").value;

        const credits =
        Number(card.querySelector(
        'input[type="number"]'
        ).value);

        if(!credits) return;

        totalCredits += credits;
        totalPoints += gradeMap[grade] * credits;

        if(grade === "F"){
            backlogs++;
        }

    });

    let sgpa = 0;

    if(totalCredits > 0){
        sgpa = totalPoints / totalCredits;
    }

    document.getElementById("sgpa")
    .textContent = sgpa.toFixed(2);

    document.getElementById("cgpa")
    .textContent = sgpa.toFixed(2);

    document.getElementById("credits")
    .textContent = totalCredits;

    document.getElementById("backlogs")
    .textContent = backlogs;

    let percentage =
    (sgpa - 0.75) * 10;

    document.getElementById("percentage")
    .textContent =
    percentage.toFixed(2) + "%";

    let result = "FAIL";

    if(sgpa >= 8.0){
        result =
        "FIRST CLASS WITH DISTINCTION";
    }
    else if(sgpa >= 6.5){
        result = "FIRST CLASS";
    }
    else if(sgpa >= 5.5){
        result = "SECOND CLASS";
    }

    document.getElementById("result")
    .textContent = result;
}
calculateSGPA();
document.querySelectorAll(".subject-card").forEach(card => {

    const gradeSelect =
        card.querySelector("select");

    const creditInput =
        card.querySelector('input[type="number"]');

    gradeSelect.addEventListener(
        "change",
        calculateSGPA
    );

    creditInput.addEventListener(
        "input",
        calculateSGPA
    );

});
document.querySelectorAll(".subject-card").forEach(card => {

    const gradeSelect = card.querySelector("select");
    const creditInput = card.querySelector('input[type="number"]');

    gradeSelect.addEventListener("change", calculateSGPA);
    creditInput.addEventListener("input", calculateSGPA);

});
loadSemester("1-1");
