
/*Stack Overflow, 2023. Перезаписать значение в ячейке таблицы HTML через JavaScript. [online] Available at: 
https://ru.stackoverflow.com/questions/1273290/%D0%9F%D0%B5%D1%80%D0%B5%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C-%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-
%D0%B2-%D1%8F%D1%87%D0%B5%D0%B9%D0%BA%D0%B5-%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D1%8B-html-%D1%87%D0%B5%D1%80%D0%B5%D0%B7-javascript 
[Accessed 23rd October 2023].*/

function createSummaryTable(gameResults) {
    const tableBody = document.querySelector("#summaryTable tbody");

    tableBody.innerHTML = "";

    gameResults.forEach((result, index) => {
        const row = document.createElement("tr");
        let cell = document.createElement("td");
        cell.textContent = index + 1;
        row.appendChild(cell);

        cell = document.createElement("td");
        cell.textContent = result.question;
        row.appendChild(cell);

        cell = document.createElement("td");
        cell.textContent = result.answers.join(", ");
        row.appendChild(cell);

        cell = document.createElement("td");
        if (result.selectedAnswer !== null) {
            cell.textContent = result.answers[result.selectedAnswer];
        } else {
            cell.textContent = "No Answer";
        }
        row.appendChild(cell);

        cell = document.createElement("td");
        cell.textContent = result.answers[result.correctAnswer];
        cell.classList.add("correct");
        row.appendChild(cell);

        cell = document.createElement("td");
        if (result.correctAnswer === result.selectedAnswer) {
            cell.textContent = "Correct";
            cell.classList.add("correct");
        } else {
            cell.textContent = "Wrong";
            cell.classList.add("wrong");
        }
        row.appendChild(cell);

        tableBody.appendChild(row);
    });
}

function loadGameResults() {
    const resultString = localStorage.getItem("gameResults");
    if (!resultString) return [];

    return JSON.parse(resultString);
}

document.addEventListener("DOMContentLoaded", () => {
    const gameResults = loadGameResults();
    if (gameResults.length > 0) {
        createSummaryTable(gameResults);
    }
});
