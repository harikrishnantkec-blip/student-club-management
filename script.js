
let clubs = JSON.parse(localStorage.getItem("clubs")) || [
    {
        id: 1,
        name: "Coding Club",
        description: "Learn programming and develop software.",
        icon: "💻"
    },
    {
        id: 2,
        name: "Music Club",
        description: "Explore music, singing and instruments.",
        icon: "🎵"
    },
    {
        id: 3,
        name: "Dance Club",
        description: "Show your talent through dance.",
        icon: "💃"
    },
    {
        id: 4,
        name: "Photography Club",
        description: "Capture beautiful moments.",
        icon: "📸"
    },
    {
        id: 5,
        name: "Sports Club",
        description: "Participate in sports activities.",
        icon: "🏆"
    }
];

let joined = JSON.parse(localStorage.getItem("joined")) || [];

function saveData() {
    localStorage.setItem("clubs", JSON.stringify(clubs));
    localStorage.setItem("joined", JSON.stringify(joined));
}

function renderClubs(search = "") {
    const clubList = document.getElementById("clubList");
    const myClubList = document.getElementById("myClubList");

    clubList.innerHTML = "";
    myClubList.innerHTML = "";

    const filtered = clubs.filter(club =>
        club.name.toLowerCase().includes(search.toLowerCase())
    );

    filtered.forEach(club => {
        const card = document.createElement("div");
        card.className = "club-card";

        const title = document.createElement("h3");
        title.textContent = club.icon + " " + club.name;

        const description = document.createElement("p");
        description.textContent = club.description;

        const button = document.createElement("button");
        const isJoined = joined.includes(club.id);

        button.textContent = isJoined ? "Joined ✓" : "Join Club";
        button.disabled = isJoined;

        button.addEventListener("click", () => {
            if (!joined.includes(club.id)) {
                joined.push(club.id);
                saveData();
                renderClubs(
                    document.getElementById("searchInput").value
                );
            }
        });

        card.append(title, description, button);
        clubList.appendChild(card);
    });

    clubs.filter(club => joined.includes(club.id))
        .forEach(club => {
            const card = document.createElement("div");
            card.className = "club-card";

            const title = document.createElement("h3");
            title.textContent = club.icon + " " + club.name;

            const description = document.createElement("p");
            description.textContent = club.description;

            card.append(title, description);
            myClubList.appendChild(card);
        });

    if (filtered.length === 0) {
        clubList.textContent = "No clubs found.";
    }

    if (joined.length === 0) {
        myClubList.textContent = "You haven't joined any clubs yet.";
    }

    document.getElementById("totalClubs").textContent = clubs.length;
    document.getElementById("joinedClubs").textContent = joined.length;
}

document.getElementById("searchInput")
    .addEventListener("input", function() {
        renderClubs(this.value);
    });

document.getElementById("clubForm")
    .addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("clubName").value.trim();
        const description = document.getElementById("clubDescription").value.trim();

        if (!name || !description) return;

        clubs.push({
            id: Date.now(),
            name: name,
            description: description,
            icon: "🌟"
        });

        saveData();
        renderClubs();

        this.reset();

        alert("New club added successfully!");
    });

document.getElementById("totalEvents").textContent = 3;

renderClubs();
