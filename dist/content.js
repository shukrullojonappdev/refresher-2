"use strict";let e,t=!1,n=0,s=!1,l=!1,o=!1,r=!1;const a=chrome.runtime.getURL("assets/n.mp3"),c=new Audio(a);window.onload=e=>{if(!e.target.location.hostname.includes("relay.amazon.")&&!e.target.location.pathname.includes("/loadboard/search"))return;if(!document.getElementById("multi-work-container"))return;const t=document.getElementsByClassName("tab-panel")[0],n=document.getElementsByClassName("search__panel")[0],s=document.getElementsByClassName("css-1oino5a")[0];if(!t){if(!n)return;return n.onclick=()=>{setTimeout((()=>{const e=document.getElementById("popover-2");e&&(e.onclick=e=>{e.target.textContent.includes("Load Board Home")||m()})}),300)},s.onclick=()=>{setTimeout((()=>{m()}),300)},void i()}t.onclick=e=>{"Load Board Home"!==e.target.textContent.trim()&&m()},s.onclick=()=>{setTimeout((()=>{m()}),300)},d()};const d=()=>window.onresize=()=>{t=!1;const e=document.getElementById("refresher-stop"),n=document.getElementById("refresher-start");e&&(e.style.display="none"),n&&(n.style.display="block"),v();const s=document.getElementsByClassName("active")[0];if(!s){const e=document.getElementsByClassName("search__panel")[0];if(!e)return;if(e.onclick=()=>{setTimeout((()=>{const e=document.getElementById("popover-2");e&&(e.onclick=e=>{e.target.textContent.includes("Load Board Home")||m()})}),300)},e.textContent.includes("Load Board Home"))return;if(document.getElementById("control-panel-refresher"))return;return void m()}if("Load Board Home"===s.textContent.trim())return;document.getElementById("control-panel-refresher")||m()},i=()=>window.onresize=()=>{t=!1;const e=document.getElementById("refresher-stop"),n=document.getElementById("refresher-start");e&&(e.style.display="none"),n&&(n.style.display="block"),v();const s=document.getElementsByClassName("active")[0];if(!s){const e=document.getElementsByClassName("search__panel")[0];if(!e)return;if(e.textContent.includes("Load Board Home"))return;if(document.getElementById("control-panel-refresher"))return;return void m()}if(document.getElementsByClassName("tab-panel")[0].onclick=e=>{"Load Board Home"!==e.target.textContent.trim()&&m()},"Load Board Home"===s.textContent.trim())return;document.getElementById("control-panel-refresher")||m()},m=()=>{s=!1,l=!1,o=!1,r=!1;let e=document.getElementById("utility-bar");if(e){const t=document.getElementById("control-panel-refresher");t&&t.remove(),u().then((t=>{const n=t;e.children[0].prepend(n),h(),y(),p(),setTimeout((()=>{const t=e.querySelector(".css-hkr77h");t&&"true"===t.ariaChecked&&t.click()}),300)}))}else{let t=setInterval((()=>{e=document.getElementById("utility-bar"),e&&u().then((n=>{const s=n;e.children[0].prepend(s),h(),y(),p();const l=e.querySelector(".css-hkr77h");l&&"true"===l.ariaChecked&&l.click(),clearInterval(t)}))}),150)}},u=async()=>{const e=document.createElement("div");e.id="control-panel-refresher";const t=chrome.runtime.getURL("assets/onBtn2.png"),n=chrome.runtime.getURL("assets/offBtn.png");return e.innerHTML=`\n    <div class="refresher__params">\n      <div class="refresher-slider">\n        <input type="range" min="600" max="2400" value="300" step="100" class="refresher__slider" id="refresher-range">\n        <p>Value: <span id="refresher-range-value"></span> ms</p>\n      </div>\n      <div class="refresher__params-row">\n        <div class="refresher__params-col">\n          <p class="refresher-sw">\n            <label class="refresher__switch">\n              <input type="checkbox">\n              <span class="refresher__switch-slider round" id="sot"></span>\n            </label>\n            <span>Show at the top</span>\n          </p>\n          <p class="refresher-sw">\n            <label class="refresher__switch">\n              <input type="checkbox">\n              <span class="refresher__switch-slider round" id="eb"></span>\n            </label>\n            <span>Easy book</span>\n          </p>\n        </div>\n        <div class="refresher__params-col">\n          <p class="refresher-sw">\n            <label class="refresher__switch">\n              <input type="checkbox">\n              <span class="refresher__switch-slider round" id="sd"></span>\n            </label>\n            <span>Show details</span>\n          </p>\n          <p class="refresher-sw">\n            <label class="refresher__switch">\n              <input type="checkbox">\n              <span class="refresher__switch-slider round" id="au"></span>\n            </label>\n            <span>Auto book</span>\n          </p>\n        </div>\n      </div>\n    </div>\n    <div class="refresher__action-row">\n      <img class="refresher__action-btn" id="refresher-start" src="${t}" alt="start">\n      <img class="refresher__action-btn" id="refresher-stop" src="${n}" alt="stop">\n    </div>\n  `,e},h=()=>{const n=document.getElementById("refresher-stop"),s=document.getElementById("refresher-start"),l=document.getElementsByClassName("css-q7ppch")[0];t?(n.style.display="block",s.style.display="none"):(n.style.display="none",s.style.display="block"),document.onclick=o=>(document.getElementById("control-panel-refresher")?v():setTimeout((()=>{document.getElementsByClassName("utility-bar")[0]&&m()})),o.target!=l&&o.target!=l.childNodes[0]&&t?(clearInterval(e),t=!1,n.style.display="none",void(s.style.display="block")):o.target.id===s.id?(t=!0,n.style.display="block",s.style.display="none",void f(l)):void 0)},y=()=>{const e=document.getElementById("refresher-range"),t=document.getElementById("refresher-range-value");t.innerHTML=e.value,n=e.value,e.oninput=function(){t.innerHTML=this.value,n=this.value}},p=()=>{const e=document.getElementById("sot"),t=document.getElementById("eb"),n=document.getElementById("sd"),a=document.getElementById("au");e.onclick=()=>{s=!s},t.onclick=()=>{l=!l,v()},n.onclick=()=>{o=!o},a.onclick=()=>{r=!r}},g=e=>{e&&e.click()},f=l=>{let a=!0,d=new Set,i=new Set;const m=document.getElementById("refresher-stop"),u=document.getElementById("refresher-start");t&&(e=setInterval((async()=>{const t=document.getElementsByClassName("load-list")[0];if(!t||0===t.length)return;if(a)return 0===d.size&&(d=B(t),i=new Set),a=!1,void g(l);const n=B(t);if(i=await E(n,d),i.size>0){clearInterval(e),a=!0,d=new Set,s&&N(i,t),o&&v(),r&&(console.log("Auto book"),C()),k(i),m.style.display="none",u.style.display="block";const n=c.play();void 0!==n&&n.then((e=>{console.log("Playback started")})).catch((e=>{console.log(e)}))}else g(l)}),n))},B=e=>{let t=new Set;return e.childNodes.forEach((e=>{const n=e.childNodes[0].id+e.getElementsByClassName("css-11tnikh")[1].textContent;t.add(n)})),t},E=async(e,t)=>{if(!e||!t)return;if(e.size!==t.size)return;let n=new Set;return[...e].forEach((e=>{t.has(e)||n.add(e)})),n},k=async e=>{e&&[...e].forEach((e=>{const t=document.getElementById(e.split(" ")[0]).parentNode;t&&(t.style.backgroundColor="#a3cef0")}))},N=(e,t)=>{e&&t&&0!==t.length&&0!==e.size&&[...e].forEach((e=>{const n=document.getElementById(e.split(" ")[0]).parentNode;n&&t.insertBefore(n,t.childNodes[0])}))},v=()=>{l?b():I()},b=()=>{let e=document.getElementsByClassName("load-list")[0];if(e)e.childNodes.forEach((e=>{const t=_();e.getElementsByClassName("ebBtn")[0]||e.childNodes[0].childNodes[0].appendChild(t)}));else{let t=setInterval((()=>{e=document.getElementsByClassName("load-list")[0],e&&(0!==e.length?(e.childNodes.forEach((e=>{const t=_();e.getElementsByClassName("ebBtn")[0]||e.childNodes[0].childNodes[0].appendChild(t)})),clearInterval(t)):clearInterval(t))}),150)}},I=()=>{const e=document.getElementsByClassName("load-list")[0];e&&0!==e.length&&e.childNodes.forEach((e=>{e.getElementsByClassName("ebBtn")[0]&&e.getElementsByClassName("ebBtn")[0].remove()}))},C=()=>{let e=document.getElementsByClassName("load-list")[0];if(console.log(e),e)console.log(e.childNodes[0].childNodes[0]),e.childNodes[0].childNodes[0].click(),e.childNodes[0].childNodes[0].onclick=()=>{let e=document.getElementsByClassName("wo-book-button")[0];if(e)w(e);else{let t=setInterval((()=>{e=document.getElementsByClassName("wo-book-button")[0],e&&(w(e),clearInterval(t))}))}};else{let t=setInterval((()=>{e=document.getElementsByClassName("load-list")[0],e&&(0!==e.length?(console.log(e.childNodes[0].childNodes[0]),e.childNodes[0].childNodes[0].click(),e.childNodes[0].childNodes[0].onclick=()=>{let e=document.getElementsByClassName("wo-book-button")[0];if(e)w(e);else{let t=setInterval((()=>{e=document.getElementsByClassName("wo-book-button")[0],e&&(w(e),clearInterval(t))}))}},clearInterval(t)):clearInterval(t))}),150)}},_=()=>{const e=document.createElement("button");return e.textContent="EasyBook",e.classList.add("ebBtn"),e.onclick=()=>{let e=document.getElementsByClassName("wo-book-button")[0];if(e)w(e);else{let t=setInterval((()=>{e=document.getElementsByClassName("wo-book-button")[0],e&&(w(e),clearInterval(t))}),150)}},e},w=e=>{e.click(),e.onclick=()=>{let e=document.getElementsByClassName("css-n0loux")[0];if(e)e.click();else{let t=setInterval((()=>{e=document.getElementsByClassName("css-n0loux")[0],e&&(e.click(),clearInterval(t))}),150)}}};
