import{_ as ue}from"./AppLayout-DPMlL8mw.js";import{d as me,s as z,a as m,b as G,c as T,e as ve,f as pe,g as K,h as fe,i as he,j as _e,k as Q}from"./primeicons-C5VpZEmt.js";import{d,p as ye,q as ge,s as H,x as D,y as j,z as Xe,o as r,e as u,a as i,f as N,g as v,t as n,b as a,w as c,u as s,F as I,h as V,c as J}from"./app-Ba77bD4O.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const be={class:"card"},Ae={class:"m-4 my-4"},Se={key:0,class:"pi pi-calendar"},we=i("i",{class:"pi pi-map-marker ml-4"},null,-1),Ze=i("i",{class:"pi pi-user"},null,-1),Ce=i("i",{class:"pi pi-map-marker mt-2"},null,-1),ke=i("p",{class:"mt-6"}," Order Lines:",-1),De=i("p",{class:"mt-6 mb-2"}," Other Address:",-1),Ie={key:0},Ve=i("i",{class:"pi pi-building-columns"},null,-1),$e=i("i",{class:"pi pi-building"},null,-1),xe=i("p",{class:"mb-2 text-xl font-bold"},"States",-1),Fe=["for"],qe=i("p",{class:"mt-4 mb-2 text-xl font-bold"},"_ Category _",-1),Oe=["for"],Ue=i("p",{class:"mb-2 text-xl font-bold"},"Activity Summary",-1),Te=["for"],je=i("p",{class:"mt-4 mb-2 text-xl font-bold"},"Date Range",-1),Ne={class:"flex justify-between"},Re=i("i",{class:"pi pi-search"},null,-1),Le=["onClick"],Be={key:0,class:"flex align-items-center"},Pe={key:0},Me={key:1},Ee={key:1},ze={class:"flex align-items-center"},Ge={key:0,class:"flex align-items-center"},Ke={key:0},Qe={key:1},He={key:1},Je={class:"flex align-items-center"},We={__name:"SubsToDeliverDataTable",props:{filterSubs:Object,stateIds:Object,activitySummaries:Object,filterSubIds:Object},setup(p){let b=p;const $=d([]),R=d(),A=d(!0),_=d(1),S=d(0),x=d(),F=d(!1),q=d(!1),W=d(),O=d([]),w=ye(),U=d([]),Z=d(),L=d(),B=d(),P=d(),Y=d([]),f=d(),M=d(),ee=d([{id:1,name:"1st Stage Filter Only"},{id:2,name:"Filter Subscription"},{id:3,name:"All Types"}]),te=d([{name:"Confirm",value:"Confirm"},{name:"Deny",value:"Deny"},{name:"- Unselect -",value:null}]),h=d([]),g=d(),C=d();ge(()=>{A.value=!1,S.value=b.filterSubs.total,W.value=b.salesQuotations,U.value=b.stateIds});const le=t=>{_.value=t.page+1,console.log("page change"),console.log(_.value),k()},ae=t=>{x.value=t.target.value,console.log(t.target.value),se()},k=async()=>{try{console.log("fetch data page"),console.log(_.value);const t=await H.get("/subscriptionsToDeliver",{page:_.value,search:x.value,dates:h.value,stateId:f.value===0?null:f.value,activitySummary:g.value},{preserveState:!0,replace:!1,onSuccess:l=>{console.log(l),console.log(l.props.filterSubs.total),S.value=l.props.filterSubs.total}})}catch(t){console.error("Error fetching data:",t)}finally{A.value=!1}},se=me(async()=>{try{console.log("fetch data page"),console.log(_.value);const t=await H.get("/subscriptionsToDeliver",{page:_.value,search:x.value,dates:h.value,stateId:f.value===0?null:f.value,activitySummary:g.value},{preserveState:!0,replace:!1,onSuccess:l=>{console.log(l),console.log(l.props.filterSubs.total),S.value=l.props.filterSubs.total}})}catch(t){console.error("Error fetching data:",t)}finally{A.value=!1}},300),E=t=>t?new Date(t).toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}):null,oe=t=>{if(!t||t.length===0)return"";const l=new Date(t[0]),y=t[1]?new Date(t[1]):l;return`${l.toLocaleDateString("en-PH",{day:"2-digit",month:"2-digit",year:"numeric"})} to ${y.toLocaleDateString("en-PH",{day:"2-digit",month:"2-digit",year:"numeric"})}`},ie=()=>{initFilters()},ne=t=>{F.value=!0,Z.value=t.sales_order_no,L.value=t.order_line,B.value=t.customer_name,P.value=t.address,Y.value=t.contact_address,C.value=t},de=t=>{Z.value=t.sales_order_no,console.log("Select clicked",event)},re=async t=>{try{const l=await j.put(`/api/updateCreatedOnOdooInFilterSubs/${t.id}`,{created_on_odoo:t.created_on_odoo.value});console.log("a"),console.log(t),console.log("z"),console.log(l),console.log("handle select change"),w.add({severity:"success",summary:`Moved #${t.sales_order_no} for Confirm Delivery Requirement`,detail:"",life:3e3})}catch(l){console.error("Failed to update created_on_odoo:",l),w.add({severity:"error",summary:"Failed to update",detail:"",life:3e3})}},ce=async t=>{try{const l=await j.put(`/api/updateRequiredDeliveryInFilterSubs/${t.id}`,{required_delivery:t.required_delivery.value});console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZZZZZZZZZZZZZZZZZZZZZ"),console.log(l),console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"),console.log("handle select change"),w.add({severity:"success",summary:"Success",detail:"Message Content",life:3e3})}catch(l){console.error("Failed to update created_on_odoo:",l),w.add({severity:"error",summary:"Failed Message",detail:"Message Content",life:3e3})}};return D(Z,async t=>{if(t)try{const l=await j.get("/api/findSalesOrdersBySalesOrderNo",{params:{sales_order_no:t}});console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZZZZZZZZZZZZZZZZZZZZZ"),console.log(l),console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"),O.value=l.data.map(y=>({name:y.sales_order_no,value:y.sales_order_no})),O.value.push({name:"- Unselect -",value:null})}catch(l){console.error("Error fetching dropdown options:",l)}}),D(f,async t=>{console.log("changed state, load fetch data 1"),t&&(console.log("changed state, load fetch data 2"),k())}),D(g,async t=>{console.log("changed state, load fetch data 1"),t&&(console.log("changed state, load fetch data 2"),k())}),D(h,async t=>{console.log("changed date, load fetch data 1"),t&&(console.log("changed date, load fetch data 2"),k())}),(t,l)=>{const y=Xe("Toast");return r(),u("div",be,[i("div",null,[i("div",Ae,[h.value.length?(r(),u("i",Se)):N("",!0),v(" "+n(oe(h.value))+" ",1),we,v(" "+n(f.value),1)])]),a(y),a(s(G),{visible:F.value,"onUpdate:visible":l[0]||(l[0]=e=>F.value=e),header:Z.value,class:"!w-full md:!w-80 lg:!w-[30rem]"},{default:c(()=>[i("p",null,[Ze,v(" "+n(B.value),1)]),i("p",null,[Ce,v(" "+n(P.value),1)]),ke,a(s(z),{value:L.value,dataKey:"id",showGridlines:"",class:"mt-2"},{default:c(()=>[a(s(m),{field:"product",header:"Product",style:{"min-width":"10rem"}}),a(s(m),{field:"description",header:"Description",style:{"min-width":"10rem"}}),a(s(m),{field:"quantity",header:"Quantity",style:{"min-width":"5rem"}})]),_:1},8,["value"]),De,i("div",null,[C.value.contact_address[0].parent?(r(),u("p",Ie,[Ve,v(" "+n(C.value.contact_address[0].parent.complete_address),1)])):N("",!0)]),i("div",null,[(r(!0),u(I,null,V(C.value.contact_address[0].children,(e,o)=>(r(),u("p",{key:o},[$e,v(" "+n(e.complete_address),1)]))),128))])]),_:1},8,["visible","header"]),a(s(G),{visible:q.value,"onUpdate:visible":l[5]||(l[5]=e=>q.value=e),header:"Filters",position:"right",class:"!w-full md:!w-80 lg:!w-[30rem]"},{default:c(()=>[xe,(r(!0),u(I,null,V(U.value,e=>(r(),u("div",{key:e.id,class:"flex items-center mb-2"},[a(s(T),{modelValue:f.value,"onUpdate:modelValue":l[1]||(l[1]=o=>f.value=o),inputId:e.id,name:"dynamic",value:e.state_id},null,8,["modelValue","inputId","value"]),i("label",{for:e.id,class:"ml-2"},n(e.name),9,Fe)]))),128)),qe,(r(!0),u(I,null,V(ee.value,e=>(r(),u("div",{key:e.id,class:"flex items-center mb-2"},[a(s(T),{modelValue:M.value,"onUpdate:modelValue":l[2]||(l[2]=o=>M.value=o),inputId:e.id,name:"dynamic",value:e.state_id},null,8,["modelValue","inputId","value"]),i("label",{for:e.id,class:"ml-2"},n(e.name),9,Oe)]))),128)),Ue,(r(!0),u(I,null,V(p.activitySummaries,e=>(r(),u("div",{key:e.id,class:"flex items-center mb-2"},[a(s(T),{modelValue:g.value,"onUpdate:modelValue":l[3]||(l[3]=o=>g.value=o),inputId:e.id,name:"dynamic",value:e.activity_summary},null,8,["modelValue","inputId","value"]),i("label",{for:e.id,class:"ml-2"},n(e.activity_summary),9,Te)]))),128)),je,a(s(ve),{modelValue:h.value,"onUpdate:modelValue":l[4]||(l[4]=e=>h.value=e),selectionMode:"range",manualInput:!1},null,8,["modelValue"])]),_:1},8,["visible"]),a(s(pe),{rows:100,totalRecords:S.value,rowsPerPageOptions:[10,25,50,100],onPage:le},{start:c(e=>[v(n(p.filterSubs.from)+"-"+n(p.filterSubs.to)+" / "+n(p.filterSubs.total),1)]),_:1},8,["totalRecords"]),a(s(z),{selection:$.value,"onUpdate:selection":l[8]||(l[8]=e=>$.value=e),filters:R.value,"onUpdate:filters":l[9]||(l[9]=e=>R.value=e),value:p.filterSubs.data,lazy:"",loading:A.value,tableStyle:"min-width: 50rem",showGridlines:"",dataKey:"id",filterDisplay:"menu"},{header:c(()=>[i("div",Ne,[a(s(K),{type:"button",icon:"pi pi-filter-slash",label:"Clear",outlined:"",onClick:l[6]||(l[6]=e=>ie())}),a(s(fe),null,{default:c(()=>[a(s(he),null,{default:c(()=>[Re]),_:1}),i("div",null,[a(s(K),{onClick:l[7]||(l[7]=e=>q.value=!0),label:"Filter",class:"mr-4"}),a(s(_e),{placeholder:"Keyword Search",onInput:ae})])]),_:1})])]),empty:c(()=>[v(" No filterSubs found. ")]),loading:c(()=>[v(" Loading filterSubs data. Please wait. ")]),default:c(()=>[a(s(m),{selectionMode:"multiple",headerStyle:"width: 3rem"}),a(s(m),{field:"sales_order_no",header:"Sales Order No.",style:{"min-width":"10rem"}},{body:c(({data:e})=>[i("span",{onClick:o=>ne(e),class:"cursor-pointer hover:underline"},n(e.sales_order_no),9,Le)]),_:1}),a(s(m),{field:"",header:"Created on Odoo",style:{"min-width":"10rem"}},{body:c(({data:e})=>[a(s(Q),{modelValue:e.created_on_odoo,"onUpdate:modelValue":o=>e.created_on_odoo=o,options:O.value,filter:"",optionLabel:"name",placeholder:"Select Sales Order #",class:"w-full md:w-14rem",onClick:o=>de(e),onChange:o=>re(e)},{value:c(o=>{var X;return[o.value?(r(),u("div",Be,[e.created_on_odoo&&e.created_on_odoo.value!==null?(r(),u("div",Pe,n(((X=e.created_on_odoo)==null?void 0:X.name)||e.created_on_odoo),1)):(r(),u("div",Me,n(o.placeholder),1))])):(r(),u("span",Ee,n(o.placeholder),1))]}),option:c(o=>[i("div",ze,[i("div",null,n(o.option.name),1)])]),_:2},1032,["modelValue","onUpdate:modelValue","options","onClick","onChange"])]),_:1}),t.route().current("confirmDeliveryRequirement")?(r(),J(s(m),{key:0,field:"",header:"Require Delivery",style:{"min-width":"10rem"}},{body:c(({data:e})=>[a(s(Q),{modelValue:e.required_delivery,"onUpdate:modelValue":o=>e.required_delivery=o,options:te.value,filter:"",optionLabel:"name",placeholder:"Select Confirmation",class:"w-full md:w-14rem",onChange:o=>ce(e)},{value:c(o=>{var X;return[o.value?(r(),u("div",Ge,[e.required_delivery&&e.required_delivery.value!==null?(r(),u("div",Ke,n(((X=e.required_delivery)==null?void 0:X.name)||e.required_delivery),1)):(r(),u("div",Qe,n(o.placeholder),1))])):(r(),u("span",He,n(o.placeholder),1))]}),option:c(o=>[i("div",Je,[i("div",null,n(o.option.name),1)])]),_:2},1032,["modelValue","onUpdate:modelValue","options","onChange"])]),_:1})):N("",!0),a(s(m),{field:"customer_name",header:"Customer Name",style:{"min-width":"10rem"},filterField:"customer_name"}),a(s(m),{field:"address",header:"Address",style:{"min-width":"10rem"}}),a(s(m),{field:"activity_summary",header:"Activity Summary",style:{"min-width":"10rem"}}),a(s(m),{field:"due_date",header:"Due Date",style:{"min-width":"10rem"}},{body:c(({data:e})=>[v(n(E(e.due_date)),1)]),_:1}),a(s(m),{field:"invoice_number",header:"Invoice Number",style:{"min-width":"10rem"}}),a(s(m),{field:"invoice_date",header:"Invoice Date",style:{"min-width":"10rem"}},{body:c(({data:e})=>[v(n(E(e.invoice_date)),1)]),_:1}),a(s(m),{field:"state_id",header:"State",style:{"min-width":"10rem"}},{body:c(({data:e})=>{var o;return[v(n((o=U.value[e.state_id-1])==null?void 0:o.name),1)]}),_:1}),a(s(m),{field:"phone",header:"Phone",style:{"min-width":"10rem"}}),a(s(m),{field:"email",header:"Email",style:{"min-width":"10rem"}}),a(s(m),{field:"payment_status",header:"Payment Status",style:{"min-width":"10rem"}})]),_:1},8,["selection","filters","value","loading"])])}}},Ye={class:"bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg"},st={__name:"SubscriptionsToDeliver",props:{filterSubs:Object,stateIds:Object,activitySummaries:Object,filterSubIds:Object},setup(p){return(b,$)=>(r(),J(ue,{title:"SubscriptionsToDeliver"},{default:c(()=>[i("div",Ye,[a(We,{filterSubs:p.filterSubs,stateIds:p.stateIds,activitySummaries:p.activitySummaries,filterSubIds:p.filterSubIds},null,8,["filterSubs","stateIds","activitySummaries","filterSubIds"])])]),_:1}))}};export{st as default};
