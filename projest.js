const totalDisplay = document.getElementById("total");
const interviewDisplay = document.getElementById("Interview");
const rejectedDisplay = document.getElementById("Rejected");
const allSection = document.getElementById("all-card");
const filteredSection = document.getElementById("filtered-section");
const jobCountDisplay = document.getElementById("job-count");

const tabs = {
    all: document.getElementById("all-btn"),
    interview: document.getElementById("Interview-btn"),
    rejected: document.getElementById("Rejected-btn")
};

let interviewJobs = [];
let rejectedJobs = [];

function getIdFromCard(card) {
    return card.querySelector(".mobile").textContent.trim();
}

function createJobObject(card) {
    return {
        id: getIdFromCard(card),
        title: card.querySelector(".mobile").textContent,
        role: card.querySelector(".React").textContent,
        description: card.querySelector(".Build").textContent
    };
}

function setActiveTab(tabKey) {
    Object.values(tabs).forEach(btn => {
        btn.classList.remove("bg-blue-600", "text-white");
        btn.classList.add("text-[#64748B]", "border-gray-200");
    });
    tabs[tabKey].classList.add("bg-blue-600", "text-white");
    tabs[tabKey].classList.remove("text-[#64748B]", "border-gray-200");
}

function updateBadge(cardId, status) {
    const cards = allSection.children;
    for (let card of cards) {
        const id = getIdFromCard(card);
        if (id === cardId) {
            const badge = card.querySelector(".applicable");
            if (status === "interview") {
                badge.textContent = "Interview";
                badge.className = "applicable mt-2 mb-4 w-fit px-3 py-1 text-xs font-bold border-2 border-green-500 bg-green-200 text-green-800 rounded uppercase";
            } else if (status === "rejected") {
                badge.textContent = "Rejected";
                badge.className = "applicable mt-2 mb-4 w-fit px-3 py-1 text-xs font-bold border-2 border-red-500 bg-red-200 text-red-800 rounded uppercase";
            } else {
                badge.textContent = "Not applied";
                badge.className = "applicable mt-2 mb-4 w-fit px-3 py-1 text-xs font-bold border-2 border-green-100 bg-green-50 text-green-600 rounded uppercase";
            }
        }
    }
}

function updateCounts() {
    const total = allSection.children.length;
    totalDisplay.textContent = total;
    interviewDisplay.textContent = interviewJobs.length;
    rejectedDisplay.textContent = rejectedJobs.length;

    if (tabs.all.classList.contains("bg-blue-600")) {
        jobCountDisplay.textContent = total + " jobs";
    } else if (tabs.interview.classList.contains("bg-blue-600")) {
        jobCountDisplay.textContent = interviewJobs.length + " of " + total + " jobs";
    } else {
        jobCountDisplay.textContent = rejectedJobs.length + " of " + total + " jobs";
    }
}

function removeFromList(list, id) {
    return list.filter(job => job.id !== id);
}

function renderFiltered(list, type) {
    filteredSection.innerHTML = "";
    if (list.length === 0) {
        filteredSection.innerHTML = `
        <div class="flex flex-col items-center justify-center mt-20 pb-10">
            <img src="./jobs.png" class="w-24 mb-4 opacity-50">
            <h3 class="text-xl font-bold text-gray-700">No ${type} Jobs Available</h3>
            <p class="text-gray-500 mt-2">Check back later</p>
        </div>`;
        return;
    }

    list.forEach(job => {
        const wrapper = document.createElement("div");
        wrapper.className = "flex justify-between bg-white shadow-md p-6 rounded-xl border border-gray-100";

        const color = type === "Interview" ? "green" : "red";

        wrapper.innerHTML = `
        <div class="flex-1">
            <h3 class="mobile text-[#002C5C] text-[24px] font-bold">${job.title}</h3>
            <p class="React text-[#64748B] font-medium">${job.role}</p>
            <p class="Remote text-[#64748B] mt-2 mb-2 text-sm italic">Remote • Full-time</p>
            <p class="mt-2 mb-4 w-fit px-3 py-1 text-xs font-bold border-2 rounded uppercase border-${color}-500 bg-${color}-200 text-${color}-800">${type}</p>
            <p class="Build text-[#64748B] text-sm mb-6">${job.description}</p>
            <div class="flex gap-3">
                <button class="interviewButton px-4 py-1.5 text-sm font-bold border-2 border-green-500 text-green-500 rounded-md uppercase">INTERVIEW</button>
                <button class="RejectedButton px-4 py-1.5 text-sm font-bold border-2 border-red-500 text-red-500 rounded-md uppercase">REJECTED</button>
            </div>
        </div>
        <button class="deleteBtn self-start w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-200 text-gray-400">
            <i class="fa-solid fa-trash-can"></i>
        </button>
        `;
        filteredSection.appendChild(wrapper);
    });
}

function refreshCurrentTab() {
    if (tabs.interview.classList.contains("bg-blue-600")) {
        renderFiltered(interviewJobs, "Interview");
    }
    if (tabs.rejected.classList.contains("bg-blue-600")) {
        renderFiltered(rejectedJobs, "Rejected");
    }
}

function showAll() {
    setActiveTab("all");
    filteredSection.classList.add("hidden");
    allSection.classList.remove("hidden");
    updateCounts();
}

function showInterview() {
    setActiveTab("interview");
    allSection.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    renderFiltered(interviewJobs, "Interview");
    updateCounts();
}

function showRejected() {
    setActiveTab("rejected");
    allSection.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    renderFiltered(rejectedJobs, "Rejected");
    updateCounts();
}

tabs.all.addEventListener("click", showAll);
tabs.interview.addEventListener("click", showInterview);
tabs.rejected.addEventListener("click", showRejected);

document.addEventListener("click", function (e) {
    const interviewBtn = e.target.closest(".interviewButton");
    const rejectedBtn = e.target.closest(".RejectedButton");
    const deleteBtn = e.target.closest(".deleteBtn");

    if (!interviewBtn && !rejectedBtn && !deleteBtn) return;

    const card = e.target.closest(".flex.justify-between");
    if (!card) return;

    const job = createJobObject(card);
    const id = job.id;

    if (interviewBtn) {
        rejectedJobs = removeFromList(rejectedJobs, id);
        if (!interviewJobs.find(j => j.id === id)) {
            interviewJobs.push(job);
        }
        updateBadge(id, "interview");
    }

    if (rejectedBtn) {
        interviewJobs = removeFromList(interviewJobs, id);
        if (!rejectedJobs.find(j => j.id === id)) {
            rejectedJobs.push(job);
        }
        updateBadge(id, "rejected");
    }

    if (deleteBtn) {
        if (card.parentElement.id === "all-card") {
            card.remove();
        }
        interviewJobs = removeFromList(interviewJobs, id);
        rejectedJobs = removeFromList(rejectedJobs, id);
        updateBadge(id, "none");
    }

    refreshCurrentTab();
    updateCounts();
});

updateCounts();