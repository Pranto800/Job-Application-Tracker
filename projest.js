// elements
const total = document.getElementById('total')
const interviewCountText = document.getElementById('Interview')
const rejectedCountText = document.getElementById('Rejected')

const allCardSection = document.getElementById('all-card')
const filterSection = document.getElementById('filtered-section')
const mainContainer = document.querySelector('main')

// button count show element create
const interviewBtn = document.getElementById("Interview-btn")
const rejectedBtn = document.getElementById("Rejected-btn")

const interviewBtnCount = document.createElement("span")
interviewBtnCount.className = "ml-2 font-bold"
interviewBtn.appendChild(interviewBtnCount)

const rejectedBtnCount = document.createElement("span")
rejectedBtnCount.className = "ml-2 font-bold"
rejectedBtn.appendChild(rejectedBtnCount)


let interviewList = []
let rejectedList = []
let currentFilter = "all"


// count update
function numberCount(){

    total.innerText = allCardSection.children.length
    interviewCountText.innerText = interviewList.length
    rejectedCountText.innerText = rejectedList.length

    // button count show
    interviewBtnCount.innerText = `(${interviewList.length})`
    rejectedBtnCount.innerText = `(${rejectedList.length})`
}


// badge UI
function setStatusUI(card, type){

    const status = card.querySelector(".applicable")

    if(type === "Interview"){
        status.innerText = "Interview"
        status.className =
        "applicable mt-[20px] mb-[20px] w-[140px] px-[10px] py-[3px] text-[17px] border-2 border-green-400 text-green-700 bg-green-100"
    }

    if(type === "Rejected"){
        status.innerText = "Rejected"
        status.className =
        "applicable mt-[20px] mb-[20px] w-[140px] px-[10px] py-[3px] text-[17px] border-2 border-red-400 text-red-700 bg-red-100"
    }
}


// render filter
function renderFilter(){

    filterSection.innerHTML = ""

    let list = []

    if(currentFilter === "interview"){
        list = interviewList
    }

    if(currentFilter === "rejected"){
        list = rejectedList
    }

    list.forEach(name => {

        const originalCard =
        [...allCardSection.children]
        .find(card => card.querySelector(".mobile").innerText === name)

        if(originalCard){

            const clone = originalCard.cloneNode(true)

            if(currentFilter === "interview"){
                setStatusUI(clone,"Interview")
            }

            if(currentFilter === "rejected"){
                setStatusUI(clone,"Rejected")
            }

            filterSection.appendChild(clone)
        }

    })
}


// tab switch
function toggleStyle(id){

    const allBtn = document.getElementById('all-btn')

    allBtn.classList.remove('bg-blue-500','text-white')
    interviewBtn.classList.remove('bg-blue-500','text-white')
    rejectedBtn.classList.remove('bg-blue-500','text-white')

    document.getElementById(id).classList.add('bg-blue-500','text-white')

    if(id === "all-btn"){
        currentFilter = "all"
        filterSection.classList.add("hidden")
        allCardSection.classList.remove("hidden")
    }

    if(id === "Interview-btn"){
        currentFilter = "interview"
        allCardSection.classList.add("hidden")
        filterSection.classList.remove("hidden")
        renderFilter()
    }

    if(id === "Rejected-btn"){
        currentFilter = "rejected"
        allCardSection.classList.add("hidden")
        filterSection.classList.remove("hidden")
        renderFilter()
    }
}


// helper
function findOriginalCard(name){
    return [...allCardSection.children]
    .find(card => card.querySelector(".mobile").innerText === name)
}



// click handler
mainContainer.addEventListener("click", function(e){

    const card =
    e.target.closest("#all-card > div") ||
    e.target.closest("#filtered-section > div")

    if(!card) return

    const name = card.querySelector(".mobile").innerText


    // DELETE শুধু ALL থেকে
    if(e.target.closest(".fa-trash")){

        const original = findOriginalCard(name)

        if(original){
            original.remove()
        }

        // list থেকেও remove যাতে filter এ না আসে
        interviewList = interviewList.filter(item => item !== name)
        rejectedList = rejectedList.filter(item => item !== name)

        renderFilter()
        numberCount()

        return
    }


    // INTERVIEW
    if(e.target.classList.contains("interviewButton")){

        rejectedList = rejectedList.filter(item => item !== name)

        if(!interviewList.includes(name)){
            interviewList.push(name)
        }

        const original = findOriginalCard(name)
        if(original) setStatusUI(original,"Interview")

        setStatusUI(card,"Interview")
    }


    // REJECTED
    if(e.target.classList.contains("RejectedButton")){

        interviewList = interviewList.filter(item => item !== name)

        if(!rejectedList.includes(name)){
            rejectedList.push(name)
        }

        const original = findOriginalCard(name)
        if(original) setStatusUI(original,"Rejected")

        setStatusUI(card,"Rejected")
    }


    numberCount()
    renderFilter()

})


// init
numberCount()