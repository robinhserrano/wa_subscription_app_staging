import{_ as Ce}from"./AppLayout-CG7UAAxm.js";import{d as $e,s as Z,a as c,b as ee,c as te,e as C,f as Ie,g as qe,h as Ue,i as Fe,j as xe,k as le,l as Ve}from"./primeicons-CBoDoCtr.js";import{p as je,q as Ae,d as r,s as Ne,x as Pe,y as se,z as $,A as U,B as ae,C as Re,o as n,e as v,a as i,g as p,t as u,f as _,b as a,w as o,u as s,F as M,h as J,c as g,l as Q,D as ie,E as oe,Q as Oe}from"./app-Z8HhuUvq.js";import{s as Ee}from"./index-D4EBNSV1.js";import{s as re}from"./index-DGi7VR_r.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const Te={class:"card"},Le={class:"m-4 my-4"},Be={key:0},Me=i("i",{class:"pi pi-calendar"},null,-1),Je={key:1},Qe=i("i",{class:"pi pi-map-marker"},null,-1),Ge=i("i",{class:"pi pi-user"},null,-1),Ke=i("i",{class:"pi pi-map-marker mt-2"},null,-1),ze=i("p",{class:"mt-6"}," Order Lines:",-1),He={key:0},We=i("p",{class:"mt-6 mb-2"}," Other Address:",-1),Xe=i("i",{class:"pi pi-building-columns"},null,-1),Ye=i("p",{class:"mt-6 mb-2"}," Other Address:",-1),Ze=i("i",{class:"pi pi-building"},null,-1),et=i("p",{class:"mb-2 text-xl font-bold"},"States",-1),tt=["for"],lt=i("p",{class:"mt-4 mb-2 text-xl font-bold"},"Activity Summary",-1),st=["for"],at={class:"font-bold"},it={class:"flex justify-between"},ot=i("i",{class:"pi pi-search"},null,-1),rt={style:{display:"flex","align-items":"center"}},nt=["onClick"],dt=["onClick"],ut={class:"flex items-center"},ct={key:0,class:"pi pi-truck"},mt=["src"],vt={style:{display:"flex","align-items":"center"}},ft={key:0,class:"flex align-items-center"},yt={key:0},pt={key:1},_t={key:1},ht={class:"flex align-items-center"},gt=["src"],bt={__name:"ConfirmDeliveryRequirementDataTable",props:{currentUser:Object,deliverSubIds:Object,filterSubs:Object,stateIds:Object,users:Object,filters:Object},setup(f){const N=je(),G=(e,l,m)=>{N.require({message:`Do you want to unlink #${l} from #${e}?`,header:"Unlink Sales Order",icon:"pi pi-info-circle",rejectLabel:"Cancel",rejectProps:{label:"Cancel",severity:"secondary",outlined:!0},acceptProps:{label:"Unlink",severity:"danger"},accept:async()=>{await U.delete(`/api/deliverSub/${m}`),h(),S.add({severity:"info",summary:"Unlinked Successfully",detail:`Unlinked #${l} from #${e}`,life:3e3})},reject:()=>{}})};Ae();let b=f;const y=r([]),F=r(!0),k=r(1),x=r(0),P=r(),R=r(!1),O=r(!1),ne=r(),K=r([]),S=Ne(),V=r([]),E=r(),z=r(),H=r(),W=r(),de=r([]);r([{id:1,name:"Subscription"}]);const ue=r([{id:1,name:"Send 1st Stage Filter"},{id:2,name:"Independent 3 + 3 Due for Change"},{id:3,name:"Independent 3 + 3 Expires"},{id:4,name:"3 + 3 Stage Filter"},{id:5,name:"3 Stage Filter"},{id:6,name:"3 + 3 Stage Filter Expires"},{id:7,name:"3 Stage Filter Expires"},{id:8,name:"Final Date to Order Filters for Warranty Extension"}]),ce=r([{name:"Confirm",value:"Confirm"},{name:"Deny",value:"Deny"},{name:"- Unselect -",value:null}]),I=r([]),j=r(),w=r([]),q=r([]),T=r([]),A=r(100),D=r();Pe(()=>{F.value=!1,x.value=b.filterSubs.total,ne.value=b.salesQuotations,V.value=b.stateIds});const X=()=>{D.value={start_date:{operator:ie.AND,constraints:[{value:null,matchMode:oe.DATE_IS}]},due_date:{operator:ie.AND,constraints:[{value:null,matchMode:oe.DATE_IS}]}}};X();const me=e=>{A.value=e.rows,k.value=e.page+1,console.log("page change"),console.log(k.value),h()},ve=e=>{P.value=e.target.value,console.log(e.target.value),fe()},h=async()=>{try{console.log("fetch data page"),console.log(k.value);const e=se.get("/confirmDeliveryRequirement",{page:k.value,search:P.value,dates:I.value,stateId:w.value,activitySummary:q.value,categories:T.value,perPage:A.value,filters:JSON.stringify(D.value)},{preserveState:!0,replace:!1,onSuccess:l=>{console.log(l),console.log(l.props.filterSubs.total),x.value=l.props.filterSubs.total}})}catch(e){console.error("Error fetching data:",e)}finally{F.value=!1}},fe=$e(async()=>{try{console.log("fetch data page"),console.log(k.value);const e=await se.get("/confirmDeliveryRequirement",{page:k.value,search:P.value,dates:I.value,stateId:w.value,activitySummary:q.value,categories:T.value,perPage:A.value,filters:JSON.stringify(D.value)},{preserveState:!0,replace:!1,onSuccess:l=>{console.log(l),console.log(l.props.filterSubs.total),x.value=l.props.filterSubs.total}})}catch(e){console.error("Error fetching data:",e)}finally{F.value=!1}},300),L=e=>e?new Date(e).toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}):null,ye=e=>{if(!e||e.length===0)return"";const l=new Date(e[0]),m=e[1]?new Date(e[1]):l;return`${l.toLocaleDateString("en-PH",{day:"2-digit",month:"2-digit",year:"numeric"})} to ${m.toLocaleDateString("en-PH",{day:"2-digit",month:"2-digit",year:"numeric"})}`},pe=e=>e.map(l=>{var m;return(m=V.value[l-1])==null?void 0:m.code}).join(", "),_e=()=>{X()},he=e=>{R.value=!0,E.value=e.sales_order_no,z.value=e.order_line,H.value=e.customer_name,W.value=e.address,de.value=e.contact_address,j.value=e},ge=async e=>{try{console.log(e.required_delivery.value);const l=await U.put(`/api/updateRequiredDeliveryInDeliverSubs/${e.id}`,{required_delivery:e.required_delivery.value,required_delivery_updated_by_id:b.currentUser.id});e.required_delivery.value=="Confirm"?S.add({severity:"success",summary:`Successfully confirmed #${e.sales_order_no} for delivery`,detail:"",life:3e3}):e.required_delivery.value=="Deny"?S.add({severity:"info",summary:`Successfully denied #${e.sales_order_no}`,detail:"",life:3e3}):S.add({severity:"info",summary:`Updated #${e.sales_order_no}'s require delivery value`,detail:"",life:3e3})}catch(l){console.error("Failed to update required_delivery:",l),S.add({severity:"error",summary:"Failed Message",detail:"Message Content",life:3e3})}};$(E,async e=>{if(e)try{const l=await U.get("/api/findFilterSubsBySalesOrderNo",{params:{sales_order_no:e}});K.value=l.data.map(m=>({name:m,value:m})),K.value.push({name:"- Unselect -",value:null})}catch(l){console.error("Error fetching dropdown options:",l)}}),$(w,async e=>{console.log("changed state, load fetch data 1"),e&&(console.log("changed state, load fetch data 2"),h())}),$(q,async e=>{console.log("changed state, load fetch data 1"),e&&(console.log("changed state, load fetch data 2"),h())}),$(I,async e=>{console.log("changed date, load fetch data 1"),e&&(console.log("changed date, load fetch data 2"),h())}),$(T,async e=>{console.log("changed date, load fetch data 1"),e&&(console.log("changed date, load fetch data 2"),h())}),$(D,async e=>{console.log("changed date, load fetch data 1"),e&&(console.log("changed date, load fetch data 2"),h())});const be=e=>e,Se=async()=>{var e=y.value.map(m=>m.id);console.log(e);const l=JSON.stringify({deliverSubIds:e,required_delivery_updated_by_id:b.currentUser.id});await U.post("/api/bulkConfirmDeliverSubs",l,{headers:{"Content-Type":"application/json"}}),S.add({severity:"success",summary:`Successfully confirmed ${e.length} filter subs`,detail:"",life:3e3}),h(),y.value=[]},we=async e=>{y.value=e},ke=async()=>{var e=y.value.map(m=>m.id);console.log(e);const l=JSON.stringify({deliverSubIds:e,required_delivery_updated_by_id:b.currentUser.id});await U.post("/api/bulkDenyDeliverSubs",l,{headers:{"Content-Type":"application/json"}}),S.add({severity:"success",summary:`Successfully denied ${e.length} filter subs`,detail:"",life:3e3}),h(),y.value=[]};return(e,l)=>{const m=ae("Toast"),De=ae("font-awesome-icon"),B=Re("tooltip");return n(),v("div",Te,[i("div",null,[i("div",Le,[I.value.length?(n(),v("div",Be,[Me,p(" "+u(ye(I.value)),1)])):_("",!0),w.value.length?(n(),v("div",Je,[Qe,p(" "+u(pe(w.value)),1)])):_("",!0)])]),a(m),a(s(ee),{visible:R.value,"onUpdate:visible":l[0]||(l[0]=t=>R.value=t),header:E.value,class:"!w-full md:!w-80 lg:!w-[30rem]"},{default:o(()=>[i("p",null,[Ge,p(" "+u(H.value),1)]),i("p",null,[Ke,p(" "+u(W.value),1)]),ze,a(s(Z),{value:z.value,dataKey:"id",showGridlines:"",class:"mt-2"},{default:o(()=>[a(s(c),{field:"product",header:"Product",style:{"min-width":"10rem"}}),a(s(c),{field:"description",header:"Description",style:{"min-width":"10rem"}}),a(s(c),{field:"quantity",header:"Quantity",style:{"min-width":"5rem"}})]),_:1},8,["value"]),i("div",null,[j.value.contact_address[0].parent?(n(),v("p",He,[We,Xe,p(" "+u(j.value.contact_address[0].parent.complete_address),1)])):_("",!0)]),i("div",null,[(n(!0),v(M,null,J(j.value.contact_address[0].children,(t,d)=>(n(),v("p",{key:d},[Ye,Ze,p(" "+u(t.complete_address),1)]))),128))])]),_:1},8,["visible","header"]),a(s(ee),{visible:O.value,"onUpdate:visible":l[3]||(l[3]=t=>O.value=t),header:"Filters",position:"right",class:"!w-full md:!w-80 lg:!w-[30rem]"},{default:o(()=>[et,(n(!0),v(M,null,J(V.value,t=>(n(),v("div",{key:t.id,class:"flex items-center mb-2"},[a(s(te),{modelValue:w.value,"onUpdate:modelValue":l[1]||(l[1]=d=>w.value=d),inputId:t.state_id,name:"stateIds",value:t.state_id},null,8,["modelValue","inputId","value"]),i("label",{for:t.id,class:"ml-2"},u(t.name),9,tt)]))),128)),lt,(n(!0),v(M,null,J(ue.value,t=>(n(),v("div",{key:t.id,class:"flex items-center mb-2"},[a(s(te),{modelValue:q.value,"onUpdate:modelValue":l[2]||(l[2]=d=>q.value=d),inputId:t.name,name:"category",value:t.name},null,8,["modelValue","inputId","value"]),i("label",{for:t.id,class:"ml-2"},u(t.name),9,st)]))),128))]),_:1},8,["visible"]),y.value.length?(n(),g(s(C),{key:0,class:"ml-4",outlined:""},{default:o(()=>[i("p",at,u(y.value.length),1),p("selected "),y.value.length<f.filterSubs.total?(n(),g(s(C),{key:0,label:`Select all ${f.deliverSubIds.length}`,onClick:l[4]||(l[4]=t=>we(f.deliverSubIds)),icon:"pi pi-arrow-right",class:"ml-4",severity:"info"},null,8,["label"])):_("",!0)]),_:1})):_("",!0),y.value.length?(n(),g(s(C),{key:1,label:`Confirm All (${y.value.length})`,onClick:Se,icon:"pi pi-verified",class:"ml-4"},null,8,["label"])):_("",!0),y.value.length?(n(),g(s(C),{key:2,label:`Deny All (${y.value.length})`,onClick:ke,icon:"pi pi-times-circle",class:"ml-4"},null,8,["label"])):_("",!0),a(s(Ie),{rows:A.value,totalRecords:x.value,rowsPerPageOptions:[10,25,50,100],onPage:me},{start:o(t=>[p(u(f.filterSubs.from)+"-"+u(f.filterSubs.to)+" / "+u(f.filterSubs.total),1)]),_:1},8,["rows","totalRecords"]),a(s(Z),{selection:y.value,"onUpdate:selection":l[7]||(l[7]=t=>y.value=t),value:be(f.filterSubs.data),lazy:"",loading:F.value,tableStyle:"min-width: 50rem",showGridlines:"",dataKey:"id",filterDisplay:"menu",filters:D.value,"onUpdate:filters":l[8]||(l[8]=t=>D.value=t)},{header:o(()=>[i("div",it,[a(s(C),{type:"button",icon:"pi pi-filter-slash",label:"Clear",outlined:"",onClick:l[5]||(l[5]=t=>_e())}),a(s(qe),null,{default:o(()=>[a(s(Ue),null,{default:o(()=>[ot]),_:1}),i("div",null,[a(s(C),{onClick:l[6]||(l[6]=t=>O.value=!0),label:"Filter",class:"mr-4"}),a(s(Fe),{placeholder:"Keyword Search",onInput:ve})])]),_:1})])]),empty:o(()=>[p(" No filterSubs found. ")]),loading:o(()=>[p(" Loading filterSubs data. Please wait. ")]),default:o(()=>[a(s(c),{selectionMode:"multiple",headerStyle:"width: 3rem"}),a(s(c),{field:"root_sales_order.sales_order_no",header:"Root Sales Order #",style:{"min-width":"10rem"}},{body:o(({data:t})=>[i("div",rt,[i("span",null,u(t.root_sales_order.sales_order_no),1),a(s(Ee)),i("div",{onClick:d=>G(t.root_sales_order.sales_order_no,t.sales_order_no,t.id),style:{cursor:"pointer","margin-left":"8px"}},[a(De,{icon:["fas","link-slash"],style:{color:"#800000"}})],8,nt)])]),_:1}),a(s(c),{field:"sales_order_no",header:"Sales Order No.",style:{"min-width":"10rem"}},{body:o(({data:t})=>[i("span",{onClick:d=>he(t),class:"cursor-pointer hover:underline"},u(t.sales_order_no),9,dt),i("div",ut,[t.delivered_or_delivery_booked&&t.delivered_or_delivery_booked.value!==null?Q((n(),v("i",ct,null,512)),[[B,"Delivery Booked"]]):_("",!0),t.odoo_created_by_id?Q((n(),g(s(re),{key:1,class:"ml-2",style:{"background-color":"#ffffff",color:"#ffffff"}},{default:o(()=>[i("img",{src:t.odoo_created_by.profile_photo_url,alt:"User Initials"},null,8,mt)]),_:2},1024)),[[B,`Last updated by:
${t.odoo_created_by.name}`]]):_("",!0)])]),_:1}),e.route().current("confirmDeliveryRequirement")?(n(),g(s(c),{key:0,field:"",header:"Require Delivery",style:{"min-width":"10rem"}},{body:o(({data:t})=>[i("div",vt,[a(s(xe),{modelValue:t.required_delivery,"onUpdate:modelValue":d=>t.required_delivery=d,options:ce.value,filter:"",optionLabel:"name",placeholder:"Select Confirmation",class:"w-full md:w-14rem",onChange:d=>ge(t)},{value:o(d=>{var Y;return[d.value?(n(),v("div",ft,[t.required_delivery&&t.required_delivery.value!==null?(n(),v("div",yt,u(((Y=t.required_delivery)==null?void 0:Y.name)||t.required_delivery),1)):(n(),v("div",pt,u(d.placeholder),1))])):(n(),v("span",_t,u(d.placeholder),1))]}),option:o(d=>[i("div",ht,[i("div",null,u(d.option.name),1)])]),_:2},1032,["modelValue","onUpdate:modelValue","options","onChange"]),t.required_delivery_updated_by_id?Q((n(),g(s(re),{key:0,class:"ml-2",style:{"background-color":"#ffffff",color:"#ffffff"}},{default:o(()=>[i("img",{src:t.required_delivery_updated_by.profile_photo_url,alt:"User Initials"},null,8,gt)]),_:2},1024)),[[B,`Last updated by:
${t.required_delivery_updated_by.name}`]]):_("",!0)])]),_:1})):_("",!0),a(s(c),{field:"customer_name",header:"Customer Name",style:{"min-width":"10rem"},filterField:"customer_name"}),a(s(c),{field:"address",header:"Address",style:{"min-width":"10rem"}}),a(s(c),{field:"activity_summary",header:"Activity Summary",style:{"min-width":"10rem"}}),a(s(c),{field:"start_date",header:"Start Date",style:{"min-width":"10rem"},filterField:"start_date",dataType:"date"},{body:o(({data:t})=>[p(u(L(t.start_date)),1)]),filter:o(({filterModel:t})=>[a(s(le),{modelValue:t.value,"onUpdate:modelValue":d=>t.value=d,dateFormat:"dd/mm/yy",placeholder:"dd/mm/yyyy"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),a(s(c),{field:"due_date",header:"Due Date",style:{"min-width":"10rem"},filterField:"due_date",dataType:"date"},{body:o(({data:t})=>[p(u(L(t.due_date)),1)]),filter:o(({filterModel:t})=>[a(s(le),{modelValue:t.value,"onUpdate:modelValue":d=>t.value=d,dateFormat:"dd/mm/yy",placeholder:"dd/mm/yyyy"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),a(s(c),{field:"invoice_number",header:"Invoice Number",style:{"min-width":"10rem"}}),a(s(c),{field:"invoice_date",header:"Invoice Date",style:{"min-width":"10rem"}},{body:o(({data:t})=>[p(u(L(t.invoice_date)),1)]),_:1}),a(s(c),{field:"state_id",header:"State",style:{"min-width":"10rem"}},{body:o(({data:t})=>{var d;return[p(u((d=V.value[t.state_id-1])==null?void 0:d.name),1)]}),_:1}),a(s(c),{field:"phone",header:"Phone",style:{"min-width":"10rem"}}),a(s(c),{field:"email",header:"Email",style:{"min-width":"10rem"}}),a(s(c),{field:"payment_status",header:"Payment Status",style:{"min-width":"10rem"}},{body:o(({data:t})=>[t.payment_status==="paid"?(n(),g(s(Ve),{key:0,severity:"success",value:"Paid"})):_("",!0)]),_:1})]),_:1},8,["selection","value","loading","filters"])])}}},St={class:"bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg"},qt={__name:"ConfirmDeliveryRequirement",props:{filterSubs:Object,filterSubIds:Object,stateIds:Object,users:Object,filters:Object},setup(f){const N=Oe();return(G,b)=>(n(),g(Ce,{title:"ConfirmDeliveryRequirement"},{default:o(()=>[i("div",St,[a(bt,{filterSubs:f.filterSubs,stateIds:f.stateIds,deliverSubIds:f.filterSubIds,filters:f.filters,currentUser:s(N).props.auth.user,users:f.users},null,8,["filterSubs","stateIds","deliverSubIds","filters","currentUser","users"])])]),_:1}))}};export{qt as default};