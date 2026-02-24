const totalDisplay = document.getElementById('total');
const interviewDisplay = document.getElementById('Interview');
const rejectedDisplay = document.getElementById('Rejected');
const allCardSection = document.getElementById('all-card');
const filterSection = document.getElementById('filtered-section');
const jobCountDisplay = document.getElementById('job-count');

let InterviewList = [];
let RejectedList = [];

function updateCounters() {
    const totalJobs = allCardSection.children.length;
    totalDisplay.innerText = totalJobs;
    interviewDisplay.innerText = InterviewList.length;
    rejectedDisplay.innerText = RejectedList.length;

    if (document.getElementById('all-btn').classList.contains('bg-blue-600')) {
        jobCountDisplay.innerText = `${totalJobs} jobs`;
    } else if (document.getElementById('Interview-btn').classList.contains('bg-blue-600')) {
        jobCountDisplay.innerText = `${InterviewList.length} jobs`;
    } else if (document.getElementById('Rejected-btn').classList.contains('bg-blue-600')) {
        jobCountDisplay.innerText = `${RejectedList.length} jobs`;
    }
}

function toggleStyle(id) {
    const buttons = ['all-btn', 'Interview-btn', 'Rejected-btn'];
    buttons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('text-[#64748B]', 'border-gray-200');
    });

    const selectedBtn = document.getElementById(id);
    selectedBtn.classList.add('bg-blue-600', 'text-white');
    selectedBtn.classList.remove('text-[#64748B]', 'border-gray-200');

    if (id === 'all-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }

    if (id === 'Interview-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderFilteredData(InterviewList, 'Interview', 'green');
    }

    if (id === 'Rejected-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderFilteredData(RejectedList, 'Rejected', 'red');
    }

    updateCounters();
}

document.addEventListener('click', function(event) {

    const interviewBtn = event.target.closest('.interviewButton');
    const rejectedBtn = event.target.closest('.RejectedButton');
    const deleteBtn = event.target.closest('.deleteBtn');

    if (!interviewBtn && !rejectedBtn && !deleteBtn) return;

    const card = event.target.closest('.flex.justify-between');
    if (!card) return;

    const id = card.querySelector('.mobile').innerText;

    const jobInfo = {
        id: id,
        mobile: card.querySelector('.mobile').innerText,
        react: card.querySelector('.React').innerText,
        build: card.querySelector('.Build').innerText
    };

    if (interviewBtn) {

        RejectedList = RejectedList.filter(item => item.id !== id);

        if (!InterviewList.find(item => item.id === id)) {
            InterviewList.push(jobInfo);
        }

        const allCard = [...allCardSection.children].find(c =>
            c.querySelector('.mobile').innerText === id
        );

        if (allCard) {
            const status = allCard.querySelector('.applicable');
            status.innerText = "Interview";
            status.className =
            "applicable mt-2 mb-4 w-fit px-3 py-1 text-xs font-bold border-2 border-green-500 bg-green-200 text-green-800 rounded uppercase";
        }

        refreshCurrentTab();
        updateCounters();
    }

    if (rejectedBtn) {

        InterviewList = InterviewList.filter(item => item.id !== id);

        if (!RejectedList.find(item => item.id === id)) {
            RejectedList.push(jobInfo);
        }

        const allCard = [...allCardSection.children].find(c =>
            c.querySelector('.mobile').innerText === id
        );

        if (allCard) {
            const status = allCard.querySelector('.applicable');
            status.innerText = "Rejected";
            status.className =
            "applicable mt-2 mb-4 w-fit px-3 py-1 text-xs font-bold border-2 border-red-500 bg-red-200 text-red-800 rounded uppercase";
        }

        refreshCurrentTab();
        updateCounters();
    }

    if (deleteBtn) {

        if (card.parentElement.id === "all-card") {
            card.remove();
        }

        InterviewList = InterviewList.filter(item => item.id !== id);
        RejectedList = RejectedList.filter(item => item.id !== id);

        refreshCurrentTab();
        updateCounters();
    }

});

function refreshCurrentTab() {

    if (document.getElementById('Interview-btn').classList.contains('bg-blue-600')) {
        renderFilteredData(InterviewList, 'Interview', 'green');
    }

    if (document.getElementById('Rejected-btn').classList.contains('bg-blue-600')) {
        renderFilteredData(RejectedList, 'Rejected', 'red');
    }

}

function renderFilteredData(list, statusText, color) {

    filterSection.innerHTML = "";

    if (list.length === 0) {
        filterSection.innerHTML =
        `<div class="text-center mt-10 text-gray-400 text-lg">No jobs available</div>`;
        return;
    }

    list.forEach(item => {

        const div = document.createElement('div');

        div.className =
        "flex justify-between bg-white shadow-md p-6 rounded-xl border border-gray-100";

        div.innerHTML = `
            <div class="flex-1">
                <h3 class="mobile text-[#002C5C] text-[24px] font-bold">${item.mobile}</h3>
                <p class="React text-[#64748B] font-medium">${item.react}</p>
                <p class="Remote text-[#64748B] mt-2 mb-2 text-sm italic">
                Remote • Full-time • $130k - $175k
                </p>

                <p class="mt-2 mb-4 w-fit px-3 py-1 text-xs font-bold border-2 rounded uppercase
                ${color === 'green'
                    ? 'border-green-500 bg-green-200 text-green-800'
                    : 'border-red-500 bg-red-200 text-red-800'}">
                ${statusText}
                </p>

                <p class="Build text-[#64748B] text-sm mb-6">${item.build}</p>

                <div class="flex gap-3">
                    <button class="interviewButton px-4 py-1.5 text-sm font-bold border-2 border-green-500 text-green-500 rounded-md uppercase">
                    INTERVIEW
                    </button>

                    <button class="RejectedButton px-4 py-1.5 text-sm font-bold border-2 border-red-500 text-red-500 rounded-md uppercase">
                    REJECTED
                    </button>
                </div>
            </div>

            <button class="deleteBtn self-start w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-200 text-gray-400">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;

        filterSection.appendChild(div);

    });

}

updateCounters();