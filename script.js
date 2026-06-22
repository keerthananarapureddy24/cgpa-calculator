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

});


// Delete Subject

subjects.addEventListener("click", (e) => {

    const deleteBtn = e.target.closest(".delete-btn");

    if (deleteBtn) {

        deleteBtn.closest(".subject-card").remove();

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

        selectedSemester = button.textContent;

        console.log("Selected Semester:", selectedSemester);

    });

});


// Save Semester

const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", () => {

    alert(selectedSemester + " saved successfully!");

});
