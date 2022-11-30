const APIURL="https://api.github.com/users/";
const main= document.querySelector("#main");
const searchbox=document.querySelector("#search");
const naam=document.querySelector("#user_name");
const photo=document.querySelector("#user_img");
const title=document.querySelector("#user_title");
const repoCount=document.querySelector("#repo_count");
const btn=document.querySelector("#button");
const addd=document.querySelector("#ad");
const web=document.querySelector("#link");
const getuser=async(username)=>{
  try{
    const response=await fetch(APIURL+username);
    const data=await response.json();
    btn.href=data.html_url;
    console.log(data);
    console.log(Object.keys(data)[0]);
    if(Object.keys(data)[0] != 'message'){
    naam.innerHTML=data.name;
    addd.innerHTML=data.location;
    web.innerHTML=data.login;
    photo.setAttribute("src",data.avatar_url)
    title.innerHTML=data.bio;
    repoCount.innerHTML="Repositories "+data.public_repos;
    getRepos(username);
    }else{
      alert("User not found on Github please check Username")
      naam.innerHTML="Github User";
    photo.setAttribute("src","R.png")
    title.innerHTML="Github Bio";
    repoCount.innerHTML="Repositories "+0;
    }
    }
    catch(ex){
      console.error(ex);
      alert("User not found on Github please check Username")
      naam.innerHTML="Github User";
    photo.setAttribute("src","R.png")
    title.innerHTML="Github Bio";
    repoCount.innerHTML="Repositories "+0;
    }
}


const getRepos= async (username)=>{
  const repos=document.querySelector("#list_Repo");
  repos.replaceChildren();
  const response=await fetch(APIURL + username + "/repos");
  const data = await response.json();
  console.log(data);
  data.forEach( (item) => {
    const lielement=document.createElement("li");
    const elem=document.createElement("a");
    elem.classList.add("repo");
    elem.href=item.html_url;
    elem.innerText=item.name;
    elem.target="_blank";
    lielement.appendChild(elem);
    repos.appendChild(lielement);
    
    
  });
}
const formSubmit=()=>{
  const searchbox=document.querySelector("#search");
  if(searchbox.value !="")
  {
    getuser(searchbox.value);
    searchbox.value="";
  }
  return false;
}
searchbox.addEventListener(
  "focusout",
  function()
  {
    formSubmit()
  }
)

/*
{
  <div id="repos">
  <a class="repo" href="#" target="_blank">Repo 1</a>
  <a class="repo" href="#" target="_blank">Repo 2</a>
  <a class="repo" href="#" target="_blank">Repo 3</a>
}
*/