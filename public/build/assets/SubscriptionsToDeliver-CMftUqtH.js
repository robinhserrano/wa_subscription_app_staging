import{_ as Ue}from"./AppLayout-A29tb5aa.js";import{d as Ve,s as ae,a as _,b as re,c as ie,e as Oe,f as Z,g as je,h as Fe,i as Re,j as Ze,k as de,l as Te}from"./primeicons-DKvAKHUy.js";import{p as Be,d as c,s as Le,x as ze,y as ne,z as x,A as U,B as ce,C as Pe,o as n,e as v,a,g as p,t as d,f as h,b as l,w as u,u as s,F as G,h as K,c as X,l as ue,Q as Ee}from"./app-CgH8sHea.js";import{u as T}from"./xlsx-YQvpTstd.js";import{s as Ne}from"./index-C8NlIhjZ.js";import{s as ve}from"./index-CqehGVZj.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const We={class:"card"},Me={class:"m-4 my-4"},Qe={key:0},Ge=a("i",{class:"pi pi-calendar"},null,-1),Ke={key:1},qe=a("i",{class:"pi pi-map-marker"},null,-1),He=a("i",{class:"pi pi-user"},null,-1),Je=a("i",{class:"pi pi-map-marker mt-2"},null,-1),Ye=a("p",{class:"mt-6"}," Order Lines:",-1),et={key:0},tt=a("p",{class:"mt-6 mb-2"}," Other Address:",-1),ot=a("i",{class:"pi pi-building-columns"},null,-1),st=a("p",{class:"mt-6 mb-2"}," Other Address:",-1),lt=a("i",{class:"pi pi-building"},null,-1),at=a("p",{class:"mb-2 text-xl font-bold"},"States",-1),rt=["for"],it=a("p",{class:"mt-4 mb-2 text-xl font-bold"},"Activity Summary",-1),dt=["for"],nt=a("p",{class:"mt-4 mb-2 text-xl font-bold"},"Date Range",-1),ct={class:"flex justify-between"},ut=a("i",{class:"pi pi-search"},null,-1),vt={style:{display:"flex","align-items":"center"}},_t=["onClick"],mt=["onClick"],pt={key:0,class:"pi pi-truck ml-2"},ht={class:"flex items-center"},ft={key:0,class:"flex align-items-center"},yt={key:0},bt={key:1},gt={key:1},kt={class:"flex align-items-center"},St=["src"],wt={class:"flex items-center"},Ct={key:0,class:"flex align-items-center"},At={key:0},Dt={key:1},Xt={key:0},It={key:2},$t={key:0},xt={key:3},Ut={key:1},Vt={class:"flex align-items-center"},Ot={key:0,class:"ml-1"},jt=["src"],Ft={__name:"SubsToDeliverDataTable",props:{filterSubs:Object,stateIds:Object,filterSubIds:Object,currentUser:Object,users:Object,serviceCodes:Object},setup(f){const B=Be(),q=(t,o,m)=>{B.require({message:`Do you want to unlink #${o} from #${t}?`,header:"Unlink Sales Order",icon:"pi pi-info-circle",rejectLabel:"Cancel",rejectProps:{label:"Cancel",severity:"secondary",outlined:!0},acceptProps:{label:"Unlink",severity:"danger"},accept:async()=>{await U.delete(`/api/deliverSub/${m}`),k(),A.add({severity:"info",summary:"Unlinked Successfully",detail:`Unlinked #${o} from #${t}`,life:3e3})},reject:()=>{}})};let b=f;const g=c([]);c();const V=c(!0),C=c(1),I=c(0),L=c(),z=c(!1),P=c(!1),_e=c(),H=c([]),A=Le(),O=c([]),E=c(),J=c(),Y=c(),ee=c(),me=c([]),N=c([]);c(),c([{id:1,name:"Subscription"}]);const pe=c([{id:1,name:"Send 1st Stage Filter"},{id:2,name:"Independent 3 + 3 Due for Change"},{id:3,name:"Independent 3 + 3 Expires"},{id:4,name:"3 + 3 Stage Filter"},{id:5,name:"3 Stage Filter"},{id:6,name:"3 + 3 Stage Filter Expires"},{id:7,name:"3 Stage Filter Expires"},{id:8,name:"Final Date to Order Filters for Warranty Extension"}]);c([{name:"Confirm",value:"Confirm"},{name:"Deny",value:"Deny"},{name:"- Unselect -",value:null}]);const he=c([{name:"Delivery Booked",value:"Delivery Booked"},{name:"- Unselect -",value:null}]),S=c([]),j=c(),w=c([]),$=c([]),W=c([]),F=c(100);ze(()=>{V.value=!1,I.value=b.filterSubs.total,_e.value=b.salesQuotations,O.value=b.stateIds,N.value=b.serviceCodes.map(t=>({name:t.service_code,value:t.id,totalWeight:t.total_weight})),N.value.push({name:"- Unselect -",value:null,totalWeight:null}),console.log("aaaaaaaaa"),console.log(b.serviceCodes),console.log("zzzzzzzzzzz")});const fe=t=>{F.value=t.rows,C.value=t.page+1,console.log("page change"),console.log(C.value),k()},ye=t=>{L.value=t.target.value,console.log(t.target.value),be()},k=async()=>{try{console.log("fetch data page"),console.log(C.value);const t=await ne.get("/subscriptionsToDeliver",{page:C.value,search:L.value,dates:S.value,stateId:w.value,activitySummary:$.value,categories:W.value,perPage:F.value},{preserveState:!0,replace:!1,onSuccess:o=>{console.log(o),console.log(o.props.filterSubs.total),I.value=o.props.filterSubs.total}})}catch(t){console.error("Error fetching data:",t)}finally{V.value=!1}},be=Ve(async()=>{try{console.log("fetch data page"),console.log(C.value);const t=await ne.get("/subscriptionsToDeliver",{page:C.value,search:L.value,dates:S.value,stateId:w.value,activitySummary:$.value,categories:W.value,perPage:F.value},{preserveState:!0,replace:!1,onSuccess:o=>{console.log(o),console.log(o.props.filterSubs.total),I.value=o.props.filterSubs.total}})}catch(t){console.error("Error fetching data:",t)}finally{V.value=!1}},300),M=t=>t?new Date(t).toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}):null,ge=t=>{if(!t||t.length===0)return"";const o=new Date(t[0]),m=t[1]?new Date(t[1]):o;return`${o.toLocaleDateString("en-PH",{day:"2-digit",month:"2-digit",year:"numeric"})} to ${m.toLocaleDateString("en-PH",{day:"2-digit",month:"2-digit",year:"numeric"})}`},ke=t=>t.map(o=>{var m;return(m=O.value[o-1])==null?void 0:m.code}).join(", "),Se=()=>{initFilters()},we=t=>{z.value=!0,E.value=t.sales_order_no,J.value=t.order_line,Y.value=t.customer_name,ee.value=t.address,me.value=t.contact_address,j.value=t},Ce=async t=>{try{const o=await U.put(`/api/updateDeliveredOrDeliveryBooked/${t.id}`,{delivered_or_delivery_booked:t.delivered_or_delivery_booked.value,delivered_or_delivery_booked_by_id:b.currentUser.id});A.add({severity:"success",summary:`Updated #${t.sales_order_no} delivered or delivery booked status`,detail:"",life:3e3})}catch(o){console.error("Failed to update delivered_or_delivery_booked:",o),A.add({severity:"error",summary:"Failed Message",detail:"Message Content",life:3e3})}},Ae=async t=>{try{console.log(t);const o=await U.put(`/api/updateServiceCode/${t.id}`,{service_code_id:t.service_code_id.value,service_code_updated_by_id:b.currentUser.id});A.add({severity:"success",summary:`Updated #${t.sales_order_no}'s service code`,detail:"",life:3e3}),k()}catch(o){console.error("Failed to update delivered_or_delivery_booked:",o),A.add({severity:"error",summary:"Failed Message",detail:"Message Content",life:3e3})}};x(E,async t=>{if(t)try{const o=await U.get("/api/findSalesOrdersBySalesOrderNo",{params:{sales_order_no:t}});console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZZZZZZZZZZZZZZZZZZZZZ"),console.log(o),console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"),H.value=o.data.map(m=>({name:m.sales_order_no,value:m.sales_order_no})),H.value.push({name:"- Unselect -",value:null})}catch(o){console.error("Error fetching dropdown options:",o)}}),x(w,async t=>{console.log("changed state, load fetch data 1"),t&&(console.log("changed state, load fetch data 2"),k())}),x($,async t=>{console.log("changed state, load fetch data 1"),t&&(console.log("changed state, load fetch data 2"),k())}),x(S,async t=>{console.log("changed date, load fetch data 1"),t&&(console.log("changed date, load fetch data 2"),k())}),x(W,async t=>{console.log("changed date, load fetch data 1"),t&&(console.log("changed date, load fetch data 2"),k())});const De=t=>t,Xe=()=>{const t={"Record Type":"recordType","Receiver Code":"receiverCode","Receiver Name":"customer_name","Receiver Address 1":"street","Receiver Address 2":"street2","Receiver Address 3":"receiverAddress3","Receiver Suburb":"city","Receiver Postcode":"zip","Receiver Contact":"receiverContact","Receiver Phone":"phone",Email:"email","Reference 1":"sales_order_no","Reference 2":"","Special Instructions":"","Service Code":"serviceCode","Number of Items":"numberOfItems","Total Weight":"totalWeight","Total Cubic Volume":"totalCubicVolume","Authority to Leave":"authorityToLeave"},o=g.value.map(i=>{var te,oe,se,le;console.log(i),console.log(i.contact_address),i.recordType="C",i.receiverCode=null,i.street=i.contact_address[0].street,i.street2=i.contact_address[0].street2,i.receiverAddress3=null,i.city=i.contact_address[0].city,i.zip=i.contact_address[0].zip,i.receiverContact=i.customer_name,i.reference2=null,i.specialInstructions=null,i.serviceCode=(te=i.service_code)==null?void 0:te.service_code,i.numberOfItems=(oe=i.service_code)==null?void 0:oe.number_of_items,i.totalWeight=(se=i.service_code)==null?void 0:se.total_weight,i.totalCubicVolume=(le=i.service_code)==null?void 0:le.total_cubic_volume,i.authorityToLeave="Y";let D={};for(const[$e,xe]of Object.entries(t))D[$e]=i[xe];return console.log(D),D}),m=T.json_to_sheet(o),Q=T.book_new();T.book_append_sheet(Q,m,"Sheet1");const R=T.sheet_to_csv(m),e=new Blob([R],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(e),y=document.createElement("a");y.href=r,y.setAttribute("download","subs_to_deliver.csv"),document.body.appendChild(y),y.click(),document.body.removeChild(y)},Ie=async()=>{var t=g.value.map(m=>m.id);console.log(t);const o=JSON.stringify({filterSubIds:t,delivered_or_delivery_booked_by_id:b.currentUser.id});await U.post("/api/bulkConfirmDeliveryBooked",o,{headers:{"Content-Type":"application/json"}}),A.add({severity:"success",summary:`Successfully confirmed ${t.length} filter subs`,detail:"",life:3e3}),k(),g.value=[]};return(t,o)=>{const m=ce("Toast"),Q=ce("font-awesome-icon"),R=Pe("tooltip");return n(),v("div",We,[a("div",null,[a("div",Me,[S.value.length?(n(),v("div",Qe,[Ge,p(" "+d(ge(S.value)),1)])):h("",!0),w.value.length?(n(),v("div",Ke,[qe,p(" "+d(ke(w.value)),1)])):h("",!0)])]),l(m),l(s(re),{visible:z.value,"onUpdate:visible":o[0]||(o[0]=e=>z.value=e),header:E.value,class:"!w-full md:!w-80 lg:!w-[30rem]"},{default:u(()=>[a("p",null,[He,p(" "+d(Y.value),1)]),a("p",null,[Je,p(" "+d(ee.value),1)]),Ye,l(s(ae),{value:J.value,dataKey:"id",showGridlines:"",class:"mt-2"},{default:u(()=>[l(s(_),{field:"product",header:"Product",style:{"min-width":"10rem"}}),l(s(_),{field:"description",header:"Description",style:{"min-width":"10rem"}}),l(s(_),{field:"quantity",header:"Quantity",style:{"min-width":"5rem"}})]),_:1},8,["value"]),a("div",null,[j.value.contact_address[0].parent?(n(),v("p",et,[tt,ot,p(" "+d(j.value.contact_address[0].parent.complete_address),1)])):h("",!0)]),a("div",null,[(n(!0),v(G,null,K(j.value.contact_address[0].children,(e,r)=>(n(),v("p",{key:r},[st,lt,p(" "+d(e.complete_address),1)]))),128))])]),_:1},8,["visible","header"]),l(s(re),{visible:P.value,"onUpdate:visible":o[4]||(o[4]=e=>P.value=e),header:"Filters",position:"right",class:"!w-full md:!w-80 lg:!w-[30rem]"},{default:u(()=>[at,(n(!0),v(G,null,K(O.value,e=>(n(),v("div",{key:e.id,class:"flex items-center mb-2"},[l(s(ie),{modelValue:w.value,"onUpdate:modelValue":o[1]||(o[1]=r=>w.value=r),inputId:e.state_id,name:"stateIds",value:e.state_id},null,8,["modelValue","inputId","value"]),a("label",{for:e.id,class:"ml-2"},d(e.name),9,rt)]))),128)),it,(n(!0),v(G,null,K(pe.value,e=>(n(),v("div",{key:e.id,class:"flex items-center mb-2"},[l(s(ie),{modelValue:$.value,"onUpdate:modelValue":o[2]||(o[2]=r=>$.value=r),inputId:e.name,name:"category",value:e.name},null,8,["modelValue","inputId","value"]),a("label",{for:e.id,class:"ml-2"},d(e.name),9,dt)]))),128)),nt,l(s(Oe),{modelValue:S.value,"onUpdate:modelValue":o[3]||(o[3]=e=>S.value=e),selectionMode:"range",manualInput:!1},null,8,["modelValue"])]),_:1},8,["visible"]),g.value.length?(n(),X(s(Z),{key:0,label:"Export as Excel",onClick:Xe,class:"ml-4"})):h("",!0),g.value.length?(n(),X(s(Z),{key:1,label:`Mark All As Delivery Booked (${g.value.length})`,onClick:Ie,icon:"pi pi-truck",class:"ml-4"},null,8,["label"])):h("",!0),l(s(je),{rows:F.value,totalRecords:I.value,rowsPerPageOptions:[10,25,50,100,I.value].sort((e,r)=>e-r),onPage:fe},{start:u(e=>[p(d(f.filterSubs.from)+"-"+d(f.filterSubs.to)+" / "+d(f.filterSubs.total),1)]),_:1},8,["rows","totalRecords","rowsPerPageOptions"]),l(s(ae),{selection:g.value,"onUpdate:selection":o[7]||(o[7]=e=>g.value=e),value:De(f.filterSubs.data),lazy:"",loading:V.value,tableStyle:"min-width: 50rem",showGridlines:"",dataKey:"id",filterDisplay:"menu"},{header:u(()=>[a("div",ct,[l(s(Z),{type:"button",icon:"pi pi-filter-slash",label:"Clear",outlined:"",onClick:o[5]||(o[5]=e=>Se())}),l(s(Fe),null,{default:u(()=>[l(s(Re),null,{default:u(()=>[ut]),_:1}),a("div",null,[l(s(Z),{onClick:o[6]||(o[6]=e=>P.value=!0),label:"Filter",class:"mr-4"}),l(s(Ze),{placeholder:"Keyword Search",onInput:ye})])]),_:1})])]),empty:u(()=>[p(" No filterSubs found. ")]),loading:u(()=>[p(" Loading filterSubs data. Please wait. ")]),default:u(()=>[l(s(_),{selectionMode:"multiple",headerStyle:"width: 3rem"}),l(s(_),{field:"root_sales_order.sales_order_no",header:"Root Sales Order #",style:{"min-width":"10rem"}},{body:u(({data:e})=>[a("div",vt,[a("span",null,d(e.root_sales_order.sales_order_no),1),l(s(Ne)),a("div",{onClick:r=>q(e.root_sales_order.sales_order_no,e.sales_order_no,e.id),style:{cursor:"pointer","margin-left":"8px"}},[l(Q,{icon:["fas","link-slash"],style:{color:"#800000"}})],8,_t)])]),_:1}),l(s(_),{field:"sales_order_no",header:"Sales Order No.",style:{"min-width":"10rem"}},{body:u(({data:e})=>[a("span",{onClick:r=>we(e),class:"cursor-pointer hover:underline"},d(e.sales_order_no),9,mt),e.delivered_or_delivery_booked&&e.delivered_or_delivery_booked.value!==null?(n(),v("i",pt)):h("",!0)]),_:1}),l(s(_),{field:"",header:"Delivered or Delivery Booked",style:{"min-width":"10rem"}},{body:u(({data:e})=>[a("div",ht,[l(s(de),{modelValue:e.delivered_or_delivery_booked,"onUpdate:modelValue":r=>e.delivered_or_delivery_booked=r,options:he.value,filter:"",optionLabel:"name",placeholder:"Select Confirmation",class:"w-full md:w-14rem",onChange:r=>Ce(e)},{value:u(r=>{var y;return[r.value?(n(),v("div",ft,[e.delivered_or_delivery_booked&&e.delivered_or_delivery_booked.value!==null?(n(),v("div",yt,d(((y=e.delivered_or_delivery_booked)==null?void 0:y.name)||e.delivered_or_delivery_booked),1)):(n(),v("div",bt,d(r.placeholder),1))])):(n(),v("span",gt,d(r.placeholder),1))]}),option:u(r=>[a("div",kt,[a("div",null,d(r.option.name),1)])]),_:2},1032,["modelValue","onUpdate:modelValue","options","onChange"]),e.delivered_or_delivery_booked_by_id?ue((n(),X(s(ve),{key:0,class:"ml-2",style:{"background-color":"#ffffff",color:"#ffffff"}},{default:u(()=>[a("img",{src:e.delivered_or_delivery_booked_by.profile_photo_url,alt:"User Initials"},null,8,St)]),_:2},1024)),[[R,`Last updated by:
${e.delivered_or_delivery_booked_by.name}`]]):h("",!0)])]),_:1}),l(s(_),{field:"",header:"Service Code",style:{"min-width":"10rem"}},{body:u(({data:e})=>[a("div",wt,[l(s(de),{modelValue:e.service_code_id,"onUpdate:modelValue":r=>e.service_code_id=r,options:N.value,filter:"",optionLabel:"name",placeholder:"Select Code",class:"w-full md:w-14rem",onChange:r=>Ae(e)},{value:u(r=>{var y,i,D;return[r.value?(n(),v("div",Ct,[e.service_code_id.name=="- Unselect -"&&e.service_code_id.value==null?(n(),v("div",At,d(r.placeholder),1)):e.service_code_id&&e.service_code_id.value==null?(n(),v("div",Dt,[a("div",null,d(e.service_code.service_code),1),e.service_code.total_weight?(n(),v("div",Xt,"("+d(e.service_code.total_weight)+"kg) ",1)):h("",!0)])):e.service_code_id.value!==null?(n(),v("div",It,[a("div",null,d(((y=e.service_code_id)==null?void 0:y.name)||""),1),(i=e.service_code_id)!=null&&i.totalWeight?(n(),v("div",$t,"("+d((D=e.service_code_id)==null?void 0:D.totalWeight)+"kg) ",1)):h("",!0)])):(n(),v("div",xt,d(r.placeholder),1))])):(n(),v("span",Ut,d(r.placeholder),1))]}),option:u(r=>[a("div",Vt,[a("div",null,d(r.option.name),1),r.option.totalWeight?(n(),v("div",Ot,"("+d(r.option.totalWeight)+"kg) ",1)):h("",!0)])]),_:2},1032,["modelValue","onUpdate:modelValue","options","onChange"]),e.service_code_updated_by_id?ue((n(),X(s(ve),{key:0,class:"ml-2",style:{"background-color":"#ffffff",color:"#ffffff"}},{default:u(()=>[a("img",{src:e.service_code_updated_by.profile_photo_url,alt:"User Initials"},null,8,jt)]),_:2},1024)),[[R,`Last updated by:
${e.service_code_updated_by.name}`]]):h("",!0)])]),_:1}),l(s(_),{field:"customer_name",header:"Customer Name",style:{"min-width":"10rem"},filterField:"customer_name"}),l(s(_),{field:"address",header:"Address",style:{"min-width":"10rem"}}),l(s(_),{field:"activity_summary",header:"Activity Summary",style:{"min-width":"10rem"}}),l(s(_),{field:"start_date",header:"Start Date",style:{"min-width":"10rem"}},{body:u(({data:e})=>[p(d(M(e.start_date)),1)]),_:1}),l(s(_),{field:"due_date",header:"Due Date",style:{"min-width":"10rem"}},{body:u(({data:e})=>[p(d(M(e.due_date)),1)]),_:1}),l(s(_),{field:"invoice_number",header:"Invoice Number",style:{"min-width":"10rem"}}),l(s(_),{field:"invoice_date",header:"Invoice Date",style:{"min-width":"10rem"}},{body:u(({data:e})=>[p(d(M(e.invoice_date)),1)]),_:1}),l(s(_),{field:"state_id",header:"State",style:{"min-width":"10rem"}},{body:u(({data:e})=>{var r;return[p(d((r=O.value[e.state_id-1])==null?void 0:r.name),1)]}),_:1}),l(s(_),{field:"phone",header:"Phone",style:{"min-width":"10rem"}}),l(s(_),{field:"email",header:"Email",style:{"min-width":"10rem"}}),l(s(_),{field:"payment_status",header:"Payment Status",style:{"min-width":"10rem"}},{body:u(({data:e})=>[e.payment_status==="paid"?(n(),X(s(Te),{key:0,severity:"success",value:"Paid"})):h("",!0)]),_:1})]),_:1},8,["selection","value","loading"])])}}},Rt={class:"bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg"},Nt={__name:"SubscriptionsToDeliver",props:{filterSubs:Object,filterSubIds:Object,stateIds:Object,serviceCodes:Object,users:Object},setup(f){const B=Ee();return(q,b)=>(n(),X(Ue,{title:"SubscriptionsToDeliver"},{default:u(()=>[a("div",Rt,[l(Ft,{filterSubs:f.filterSubs,stateIds:f.stateIds,filterSubIds:f.filterSubIds,currentUser:s(B).props.auth.user,users:f.users,serviceCodes:f.serviceCodes},null,8,["filterSubs","stateIds","filterSubIds","currentUser","users","serviceCodes"])])]),_:1}))}};export{Nt as default};
