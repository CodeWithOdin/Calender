const monthHead= document.body.querySelector(".month-container")
const toLeft=document.querySelector(".lt")
const toRight=document.body.querySelector(".rt")
const month=document.body.querySelector(".month")
const days= document.body.querySelector(".days") 
const monthArray=["Jan","Feb","March","April","May","June","July","August","September","October","November","December"]
const weeks=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
const date=new Date()
const date_day=date.getDate()
let Change_date_day=date.getDate()
const date_month=date.getMonth()// 0 to 11, To make 1 to 12 :1 added//
let Change_date_month=date.getMonth()
const date_year=date.getFullYear()
let Change_date_year=date.getFullYear()
let extraa=false
let whichClick=""

month.querySelector('h1').innerHTML=monthArray[date_month]
month.querySelector('p').innerHTML=`${date_day}/${date_month+1}/${date_year}`
toLeft.addEventListener('click',function(){
    toLeft.classList.toggle('clicked') 
// console.log(toLeft.classList[2]);
    if(toRight.classList[2]==="clicked"){
        toRight.classList.toggle('clicked')        
    }
    dateChangeOnLeftClicked();
})
toRight.addEventListener('click',function(){
    toRight.classList.toggle('clicked') 
    if(toLeft.classList[2]==="clicked"){
        toLeft.classList.toggle('clicked')        
    } 
    dateChangeOnRightClicked()
    
})
update()
function CurrMonthOnLight(childNode){

            if(Number(childNode.textContent)===date_day && Change_date_month===date_month && Change_date_year===date_year){
                childNode.classList.add('selected')         
                console.log("Inside");
            }
            else if(Change_date_month!=date_month || Change_date_year!=date_year){
                console.log("no");
            childNode.classList.remove('selected')         
        
            }// console.log(childNode.textContent); // Do something with the div content
        }

function ElseMonthOnLight(d,whichClick){
    let weekNo=(new Date(Change_date_year,Change_date_month,1)).getDay()
    let currMonthLastDate=(new Date(Change_date_year,Change_date_month+1,0)).getDate()
    let totaldays=days.children.length
    console.log("totaldays----"+totaldays);
    let lastIndex=currMonthLastDate+weekNo+1
    console.log("lastIndex----"+lastIndex);
    let row=totaldays/7
    console.log("row----"+row);
    
    let tominusIndex=lastIndex-(row-1)*7
    console.log("tominusIndex----"+ tominusIndex);
    let i=1

    let childs = document.querySelectorAll(".days > div");
    childs.forEach((child)=>{
        console.log("i---"+i);
            if(i==tominusIndex &&whichClick==="left"){// To tackle: Remove Shading...NB:- Fails when last month has no Previous Days
                console.log("tominus inside");
                child.classList.remove("notSelected")
            
            }
            else if(whichClick==="left"&&i===1){// to Tackle : Last Month has no Previous Days. Results that THis function fails to remove the shading of CORRECT box
                child.classList.remove("notSelected")

            }
        
                    else if(i===(weekNo+(row-1)*7 )&& whichClick==="right"&&weekNo!=0)
                    child.classList.remove("notSelected")
                    else if(weekNo===0&&i===7+(row-1)*7)
                        child.classList.remove("notSelected")

       
            if(i<=(currMonthLastDate+weekNo)&&i>weekNo){
                if(Number(child.textContent)===d){
                console.log("OK---"+child.textContent);
                child.classList.add("notSelected")
                if(whichClick==="left")
                child.nextElementSibling.classList.remove("notSelected")
                else
            child.previousElementSibling.classList.remove("notSelected")

        }
    }
    ++i

    })

    // for (let i = 0; i < days.childNodes.length; i++) {
    //     const childNode = days.childNodes[i];
    //     if (childNode.nodeType === 1 && childNode.tagName.toLowerCase() === "div") {
    //         // console.log(childNode); //childNode.textContent
        //     if(Number(d.textContent)!=date_day){
        //         d.classList.add('notSelected')         
        //         console.log("Inside");
        //     }
        //     else
        //     childNode.classList.remove('notSelected') 

        // }   

}

                ///Function For Date Change
function dateChangeOnLeftClicked(){
    if(Change_date_day!=1){
    Change_date_day--;
    }
        else if(Change_date_month!=0){
            Change_date_month--;
            console.log("month");
            Change_date_day=new Date(Change_date_year,Change_date_month+1,0).getDate();
            updateCurr();
        }
            else{
                Change_date_year--;
                Change_date_month=new Date(Change_date_year,11,1).getMonth()
                console.log("Year");
                Change_date_day=new Date(Change_date_year,Change_date_month+1,0).getDate()
                month.querySelector('h1').innerHTML=monthArray[Change_date_month]
                // console.log("in");
                month.querySelector('p').innerHTML=`${Change_date_day}/${Change_date_month+1}/${Change_date_year}`
                updateCurr()
            }

    ElseMonthOnLight(Change_date_day,"left")
    month.querySelector('h1').innerHTML=monthArray[Change_date_month]
    // console.log("in");
    month.querySelector('p').innerHTML=`${Change_date_day}/${Change_date_month+1}/${Change_date_year}`
  
}


function dateChangeOnRightClicked(){
        Change_date_day++
        // ElseMonthOnLight(Change_date_day)
        // console.log(`${Change_date_month+1}M-${Change_date_day}D`);
    if((Change_date_day>(new Date(Change_date_year,Change_date_month+1,0)).getDate())){
// console.log(Change_date_month+"///");
    Change_date_month=(new Date(Change_date_year,Change_date_month+1,1)).getMonth()
// console.log(Change_date_month+"///");
    Change_date_day=1
    // console.log("in");
    updateCurr()


    if(Change_date_month===0){
        const d=new Date(Change_date_year+1,0,1);
        Change_date_day=d.getDate()
        Change_date_month=d.getMonth()
        Change_date_year=d.getFullYear()
        month.querySelector('h1').innerHTML=monthArray[Change_date_month]
        // console.log("in");
        month.querySelector('p').innerHTML=`${Change_date_day}/${Change_date_month+1}/${Change_date_year}`
        updateCurr()
// month.querySelector('p').innerHTML=`${Change_date_day}/${Change_date_month+1}/${Change_date_year}`
    
    }
    } 
    ElseMonthOnLight(Change_date_day,"right")
    month.querySelector('h1').innerHTML=monthArray[Change_date_month]
    month.querySelector('p').innerHTML=`${Change_date_day}/${Change_date_month+1}/${Change_date_year}`


}


function updateCurr(){
    if(extraa){
        deleteExtra()
        extraa=false
    }
// month.querySelector('p').innerHTML=`${Change_date_day}/${Change_date_month+1}/${Change_date_year}`
console.log("Update");
    let weekNo=(new Date(Change_date_year,Change_date_month,1)).getDay()
    // console.log(Change_date_month);
    let lastMonthDays=(new Date(Change_date_year,Change_date_month,0)).getDate()
    let lastMonthDaysFill=lastMonthDays-weekNo
    let currMonthLastDate=(new Date(Change_date_year,Change_date_month+1,0)).getDate()
    let currMonthLastDay=(new Date(Change_date_year,Change_date_month+1,0)).getDay()
    // console.log("currMonthLastDay: "+currMonthLastDay);
    let i=1
   
    let childs = document.querySelectorAll(".days > div");
    console.log(childs);

    childs.forEach((child) => {
        if(i<=weekNo){
            console.log("Prev--"+ "weekNo:"+weekNo+" i:"+i);
            prevdayFill(child,++lastMonthDaysFill)
        }
        if(i<=(currMonthLastDate+weekNo)&& i>weekNo){
            console.log("curr--"+ "weekNo:"+weekNo+" i:"+i);
            currdayFill(child,i-weekNo)
        }
        if(i>(currMonthLastDate+weekNo)&& i<=(days.children.length)&& i>weekNo){
            // currMonthLastDate+weekNo+(7-(currMonthLastDay+1))--Argument of middle one
            console.log("Next--"+ "weekNo:"+weekNo+" i:"+i);
            nextmonthFill(child,-(currMonthLastDate+weekNo-i))
        }
        ++i; 
        CurrMonthOnLight(child)
          // Do something with the div content
    });

    // console.log("i------"+i);
    // console.log("check------"+(currMonthLastDate+weekNo+(7-(currMonthLastDay+1))));
    // console.log("bool-----"+extraa);
    if((i)<=currMonthLastDate+weekNo+(7-(currMonthLastDay+1))){
        console.log("Inside: "+ i);
        extraa=true
        let diff=(currMonthLastDate+weekNo+(7-(currMonthLastDay+1)))-i+1
        let forNext=(diff-(currMonthLastDay+1))
        let forCurr=diff-forNext
        console.log("diff: "+ diff);
        for(let j=1;j<=forCurr;j++){
            console.log("Inside: "+ (i-weekNo));
            const child=document.createElement('div')            
            currdayFill(child,(i-weekNo))
            days.appendChild(child)
            i++

        }
        for( let j=1;j<=forNext;j++){
            const child=document.createElement('div')
            nextmonthFill(child,-(currMonthLastDate+weekNo-i))
            days.appendChild(child)
            i++
        }
    }

}
function deleteExtra(){
    console.log("Inside---deleteExtra");
    console.log(days.children.length);

// Calculate the total number of columns (assuming 7 columns)
const totalColumns = 7;
extraa=false

// Calculate the total number of rows
const totalRows = days.children.length / totalColumns;
console.log("r---"+ totalRows);

// Calculate the starting Number of the last row
const startIndexLastRow = ((totalRows - 1) * totalColumns)+1;
console.log("startIndexLastRow---"+startIndexLastRow);

// Remove the divs of the last row
const childs = document.querySelectorAll(".days > div");
let i=0

// Loop through the selected <div> elements
childs.forEach((divElement) => {
    i++
    if(i>=startIndexLastRow){
        divElement.remove();      
    }
// Do something with the div content
});


}


function update(){
    // month.querySelector('h1').innerHTML=monthArray[Change_date_month]
// month.querySelector('p').innerHTML=`${Change_date_day}/${Change_date_month+1}/${Change_date_year}`
console.log("Update");
    let weekNo=(new Date(Change_date_year,Change_date_month,1)).getDay()
    let lastMonthDays=(new Date(Change_date_year,Change_date_month,0)).getDate()
    let lastMonthDaysFill=lastMonthDays-weekNo
    let currMonthLastDate=(new Date(Change_date_year,Change_date_month+1,0)).getDate()
    let currMonthLastDay=(new Date(Change_date_year,Change_date_month+1,0)).getDay()
    let i=1
    // daysChild.forEach((ele)=>{

        while(i<=weekNo){
            const child=document.createElement('div')
            prevdayFill(child,++lastMonthDaysFill)
            // CurrMonthOnLight(child)
            days.appendChild(child)
            i++
            // console.log("update Last");
        }
        while(i<=(currMonthLastDate+weekNo)&& i>weekNo){
            const child=document.createElement('div')            
            currdayFill(child,i-weekNo)
            CurrMonthOnLight(child)
            days.appendChild(child)
            i++
            // console.log("Update Curr");
        }
        while(i>(currMonthLastDate+weekNo)&& i<=(currMonthLastDate+weekNo+(7-(currMonthLastDay+1)))){
            const child=document.createElement('div')
            nextmonthFill(child,-(currMonthLastDate+weekNo-i))
            // CurrMonthOnLight(child)
            days.appendChild(child)
            i++
            // console.log("Update Next");
        }
       

    // })
}
function prevdayFill(ele,lastMonthDaysFill){
    ele.textContent=lastMonthDaysFill
    ele.classList.add('notThisMonths')
}
function currdayFill(ele,i){
        ele.textContent=i
        if(ele.classList=="notThisMonths")
            ele.classList.remove('notThisMonths')
}
function nextmonthFill(ele,i){
        ele.textContent=i
        ele.classList.add('notThisMonths')
}