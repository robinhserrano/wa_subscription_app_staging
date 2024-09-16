import{_ as he}from"./AppLayout-B0Jf4d7V.js";import{d as fe,s as z,a as m,b as G,c as j,e as _e,f as ye,g as K,h as ge,i as be,j as Xe,k as Q,l as Ae}from"./primeicons-COlkmWgN.js";import{d as i,p as Se,q as we,s as H,x as S,y as L,z as W,o as r,e as u,a as n,f as w,g as p,t as d,b as o,w as c,u as a,F as $,h as V,c as F}from"./app-B_9wbmSC.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const Ze={class:"card"},Ce={class:"m-4 my-4"},ke={key:0,class:"pi pi-calendar"},Ie=n("i",{class:"pi pi-user"},null,-1),De=n("i",{class:"pi pi-map-marker mt-2"},null,-1),xe=n("p",{class:"mt-6"}," Order Lines:",-1),$e={key:0},Ve=n("p",{class:"mt-6 mb-2"}," Other Address:",-1),Fe=n("i",{class:"pi pi-building-columns"},null,-1),Oe=n("p",{class:"mt-6 mb-2"}," Other Address:",-1),qe=n("i",{class:"pi pi-building"},null,-1),Ue=n("p",{class:"mb-2 text-xl font-bold"},"States",-1),Ne=["for"],Ee=n("p",{class:"mt-4 mb-2 text-xl font-bold"},"Category",-1),Re=["for"],je=n("p",{class:"mt-4 mb-2 text-xl font-bold"},"Activity Summary",-1),Le=["for"],Pe=n("p",{class:"mt-4 mb-2 text-xl font-bold"},"Date Range",-1),Be={class:"flex justify-between"},Te=n("i",{class:"pi pi-search"},null,-1),Me=["onClick"],ze={key:0,class:"flex align-items-center"},Ge={key:0},Ke={key:1},Qe={key:1},He={class:"flex align-items-center"},We={key:0,class:"flex align-items-center"},Je={key:0},Ye={key:1},et={key:1},tt={class:"flex align-items-center"},lt={__name:"SubsToEnterDataTable",props:{filterSubs:Object,stateIds:Object,filterSubIds:Object},setup(v){let Z=v;const O=i([]);i();const C=i(!0),f=i(1),k=i(0),q=i(),U=i(!1),N=i(!1),J=i(),E=i([]),I=Se(),R=i([]),D=i(),P=i(),B=i(),T=i(),Y=i([]);i();const ee=i([{id:1,name:"Subscription"}]),te=i([{id:1,name:"Send 1st Stage Filter"},{id:2,name:"Independent 3 + 3 Due for Change"},{id:3,name:"Independent 3 + 3 Expires"},{id:4,name:"3 + 3 Stage Filter"},{id:5,name:"3 Stage Filter"},{id:6,name:"3 + 3 Stage Filter Expires"},{id:7,name:"3 Stage Filter Expires"},{id:8,name:"Final Date to Order Filters for Warranty Extension"}]),le=i([{name:"Confirm",value:"Confirm"},{name:"Deny",value:"Deny"},{name:"- Unselect -",value:null}]),h=i([]),x=i(),y=i([]),g=i([]),b=i([]);we(()=>{C.value=!1,k.value=Z.filterSubs.total,J.value=Z.salesQuotations,R.value=Z.stateIds});const ae=t=>{f.value=t.page+1,console.log("page change"),console.log(f.value),X()},oe=t=>{q.value=t.target.value,console.log(t.target.value),se()},X=async()=>{try{console.log("fetch data page"),console.log(f.value);const t=await H.get("/dashboard",{page:f.value,search:q.value,dates:h.value,stateId:y.value,activitySummary:g.value,categories:b.value},{preserveState:!0,replace:!1,onSuccess:l=>{console.log(l),console.log(l.props.filterSubs.total),k.value=l.props.filterSubs.total}})}catch(t){console.error("Error fetching data:",t)}finally{C.value=!1}},se=fe(async()=>{try{console.log("fetch data page"),console.log(f.value);const t=await H.get("/dashboard",{page:f.value,search:q.value,dates:h.value,stateId:y.value,activitySummary:g.value,categories:b.value},{preserveState:!0,replace:!1,onSuccess:l=>{console.log(l),console.log(l.props.filterSubs.total),k.value=l.props.filterSubs.total}})}catch(t){console.error("Error fetching data:",t)}finally{C.value=!1}},300),M=t=>t?new Date(t).toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}):null,ne=t=>{if(!t||t.length===0)return"";const l=new Date(t[0]),_=t[1]?new Date(t[1]):l;return`${l.toLocaleDateString("en-PH",{day:"2-digit",month:"2-digit",year:"numeric"})} to ${_.toLocaleDateString("en-PH",{day:"2-digit",month:"2-digit",year:"numeric"})}`},ie=()=>{initFilters()},de=t=>{U.value=!0,D.value=t.sales_order_no,P.value=t.order_line,B.value=t.customer_name,T.value=t.address,Y.value=t.contact_address,x.value=t},re=t=>{D.value=t.sales_order_no,console.log("Select clicked",event)},ce=async t=>{try{const l=await L.put(`/api/updateCreatedOnOdooInFilterSubs/${t.id}`,{created_on_odoo:t.created_on_odoo.value});console.log("a"),console.log(t),console.log("z"),console.log(l),console.log("handle select change"),I.add({severity:"success",summary:`Moved #${t.sales_order_no} for Confirm Delivery Requirement`,detail:"",life:3e3})}catch(l){console.error("Failed to update created_on_odoo:",l),I.add({severity:"error",summary:"Failed to update",detail:"",life:3e3})}},ue=async t=>{try{const l=await L.put(`/api/updateRequiredDeliveryInFilterSubs/${t.id}`,{required_delivery:t.required_delivery.value});console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZZZZZZZZZZZZZZZZZZZZZ"),console.log(l),console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"),console.log("handle select change"),I.add({severity:"success",summary:"Success",detail:"Message Content",life:3e3})}catch(l){console.error("Failed to update created_on_odoo:",l),I.add({severity:"error",summary:"Failed Message",detail:"Message Content",life:3e3})}};S(D,async t=>{if(t)try{const l=await L.get("/api/findSalesOrdersBySalesOrderNo",{params:{sales_order_no:t}});console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZZZZZZZZZZZZZZZZZZZZZ"),console.log(l),console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"),E.value=l.data.map(_=>({name:_.sales_order_no,value:_.sales_order_no})),E.value.push({name:"- Unselect -",value:null})}catch(l){console.error("Error fetching dropdown options:",l)}}),S(y,async t=>{console.log("changed state, load fetch data 1"),t&&(console.log("changed state, load fetch data 2"),X())}),S(g,async t=>{console.log("changed state, load fetch data 1"),t&&(console.log("changed state, load fetch data 2"),X())}),S(h,async t=>{console.log("changed date, load fetch data 1"),t&&(console.log("changed date, load fetch data 2"),X())}),S(b,async t=>{console.log("changed date, load fetch data 1"),t&&(console.log("changed date, load fetch data 2"),X())});const me=t=>t,ve=t=>0;return(t,l)=>{const _=W("Toast"),pe=W("font-awesome-icon");return r(),u("div",Ze,[n("div",null,[n("div",Ce,[h.value.length?(r(),u("i",ke)):w("",!0),p(" "+d(ne(h.value)),1)])]),o(_),o(a(G),{visible:U.value,"onUpdate:visible":l[0]||(l[0]=e=>U.value=e),header:D.value,class:"!w-full md:!w-80 lg:!w-[30rem]"},{default:c(()=>[n("p",null,[Ie,p(" "+d(B.value),1)]),n("p",null,[De,p(" "+d(T.value),1)]),xe,o(a(z),{value:P.value,dataKey:"id",showGridlines:"",class:"mt-2"},{default:c(()=>[o(a(m),{field:"product",header:"Product",style:{"min-width":"10rem"}}),o(a(m),{field:"description",header:"Description",style:{"min-width":"10rem"}}),o(a(m),{field:"quantity",header:"Quantity",style:{"min-width":"5rem"}})]),_:1},8,["value"]),n("div",null,[x.value.contact_address[0].parent?(r(),u("p",$e,[Ve,Fe,p(" "+d(x.value.contact_address[0].parent.complete_address),1)])):w("",!0)]),n("div",null,[(r(!0),u($,null,V(x.value.contact_address[0].children,(e,s)=>(r(),u("p",{key:s},[Oe,qe,p(" "+d(e.complete_address),1)]))),128))])]),_:1},8,["visible","header"]),o(a(G),{visible:N.value,"onUpdate:visible":l[5]||(l[5]=e=>N.value=e),header:"Filters",position:"right",class:"!w-full md:!w-80 lg:!w-[30rem]"},{default:c(()=>[Ue,(r(!0),u($,null,V(R.value,e=>(r(),u("div",{key:e.id,class:"flex items-center mb-2"},[o(a(j),{modelValue:y.value,"onUpdate:modelValue":l[1]||(l[1]=s=>y.value=s),inputId:e.state_id,name:"stateIds",value:e.state_id},null,8,["modelValue","inputId","value"]),n("label",{for:e.id,class:"ml-2"},d(e.name),9,Ne)]))),128)),Ee,(r(!0),u($,null,V(ee.value,e=>(r(),u("div",{key:e.id,class:"flex items-center mb-2"},[o(a(j),{modelValue:b.value,"onUpdate:modelValue":l[2]||(l[2]=s=>b.value=s),inputId:e.name,name:"category",value:e.name},null,8,["modelValue","inputId","value"]),n("label",{for:e.id,class:"ml-2"},d(e.name),9,Re)]))),128)),je,(r(!0),u($,null,V(te.value,e=>(r(),u("div",{key:e.id,class:"flex items-center mb-2"},[o(a(j),{modelValue:g.value,"onUpdate:modelValue":l[3]||(l[3]=s=>g.value=s),inputId:e.name,name:"category",value:e.name},null,8,["modelValue","inputId","value"]),n("label",{for:e.id,class:"ml-2"},d(e.name),9,Le)]))),128)),Pe,o(a(_e),{modelValue:h.value,"onUpdate:modelValue":l[4]||(l[4]=e=>h.value=e),selectionMode:"range",manualInput:!1},null,8,["modelValue"])]),_:1},8,["visible"]),o(a(ye),{rows:100,totalRecords:k.value,rowsPerPageOptions:[10,25,50,100],onPage:ae},{start:c(e=>[p(d(v.filterSubs.from)+"-"+d(v.filterSubs.to)+" / "+d(v.filterSubs.total-ve(v.filterSubs.data)),1)]),_:1},8,["totalRecords"]),o(a(z),{selection:O.value,"onUpdate:selection":l[8]||(l[8]=e=>O.value=e),value:me(v.filterSubs.data),lazy:"",loading:C.value,tableStyle:"min-width: 50rem",showGridlines:"",dataKey:"id",filterDisplay:"menu"},{header:c(()=>[n("div",Be,[o(a(K),{type:"button",icon:"pi pi-filter-slash",label:"Clear",outlined:"",onClick:l[6]||(l[6]=e=>ie())}),o(a(ge),null,{default:c(()=>[o(a(be),null,{default:c(()=>[Te]),_:1}),n("div",null,[o(a(K),{onClick:l[7]||(l[7]=e=>N.value=!0),label:"Filter",class:"mr-4"}),o(a(Xe),{placeholder:"Keyword Search",onInput:oe})])]),_:1})])]),empty:c(()=>[p(" No filterSubs found. ")]),loading:c(()=>[p(" Loading filterSubs data. Please wait. ")]),default:c(()=>[o(a(m),{selectionMode:"multiple",headerStyle:"width: 3rem"}),o(a(m),{field:"sales_order_no",header:"Sales Order No.",style:{"min-width":"10rem"}},{body:c(({data:e})=>[n("span",{onClick:s=>de(e),class:"cursor-pointer hover:underline"},d(e.sales_order_no),9,Me),e.category==="Subscription"?(r(),F(pe,{key:0,icon:"fa-filter-circle-dollar",class:"ml-2"})):w("",!0)]),_:1}),o(a(m),{field:"",header:"Created on Odoo",style:{"min-width":"10rem"}},{body:c(({data:e})=>[o(a(Q),{modelValue:e.created_on_odoo,"onUpdate:modelValue":s=>e.created_on_odoo=s,options:E.value,filter:"",optionLabel:"name",placeholder:"Select Sales Order #",class:"w-full md:w-14rem",onClick:s=>re(e),onChange:s=>ce(e)},{value:c(s=>{var A;return[s.value?(r(),u("div",ze,[e.created_on_odoo&&e.created_on_odoo.value!==null?(r(),u("div",Ge,d(((A=e.created_on_odoo)==null?void 0:A.name)||e.created_on_odoo),1)):(r(),u("div",Ke,d(s.placeholder),1))])):(r(),u("span",Qe,d(s.placeholder),1))]}),option:c(s=>[n("div",He,[n("div",null,d(s.option.name),1)])]),_:2},1032,["modelValue","onUpdate:modelValue","options","onClick","onChange"])]),_:1}),t.route().current("confirmDeliveryRequirement")?(r(),F(a(m),{key:0,field:"",header:"Require Delivery",style:{"min-width":"10rem"}},{body:c(({data:e})=>[o(a(Q),{modelValue:e.required_delivery,"onUpdate:modelValue":s=>e.required_delivery=s,options:le.value,filter:"",optionLabel:"name",placeholder:"Select Confirmation",class:"w-full md:w-14rem",onChange:s=>ue(e)},{value:c(s=>{var A;return[s.value?(r(),u("div",We,[e.required_delivery&&e.required_delivery.value!==null?(r(),u("div",Je,d(((A=e.required_delivery)==null?void 0:A.name)||e.required_delivery),1)):(r(),u("div",Ye,d(s.placeholder),1))])):(r(),u("span",et,d(s.placeholder),1))]}),option:c(s=>[n("div",tt,[n("div",null,d(s.option.name),1)])]),_:2},1032,["modelValue","onUpdate:modelValue","options","onChange"])]),_:1})):w("",!0),o(a(m),{field:"customer_name",header:"Customer Name",style:{"min-width":"10rem"},filterField:"customer_name"}),o(a(m),{field:"address",header:"Address",style:{"min-width":"10rem"}}),o(a(m),{field:"activity_summary",header:"Activity Summary",style:{"min-width":"10rem"}}),o(a(m),{field:"due_date",header:"Due Date",style:{"min-width":"10rem"}},{body:c(({data:e})=>[p(d(M(e.due_date)),1)]),_:1}),o(a(m),{field:"invoice_number",header:"Invoice Number",style:{"min-width":"10rem"}}),o(a(m),{field:"invoice_date",header:"Invoice Date",style:{"min-width":"10rem"}},{body:c(({data:e})=>[p(d(M(e.invoice_date)),1)]),_:1}),o(a(m),{field:"state_id",header:"State",style:{"min-width":"10rem"}},{body:c(({data:e})=>{var s;return[p(d((s=R.value[e.state_id-1])==null?void 0:s.name),1)]}),_:1}),o(a(m),{field:"phone",header:"Phone",style:{"min-width":"10rem"}}),o(a(m),{field:"email",header:"Email",style:{"min-width":"10rem"}}),o(a(m),{field:"payment_status",header:"Payment Status",style:{"min-width":"10rem"}},{body:c(({data:e})=>[e.payment_status==="paid"?(r(),F(a(Ae),{key:0,severity:"success",value:"Paid"})):w("",!0)]),_:1})]),_:1},8,["selection","value","loading"])])}}},at={class:"bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg"},dt={__name:"Dashboard",props:{filterSubs:Object,stateIds:Object,activitySummaries:Object,filterSubIds:Object},setup(v){return(Z,O)=>(r(),F(he,{title:"Dashboard"},{default:c(()=>[n("div",at,[o(lt,{filterSubs:v.filterSubs,stateIds:v.stateIds,activitySummaries:v.activitySummaries,filterSubIds:v.filterSubIds},null,8,["filterSubs","stateIds","activitySummaries","filterSubIds"])])]),_:1}))}};export{dt as default};