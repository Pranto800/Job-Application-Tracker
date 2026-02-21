
let total =document.getElementById('total')
let Interview =document.getElementById('Interview')
let Rejected =document.getElementById('Rejected')
let InterviewCount =[];
let RejectedCount =[];
let cards = document.getElementById('all-card')
const allBtnStyle = document.getElementById('all-btn')
const thrivingBtnStyle = document.getElementById('Interview-btn')
const RejectedBtnStyle = document.getElementById('Rejected-btn')
InterviewCount.push({name :'pranto'})
RejectedCount.push({name :'pranto'})
InterviewCount.push({name :'pranto'})
RejectedCount.push({name :'pranto'})
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
}
 numberCount ()