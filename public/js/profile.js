const logOut = document.getElementById('logOut');
const emailname = document.getElementById("span")
const name =document.getElementById("name")
const author =document.querySelector(".author")
const content =document.querySelector(".content")
const des =document.querySelector(".des")
const url =document.querySelector(".url")
const image =document.querySelector(".urlimage")
const title =document.getElementById("title")
const date =document.querySelector(".date")
const input =document.querySelector("input")
const auth = firebase.auth();
const main =document.getElementById("main")
let data =[];


input.addEventListener("keyup",(e)=>{
 const searchstrings =e.target.value.toLowerCase();
 const filtering = data.filter(single=>{
     return(
        single.author.toLowerCase().includes(searchstrings)
        || single.title.toLowerCase().includes(searchstrings)
     )

 })
 auth.onAuthStateChanged(user => {
           
    user ? showOutput(filtering)  : main.innerHTML ="<h4>please login and access news</h4>"


})



})

logOut.addEventListener('click', () => {
    //signOut() is a built in firebase function responsible for signing a user out
    auth.signOut()
    .then(() => {
        window.location.assign('/index.html');
    })
    .catch(error => {
        console.error(error);
    })
})



const loaddatas= async()=>{
    try{
        const urrl="https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=7badd423ba714fd7ac3e54339039ae96";
        const fetchs = await fetch(urrl);
        const  response = await fetchs.json();
        data =response.articles
        console.log(data)

        auth.onAuthStateChanged(user => {
           
            user ? showOutput(data)  : main.innerHTML ="<h4>please login and access news</h4>"
        
        
        })
        
    }catch(err){
        console.log(err)
    }
   

}

auth.onAuthStateChanged(user => {
    !user ? logOut.innerText = "login" :null
   
    emailname.innerText =user.email;

})
   

const showOutput=(res)=>{
    const htmlstring=  res
    .map((res)=>(

    `
    <h4 id="title">Title: <span class="title">${ res.title}</span></h4>
    <h4>Author: <span class="des author">${res.author}</span></h4>
    <h4>Description: <span class="des">${res.description}</span></h4>
    <h4>Content: <span class="des">${res.content} </span></h4>
   <h4>URL: <span class="des">${res.url}</span></h4>
  <h4>Image : <span class="des">${res.urlToImage}</span></h4>
  <h4 id="date">Published date: <span class="date">${res.publishedAt}</span></h4>
  
 
`
    )).join('');
    main.innerHTML =htmlstring;

  }



  loaddatas();
