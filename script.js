let body=document.querySelector("body");
let h1=document.querySelectorAll("h1");
let theme=document.getElementById("theme");
theme?.addEventListener("change",(event)=>{
    event.preventDefault();
   
    if(theme.value=="light"){
        body.style.backgroundColor="white";
        h1.forEach((element)=>{
            element.style.color="black";
        })
    }else if(theme.value=="Dark"){
        body.style.backgroundColor="black";
        h1.forEach((element)=>{
            element.style.color="white";
        })
    }
})



let sublitBtn=document.getElementById("submit");

let BaseUrl="https://student-profile-dashboard-default-rtdb.firebaseio.com/students.json";
async function fetchUrl(){
      let res=await fetch(BaseUrl);
      let data=await res.json();
      displayData(data);

  
}
fetchUrl();




sublitBtn.addEventListener("click",(event)=>{
    event.preventDefault();

    let name=document.getElementById("name").value;
    let age=document.getElementById("age").value;
    let email=document.getElementById("email").value;


    let courseValue=document.getElementById("course").value;

    // let radio=document.getElementById("radios");
    let male=document.getElementById("male");
    let female=document.getElementById("female");
    let other=document.getElementById("notToShow");
    let gender="";

    if(male.checked){
        gender=male.name;

    }else if(female.checked){
        gender=male.name;
    }else if(other.checked){
        gender=other.name;
    }else{
        gender="Not selected"
    }


    let Html=document.getElementById("html");
    let css=document.getElementById("css");
    let cloud=document.getElementById("cloud");
    let js=document.getElementById("js");
    let skillSet=[Html,css,cloud,js];
    let skills=skillSet.filter((element)=>{
        if(element.checked){
            return element;
        }
    })

    let profileImg=document.getElementById("profileImg").value;


    let student={
        id:Math.random(),
        name:name,
        age:age,
        email:email,
        course:courseValue,
        gender:  gender,
        skills:skills,
        profileImg:profileImg
    }
    console.log(student);
    fetch(BaseUrl,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(student)
    })

})


function displayData(data){
       
       let table=document.querySelector("table tbody");
       let studentData=Object.entries(data);
       table.innerHTML="";
       console.log(studentData)
       studentData.forEach((student)=>{
        table.innerHTML+=`
         <tr>
                    <td>${student.name}</td>
                    <td>${student.age}</td>
                    <td><${student.email}/td>
                    <td><${student.course}/td>
                    <td><${student.gender}/td>
                    <td>${student.skills}</td>
                    <td>${student.img}</td>

        </tr>
        
        `;
       })


       


}

let searchBtn=document.getElementById("searchBtn");
searchBtn.addEventListener("click",async()=>{
    let searchname=document.getElementById("searchName").value;
    console.log(searchname)
    let res=await fetch(BaseUrl);
      let data=await res.json();
      console.log(data);
       
    
   
})