
const grades={S:10,A:9,B:8,C:7,D:6,E:5,F:0};

function addSubject(){
 const d=document.createElement('div');
 d.className='row';
d.innerHTML=`
<input placeholder="Subject">

<select class="grade">
<option>S</option>
<option>A</option>
<option>B</option>
<option>C</option>
<option>D</option>
<option>E</option>
<option>F</option>
</select>

<input class="credit" type="number" step="0.5" placeholder="Credits">

<button onclick="this.parentElement.remove()">
Delete
</button>
`;
 document.getElementById('subjects').appendChild(d);
}

function saveSemester(){
 let sem=document.getElementById('semester').value;
 let gradesEls=document.querySelectorAll('.grade');
 let creditEls=document.querySelectorAll('.credit');
 let tp=0, tc=0, back=0;
 for(let i=0;i<gradesEls.length;i++){
   let g=gradesEls[i].value;
   let c=parseFloat(creditEls[i].value||0);
   tp+=grades[g]*c; tc+=c;
   if(g==='F') back++;
 }
 let sgpa=tc?tp/tc:0;
 let data=JSON.parse(localStorage.getItem('jntuk')||'{}');
 data[sem]={sgpa,credits:tc,back};
 localStorage.setItem('jntuk',JSON.stringify(data));
 render();
 alert('Saved');
}

function render(){
 let data=JSON.parse(localStorage.getItem('jntuk')||'{}');
 let html='<div class="card">';
 let totalPts=0,totalCredits=0,totalBack=0,count=0;
 for(let sem in data){
   let s=data[sem];
   html+=`${sem}: SGPA ${s.sgpa.toFixed(2)} | % ${((s.sgpa-0.5)*10).toFixed(2)} | Backlogs ${s.back}<br>`;
   totalPts+=s.sgpa*s.credits;
   totalCredits+=s.credits;
   totalBack+=s.back;
   count++;
 }
 html+='</div>';
 document.getElementById('sgpaTable').innerHTML=html;

 let cgpa=totalCredits?totalPts/totalCredits:0;
 let cls=cgpa>=7.5?'First Class with Distinction':cgpa>=6.5?'First Class':cgpa>=5.5?'Second Class':'Pass Class';

 document.getElementById('cgpaBox').innerHTML=`<div class="card">
 CGPA: ${cgpa.toFixed(2)}<br>
 Percentage: ${((cgpa-0.5)*10).toFixed(2)}%<br>
 Total Credits: ${totalCredits}<br>
 Total Semesters: ${count}<br>
 Total Backlogs: ${totalBack}<br>
 Class Awarded: ${cls}
 </div>`;
}
render();
