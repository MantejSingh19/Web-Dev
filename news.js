const apikey="a65531e77b934ba9b7bf888a15146ce5";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener("load",()=>fetchnews("India"));

async function fetchnews(query){
const res= await fetch(`${url}${query}&apiKey=${apikey}`);
const data=await res.json();
binddata(data.articles)
}
function binddata(articles){
    const cardscontainer=document.getElementById("cards-container");
    const newscardtemp=document.getElementById("template-news")
    cardscontainer.innerHTML='';

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardclone=newscardtemp.content.cloneNode(true);
        fillcard(cardclone,article);
        cardscontainer.appendChild(cardclone);
    })
}
function fillcard(cardclone,article){
const newsimg=cardclone.querySelector('#news-img')
const newstitle=cardclone.querySelector('#news-title')
const newsdesc=cardclone.querySelector('#news-desc')

newsimg.src=article.urlToImage
newstitle.innerHTML=article.title;
newsdesc.innerHTML=article.description;


const date=new Date(article.publishedAt).toLocaleString("en-US",{timeZone: "Asia/jakarta"
})
cardclone.firstElementChild.addEventListener('click',()=>{
    window.open(article.url,"_blank");
})



}
const currselect=null;
function onnav(id){
    
    fetchnews(id);
    const navitem=document.getElementById(id);
    currselect.classList.remove('active');
    currselect=navitem;
    currselect.classList.add('active');

}
const searchbutton=document.getElementById('searchbutton');
const searchtext=document.getElementById('newsinput');
searchbutton.addEventListener('click',()=>{
    const query =searchtext.value;
    if(!query) return;
    fetchnews(query);
    currselect.classList.remove('active');
    currselect=null;
})
function reload(){
    window.location.reload();
}