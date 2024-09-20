import{_ as he}from"./AppLayout-BrEKWIli.js";import{d as ye,s as W,a as v,b as J,c as T,e as ge,g as be,f as X,h as Se,i as we,j as Ce,k as Y}from"./primeicons-CPsoQY1V.js";import{s as ke}from"./index-DCXUjGiS.js";import{E as Ie,d as i,x as De,y as xe,z as Z,A as D,C as M,D as ee,o as c,e as m,a as n,f as x,g as f,t as d,b as o,w as u,u as l,F as q,h as E,c as N,Q as $e}from"./app-BKJvEA24.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const Fe={class:"card"},Ve={class:"m-4 my-4"},Ue={key:0,class:"pi pi-calendar"},Oe=n("i",{class:"pi pi-user"},null,-1),qe=n("i",{class:"pi pi-map-marker mt-2"},null,-1),Ee=n("p",{class:"mt-6"}," Order Lines:",-1),Ne={key:0},Pe=n("p",{class:"mt-6 mb-2"}," Other Address:",-1),Re=n("i",{class:"pi pi-building-columns"},null,-1),je=n("p",{class:"mt-6 mb-2"}," Other Address:",-1),Ae=n("i",{class:"pi pi-building"},null,-1),Le=n("p",{class:"mb-2 text-xl font-bold"},"States",-1),Be=["for"],Te=n("p",{class:"mt-4 mb-2 text-xl font-bold"},"Category",-1),Me=["for"],Qe=n("p",{class:"mt-4 mb-2 text-xl font-bold"},"Activity Summary",-1),Ge=["for"],Ke=n("p",{class:"mt-4 mb-2 text-xl font-bold"},"Date Range",-1),ze={class:"flex justify-between"},He=n("i",{class:"pi pi-search"},null,-1),We=["onClick"],Je={key:0,class:"flex align-items-center"},Xe={key:0},Ye={key:1},Ze={key:1},et={class:"flex align-items-center"},tt={key:0,class:"flex align-items-center"},at={key:0},lt={key:1},ot={key:1},st={class:"flex align-items-center"},nt={__name:"SubsToEnterDataTable",props:{filterSubs:Object,stateIds:Object,filterSubIds:Object,currentUser:Object},setup(p){Ie();let h=p;const P=i([]),b=i(!0),g=i(1),$=i(0),R=i(),j=i(!1),A=i(!1),te=i(),L=i([]),F=De(),B=i([]),V=i(),Q=i(),G=i(),K=i(),ae=i([]),le=i([{id:1,name:"Subscription"}]),oe=i([{id:1,name:"Send 1st Stage Filter"},{id:2,name:"Independent 3 + 3 Due for Change"},{id:3,name:"Independent 3 + 3 Expires"},{id:4,name:"3 + 3 Stage Filter"},{id:5,name:"3 Stage Filter"},{id:6,name:"3 + 3 Stage Filter Expires"},{id:7,name:"3 Stage Filter Expires"},{id:8,name:"Final Date to Order Filters for Warranty Extension"}]),se=i([{name:"Confirm",value:"Confirm"},{name:"Deny",value:"Deny"},{name:"- Unselect -",value:null}]),y=i([]),U=i(),S=i([]),w=i([]),C=i([]),O=i(100);xe(()=>{b.value=!1,$.value=h.filterSubs.total,te.value=h.salesQuotations,B.value=h.stateIds});const ne=t=>{O.value=t.rows,g.value=t.page+1,console.log("page change"),console.log(g.value),k()},ie=t=>{R.value=t.target.value,console.log(t.target.value),de()},k=async()=>{try{console.log("fetch data page"),console.log(g.value);const t=Z.get("/dashboard",{page:g.value,search:R.value,dates:y.value,stateId:S.value,activitySummary:w.value,categories:C.value,perPage:O.value},{preserveState:!0,replace:!1,onSuccess:a=>{console.log(a),console.log(a.props.filterSubs.total),$.value=a.props.filterSubs.total}})}catch(t){console.error("Error fetching data:",t)}finally{b.value=!1}},de=ye(async()=>{try{console.log("fetch data page"),console.log(g.value);const t=await Z.get("/dashboard",{page:g.value,search:R.value,dates:y.value,stateId:S.value,activitySummary:w.value,categories:C.value,perPage:O.value},{preserveState:!0,replace:!1,onSuccess:a=>{console.log(a),console.log(a.props.filterSubs.total),$.value=a.props.filterSubs.total}})}catch(t){console.error("Error fetching data:",t)}finally{b.value=!1}},300),z=t=>t?new Date(t).toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}):null,re=t=>{if(!t||t.length===0)return"";const a=new Date(t[0]),_=t[1]?new Date(t[1]):a;return`${a.toLocaleDateString("en-PH",{day:"2-digit",month:"2-digit",year:"numeric"})} to ${_.toLocaleDateString("en-PH",{day:"2-digit",month:"2-digit",year:"numeric"})}`},ce=()=>{initFilters()},ue=t=>{j.value=!0,V.value=t.sales_order_no,Q.value=t.order_line,G.value=t.customer_name,K.value=t.address,ae.value=t.contact_address,U.value=t},me=t=>{V.value=t.sales_order_no},ve=async t=>{var a;try{if((a=t.created_on_odoo)!=null&&a.value){const _=await M.put(`/api/updateCreatedOnOdooInFilterSubs/${t.id}`,{created_on_odoo:t.created_on_odoo.value,odoo_created_by_id:h.currentUser.id});F.add({severity:"success",summary:`Moved #${t.sales_order_no} to Confirm Delivery Requirement`,detail:"",life:3e3})}}catch(_){console.error("Failed to update created_on_odoo:",_),F.add({severity:"error",summary:"Failed to update",detail:"",life:3e3})}},pe=async t=>{try{const a=await M.put(`/api/updateRequiredDeliveryInFilterSubs/${t.id}`,{required_delivery:t.required_delivery.value,required_delivery_updated_by_id:h.currentUser.id});F.add({severity:"success",summary:"Success",detail:"Message Content",life:3e3})}catch(a){r,console.error("Failed to update created_on_odoo:",a),F.add({severity:"error",summary:"Failed Message",detail:"Message Content",life:3e3})}};D(V,async t=>{if(t)try{const a=await M.get("/api/findFilterSubsBySalesOrderNo",{params:{sales_order_no:t}});L.value=a.data.map(_=>({name:_,value:_})),L.value.push({name:"- Unselect -",value:null})}catch(a){console.error("Error fetching dropdown options:",a)}}),D(S,async t=>{console.log("changed state, load fetch data 1"),t&&(console.log("changed state, load fetch data 2"),k())}),D(w,async t=>{console.log("changed state, load fetch data 1"),t&&(console.log("changed state, load fetch data 2"),k())}),D(y,async t=>{console.log("changed date, load fetch data 1"),t&&(console.log("changed date, load fetch data 2"),k())}),D(C,async t=>{console.log("changed date, load fetch data 1"),t&&(console.log("changed date, load fetch data 2"),k())});const _e=t=>t.filter(a=>{var _;return a.created_on_odoo===null||((_=a.created_on_odoo)==null?void 0:_.value)===null}),H=t=>t.filter(a=>a.created_on_odoo!==null&&a.created_on_odoo!==void 0).length;return(t,a)=>{const _=ee("Toast"),fe=ee("font-awesome-icon");return c(),m("div",Fe,[n("div",null,[n("div",Ve,[y.value.length?(c(),m("i",Ue)):x("",!0),f(" "+d(re(y.value)),1)])]),o(_),o(l(J),{visible:j.value,"onUpdate:visible":a[0]||(a[0]=e=>j.value=e),header:V.value,class:"!w-full md:!w-80 lg:!w-[30rem]"},{default:u(()=>[n("p",null,[Oe,f(" "+d(G.value),1)]),n("p",null,[qe,f(" "+d(K.value),1)]),Ee,o(l(W),{value:Q.value,dataKey:"id",showGridlines:"",class:"mt-2"},{default:u(()=>[o(l(v),{field:"product",header:"Product",style:{"min-width":"10rem"}}),o(l(v),{field:"description",header:"Description",style:{"min-width":"10rem"}}),o(l(v),{field:"quantity",header:"Quantity",style:{"min-width":"5rem"}})]),_:1},8,["value"]),n("div",null,[U.value.contact_address[0].parent?(c(),m("p",Ne,[Pe,Re,f(" "+d(U.value.contact_address[0].parent.complete_address),1)])):x("",!0)]),n("div",null,[(c(!0),m(q,null,E(U.value.contact_address[0].children,(e,s)=>(c(),m("p",{key:s},[je,Ae,f(" "+d(e.complete_address),1)]))),128))])]),_:1},8,["visible","header"]),o(l(J),{visible:A.value,"onUpdate:visible":a[5]||(a[5]=e=>A.value=e),header:"Filters",position:"right",class:"!w-full md:!w-80 lg:!w-[30rem]"},{default:u(()=>[Le,(c(!0),m(q,null,E(B.value,e=>(c(),m("div",{key:e.id,class:"flex items-center mb-2"},[o(l(T),{modelValue:S.value,"onUpdate:modelValue":a[1]||(a[1]=s=>S.value=s),inputId:e.state_id,name:"stateIds",value:e.state_id},null,8,["modelValue","inputId","value"]),n("label",{for:e.id,class:"ml-2"},d(e.name),9,Be)]))),128)),Te,(c(!0),m(q,null,E(le.value,e=>(c(),m("div",{key:e.id,class:"flex items-center mb-2"},[o(l(T),{modelValue:C.value,"onUpdate:modelValue":a[2]||(a[2]=s=>C.value=s),inputId:e.name,name:"category",value:e.name},null,8,["modelValue","inputId","value"]),n("label",{for:e.id,class:"ml-2"},d(e.name),9,Me)]))),128)),Qe,(c(!0),m(q,null,E(oe.value,e=>(c(),m("div",{key:e.id,class:"flex items-center mb-2"},[o(l(T),{modelValue:w.value,"onUpdate:modelValue":a[3]||(a[3]=s=>w.value=s),inputId:e.name,name:"category",value:e.name},null,8,["modelValue","inputId","value"]),n("label",{for:e.id,class:"ml-2"},d(e.name),9,Ge)]))),128)),Ke,o(l(ge),{modelValue:y.value,"onUpdate:modelValue":a[4]||(a[4]=e=>y.value=e),selectionMode:"range",manualInput:!1},null,8,["modelValue"])]),_:1},8,["visible"]),o(l(be),{rows:O.value,totalRecords:$.value,rowsPerPageOptions:[10,25,50,100],onPage:ne},{start:u(e=>[f(d(p.filterSubs.from)+"-"+d(p.filterSubs.to-H(p.filterSubs.data))+" / "+d(p.filterSubs.total-H(p.filterSubs.data)),1)]),_:1},8,["rows","totalRecords"]),o(l(W),{selection:P.value,"onUpdate:selection":a[8]||(a[8]=e=>P.value=e),value:_e(p.filterSubs.data),lazy:"",loading:b.value,tableStyle:"min-width: 50rem",showGridlines:"",dataKey:"id",filterDisplay:"menu"},{header:u(()=>[n("div",ze,[o(l(X),{type:"button",icon:"pi pi-filter-slash",label:"Clear",outlined:"",onClick:a[6]||(a[6]=e=>ce())}),o(l(Se),null,{default:u(()=>[o(l(we),null,{default:u(()=>[He]),_:1}),n("div",null,[o(l(X),{onClick:a[7]||(a[7]=e=>A.value=!0),label:"Filter",class:"mr-4"}),o(l(Ce),{placeholder:"Keyword Search",onInput:ie})])]),_:1})])]),empty:u(()=>[f(" No filterSubs found. ")]),loading:u(()=>[f(" Loading filterSubs data. Please wait. ")]),default:u(()=>[o(l(v),{selectionMode:"multiple",headerStyle:"width: 3rem"}),o(l(v),{field:"sales_order_no",header:"Sales Order No.",style:{"min-width":"10rem"}},{body:u(({data:e})=>[n("span",{onClick:s=>ue(e),class:"cursor-pointer hover:underline"},d(e.sales_order_no),9,We),e.category==="Subscription"?(c(),N(fe,{key:0,icon:"fa-filter-circle-dollar",class:"ml-2"})):x("",!0)]),_:1}),o(l(v),{field:"",header:"Created on Odoo",style:{"min-width":"10rem"}},{body:u(({data:e})=>[o(l(Y),{modelValue:e.created_on_odoo,"onUpdate:modelValue":s=>e.created_on_odoo=s,options:L.value,filter:"",optionLabel:"name",placeholder:"Select Sales Order #",class:"w-full md:w-14rem",onClick:s=>me(e),onChange:s=>ve(e)},{value:u(s=>{var I;return[s.value?(c(),m("div",Je,[e.created_on_odoo&&e.created_on_odoo.value!==null?(c(),m("div",Xe,d(((I=e.created_on_odoo)==null?void 0:I.name)||e.created_on_odoo),1)):(c(),m("div",Ye,d(s.placeholder),1))])):(c(),m("span",Ze,d(s.placeholder),1))]}),option:u(s=>[n("div",et,[n("div",null,d(s.option.name),1)])]),_:2},1032,["modelValue","onUpdate:modelValue","options","onClick","onChange"])]),_:1}),t.route().current("confirmDeliveryRequirement")?(c(),N(l(v),{key:0,field:"",header:"Require Delivery",style:{"min-width":"10rem"}},{body:u(({data:e})=>[o(l(Y),{modelValue:e.required_delivery,"onUpdate:modelValue":s=>e.required_delivery=s,options:se.value,filter:"",optionLabel:"name",placeholder:"Select Confirmation",class:"w-full md:w-14rem",onChange:s=>pe(e)},{value:u(s=>{var I;return[s.value?(c(),m("div",tt,[e.required_delivery&&e.required_delivery.value!==null?(c(),m("div",at,d(((I=e.required_delivery)==null?void 0:I.name)||e.required_delivery),1)):(c(),m("div",lt,d(s.placeholder),1))])):(c(),m("span",ot,d(s.placeholder),1))]}),option:u(s=>[n("div",st,[n("div",null,d(s.option.name),1)])]),_:2},1032,["modelValue","onUpdate:modelValue","options","onChange"])]),_:1})):x("",!0),o(l(v),{field:"customer_name",header:"Customer Name",style:{"min-width":"10rem"},filterField:"customer_name"}),o(l(v),{field:"address",header:"Address",style:{"min-width":"10rem"}}),o(l(v),{field:"activity_summary",header:"Activity Summary",style:{"min-width":"10rem"}}),o(l(v),{field:"due_date",header:"Due Date",style:{"min-width":"10rem"}},{body:u(({data:e})=>[f(d(z(e.due_date)),1)]),_:1}),o(l(v),{field:"invoice_number",header:"Invoice Number",style:{"min-width":"10rem"}}),o(l(v),{field:"invoice_date",header:"Invoice Date",style:{"min-width":"10rem"}},{body:u(({data:e})=>[f(d(z(e.invoice_date)),1)]),_:1}),o(l(v),{field:"state_id",header:"State",style:{"min-width":"10rem"}},{body:u(({data:e})=>{var s;return[f(d((s=B.value[e.state_id-1])==null?void 0:s.name),1)]}),_:1}),o(l(v),{field:"phone",header:"Phone",style:{"min-width":"10rem"}}),o(l(v),{field:"email",header:"Email",style:{"min-width":"10rem"}}),o(l(v),{field:"payment_status",header:"Payment Status",style:{"min-width":"10rem"}},{body:u(({data:e})=>[e.payment_status==="paid"?(c(),N(l(ke),{key:0,severity:"success",value:"Paid"})):x("",!0)]),_:1})]),_:1},8,["selection","value","loading"])])}}},it={class:"bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg"},vt={__name:"Dashboard",props:{filterSubs:Object,stateIds:Object,activitySummaries:Object,filterSubIds:Object},setup(p){const h=$e();return(P,b)=>(c(),N(he,{title:"Dashboard"},{default:u(()=>[n("div",it,[o(nt,{filterSubs:p.filterSubs,stateIds:p.stateIds,activitySummaries:p.activitySummaries,filterSubIds:p.filterSubIds,currentUser:l(h).props.auth.user},null,8,["filterSubs","stateIds","activitySummaries","filterSubIds","currentUser"])])]),_:1}))}};export{vt as default};
