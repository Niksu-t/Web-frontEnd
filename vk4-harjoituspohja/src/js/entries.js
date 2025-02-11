const container = document.getElementsByClassName("card-area");

const getEntries = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/entries");
    const entries = await response.json();
    console.log(entries);
    while (container[0].hasChildNodes()) {
        container[0].removeChild(container[0].firstChild);
    };
    entries.forEach((entry) => {
      
      const card = document.createElement("div");
      card.className ="card";
      card.innerHTML = `
          <div class="card-img">
            <img src="/src/img/diary.jpg" alt="" />
          </div>
          <div class="card-diary">
          <div>Entry Id: <span>${entry.entry_id}</span></div>
          <div>User Id: <span>${entry.user_id}</span></div>
          <div>Mood: <span>${entry.mood}</span></div>
          <div>Weight: <span>${entry.weight}</span></div>
          <div>Sleep hours: <span>${entry.sleep_hours}</span></div>
          <div>Notes: <span>${entry.notes}</span></div>
          </div>`;

      container[0].appendChild(card);
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export { getEntries };
