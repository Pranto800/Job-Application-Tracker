let currentTab="all";
const tabActive=['bg-blue-500','border-blue','text-white'];
const tabInActive=['bg-transparent','border-gray-200','text-gray-600'];

const allContainer=document.getElementById('all-container');
const interviewContainer=document.getElementById('interview-container');
const rejectedContainer=document.getElementById('rejected-container');

const emptyState=document.getElementById('empty-state');

const jobCount=document.getElementById('job-count');

const totalCount=document.getElementById('total');
const interviewCount=document.getElementById('Interview');
const rejectedCount=document.getElementById('Rejected');

function switchTab(tab){
currentTab=tab;
const tabs=["all","interview","rejected"];
for(const t of tabs){
const tabName=document.getElementById("tab-"+t);
if(t===tab){
tabName.classList.remove(...tabInActive);
tabName.classList.add(...tabActive);
}else{
    tabName.classList.add(...tabInActive);
     tabName.classList.remove(...tabActive);
}
}

allContainer.classList.add('hidden');
interviewContainer.classList.add('hidden');
rejectedContainer.classList.add('hidden');

emptyState.classList.add('hidden');

if(tab==="all"){
allContainer.classList.remove('hidden');
if(allContainer.children.length<1){emptyState.classList.remove('hidden');}
   }
else if(tab==="interview"){
interviewContainer.classList.remove('hidden');
if  (interviewContainer.children.length<1){emptyState.classList.remove('hidden');}
}
else{
  rejectedContainer.classList.remove('hidden');
if(rejectedContainer.children.length<1){emptyState.classList.remove('hidden');}
}

updateStat();
}
 
function getId(card){
return card.querySelector('.mobile').innerText.trim();
 }

function findOriginal(id){
return   [...allContainer.children].find(c=>getId(c)===id);
}

function findCard(container,id){
return [...container.children].find(c=>getId(c)===id);
}


function setInterviewStyle(card){
const s=card.querySelector('.applicable');
s.innerText="Interview";
  s.classList.remove('bg-red-50','border-red-100','text-red-500');
s.classList.add('bg-green-50','border-green-100','text-green-500');
}

function setRejectedStyle(card){
const s=card.querySelector('.applicable');
s.innerText="Rejected";
s.classList.remove('bg-green-50','border-green-100','text-green-500');
s.classList.add('bg-red-50','border-red-100','text-red-500');
}

document.getElementById('job-container').addEventListener('click',function(event){

const clicked=event.target;

  const card=clicked.closest('.logo');
if(!card)return;

const id=getId(card);
const original=findOriginal(id);

if(clicked.classList.contains('interviewButton')){

setInterviewStyle(original);

const rejectedCard=findCard(rejectedContainer,id);
if(rejectedCard)rejectedCard.remove();

if(!findCard(interviewContainer,id)){
const clone=original.cloneNode(true);
setInterviewStyle(clone);
interviewContainer.appendChild(clone);
 }

updateStat();
}



if(clicked.classList.contains('RejectedButton')){

setRejectedStyle(original);

const interviewCard=findCard(interviewContainer,id);
if(interviewCard)interviewCard.remove();

if(!findCard(rejectedContainer,id)){
const clone=original.cloneNode(true);
setRejectedStyle(clone);
rejectedContainer.appendChild(clone);
}

updateStat();
  }

if(clicked.classList.contains('deleteButton')){
card.remove();
updateStat();
}

});

function updateStat(){

const counts={
    all:allContainer.children.length,
   interview:interviewContainer.children.length,
   rejected:rejectedContainer.children.length
};

   totalCount.innerText=counts.all;
   interviewCount.innerText=counts.interview;
   rejectedCount.innerText=counts.rejected;
   jobCount.innerText=counts[currentTab];

if(counts[currentTab]<1){
   emptyState.classList.remove('hidden');
}else{
   emptyState.classList.add('hidden');
}

}

updateStat();
switchTab(currentTab);