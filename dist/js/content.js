(()=>{"use strict";var n=function(n,t,e,r){return new(e||(e=Promise))((function(o,i){function u(n){try{a(r.next(n))}catch(n){i(n)}}function c(n){try{a(r.throw(n))}catch(n){i(n)}}function a(n){var t;n.done?o(n.value):(t=n.value,t instanceof e?t:new e((function(n){n(t)}))).then(u,c)}a((r=r.apply(n,t||[])).next())}))},t=function(n,t){var e,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(e)throw new TypeError("Generator is already executing.");for(;u;)try{if(e=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!((o=(o=u.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(n,u)}catch(n){i=[6,n],r=0}finally{e=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}};document.addEventListener("DOMContentLoaded",(function(){var n;n={greeting:"setDefaultColor"},new Promise((function(t){chrome.runtime.sendMessage(n)}))}));var e={catchElement:function(e,r){return void 0===r&&(r=function(){}),n(this,void 0,void 0,(function(){return t(this,(function(n){return r(),[2]}))}))},unCatchElement:function(e,r){return void 0===r&&(r=function(){}),n(this,void 0,void 0,(function(){return t(this,(function(n){return r(),[2]}))}))},default:function(n){n("not set")}};chrome.runtime.onMessage.addListener((function(n,t,r){(e[n.greeting||"default"]||e.default)(n,r)}))})();