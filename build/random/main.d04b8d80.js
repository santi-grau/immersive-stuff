parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"WdKE":[function(require,module,exports) {
var a=["😀","😃","😄","😁","😆","😅","😂","🤣","🥲","😊","😇","🙂","🙃","😉","😌","😍","🥰","😘","😗","😙","😚","😋","😛","😝","😜","🤪","🤨","🧐","🤓","😎","🥸","🤩","🥳","😏","😒","😞","😔","😟","😕","🙁","☹️","😣","😖","😫","😩","🥺","😢","😭","😤","😠","😡","🤬","🤯","😳","🥵","🥶","😱","😨","😰","😥","😓","🤗","🤔","🤭","🤫","🤥","😶","😐","😑","😬","🙄","😯","😦","😧","😮","😲","🥱","😴","🤤","😪","😵","🤐","🥴","🤢","🤮","🤧","😷","🤒","🤕","🤑","🤠","😈","👿","👹","👺","🤡","💩","👻","💀","👽","🤖","🎃","😺","😸","😹","😻","😼","😽","🙀","😿","😾"],t=["Hey","Hi","Yoooo","Yo","Hello","What's up!!","Where are you?","LOL","What means null?"],e=["drummel","camilabianchi","niki","dsasson","samhay","pu22l3","santi","helen","brittany","matt","mattaniah","samantha-alexaa","joy","kazu","aysedemir","victoire","michael","stepha","dantasse","marcschoeder"],o=1e3,n=1e3,r=Object.values(document.querySelectorAll(".chat")),h=function n(){Object.values(document.querySelectorAll(".chat")).forEach(function(o){for(var n="",r="",h=t[Math.floor(Math.random()*t.length)],i=0;i<Math.floor(20*Math.random());i++)r+="!";var l=e[Math.floor(Math.random()*e.length)];Math.random()>.4&&(n=a[Math.floor(Math.random()*a.length)]);var d=document.createElement("div");d.classList.add("line");var m="<b>"+l+"</b> says : "+h;Math.random()>.6&&(m+=r),m+=" "+n+" <br>",d.innerHTML=m,o.appendChild(d),o.childNodes.length>16&&o.removeChild(o.childNodes[0])}),o=1e3*Math.random(),setTimeout(function(){n()},o)},i=function(a){a.style.opacity=Math.floor(2*Math.random());var t=Math.random()*(window.innerWidth-a.offsetWidth)+"px",e=Math.random()*(window.innerHeight-a.offsetHeight)+"px";a.style.transform="translate3d("+t+","+e+",0 )",a.style.width=200+400*Math.random()+"px",a.style.height=300+300*Math.random()+"px"},l=function a(){r.forEach(function(a){Math.random()>.8&&i(a)}),n=1e3*Math.random(),setTimeout(function(){a()},n)};r.forEach(function(a){return i(a)}),h(),l();
},{}]},{},["WdKE"], null)