// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @grant        none
// ==/UserScript==

let googleInput = document.getElementsByName("q")[0];
let btnK = document.getElementsByName("btnK")[0];
let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["Гобой","Саксофон","Валторна","Фагот","Скрипка","Флейта","Как звучит флейта"],
    "crushdrummers.ru":["Барабанное шоу","Шоу барабанщиков в Москве","Заказать барабанщиков в Москве"]
};
let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
let keywords = sites[site];
let keyword = keywords[getRandom(0,keywords.length)];
let i = 0;

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

if (btnK!=undefined){ // Если мы на главной странице гугла
    document.cookie = "site="+site;
}else{ // Если уже не на главной странице гугла
    site = getCookie("site");
}


if (btnK!=undefined){
    let timerId = setInterval(()=>{
        googleInput.value += keyword[i++];
        if (i==keyword.length){
            clearInterval(timerId);
            document.getElementsByName("btnK")[0].click();
        }
    },500);
}else if (location.hostname == "www.google.com"){
    let links = document.links;
    let flag = true;
    let numPage = document.querySelector(".YyVfkd").innerText;
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf(site) != -1){
            setTimeout(()=>link.click(),2000);
            flag=false;
            break;
        }
    }
    if(numPage=="10") location.href = "https://www.google.com/";
    if(flag) setTimeout(()=>pnnext.click(),2000);
}else{
    if (getRandom(0,100)>=80){
        location.href = "https://www.google.com/";
    }else{
        let links = document.links;
        setInterval(()=>{
            let index = getRandom(0,links.length);
            console.log("Я не умер, я ещё живой! Проверяю ссылку: "+links[index]);
            if(links[index].href.indexOf(location.hostname) != -1){
                links[index].click();
            }
        },5000);
    }
}
