
##  Questions and this Answers

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Ans:- 
getElementById:- এটি ব্যবহার করা হয় id দিয়ে element select করার জন্য।
getElementByld:-  এটি ব্যবহার করা হয় id দিয়ে element select করার জন্য ।
getElementsByClassName:- এটি  class name দিয়ে element select করে ।
querySelector:- CSS selector ব্যবহার করে শুধু মাএ প্রথম element select করে।
querySelectorAll:- CSS selector ব্যবহার করে সব matching elements select করে।

### 2. How do you create and insert a new element into the DOM?
Ans:-
 document.createElement() ব্যবহার করে নতুন Element তৈরি করে , তারপর innerText বা innerHTML দিয়ে content যোগ করা হয়, এবং শেষে appendChild() বা append() দিয়ে parent element-এর ভিতরে যোগ করা হয় ।
### 3. What is Event Bubbling? And how does it work?
Ans:-
আমরা যখন কোন এক জায়গায় ক্লিক করি তখন ওই ক্লিক করার স্থান টা বের করার জন্য ব্রাউজার যেভাবে parent থেকে খুঁজতে খুঁজতে একে বারে শেষ child এ চলে যায় তাকে এই Event Bubbling বলে । 
### 4. What is Event Delegation in JavaScript? Why is it useful?
Ans:-
Event Delegation হলো parent element-এ event listener যোগ করে তার child element-গুলোর event handle করার পদ্ধতি।
কেনো এটি useful:
১/কম event listener ব্যবহার করতে হয়
২/performance ভালো হয়।
৩/নতুন যোগ করা child element-এর event-ও সহজে handle করা যায়
### 5. What is the difference between preventDefault() and stopPropagation() methods?
Ans:-
preventDefault() = default action বন্ধ করে ।
stopPropagation() = parent-এ event যাওয়া বন্ধ করে।
