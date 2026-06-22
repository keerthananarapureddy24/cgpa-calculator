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
                <option>O</option>
                <option>A+</option>
                <option>A</option>
                <option>B+</option>
                <option>B</option>
                <option>C</option>
                <option>F</option>
            </select>

            <input type="number" placeholder="Credits">

            <button class="delete-btn">🗑️</button>
        </div>
    `;

    subjects.appendChild(card);

});
subjects.addEventListener("click", (e) => {

    const deleteBtn = e.target.closest(".delete-btn");

    if(deleteBtn){

        deleteBtn.closest(".subject-card").remove();

    }

});
