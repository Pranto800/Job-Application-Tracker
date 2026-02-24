
let total =document.getElementById('total')
let Interview =document.getElementById('Interview')
let Rejected =document.getElementById('Rejected')
let InterviewCount =[];
let RejectedCount =[];
let cards = document.getElementById('all-card')
const allBtnStyle = document.getElementById('all-btn')
const thrivingBtnStyle = document.getElementById('Interview-btn')
const RejectedBtnStyle = document.getElementById('Rejected-btn')


function numberCount (){
    total.innerText = cards.children.length
    Interview.innerText = InterviewCount.length
    Rejected.innerText =RejectedCount.length
}
function toggleStyle(id){

    const allBtn = document.getElementById('all-btn');
    const interviewBtn = document.getElementById('Interview-btn');
    const rejectedBtn = document.getElementById('Rejected-btn');

    allBtn.classList.remove('bg-blue-500','text-white','border-blue-300');
    interviewBtn.classList.remove('bg-blue-500','text-white','border-blue-300');
    rejectedBtn.classList.remove('bg-blue-500','text-white','border-blue-300');

    allBtn.classList.add('text-[#64748B]','border-gray-200');
    interviewBtn.classList.add('text-[#64748B]','border-gray-200');
    rejectedBtn.classList.add('text-[#64748B]','border-gray-200');

    const selected = document.getElementById(id);

    selected.classList.add('bg-blue-500','text-white','border-blue-300');
    selected.classList.remove('text-[#64748B]','border-gray-200');

      if (id == 'Interview-btn') {
        cards.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderThriving()
    }
}
 numberCount ()

 const mainContainer = document.querySelector('main')
 const filterSection = document.getElementById('filtered-section')

mainContainer.addEventListener('click' , function(event) {
    console.log(event.target.classList.contains('interviewButton'));
    if (event.target.classList.contains('interviewButton')){
     const  parenNode = event.target.parentNode.parentNode;
    const mobileName = parenNode.querySelector('.mobile').innerText
    const react = parenNode.querySelector('.React').innerText
    const remote = parenNode.querySelector('.Remote').innerText
    const build = parenNode.querySelector('.Build').innerText
    const notApplicable = parenNode.querySelector('.applicable').innerText
   

    const cardInfo = {
            mobileName,
            react,
            remote,
          notApplicable: 'Interview',
             build
        }
        const plantExist = InterviewCount.find(item => item. mobileName == cardInfo. mobileName)
      if (!plantExist) {
            InterviewCount.push(cardInfo)
        }
      renderInterview ()
    }
 
})

function renderInterview (){
    filterSection.innerHTML = ''
    for (let view of  InterviewCount){
        console.log(view);
        let div = document.createElement('div')
        div.className = 'flex justify-between shadow-md p-[24px]'
        div.innerHTML = `
        <div>
                <h3 class="mobile text-[#002C5C] text-[26px] font-bold">Mobile First Corp 1</h3>
              <p class="React text-[#64748B]">React Native Developer0</p>
              <p class="Remote text-[#64748B] mt-[20px] mb-[20px]">Remote • Full-time • $130,000 - $175,000</p>
              <p  class=" applicable text-green-500 mt-[20px] mb-[20px] w-[140px] px-[10px] py-[3px] text-[17px] border-2">Not applicable</p>
              <p class="Build text-[#64748B] mt-[20px] mb-[20px]">Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.</p>
              <div>
              <button class="text-green-500 px-[10px] py-[3px] text-[17px] border-2">interview</button>
              <button class="text-red-500 px-[10px] py-[3px] text-[17px] border-2" >Rejected</button>
              </div>
              </div>
               <div class="w-8 h-8 flex justify-center rounded-full border-[#64748B] border-2"><button><i class="fa-solid fa-trash "></i></button></i>
        </div>
        `
        filterSection.appendChild(div)
    }
}