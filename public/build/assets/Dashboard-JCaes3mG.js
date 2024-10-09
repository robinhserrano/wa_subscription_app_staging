import{_ as ke}from"./AppLayout-Cbo3Hpnv.js";import{d as Ce,s as Z,a as v,b as ee,c as q,e as xe,f as z,g as De,h as Ie,i as $e,j as Fe,k as Ve,l as Oe}from"./primeicons-DUxkHKsn.js";import{y as Ue,d as r,z as Pe,A as Ae,C as te,D as P,E as ae,G as se,o as i,e as m,a as l,g as p,t as d,f as w,b as o,w as c,u as s,F as B,h as L,c as R,Q as je}from"./app-CaNukmwN.js";import{u as H,w as Ee}from"./xlsx-YQvpTstd.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const Ne={class:"card"},Be={class:"m-4 my-4"},Le={key:0},Re=l("i",{class:"pi pi-calendar"},null,-1),Te={key:1},Ge=l("i",{class:"pi pi-map-marker"},null,-1),Me=l("i",{class:"pi pi-user"},null,-1),Qe=l("i",{class:"pi pi-map-marker mt-2"},null,-1),Ke=l("p",{class:"mt-6"}," Order Lines:",-1),qe={key:0},ze=l("p",{class:"mt-6 mb-2"}," Other Address:",-1),He=l("i",{class:"pi pi-building-columns"},null,-1),We=l("p",{class:"mt-6 mb-2"}," Other Address:",-1),Je=l("i",{class:"pi pi-building"},null,-1),Xe=l("p",{class:"mb-2 text-xl font-bold"},"States",-1),Ye=["for"],Ze=l("p",{class:"mt-4 mb-2 text-xl font-bold"},"Category",-1),et=["for"],tt=l("p",{class:"mt-4 mb-2 text-xl font-bold"},"Activity Summary",-1),at=["for"],st=l("p",{class:"mt-4 mb-2 text-xl font-bold"},"Date Range",-1),ot={class:"flex justify-between"},lt=l("i",{class:"pi pi-search"},null,-1),nt=["onClick"],rt={key:1,class:"pi pi-truck ml-2"},it={key:0,class:"flex align-items-center"},dt={key:0},ct={key:1},ut={key:1},mt={class:"flex align-items-center"},vt={__name:"SubsToEnterDataTable",props:{currentUser:Object,filterSubs:Object,filterSubIds:Object,stateIds:Object},setup(_){Ue();let k=_;const x=r([]),D=r(!0),C=r(1),I=r(0),T=r(),G=r(!1),M=r(!1),oe=r(),Q=r([]),K=Pe(),$=r([]),A=r(),W=r(),J=r(),X=r(),le=r([]),ne=r([{id:1,name:"Subscription"}]),re=r([{id:1,name:"Send 1st Stage Filter"},{id:2,name:"Independent 3 + 3 Due for Change"},{id:3,name:"Independent 3 + 3 Expires"},{id:4,name:"3 + 3 Stage Filter"},{id:5,name:"3 Stage Filter"},{id:6,name:"3 + 3 Stage Filter Expires"},{id:7,name:"3 Stage Filter Expires"},{id:8,name:"Final Date to Order Filters for Warranty Extension"}]);r([{name:"Confirm",value:"Confirm"},{name:"Deny",value:"Deny"},{name:"- Unselect -",value:null}]);const b=r([]),j=r(),g=r([]),F=r([]),V=r([]),E=r(100);Ae(()=>{D.value=!1,I.value=k.filterSubs.total,oe.value=k.salesQuotations,$.value=k.stateIds});const ie=t=>{E.value=t.rows,C.value=t.page+1,console.log("page change"),console.log(C.value),O()},de=t=>{T.value=t.target.value,console.log(t.target.value),ce()},O=async()=>{try{console.log("fetch data page"),console.log(C.value);const t=te.get("/dashboard",{page:C.value,search:T.value,dates:b.value,stateId:g.value,activitySummary:F.value,categories:V.value,perPage:E.value},{preserveState:!0,replace:!1,onSuccess:a=>{console.log(a),console.log(a.props.filterSubs.total),I.value=a.props.filterSubs.total}})}catch(t){console.error("Error fetching data:",t)}finally{D.value=!1}},ce=Ce(async()=>{try{console.log("fetch data page"),console.log(C.value);const t=await te.get("/dashboard",{page:C.value,search:T.value,dates:b.value,stateId:g.value,activitySummary:F.value,categories:V.value,perPage:E.value},{preserveState:!0,replace:!1,onSuccess:a=>{console.log(a),console.log(a.props.filterSubs.total),I.value=a.props.filterSubs.total}})}catch(t){console.error("Error fetching data:",t)}finally{D.value=!1}},300),Y=t=>t?new Date(t).toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}):null,ue=t=>{if(!t||t.length===0)return"";const a=new Date(t[0]),u=t[1]?new Date(t[1]):a;return`${a.toLocaleDateString("en-PH",{day:"2-digit",month:"2-digit",year:"numeric"})} to ${u.toLocaleDateString("en-PH",{day:"2-digit",month:"2-digit",year:"numeric"})}`},me=t=>t.map(a=>{var u;return(u=$.value[a-1])==null?void 0:u.code}).join(", "),ve=()=>{initFilters()},pe=t=>{G.value=!0,A.value=t.sales_order_no,W.value=t.order_line,J.value=t.customer_name,X.value=t.address,le.value=t.contact_address,j.value=t},_e=t=>{A.value=t.sales_order_no},fe=async t=>{var a;try{if((a=t.created_on_odoo)!=null&&a.value){console.log(t);const u=await ae.post("/api/createDeliverSub",{filter_sub_id:t.id,created_on_odoo:t.created_on_odoo.value,odoo_created_by_id:k.currentUser.id,due_date:t.due_date.value});K.add({severity:"success",summary:`Moved #${t.sales_order_no} to Confirm Delivery Requirement`,detail:"",life:3e3})}}catch(u){console.error("Failed to update created_on_odoo:",u),u.response.data.error?K.add({severity:"error",summary:u.response.data.error,detail:"",life:3e3}):K.add({severity:"error",summary:"Failed to update created on odoo",detail:"",life:3e3})}};P(A,async t=>{if(t)try{const a=await ae.get("/api/findFilterSubsBySalesOrderNo",{params:{sales_order_no:t}});Q.value=a.data.map(u=>({name:u,value:u})),Q.value.push({name:"- Unselect -",value:null})}catch(a){console.error("Error fetching dropdown options:",a)}}),P(g,async t=>{console.log("changed state, load fetch data 1"),t&&(console.log("changed state, load fetch data 2"),O())}),P(F,async t=>{console.log("changed state, load fetch data 1"),t&&(console.log("changed state, load fetch data 2"),O())}),P(b,async t=>{console.log("changed date, load fetch data 1"),t&&(console.log("changed date, load fetch data 2"),O())}),P(V,async t=>{console.log("changed date, load fetch data 1"),t&&(console.log("changed date, load fetch data 2"),O())});const he=t=>t,ye=t=>{const a={"Invoice Number":"invoice_number","Sales Order":"sales_order_no","Customer Name":"customer_name","Invoice Date":"invoice_date","Payment Status":"payment_status",Address:"address",State:"state_id","Activity Summary":"activity_summary","Phone Number":"phone",Email:"email","Due Date":"due_date","Created on Odoo":"created_on_odoo"},h=x.value.map(f=>{var y;f.state_id=(y=t[f.state_id-1])==null?void 0:y.name;let S={};for(const[Se,we]of Object.entries(a))S[Se]=f[we];return S}).reduce((f,S)=>{const y=S.State;return f[y]||(f[y]=[]),f[y].push(S),f},{}),e=H.book_new();for(const[f,S]of Object.entries(h)){const y=H.json_to_sheet(S);H.book_append_sheet(e,y,f)}const n=Ee(e,{bookType:"xlsx",type:"binary"}),N=new Blob([be(n)],{type:"application/octet-stream"}),ge=URL.createObjectURL(N),U=document.createElement("a");U.href=ge,U.setAttribute("download","subs_to_enter.xlsx"),document.body.appendChild(U),U.click(),document.body.removeChild(U)};function be(t){const a=new ArrayBuffer(t.length),u=new Uint8Array(a);for(let h=0;h<t.length;h++)u[h]=t.charCodeAt(h)&255;return a}return(t,a)=>{const u=se("Toast"),h=se("font-awesome-icon");return i(),m("div",Ne,[l("div",null,[l("div",Be,[b.value.length?(i(),m("div",Le,[Re,p(" "+d(ue(b.value)),1)])):w("",!0),g.value.length?(i(),m("div",Te,[Ge,p(" "+d(me(g.value)),1)])):w("",!0)])]),o(u),o(s(ee),{visible:G.value,"onUpdate:visible":a[0]||(a[0]=e=>G.value=e),header:A.value,class:"!w-full md:!w-80 lg:!w-[30rem]"},{default:c(()=>[l("p",null,[Me,p(" "+d(J.value),1)]),l("p",null,[Qe,p(" "+d(X.value),1)]),Ke,o(s(Z),{value:W.value,dataKey:"id",showGridlines:"",class:"mt-2"},{default:c(()=>[o(s(v),{field:"product",header:"Product",style:{"min-width":"10rem"}}),o(s(v),{field:"description",header:"Description",style:{"min-width":"10rem"}}),o(s(v),{field:"quantity",header:"Quantity",style:{"min-width":"5rem"}})]),_:1},8,["value"]),l("div",null,[j.value.contact_address[0].parent?(i(),m("p",qe,[ze,He,p(" "+d(j.value.contact_address[0].parent.complete_address),1)])):w("",!0)]),l("div",null,[(i(!0),m(B,null,L(j.value.contact_address[0].children,(e,n)=>(i(),m("p",{key:n},[We,Je,p(" "+d(e.complete_address),1)]))),128))])]),_:1},8,["visible","header"]),o(s(ee),{visible:M.value,"onUpdate:visible":a[5]||(a[5]=e=>M.value=e),header:"Filters",position:"right",class:"!w-full md:!w-80 lg:!w-[30rem]"},{default:c(()=>[Xe,(i(!0),m(B,null,L($.value,e=>(i(),m("div",{key:e.id,class:"flex items-center mb-2"},[o(s(q),{modelValue:g.value,"onUpdate:modelValue":a[1]||(a[1]=n=>g.value=n),inputId:e.state_id,name:"stateIds",value:e.state_id},null,8,["modelValue","inputId","value"]),l("label",{for:e.id,class:"ml-2"},d(e.name),9,Ye)]))),128)),Ze,(i(!0),m(B,null,L(ne.value,e=>(i(),m("div",{key:e.id,class:"flex items-center mb-2"},[o(s(q),{modelValue:V.value,"onUpdate:modelValue":a[2]||(a[2]=n=>V.value=n),inputId:e.name,name:"category",value:e.name},null,8,["modelValue","inputId","value"]),l("label",{for:e.id,class:"ml-2"},d(e.name),9,et)]))),128)),tt,(i(!0),m(B,null,L(re.value,e=>(i(),m("div",{key:e.id,class:"flex items-center mb-2"},[o(s(q),{modelValue:F.value,"onUpdate:modelValue":a[3]||(a[3]=n=>F.value=n),inputId:e.name,name:"category",value:e.name},null,8,["modelValue","inputId","value"]),l("label",{for:e.id,class:"ml-2"},d(e.name),9,at)]))),128)),st,o(s(xe),{modelValue:b.value,"onUpdate:modelValue":a[4]||(a[4]=e=>b.value=e),selectionMode:"range",manualInput:!1},null,8,["modelValue"])]),_:1},8,["visible"]),x.value.length?(i(),R(s(z),{key:0,label:"Export as Excel",onClick:a[6]||(a[6]=e=>ye($.value)),class:"ml-4"})):w("",!0),o(s(De),{rows:E.value,totalRecords:I.value,rowsPerPageOptions:[10,25,50,100,I.value].sort((e,n)=>e-n),onPage:ie},{start:c(e=>[p(d(_.filterSubs.from)+"-"+d(_.filterSubs.to)+" / "+d(_.filterSubs.total),1)]),_:1},8,["rows","totalRecords","rowsPerPageOptions"]),o(s(Z),{selection:x.value,"onUpdate:selection":a[9]||(a[9]=e=>x.value=e),value:he(_.filterSubs.data),lazy:"",loading:D.value,tableStyle:"min-width: 50rem",showGridlines:"",dataKey:"id",filterDisplay:"menu"},{header:c(()=>[l("div",ot,[o(s(z),{type:"button",icon:"pi pi-filter-slash",label:"Clear",outlined:"",onClick:a[7]||(a[7]=e=>ve())}),o(s(Ie),null,{default:c(()=>[o(s($e),null,{default:c(()=>[lt]),_:1}),l("div",null,[o(s(z),{onClick:a[8]||(a[8]=e=>M.value=!0),label:"Filter",class:"mr-4"}),o(s(Fe),{placeholder:"Keyword Search",onInput:de})])]),_:1})])]),empty:c(()=>[p(" No filterSubs found. ")]),loading:c(()=>[p(" Loading filterSubs data. Please wait. ")]),default:c(()=>[o(s(v),{selectionMode:"multiple",headerStyle:"width: 3rem"}),o(s(v),{field:"sales_order_no",header:"Sales Order No.",style:{"min-width":"10rem"}},{body:c(({data:e})=>[l("span",{onClick:n=>pe(e),class:"cursor-pointer hover:underline"},d(e.sales_order_no),9,nt),e.category==="Subscription"?(i(),R(h,{key:0,icon:"fa-filter-circle-dollar",class:"ml-2"})):w("",!0),e.delivered_or_delivery_booked&&e.delivered_or_delivery_booked.value!==null?(i(),m("i",rt)):w("",!0)]),_:1}),o(s(v),{field:"",header:"Created on Odoo",style:{"min-width":"10rem"}},{body:c(({data:e})=>[o(s(Ve),{modelValue:e.created_on_odoo,"onUpdate:modelValue":n=>e.created_on_odoo=n,options:Q.value,filter:"",optionLabel:"name",placeholder:"Select Sales Order #",class:"w-full md:w-14rem",onClick:n=>_e(e),onChange:n=>fe(e)},{value:c(n=>{var N;return[n.value?(i(),m("div",it,[e.created_on_odoo&&e.created_on_odoo.value!==null?(i(),m("div",dt,d(((N=e.created_on_odoo)==null?void 0:N.name)||e.created_on_odoo),1)):(i(),m("div",ct,d(n.placeholder),1))])):(i(),m("span",ut,d(n.placeholder),1))]}),option:c(n=>[l("div",mt,[l("div",null,d(n.option.name),1)])]),_:2},1032,["modelValue","onUpdate:modelValue","options","onClick","onChange"])]),_:1}),o(s(v),{field:"customer_name",header:"Customer Name",style:{"min-width":"10rem"},filterField:"customer_name"}),o(s(v),{field:"address",header:"Address",style:{"min-width":"10rem"}}),o(s(v),{field:"activity_summary",header:"Activity Summary",style:{"min-width":"10rem"}}),o(s(v),{field:"due_date",header:"Due Date",style:{"min-width":"10rem"}},{body:c(({data:e})=>[p(d(Y(e.due_date)),1)]),_:1}),o(s(v),{field:"invoice_number",header:"Invoice Number",style:{"min-width":"10rem"}}),o(s(v),{field:"invoice_date",header:"Invoice Date",style:{"min-width":"10rem"}},{body:c(({data:e})=>[p(d(Y(e.invoice_date)),1)]),_:1}),o(s(v),{field:"state_id",header:"State",style:{"min-width":"10rem"}},{body:c(({data:e})=>{var n;return[p(d((n=$.value[e.state_id-1])==null?void 0:n.name),1)]}),_:1}),o(s(v),{field:"phone",header:"Phone",style:{"min-width":"10rem"}}),o(s(v),{field:"email",header:"Email",style:{"min-width":"10rem"}}),o(s(v),{field:"payment_status",header:"Payment Status",style:{"min-width":"10rem"}},{body:c(({data:e})=>[e.payment_status==="paid"?(i(),R(s(Oe),{key:0,severity:"success",value:"Paid"})):w("",!0)]),_:1})]),_:1},8,["selection","value","loading"])])}}},pt={class:"bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg"},gt={__name:"Dashboard",props:{filterSubs:Object,stateIds:Object,activitySummaries:Object,filterSubIds:Object},setup(_){const k=je();return(x,D)=>(i(),R(ke,{title:"Dashboard"},{default:c(()=>[l("div",pt,[o(vt,{filterSubs:_.filterSubs,stateIds:_.stateIds,activitySummaries:_.activitySummaries,filterSubIds:_.filterSubIds,currentUser:s(k).props.auth.user},null,8,["filterSubs","stateIds","activitySummaries","filterSubIds","currentUser"])])]),_:1}))}};export{gt as default};
