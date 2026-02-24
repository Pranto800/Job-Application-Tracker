const totalDisplay=document.getElementById('total');
const interviewDisplay=document.getElementById('Interview');
const rejectedDisplay=document.getElementById('Rejected');
const allCardSection=document.getElementById('all-card');
const filterSection=document.getElementById('filtered-section');
const jobCountDisplay=document.getElementById('job-count');

let InterviewList=[];
let RejectedList=[];

function getCardId(card){
return card.querySelector(".mobile").innerText.trim();
}

function updateCounters(){
const totalJobs=allCardSection.children.length;
totalDisplay.innerText=totalJobs;
interviewDisplay.innerText=InterviewList.length;
rejectedDisplay.innerText=RejectedList.length;

if(document.getElementById("all-btn").classList.contains("bg-blue-600")){
jobCountDisplay.innerText=`${totalJobs} jobs`;
}
else if(document.getElementById("Interview-btn").classList.contains("bg-blue-600")){
jobCountDisplay.innerText=`${InterviewList.length} of ${totalJobs} jobs`;
}
else{
jobCountDisplay.innerText=`${RejectedList.length} of ${totalJobs} jobs`;
}
}

function toggleStyle(id){
["all-btn","Interview-btn","Rejected-btn"].forEach(btn=>{
const el=document.getElementById(btn);
el.classList.remove("bg-blue-600","text-white");
el.classList.add("text-[#64748B]","border-gray-200");
});

const active=document.getElementById(id);
active.classList.add("bg-blue-600","text-white");
active.classList.remove("text-[#64748B]","border-gray-200");

if(id==="all-btn"){
allCardSection.classList.remove("hidden");
filterSection.classList.add("hidden");
}

if(id==="Interview-btn"){
allCardSection.classList.add("hidden");
filterSection.classList.remove("hidden");
renderFilteredData(InterviewList,"Interview","green");
}

if(id==="Rejected-btn"){
allCardSection.classList.add("hidden");
filterSection.classList.remove("hidden");
renderFilteredData(RejectedList,"Rejected","red");
}

updateCounters();
}

function updateAllSectionBadge(id,status){
[...allCardSection.children].forEach(card=>{
const title=getCardId(card);
if(title===id){
const badge=card.querySelector(".applicable");

if(status==="Interview"){
badge.innerText="Interview";
badge.className="applicable mt-2 mb-4 w-fit px-3 py-1 text-xs font-bold border-2 border-green-500 bg-green-200 text-green-800 rounded uppercase";
}

if(status==="Rejected"){
badge.innerText="Rejected";
badge.className="applicable mt-2 mb-4 w-fit px-3 py-1 text-xs font-bold border-2 border-red-500 bg-red-200 text-red-800 rounded uppercase";
}

if(status==="None"){
badge.innerText="Not applied";
badge.className="applicable text-green-500 mt-2 mb-4 w-fit px-3 py-1 text-xs font-bold border-2 border-green-100 bg-green-50 rounded uppercase";
}
}
});
}

document.addEventListener("click",function(e){

const interviewBtn=e.target.closest(".interviewButton");
const rejectedBtn=e.target.closest(".RejectedButton");
const deleteBtn=e.target.closest(".deleteBtn");

if(!interviewBtn && !rejectedBtn && !deleteBtn) return;

const card=e.target.closest(".flex.justify-between");
if(!card) return;

const id=getCardId(card);

const job={
id:id,
mobile:card.querySelector(".mobile").innerText,
react:card.querySelector(".React").innerText,
build:card.querySelector(".Build").innerText
};

if(interviewBtn){
RejectedList=RejectedList.filter(x=>x.id!==id);
if(!InterviewList.find(x=>x.id===id)){InterviewList.push(job);}
updateAllSectionBadge(id,"Interview");
refreshTab();
updateCounters();
}

if(rejectedBtn){
InterviewList=InterviewList.filter(x=>x.id!==id);
if(!RejectedList.find(x=>x.id===id)){RejectedList.push(job);}
updateAllSectionBadge(id,"Rejected");
refreshTab();
updateCounters();
}

if(deleteBtn){
if(card.parentElement.id==="all-card"){card.remove();}
InterviewList=InterviewList.filter(x=>x.id!==id);
RejectedList=RejectedList.filter(x=>x.id!==id);
updateAllSectionBadge(id,"None");
refreshTab();
updateCounters();
}

});

function refreshTab(){
if(document.getElementById("Interview-btn").classList.contains("bg-blue-600")){
renderFilteredData(InterviewList,"Interview","green");
}
if(document.getElementById("Rejected-btn").classList.contains("bg-blue-600")){
renderFilteredData(RejectedList,"Rejected","red");
}
}

function renderFilteredData(list,status,color){

filterSection.innerHTML="";

if(list.length===0){
filterSection.innerHTML=`
<div class="flex flex-col items-center justify-center mt-20 pb-10">
<img src="./jobs.png" class="w-24 mb-4 opacity-50">
<h3 class="text-xl font-bold text-gray-700">No ${status} Jobs Available</h3>
<p class="text-gray-500 mt-2">Check back soon for new job opportunities</p>
</div>`;
return;
}

list.forEach(item=>{
const div=document.createElement("div");
div.className="flex justify-between bg-white shadow-md p-6 rounded-xl border border-gray-100";

div.innerHTML=`
<div class="flex-1">
<h3 class="mobile text-[#002C5C] text-[24px] font-bold">${item.mobile}</h3>
<p class="React text-[#64748B] font-medium">${item.react}</p>
<p class="Remote text-[#64748B] mt-2 mb-2 text-sm italic">Remote • Full-time • $130k - $175k</p>
<p class="mt-2 mb-4 w-fit px-3 py-1 text-xs font-bold border-2 rounded uppercase ${color==="green"?"border-green-500 bg-green-200 text-green-800":"border-red-500 bg-red-200 text-red-800"}">${status}</p>
<p class="Build text-[#64748B] text-sm mb-6">${item.build}</p>
<div class="flex gap-3">
<button class="interviewButton px-4 py-1.5 text-sm font-bold border-2 border-green-500 text-green-500 rounded-md uppercase">INTERVIEW</button>
<button class="RejectedButton px-4 py-1.5 text-sm font-bold border-2 border-red-500 text-red-500 rounded-md uppercase">REJECTED</button>
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