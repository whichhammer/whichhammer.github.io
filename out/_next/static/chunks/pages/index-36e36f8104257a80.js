(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(6790)}])},6790:function(e,s,t){"use strict";t.r(s),t.d(s,{__N_SSG:function(){return p},default:function(){return v}});var a=t(5893),i=t(9008),n=t.n(i),r=t(7294);let l=e=>{let{m:s,idx:t}=e;return(0,a.jsxs)("div",{className:"col-6",children:[(0,a.jsx)("h2",{children:s.name}),(0,a.jsx)("small",{children:s.datasheet.parent_faction_name}),(0,a.jsx)("div",{style:{position:"relative"},children:(0,a.jsx)("img",{src:s.datasheet.image,style:{maxWidth:"100%",maxHeight:"120px"},alt:s.name})}),(0,a.jsx)("p",{children:(0,a.jsxs)("a",{className:"btn btn-link",role:"button",href:s.datasheet.link,target:"_blank",rel:"noreferrer",children:["View details ",(0,a.jsx)("i",{className:"bi bi-box-arrow-up-right"})]})})]},t)};class c{addModel(e){let s=0;switch(this.subject){case"Movement":s=e.m;break;case"Weapons Skill":s=e.ws;break;case"Ballistic Skill":s=e.bs;break;case"Strength":s=e.s;break;case"Toughness":s=e.t;break;case"Wounds":s=e.w;break;case"Attacks":s=e.a;break;case"Leadership":s=e.ld;break;case"Saves":s=e.sv;break;case"Cost":s=e.cost}this.values.push({id:e.id,value:s})}getMin(){switch(this.subject){case"Weapons Skill":case"Ballistic Skill":case"Saves":return 7;default:return 0}}getMax(){switch(this.subject){case"Weapons Skill":case"Ballistic Skill":case"Saves":return 0;default:return null}}getViewData(){let e={subject:this.subject,fullMark:this.calculateFullMark()};return this.values.map(s=>e[s.id]=s.value),e}calculateFullMark(){let e=Math.max(...this.values.map(e=>e.value));switch(this.subject){case"Weapons Skill":case"Ballistic Skill":case"Saves":case"Wounds":case"Attacks":if(e<6)return 6;break;case"Strength":case"Toughness":case"Movement":if(e<8)return 8;break;case"Leadership":if(e<10)return 10;break;case"Cost":if(e<60)return 60}return e}constructor(e){this.values=[],this.subject=e}}class o{init(){this.metrics=[],this.metrics.push(new c("Movement")),this.metrics.push(new c("Weapons Skill")),this.metrics.push(new c("Ballistic Skill")),this.metrics.push(new c("Strength")),this.metrics.push(new c("Toughness")),this.metrics.push(new c("Wounds")),this.metrics.push(new c("Attacks")),this.metrics.push(new c("Leadership")),this.metrics.push(new c("Saves")),this.metrics.push(new c("Cost"))}addModel(e){this.metrics.map(s=>s.addModel(e))}getIndicators(){let e=[];return this.metrics.map(s=>e.push({name:s.subject,min:0,max:s.calculateFullMark()})),console.log(e),e}getModelValues(e){return[e.m,e.ws,e.bs,e.s,e.t,e.w,e.a,e.ld,e.sv,e.cost]}getViewData(){let e=[];return this.metrics.map(s=>e.push()),e}getModels(){return this.models||[]}setModels(e){this.init(),this.models=e,this.models.map(e=>this.addModel(e))}constructor(){this.metrics=[],this.init()}}var h=t(2126);t(7895),t(1925);var d=t(3228);function u(e){let{option:s,style:t,settings:i,loading:n,theme:l}=e,c=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let e;function s(){null==e||e.resize()}return null!==c.current&&(e=(0,d.S1)(c.current,l)),window.addEventListener("resize",s),()=>{null==e||e.dispose(),window.removeEventListener("resize",s)}},[l]),(0,r.useEffect)(()=>{if(null!==c.current){let e=(0,d.JE)(c.current);e.setOption(s,i)}},[s,i,l]),(0,r.useEffect)(()=>{if(null!==c.current){let e=(0,d.JE)(c.current);!0===n?e.showLoading():e.hideLoading()}},[n,l]),(0,a.jsx)("div",{ref:c,style:{width:"100%",height:"100%",...t}})}let m=e=>{let s=new o,t=e.feed,[i,c]=(0,r.useState)([]);i.length>0&&s.setModels(i);let d=[];s.getModels().map((t,a)=>{d.push({value:s.getModelValues(t),name:t.name,itemStyle:{color:e.fillColour[a]},lineStyle:{color:e.strokeColour[a]},label:{show:!0,formatter:function(e){return e.value}}})});let m={color:["#67F9D8","#FFE434","#56A3F1","#FF917C"],legend:{},responsive:!0,maintainAspectRatio:!0,renderer:"svg",radar:[{indicator:s.getIndicators(),radius:120,axisName:{color:"#fff",backgroundColor:"#666",borderRadius:3,padding:[3,5]}}],series:[{type:"radar",emphasis:{lineStyle:{width:4}},data:d}]};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(n(),{children:[(0,a.jsx)("title",{children:"Whichhammer?"}),(0,a.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,a.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,a.jsx)("link",{rel:"icon",href:"/favicon.ico"}),(0,a.jsx)("link",{rel:"stylesheet",href:"https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"})]}),(0,a.jsx)("main",{children:(0,a.jsxs)("div",{className:"container-fluid",children:[(0,a.jsx)("div",{className:"row",children:(0,a.jsx)("div",{className:"col-md-12",children:(0,a.jsxs)("nav",{className:"navbar navbar-expand-lg navbar-light bg-light",children:[(0,a.jsx)("a",{className:"navbar-brand",href:"#",children:"Whichhammer?"}),(0,a.jsx)(h.pY,{id:"basic-typeahead-multiple",labelKey:e=>"".concat(e.datasheet.parent_faction_name," ").concat(e.name),multiple:!0,onChange:e=>{e.length>0&&c(e)},options:t,placeholder:"Choose several models...",selected:i,renderMenuItemChildren:(e,s)=>{let{text:t}=s;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(h.oP,{search:t,children:e.name}),",",(0,a.jsx)("div",{children:(0,a.jsx)("small",{children:e.datasheet.parent_faction_name})})]})},renderToken:(e,s,t)=>{let{onRemove:i}=s;return(0,a.jsx)(h.WU,{onRemove:i,option:e,children:"".concat(e.name)},t)}})]})})}),(0,a.jsx)("div",{className:"row",children:(0,a.jsx)("div",{className:"col-md-12",id:"chartContainer",children:(0,a.jsx)(u,{option:m,style:{margin:"0 auto"}})})}),(0,a.jsx)("div",{className:"row",children:s.getModels().map((e,s)=>(0,a.jsx)(l,{idx:s,m:e},s))})]})})]})};var p=!0,v=m}},function(e){e.O(0,[719,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);