import{_ as fe}from"./AppLayout-BH2OlQO2.js";import{d as he,s as H,a as v,b as W,c as B,e as ye,f as ge,g as J,h as be,i as Se,j as we,k as X}from"./primeicons-vP8qoV1O.js";import{s as Ce}from"./index-4ZwMye5W.js";import{E as ke,d as i,x as Ie,y as De,z as Y,A as D,C as T,D as Z,o as c,e as m,a as n,f as x,g as f,t as d,b as o,w as u,u as l,F as O,h as q,c as E,Q as xe}from"./app-BsMbtupP.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const $e={class:"card"},Fe={class:"m-4 my-4"},Ve={key:0,class:"pi pi-calendar"},Ue=n("i",{class:"pi pi-user"},null,-1),Oe=n("i",{class:"pi pi-map-marker mt-2"},null,-1),qe=n("p",{class:"mt-6"}," Order Lines:",-1),Ee={key:0},Ne=n("p",{class:"mt-6 mb-2"}," Other Address:",-1),je=n("i",{class:"pi pi-building-columns"},null,-1),Ae=n("p",{class:"mt-6 mb-2"}," Other Address:",-1),Re=n("i",{class:"pi pi-building"},null,-1),Le=n("p",{class:"mb-2 text-xl font-bold"},"States",-1),Pe=["for"],Be=n("p",{class:"mt-4 mb-2 text-xl font-bold"},"Category",-1),Te=["for"],Me=n("p",{class:"mt-4 mb-2 text-xl font-bold"},"Activity Summary",-1),Qe=["for"],Ge=n("p",{class:"mt-4 mb-2 text-xl font-bold"},"Date Range",-1),Ke={class:"flex justify-between"},ze=n("i",{class:"pi pi-search"},null,-1),He=["onClick"],We={key:0,class:"flex align-items-center"},Je={key:0},Xe={key:1},Ye={key:1},Ze={class:"flex align-items-center"},et={key:0,class:"flex align-items-center"},tt={key:0},at={key:1},lt={key:1},ot={class:"flex align-items-center"},st={__name:"SubsToEnterDataTable",props:{filterSubs:Object,stateIds:Object,filterSubIds:Object,currentUser:Object},setup(p){ke();let h=p;const N=i([]),b=i(!0),g=i(1),$=i(0),j=i(),A=i(!1),R=i(!1),ee=i(),L=i([]),F=Ie(),P=i([]),V=i(),M=i(),Q=i(),G=i(),te=i([]),ae=i([{id:1,name:"Subscription"}]),le=i([{id:1,name:"Send 1st Stage Filter"},{id:2,name:"Independent 3 + 3 Due for Change"},{id:3,name:"Independent 3 + 3 Expires"},{id:4,name:"3 + 3 Stage Filter"},{id:5,name:"3 Stage Filter"},{id:6,name:"3 + 3 Stage Filter Expires"},{id:7,name:"3 Stage Filter Expires"},{id:8,name:"Final Date to Order Filters for Warranty Extension"}]),oe=i([{name:"Confirm",value:"Confirm"},{name:"Deny",value:"Deny"},{name:"- Unselect -",value:null}]),y=i([]),U=i(),S=i([]),w=i([]),C=i([]);De(()=>{b.value=!1,$.value=h.filterSubs.total,ee.value=h.salesQuotations,P.value=h.stateIds});const se=t=>{g.value=t.page+1,console.log("page change"),console.log(g.value),k()},ne=t=>{j.value=t.target.value,console.log(t.target.value),ie()},k=async()=>{try{console.log("fetch data page"),console.log(g.value);const t=Y.get("/dashboard",{page:g.value,search:j.value,dates:y.value,stateId:S.value,activitySummary:w.value,categories:C.value},{preserveState:!0,replace:!1,onSuccess:a=>{console.log(a),console.log(a.props.filterSubs.total),$.value=a.props.filterSubs.total}})}catch(t){console.error("Error fetching data:",t)}finally{b.value=!1}},ie=he(async()=>{try{console.log("fetch data page"),console.log(g.value);const t=await Y.get("/dashboard",{page:g.value,search:j.value,dates:y.value,stateId:S.value,activitySummary:w.value,categories:C.value},{preserveState:!0,replace:!1,onSuccess:a=>{console.log(a),console.log(a.props.filterSubs.total),$.value=a.props.filterSubs.total}})}catch(t){console.error("Error fetching data:",t)}finally{b.value=!1}},300),K=t=>t?new Date(t).toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}):null,de=t=>{if(!t||t.length===0)return"";const a=new Date(t[0]),_=t[1]?new Date(t[1]):a;return`${a.toLocaleDateString("en-PH",{day:"2-digit",month:"2-digit",year:"numeric"})} to ${_.toLocaleDateString("en-PH",{day:"2-digit",month:"2-digit",year:"numeric"})}`},re=()=>{initFilters()},ce=t=>{A.value=!0,V.value=t.sales_order_no,M.value=t.order_line,Q.value=t.customer_name,G.value=t.address,te.value=t.contact_address,U.value=t},ue=t=>{V.value=t.sales_order_no},me=async t=>{var a;try{if((a=t.created_on_odoo)!=null&&a.value){const _=await T.put(`/api/updateCreatedOnOdooInFilterSubs/${t.id}`,{created_on_odoo:t.created_on_odoo.value,odoo_created_by_id:h.currentUser.id});F.add({severity:"success",summary:`Moved #${t.sales_order_no} to Confirm Delivery Requirement`,detail:"",life:3e3})}}catch(_){console.error("Failed to update created_on_odoo:",_),F.add({severity:"error",summary:"Failed to update",detail:"",life:3e3})}},ve=async t=>{try{const a=await T.put(`/api/updateRequiredDeliveryInFilterSubs/${t.id}`,{required_delivery:t.required_delivery.value,required_delivery_updated_by_id:h.currentUser.id});F.add({severity:"success",summary:"Success",detail:"Message Content",life:3e3})}catch(a){r,console.error("Failed to update created_on_odoo:",a),F.add({severity:"error",summary:"Failed Message",detail:"Message Content",life:3e3})}};D(V,async t=>{if(t)try{const a=await T.get("/api/findFilterSubsBySalesOrderNo",{params:{sales_order_no:t}});L.value=a.data.map(_=>({name:_,value:_})),L.value.push({name:"- Unselect -",value:null})}catch(a){console.error("Error fetching dropdown options:",a)}}),D(S,async t=>{console.log("changed state, load fetch data 1"),t&&(console.log("changed state, load fetch data 2"),k())}),D(w,async t=>{console.log("changed state, load fetch data 1"),t&&(console.log("changed state, load fetch data 2"),k())}),D(y,async t=>{console.log("changed date, load fetch data 1"),t&&(console.log("changed date, load fetch data 2"),k())}),D(C,async t=>{console.log("changed date, load fetch data 1"),t&&(console.log("changed date, load fetch data 2"),k())});const pe=t=>t.filter(a=>{var _;return a.created_on_odoo===null||((_=a.created_on_odoo)==null?void 0:_.value)===null}),z=t=>t.filter(a=>a.created_on_odoo!==null&&a.created_on_odoo!==void 0).length;return(t,a)=>{const _=Z("Toast"),_e=Z("font-awesome-icon");return c(),m("div",$e,[n("div",null,[n("div",Fe,[y.value.length?(c(),m("i",Ve)):x("",!0),f(" "+d(de(y.value)),1)])]),o(_),o(l(W),{visible:A.value,"onUpdate:visible":a[0]||(a[0]=e=>A.value=e),header:V.value,class:"!w-full md:!w-80 lg:!w-[30rem]"},{default:u(()=>[n("p",null,[Ue,f(" "+d(Q.value),1)]),n("p",null,[Oe,f(" "+d(G.value),1)]),qe,o(l(H),{value:M.value,dataKey:"id",showGridlines:"",class:"mt-2"},{default:u(()=>[o(l(v),{field:"product",header:"Product",style:{"min-width":"10rem"}}),o(l(v),{field:"description",header:"Description",style:{"min-width":"10rem"}}),o(l(v),{field:"quantity",header:"Quantity",style:{"min-width":"5rem"}})]),_:1},8,["value"]),n("div",null,[U.value.contact_address[0].parent?(c(),m("p",Ee,[Ne,je,f(" "+d(U.value.contact_address[0].parent.complete_address),1)])):x("",!0)]),n("div",null,[(c(!0),m(O,null,q(U.value.contact_address[0].children,(e,s)=>(c(),m("p",{key:s},[Ae,Re,f(" "+d(e.complete_address),1)]))),128))])]),_:1},8,["visible","header"]),o(l(W),{visible:R.value,"onUpdate:visible":a[5]||(a[5]=e=>R.value=e),header:"Filters",position:"right",class:"!w-full md:!w-80 lg:!w-[30rem]"},{default:u(()=>[Le,(c(!0),m(O,null,q(P.value,e=>(c(),m("div",{key:e.id,class:"flex items-center mb-2"},[o(l(B),{modelValue:S.value,"onUpdate:modelValue":a[1]||(a[1]=s=>S.value=s),inputId:e.state_id,name:"stateIds",value:e.state_id},null,8,["modelValue","inputId","value"]),n("label",{for:e.id,class:"ml-2"},d(e.name),9,Pe)]))),128)),Be,(c(!0),m(O,null,q(ae.value,e=>(c(),m("div",{key:e.id,class:"flex items-center mb-2"},[o(l(B),{modelValue:C.value,"onUpdate:modelValue":a[2]||(a[2]=s=>C.value=s),inputId:e.name,name:"category",value:e.name},null,8,["modelValue","inputId","value"]),n("label",{for:e.id,class:"ml-2"},d(e.name),9,Te)]))),128)),Me,(c(!0),m(O,null,q(le.value,e=>(c(),m("div",{key:e.id,class:"flex items-center mb-2"},[o(l(B),{modelValue:w.value,"onUpdate:modelValue":a[3]||(a[3]=s=>w.value=s),inputId:e.name,name:"category",value:e.name},null,8,["modelValue","inputId","value"]),n("label",{for:e.id,class:"ml-2"},d(e.name),9,Qe)]))),128)),Ge,o(l(ye),{modelValue:y.value,"onUpdate:modelValue":a[4]||(a[4]=e=>y.value=e),selectionMode:"range",manualInput:!1},null,8,["modelValue"])]),_:1},8,["visible"]),o(l(ge),{rows:100,totalRecords:$.value,rowsPerPageOptions:[10,25,50,100],onPage:se},{start:u(e=>[f(d(p.filterSubs.from)+"-"+d(p.filterSubs.to-z(p.filterSubs.data))+" / "+d(p.filterSubs.total-z(p.filterSubs.data)),1)]),_:1},8,["totalRecords"]),o(l(H),{selection:N.value,"onUpdate:selection":a[8]||(a[8]=e=>N.value=e),value:pe(p.filterSubs.data),lazy:"",loading:b.value,tableStyle:"min-width: 50rem",showGridlines:"",dataKey:"id",filterDisplay:"menu"},{header:u(()=>[n("div",Ke,[o(l(J),{type:"button",icon:"pi pi-filter-slash",label:"Clear",outlined:"",onClick:a[6]||(a[6]=e=>re())}),o(l(be),null,{default:u(()=>[o(l(Se),null,{default:u(()=>[ze]),_:1}),n("div",null,[o(l(J),{onClick:a[7]||(a[7]=e=>R.value=!0),label:"Filter",class:"mr-4"}),o(l(we),{placeholder:"Keyword Search",onInput:ne})])]),_:1})])]),empty:u(()=>[f(" No filterSubs found. ")]),loading:u(()=>[f(" Loading filterSubs data. Please wait. ")]),default:u(()=>[o(l(v),{selectionMode:"multiple",headerStyle:"width: 3rem"}),o(l(v),{field:"sales_order_no",header:"Sales Order No.",style:{"min-width":"10rem"}},{body:u(({data:e})=>[n("span",{onClick:s=>ce(e),class:"cursor-pointer hover:underline"},d(e.sales_order_no),9,He),e.category==="Subscription"?(c(),E(_e,{key:0,icon:"fa-filter-circle-dollar",class:"ml-2"})):x("",!0)]),_:1}),o(l(v),{field:"",header:"Created on Odoo",style:{"min-width":"10rem"}},{body:u(({data:e})=>[o(l(X),{modelValue:e.created_on_odoo,"onUpdate:modelValue":s=>e.created_on_odoo=s,options:L.value,filter:"",optionLabel:"name",placeholder:"Select Sales Order #",class:"w-full md:w-14rem",onClick:s=>ue(e),onChange:s=>me(e)},{value:u(s=>{var I;return[s.value?(c(),m("div",We,[e.created_on_odoo&&e.created_on_odoo.value!==null?(c(),m("div",Je,d(((I=e.created_on_odoo)==null?void 0:I.name)||e.created_on_odoo),1)):(c(),m("div",Xe,d(s.placeholder),1))])):(c(),m("span",Ye,d(s.placeholder),1))]}),option:u(s=>[n("div",Ze,[n("div",null,d(s.option.name),1)])]),_:2},1032,["modelValue","onUpdate:modelValue","options","onClick","onChange"])]),_:1}),t.route().current("confirmDeliveryRequirement")?(c(),E(l(v),{key:0,field:"",header:"Require Delivery",style:{"min-width":"10rem"}},{body:u(({data:e})=>[o(l(X),{modelValue:e.required_delivery,"onUpdate:modelValue":s=>e.required_delivery=s,options:oe.value,filter:"",optionLabel:"name",placeholder:"Select Confirmation",class:"w-full md:w-14rem",onChange:s=>ve(e)},{value:u(s=>{var I;return[s.value?(c(),m("div",et,[e.required_delivery&&e.required_delivery.value!==null?(c(),m("div",tt,d(((I=e.required_delivery)==null?void 0:I.name)||e.required_delivery),1)):(c(),m("div",at,d(s.placeholder),1))])):(c(),m("span",lt,d(s.placeholder),1))]}),option:u(s=>[n("div",ot,[n("div",null,d(s.option.name),1)])]),_:2},1032,["modelValue","onUpdate:modelValue","options","onChange"])]),_:1})):x("",!0),o(l(v),{field:"customer_name",header:"Customer Name",style:{"min-width":"10rem"},filterField:"customer_name"}),o(l(v),{field:"address",header:"Address",style:{"min-width":"10rem"}}),o(l(v),{field:"activity_summary",header:"Activity Summary",style:{"min-width":"10rem"}}),o(l(v),{field:"due_date",header:"Due Date",style:{"min-width":"10rem"}},{body:u(({data:e})=>[f(d(K(e.due_date)),1)]),_:1}),o(l(v),{field:"invoice_number",header:"Invoice Number",style:{"min-width":"10rem"}}),o(l(v),{field:"invoice_date",header:"Invoice Date",style:{"min-width":"10rem"}},{body:u(({data:e})=>[f(d(K(e.invoice_date)),1)]),_:1}),o(l(v),{field:"state_id",header:"State",style:{"min-width":"10rem"}},{body:u(({data:e})=>{var s;return[f(d((s=P.value[e.state_id-1])==null?void 0:s.name),1)]}),_:1}),o(l(v),{field:"phone",header:"Phone",style:{"min-width":"10rem"}}),o(l(v),{field:"email",header:"Email",style:{"min-width":"10rem"}}),o(l(v),{field:"payment_status",header:"Payment Status",style:{"min-width":"10rem"}},{body:u(({data:e})=>[e.payment_status==="paid"?(c(),E(l(Ce),{key:0,severity:"success",value:"Paid"})):x("",!0)]),_:1})]),_:1},8,["selection","value","loading"])])}}},nt={class:"bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg"},mt={__name:"Dashboard",props:{filterSubs:Object,stateIds:Object,activitySummaries:Object,filterSubIds:Object},setup(p){const h=xe();return(N,b)=>(c(),E(fe,{title:"Dashboard"},{default:u(()=>[n("div",nt,[o(st,{filterSubs:p.filterSubs,stateIds:p.stateIds,activitySummaries:p.activitySummaries,filterSubIds:p.filterSubIds,currentUser:l(h).props.auth.user},null,8,["filterSubs","stateIds","activitySummaries","filterSubIds","currentUser"])])]),_:1}))}};export{mt as default};
