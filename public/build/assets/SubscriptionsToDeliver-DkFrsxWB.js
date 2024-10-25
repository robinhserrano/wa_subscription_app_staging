import{_ as Re}from"./AppLayout-Dc_zoX3C.js";import{d as Ze,s as ce,a as _,b as ue,c as ve,e as Te,f as X,g as Be,h as Le,i as ze,j as Ee,k as _e,l as Ne}from"./primeicons-C8S4HOxn.js";import{p as Pe,d as n,s as We,x as Me,y as me,z as O,A as $,B as pe,C as Qe,o as i,e as v,a as s,g as h,t as d,f as p,b as a,w as c,u as o,F as H,h as J,c as k,l as Y,Q as Ge}from"./app-CylDdwh7.js";import{u as z}from"./xlsx-YQvpTstd.js";import{s as Ke}from"./index-DuJYH4Fx.js";import{s as ee}from"./index-D4drrCNJ.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const qe={class:"card"},He={class:"m-4 my-4"},Je={key:0},Ye=s("i",{class:"pi pi-calendar"},null,-1),et={key:1},tt=s("i",{class:"pi pi-map-marker"},null,-1),lt=s("i",{class:"pi pi-user"},null,-1),ot=s("i",{class:"pi pi-map-marker mt-2"},null,-1),st=s("p",{class:"mt-6"}," Order Lines:",-1),at={key:0},rt=s("p",{class:"mt-6 mb-2"}," Other Address:",-1),it=s("i",{class:"pi pi-building-columns"},null,-1),dt=s("p",{class:"mt-6 mb-2"}," Other Address:",-1),nt=s("i",{class:"pi pi-building"},null,-1),ct=s("p",{class:"mb-2 text-xl font-bold"},"States",-1),ut=["for"],vt=s("p",{class:"mt-4 mb-2 text-xl font-bold"},"Activity Summary",-1),_t=["for"],mt=s("p",{class:"mt-4 mb-2 text-xl font-bold"},"Date Range",-1),pt={class:"font-bold"},ft={class:"flex justify-between"},ht=s("i",{class:"pi pi-search"},null,-1),yt={style:{display:"flex","align-items":"center"}},bt=["onClick"],gt=["onClick"],kt={class:"flex items-center"},St={key:0,class:"pi pi-truck ml-2"},wt=["src"],Ct={class:"flex items-center"},At={key:0,class:"flex align-items-center"},Dt={key:0},It={key:1},Xt={key:1},$t={class:"flex align-items-center"},Ut=["src"],xt={class:"flex items-center"},Vt={key:0,class:"flex align-items-center"},Ot={key:0},jt={key:1},Ft={key:0},Rt={key:2},Zt={key:0},Tt={key:3},Bt={key:1},Lt={class:"flex align-items-center"},zt={key:0,class:"ml-1"},Et=["src"],Nt={__name:"SubsToDeliverDataTable",props:{filterSubs:Object,stateIds:Object,deliverSubIds:Object,currentUser:Object,users:Object,serviceCodes:Object},setup(f){const E=Pe(),te=(t,l,m)=>{E.require({message:`Do you want to unlink #${l} from #${t}?`,header:"Unlink Sales Order",icon:"pi pi-info-circle",rejectLabel:"Cancel",rejectProps:{label:"Cancel",severity:"secondary",outlined:!0},acceptProps:{label:"Unlink",severity:"danger"},accept:async()=>{await $.delete(`/api/deliverSub/${m}`),w(),S.add({severity:"info",summary:"Unlinked Successfully",detail:`Unlinked #${l} from #${t}`,life:3e3})},reject:()=>{}})};let g=f;const y=n([]);n();const j=n(!0),I=n(1),U=n(0),N=n(),P=n(!1),W=n(!1),fe=n(),le=n([]),S=We(),F=n([]),M=n(),oe=n(),se=n(),ae=n(),he=n([]),Q=n([]);n(),n([{id:1,name:"Subscription"}]);const ye=n([{id:1,name:"Send 1st Stage Filter"},{id:2,name:"Independent 3 + 3 Due for Change"},{id:3,name:"Independent 3 + 3 Expires"},{id:4,name:"3 + 3 Stage Filter"},{id:5,name:"3 Stage Filter"},{id:6,name:"3 + 3 Stage Filter Expires"},{id:7,name:"3 Stage Filter Expires"},{id:8,name:"Final Date to Order Filters for Warranty Extension"}]);n([{name:"Confirm",value:"Confirm"},{name:"Deny",value:"Deny"},{name:"- Unselect -",value:null}]);const be=n([{name:"Delivery Booked",value:"Delivery Booked"},{name:"- Unselect -",value:null}]),C=n([]),R=n(),A=n([]),x=n([]),G=n([]),Z=n(100);Me(()=>{j.value=!1,U.value=g.filterSubs.total,fe.value=g.salesQuotations,F.value=g.stateIds,Q.value=g.serviceCodes.map(t=>({name:t.service_code,value:t.id,totalWeight:t.total_weight})),Q.value.push({name:"- Unselect -",value:null,totalWeight:null}),console.log("aaaaaaaaa"),console.log(g.serviceCodes),console.log("zzzzzzzzzzz")});const ge=t=>{Z.value=t.rows,I.value=t.page+1,console.log("page change"),console.log(I.value),w()},ke=t=>{N.value=t.target.value,console.log(t.target.value),Se()},w=async()=>{try{console.log("fetch data page"),console.log(I.value);const t=await me.get("/subscriptionsToDeliver",{page:I.value,search:N.value,dates:C.value,stateId:A.value,activitySummary:x.value,categories:G.value,perPage:Z.value},{preserveState:!0,replace:!1,onSuccess:l=>{console.log(l),console.log(l.props.filterSubs.total),U.value=l.props.filterSubs.total}})}catch(t){console.error("Error fetching data:",t)}finally{j.value=!1}},Se=Ze(async()=>{try{console.log("fetch data page"),console.log(I.value);const t=await me.get("/subscriptionsToDeliver",{page:I.value,search:N.value,dates:C.value,stateId:A.value,activitySummary:x.value,categories:G.value,perPage:Z.value},{preserveState:!0,replace:!1,onSuccess:l=>{console.log(l),console.log(l.props.filterSubs.total),U.value=l.props.filterSubs.total}})}catch(t){console.error("Error fetching data:",t)}finally{j.value=!1}},300),K=t=>t?new Date(t).toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}):null,we=t=>{if(!t||t.length===0)return"";const l=new Date(t[0]),m=t[1]?new Date(t[1]):l;return`${l.toLocaleDateString("en-PH",{day:"2-digit",month:"2-digit",year:"numeric"})} to ${m.toLocaleDateString("en-PH",{day:"2-digit",month:"2-digit",year:"numeric"})}`},Ce=t=>t.map(l=>{var m;return(m=F.value[l-1])==null?void 0:m.code}).join(", "),Ae=()=>{initFilters()},De=t=>{P.value=!0,M.value=t.sales_order_no,oe.value=t.order_line,se.value=t.customer_name,ae.value=t.address,he.value=t.contact_address,R.value=t},Ie=async t=>{try{const l=await $.put(`/api/updateDeliveredOrDeliveryBooked/${t.id}`,{delivered_or_delivery_booked:t.delivered_or_delivery_booked.value,delivered_or_delivery_booked_by_id:g.currentUser.id});S.add({severity:"success",summary:`Updated #${t.sales_order_no} delivered or delivery booked status`,detail:"",life:3e3})}catch(l){console.error("Failed to update delivered_or_delivery_booked:",l),S.add({severity:"error",summary:"Failed Message",detail:"Message Content",life:3e3})}},Xe=async t=>{try{console.log(t);const l=await $.put(`/api/updateServiceCode/${t.id}`,{service_code_id:t.service_code_id.value,service_code_updated_by_id:g.currentUser.id});S.add({severity:"success",summary:`Updated #${t.sales_order_no}'s service code`,detail:"",life:3e3}),w()}catch(l){console.error("Failed to update delivered_or_delivery_booked:",l),S.add({severity:"error",summary:"Failed Message",detail:"Message Content",life:3e3})}};O(M,async t=>{if(t)try{const l=await $.get("/api/findSalesOrdersBySalesOrderNo",{params:{sales_order_no:t}});console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZZZZZZZZZZZZZZZZZZZZZ"),console.log(l),console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"),le.value=l.data.map(m=>({name:m.sales_order_no,value:m.sales_order_no})),le.value.push({name:"- Unselect -",value:null})}catch(l){console.error("Error fetching dropdown options:",l)}}),O(A,async t=>{console.log("changed state, load fetch data 1"),t&&(console.log("changed state, load fetch data 2"),w())}),O(x,async t=>{console.log("changed state, load fetch data 1"),t&&(console.log("changed state, load fetch data 2"),w())}),O(C,async t=>{console.log("changed date, load fetch data 1"),t&&(console.log("changed date, load fetch data 2"),w())}),O(G,async t=>{console.log("changed date, load fetch data 1"),t&&(console.log("changed date, load fetch data 2"),w())});const $e=t=>t,Ue=async t=>{var m,T;const l={"Record Type":"recordType","Receiver Code":"receiverCode","Receiver Name":"customer_name","Receiver Address 1":"street","Receiver Address 2":"street2","Receiver Address 3":"receiverAddress3","Receiver Suburb":"city","Receiver Postcode":"zip","Receiver Contact":"receiverContact","Receiver Phone":"phone",Email:"email","Reference 1":"sales_order_no","Reference 2":"","Special Instructions":"","Service Code":"serviceCode","Number of Items":"numberOfItems","Total Weight":"totalWeight","Total Cubic Volume":"totalCubicVolume","Authority to Leave":"authorityToLeave"};try{const b=await $.post("/api/getDeliverySubByIds",{deliverSubIds:t});if(b.status===200){console.log(b.data),console.log(b.data.deliverSubs),console.log("haha");const e=b.data.deliverSubs.map(u=>{var re,ie,de,ne;console.log("batmannnn"),console.log(u),console.log(u.contact_address),u.recordType="C",u.receiverCode=null,u.street=u.contact_address[0].street,u.street2=u.contact_address[0].street2,u.receiverAddress3=null,u.city=u.contact_address[0].city,u.zip=u.contact_address[0].zip,u.receiverContact=u.customer_name,u.reference2=null,u.specialInstructions=null,u.serviceCode=(re=u.service_code)==null?void 0:re.service_code,u.numberOfItems=(ie=u.service_code)==null?void 0:ie.number_of_items,u.totalWeight=(de=u.service_code)==null?void 0:de.total_weight,u.totalCubicVolume=(ne=u.service_code)==null?void 0:ne.total_cubic_volume,u.authorityToLeave="Y";let q={};for(const[je,Fe]of Object.entries(l))q[je]=u[Fe];return console.log(q),q}),r=z.json_to_sheet(e),D=z.book_new();z.book_append_sheet(D,r,"Sheet1");const B=z.sheet_to_csv(r),L=new Blob([B],{type:"text/csv;charset=utf-8;"}),Oe=URL.createObjectURL(L),V=document.createElement("a");V.href=Oe,V.setAttribute("download","subs_to_deliver.csv"),document.body.appendChild(V),V.click(),document.body.removeChild(V)}else S.error("Error: Unable to fetch delivery subscriptions.")}catch(b){S.error("Error: "+(((T=(m=b.response)==null?void 0:m.data)==null?void 0:T.message)||"Network Error"))}},xe=async t=>{y.value=t},Ve=async()=>{var t=y.value.map(m=>m.id);console.log(t);const l=JSON.stringify({deliverSubIds:t,delivered_or_delivery_booked_by_id:g.currentUser.id});await $.post("/api/bulkConfirmDeliveryBooked",l,{headers:{"Content-Type":"application/json"}}),S.add({severity:"success",summary:`Successfully confirmed ${t.length} filter subs`,detail:"",life:3e3}),w(),y.value=[]};return(t,l)=>{const m=pe("Toast"),T=pe("font-awesome-icon"),b=Qe("tooltip");return i(),v("div",qe,[s("div",null,[s("div",He,[C.value.length?(i(),v("div",Je,[Ye,h(" "+d(we(C.value)),1)])):p("",!0),A.value.length?(i(),v("div",et,[tt,h(" "+d(Ce(A.value)),1)])):p("",!0)])]),a(m),a(o(ue),{visible:P.value,"onUpdate:visible":l[0]||(l[0]=e=>P.value=e),header:M.value,class:"!w-full md:!w-80 lg:!w-[30rem]"},{default:c(()=>[s("p",null,[lt,h(" "+d(se.value),1)]),s("p",null,[ot,h(" "+d(ae.value),1)]),st,a(o(ce),{value:oe.value,dataKey:"id",showGridlines:"",class:"mt-2"},{default:c(()=>[a(o(_),{field:"product",header:"Product",style:{"min-width":"10rem"}}),a(o(_),{field:"description",header:"Description",style:{"min-width":"10rem"}}),a(o(_),{field:"quantity",header:"Quantity",style:{"min-width":"5rem"}})]),_:1},8,["value"]),s("div",null,[R.value.contact_address[0].parent?(i(),v("p",at,[rt,it,h(" "+d(R.value.contact_address[0].parent.complete_address),1)])):p("",!0)]),s("div",null,[(i(!0),v(H,null,J(R.value.contact_address[0].children,(e,r)=>(i(),v("p",{key:r},[dt,nt,h(" "+d(e.complete_address),1)]))),128))])]),_:1},8,["visible","header"]),a(o(ue),{visible:W.value,"onUpdate:visible":l[4]||(l[4]=e=>W.value=e),header:"Filters",position:"right",class:"!w-full md:!w-80 lg:!w-[30rem]"},{default:c(()=>[ct,(i(!0),v(H,null,J(F.value,e=>(i(),v("div",{key:e.id,class:"flex items-center mb-2"},[a(o(ve),{modelValue:A.value,"onUpdate:modelValue":l[1]||(l[1]=r=>A.value=r),inputId:e.state_id,name:"stateIds",value:e.state_id},null,8,["modelValue","inputId","value"]),s("label",{for:e.id,class:"ml-2"},d(e.name),9,ut)]))),128)),vt,(i(!0),v(H,null,J(ye.value,e=>(i(),v("div",{key:e.id,class:"flex items-center mb-2"},[a(o(ve),{modelValue:x.value,"onUpdate:modelValue":l[2]||(l[2]=r=>x.value=r),inputId:e.name,name:"category",value:e.name},null,8,["modelValue","inputId","value"]),s("label",{for:e.id,class:"ml-2"},d(e.name),9,_t)]))),128)),mt,a(o(Te),{modelValue:C.value,"onUpdate:modelValue":l[3]||(l[3]=e=>C.value=e),selectionMode:"range",manualInput:!1},null,8,["modelValue"])]),_:1},8,["visible"]),y.value.length?(i(),k(o(X),{key:0,class:"ml-4",outlined:""},{default:c(()=>[s("p",pt,d(y.value.length),1),h("selected "),y.value.length<f.filterSubs.total?(i(),k(o(X),{key:0,label:`Select all ${f.deliverSubIds.length}`,onClick:l[5]||(l[5]=e=>xe(f.deliverSubIds)),icon:"pi pi-arrow-right",class:"ml-4",severity:"info"},null,8,["label"])):p("",!0)]),_:1})):p("",!0),y.value.length?(i(),k(o(X),{key:1,label:`Export as Excel (${y.value.length})`,onClick:l[6]||(l[6]=e=>Ue(y.value)),class:"ml-4"},null,8,["label"])):p("",!0),y.value.length?(i(),k(o(X),{key:2,label:`Mark All As Delivery Booked (${y.value.length})`,onClick:Ve,icon:"pi pi-truck",class:"ml-4"},null,8,["label"])):p("",!0),a(o(Be),{rows:Z.value,totalRecords:U.value,rowsPerPageOptions:[10,25,50,100,U.value].sort((e,r)=>e-r),onPage:ge},{start:c(e=>[h(d(f.filterSubs.from)+"-"+d(f.filterSubs.to)+" / "+d(f.filterSubs.total),1)]),_:1},8,["rows","totalRecords","rowsPerPageOptions"]),a(o(ce),{selection:y.value,"onUpdate:selection":l[9]||(l[9]=e=>y.value=e),value:$e(f.filterSubs.data),lazy:"",loading:j.value,tableStyle:"min-width: 50rem",showGridlines:"",dataKey:"id",filterDisplay:"menu"},{header:c(()=>[s("div",ft,[a(o(X),{type:"button",icon:"pi pi-filter-slash",label:"Clear",outlined:"",onClick:l[7]||(l[7]=e=>Ae())}),a(o(Le),null,{default:c(()=>[a(o(ze),null,{default:c(()=>[ht]),_:1}),s("div",null,[a(o(X),{onClick:l[8]||(l[8]=e=>W.value=!0),label:"Filter",class:"mr-4"}),a(o(Ee),{placeholder:"Keyword Search",onInput:ke})])]),_:1})])]),empty:c(()=>[h(" No filterSubs found. ")]),loading:c(()=>[h(" Loading filterSubs data. Please wait. ")]),default:c(()=>[a(o(_),{selectionMode:"multiple",headerStyle:"width: 3rem"}),a(o(_),{field:"root_sales_order.sales_order_no",header:"Root Sales Order #",style:{"min-width":"10rem"}},{body:c(({data:e})=>[s("div",yt,[s("span",null,d(e.root_sales_order.sales_order_no),1),a(o(Ke)),s("div",{onClick:r=>te(e.root_sales_order.sales_order_no,e.sales_order_no,e.id),style:{cursor:"pointer","margin-left":"8px"}},[a(T,{icon:["fas","link-slash"],style:{color:"#800000"}})],8,bt)])]),_:1}),a(o(_),{field:"sales_order_no",header:"Sales Order No.",style:{"min-width":"10rem"}},{body:c(({data:e})=>[s("span",{onClick:r=>De(e),class:"cursor-pointer hover:underline"},d(e.sales_order_no),9,gt),s("div",kt,[e.delivered_or_delivery_booked&&e.delivered_or_delivery_booked.value!==null?(i(),v("i",St)):p("",!0),e.odoo_created_by_id?Y((i(),k(o(ee),{key:1,class:"ml-2",style:{"background-color":"#ffffff",color:"#ffffff"}},{default:c(()=>[s("img",{src:e.odoo_created_by.profile_photo_url,alt:"User Initials"},null,8,wt)]),_:2},1024)),[[b,`Last updated by:
${e.odoo_created_by.name}`]]):p("",!0)])]),_:1}),a(o(_),{field:"",header:"Delivered or Delivery Booked",style:{"min-width":"10rem"}},{body:c(({data:e})=>[s("div",Ct,[a(o(_e),{modelValue:e.delivered_or_delivery_booked,"onUpdate:modelValue":r=>e.delivered_or_delivery_booked=r,options:be.value,filter:"",optionLabel:"name",placeholder:"Select Confirmation",class:"w-full md:w-14rem",onChange:r=>Ie(e)},{value:c(r=>{var D;return[r.value?(i(),v("div",At,[e.delivered_or_delivery_booked&&e.delivered_or_delivery_booked.value!==null?(i(),v("div",Dt,d(((D=e.delivered_or_delivery_booked)==null?void 0:D.name)||e.delivered_or_delivery_booked),1)):(i(),v("div",It,d(r.placeholder),1))])):(i(),v("span",Xt,d(r.placeholder),1))]}),option:c(r=>[s("div",$t,[s("div",null,d(r.option.name),1)])]),_:2},1032,["modelValue","onUpdate:modelValue","options","onChange"]),e.delivered_or_delivery_booked_by_id?Y((i(),k(o(ee),{key:0,class:"ml-2",style:{"background-color":"#ffffff",color:"#ffffff"}},{default:c(()=>[s("img",{src:e.delivered_or_delivery_booked_by.profile_photo_url,alt:"User Initials"},null,8,Ut)]),_:2},1024)),[[b,`Last updated by:
${e.delivered_or_delivery_booked_by.name}`]]):p("",!0)])]),_:1}),a(o(_),{field:"",header:"Service Code",style:{"min-width":"10rem"}},{body:c(({data:e})=>[s("div",xt,[a(o(_e),{modelValue:e.service_code_id,"onUpdate:modelValue":r=>e.service_code_id=r,options:Q.value,filter:"",optionLabel:"name",placeholder:"Select Code",class:"w-full md:w-14rem",onChange:r=>Xe(e)},{value:c(r=>{var D,B,L;return[r.value?(i(),v("div",Vt,[e.service_code_id.name=="- Unselect -"&&e.service_code_id.value==null?(i(),v("div",Ot,d(r.placeholder),1)):e.service_code_id&&e.service_code_id.value==null?(i(),v("div",jt,[s("div",null,d(e.service_code.service_code),1),e.service_code.total_weight?(i(),v("div",Ft,"("+d(e.service_code.total_weight)+"kg) ",1)):p("",!0)])):e.service_code_id.value!==null?(i(),v("div",Rt,[s("div",null,d(((D=e.service_code_id)==null?void 0:D.name)||""),1),(B=e.service_code_id)!=null&&B.totalWeight?(i(),v("div",Zt,"("+d((L=e.service_code_id)==null?void 0:L.totalWeight)+"kg) ",1)):p("",!0)])):(i(),v("div",Tt,d(r.placeholder),1))])):(i(),v("span",Bt,d(r.placeholder),1))]}),option:c(r=>[s("div",Lt,[s("div",null,d(r.option.name),1),r.option.totalWeight?(i(),v("div",zt,"("+d(r.option.totalWeight)+"kg) ",1)):p("",!0)])]),_:2},1032,["modelValue","onUpdate:modelValue","options","onChange"]),e.service_code_updated_by_id?Y((i(),k(o(ee),{key:0,class:"ml-2",style:{"background-color":"#ffffff",color:"#ffffff"}},{default:c(()=>[s("img",{src:e.service_code_updated_by.profile_photo_url,alt:"User Initials"},null,8,Et)]),_:2},1024)),[[b,`Last updated by:
${e.service_code_updated_by.name}`]]):p("",!0)])]),_:1}),a(o(_),{field:"customer_name",header:"Customer Name",style:{"min-width":"10rem"},filterField:"customer_name"}),a(o(_),{field:"address",header:"Address",style:{"min-width":"10rem"}}),a(o(_),{field:"activity_summary",header:"Activity Summary",style:{"min-width":"10rem"}}),a(o(_),{field:"start_date",header:"Start Date",style:{"min-width":"10rem"}},{body:c(({data:e})=>[h(d(K(e.start_date)),1)]),_:1}),a(o(_),{field:"due_date",header:"Due Date",style:{"min-width":"10rem"}},{body:c(({data:e})=>[h(d(K(e.due_date)),1)]),_:1}),a(o(_),{field:"invoice_number",header:"Invoice Number",style:{"min-width":"10rem"}}),a(o(_),{field:"invoice_date",header:"Invoice Date",style:{"min-width":"10rem"}},{body:c(({data:e})=>[h(d(K(e.invoice_date)),1)]),_:1}),a(o(_),{field:"state_id",header:"State",style:{"min-width":"10rem"}},{body:c(({data:e})=>{var r;return[h(d((r=F.value[e.state_id-1])==null?void 0:r.name),1)]}),_:1}),a(o(_),{field:"phone",header:"Phone",style:{"min-width":"10rem"}}),a(o(_),{field:"email",header:"Email",style:{"min-width":"10rem"}}),a(o(_),{field:"payment_status",header:"Payment Status",style:{"min-width":"10rem"}},{body:c(({data:e})=>[e.payment_status==="paid"?(i(),k(o(Ne),{key:0,severity:"success",value:"Paid"})):p("",!0)]),_:1})]),_:1},8,["selection","value","loading"])])}}},Pt={class:"bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg"},Jt={__name:"SubscriptionsToDeliver",props:{filterSubs:Object,filterSubIds:Object,stateIds:Object,serviceCodes:Object,users:Object},setup(f){const E=Ge();return(te,g)=>(i(),k(Re,{title:"SubscriptionsToDeliver"},{default:c(()=>[s("div",Pt,[a(Nt,{filterSubs:f.filterSubs,stateIds:f.stateIds,deliverSubIds:f.filterSubIds,currentUser:o(E).props.auth.user,users:f.users,serviceCodes:f.serviceCodes},null,8,["filterSubs","stateIds","deliverSubIds","currentUser","users","serviceCodes"])])]),_:1}))}};export{Jt as default};
