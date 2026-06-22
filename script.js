const addBtn = document.getElementById("addBtn");
const subjects = document.getElementById("subjects");

// ======================
// ADD SUBJECT
// ======================

function createSubjectCard() {

    const card = document.createElement("div");

    card.classList.add("subject-card");

    card.innerHTML = `
        <input type="text" placeholder="Subject Name">

        <div class="subject-row">

            <select>
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
}

// ======================
// ADD BUTTON
// ======================

addBtn.addEventListener("click", () => {
    createSubjectCard();
});

// ======================
// DELETE SUBJECT
// ======================

subjects.addEventListener("click", (e) => {

    const deleteBtn = e.target.closest(".delete-btn");

    if(deleteBtn){

        deleteBtn.closest(".subject-card").remove();

    }

});

// ======================
// SEMESTER BUTTONS
// ======================

const semesterButtons =
document.querySelectorAll(".semester-btn");

semesterButtons.forEach(button => {

    button.addEventListener("click", () => {

        semesterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        console.log(
            "Selected:",
            button.textContent
        );

    });

});

// ======================
// INITIAL CARD
// ======================

createSubjectCard();
