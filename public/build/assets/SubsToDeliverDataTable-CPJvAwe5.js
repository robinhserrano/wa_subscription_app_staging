import{s as de}from"./index-CWCLOLff.js";import{d as Le,s as ne,a as _,b as ce,c as ue,e as I,f as Ne,g as Pe,h as We,i as Me,j as ve,k as _e,l as ze}from"./primeicons-J1JNrsQH.js";import{s as qe}from"./index-ABDUfVYr.js";import{p as Ge,q as Ke,d as u,s as Qe,x as me,y as U,z as He,A as pe,B as Je,o as a,e as v,a as r,g as y,t as d,f as p,b as i,w as n,u as s,F as K,h as Q,c as b,l as E,C as ye,D as he}from"./app-BqipoHyu.js";import{u as L}from"./xlsx-YQvpTstd.js";const Ye={class:"card"},Xe={class:"m-4 my-4"},Ze={key:0},et=r("i",{class:"pi pi-calendar"},null,-1),tt={key:1},lt=r("i",{class:"pi pi-map-marker"},null,-1),st=r("i",{class:"pi pi-user"},null,-1),ot=r("i",{class:"pi pi-map-marker mt-2"},null,-1),it=r("p",{class:"mt-6"}," Order Lines:",-1),rt={key:0},at=r("p",{class:"mt-6 mb-2"}," Other Address:",-1),dt=r("i",{class:"pi pi-building-columns"},null,-1),nt=r("p",{class:"mt-6 mb-2"}," Other Address:",-1),ct=r("i",{class:"pi pi-building"},null,-1),ut=r("p",{class:"mb-2 text-xl font-bold"},"States",-1),vt=["for"],_t=r("p",{class:"mt-4 mb-2 text-xl font-bold"},"Activity Summary",-1),mt=["for"],pt={class:"font-bold"},yt={class:"flex justify-between"},ht=r("i",{class:"pi pi-search"},null,-1),ft={style:{display:"flex","align-items":"center"}},bt=["onClick"],kt=["onClick"],gt={class:"flex items-center"},St={key:0},wt={key:1,class:"pi pi-truck ml-2"},Ct={class:"flex items-center"},Dt={key:0,class:"flex align-items-center"},$t={key:0},It={key:1},Ut={key:1},Ft={class:"flex align-items-center"},Vt=["src"],xt={class:"flex items-center"},At={key:0,class:"flex align-items-center"},Ot={key:0},Tt={key:1},Rt={key:0},Bt={key:2},jt={key:0},Et={key:3},Lt={key:1},Nt={class:"flex align-items-center"},Pt={key:0,class:"ml-1"},Wt=["src"],Qt={__name:"SubsToDeliverDataTable",props:{filterSubs:Object,stateIds:Object,deliverSubIds:Object,currentUser:Object,users:Object,serviceCodes:Object,filters:Object},setup(k){const fe=Ge(),g=Ke(),H=u(1),x=u([]),J=u([]),F=u(),N=u(!0),be=u(),A=u([]),Y=u([]),X=u(),ke=u([]),Z=u(),h=u([]),P=u(100),O=u(),W=u(),ee=u(),C=u([]),M=u([]),T=u([]),R=u(0),z=u(!1),q=u(!1),te=u(),ge=u([{id:1,name:"Send 1st Stage Filter"},{id:2,name:"Independent 3 + 3 Due for Change"},{id:3,name:"Independent 3 + 3 Expires"},{id:4,name:"3 + 3 Stage Filter"},{id:5,name:"3 Stage Filter"},{id:6,name:"3 + 3 Stage Filter Expires"},{id:7,name:"3 Stage Filter Expires"},{id:8,name:"Final Date to Order Filters for Warranty Extension"}]),Se=u([{name:"Delivery Booked",value:"Delivery Booked"},{name:"- Unselect -",value:null}]);let S=k;Qe(()=>{N.value=!1,R.value=S.filterSubs.total,be.value=S.salesQuotations,T.value=S.stateIds,M.value=S.serviceCodes.map(t=>({name:t.service_code,value:t.id,totalWeight:t.total_weight})),M.value.push({name:"- Unselect -",value:null,totalWeight:null})});const le=()=>{F.value={start_date:{operator:ye.AND,constraints:[{value:null,matchMode:he.DATE_IS}]},due_date:{operator:ye.AND,constraints:[{value:null,matchMode:he.DATE_IS}]}}};le(),me(W,async t=>{if(t)try{const l=await U.get("/api/findSalesOrdersBySalesOrderNo",{params:{sales_order_no:t}});J.value=l.data.map(m=>({name:m.sales_order_no,value:m.sales_order_no})),J.value.push({name:"- Unselect -",value:null})}catch(l){console.error("Error fetching dropdown options:",l)}}),me([()=>x.value,()=>C.value,()=>A.value,()=>Y.value,()=>F.value],()=>{D()});const we=()=>{le()},Ce=async t=>{var m,$;const l={"Record Type":"recordType","Receiver Code":"receiverCode","Receiver Name":"customer_name","Receiver Address 1":"street","Receiver Address 2":"street2","Receiver Address 3":"receiverAddress3","Receiver Suburb":"city","Receiver Postcode":"zip","Receiver Contact":"receiverContact","Receiver Phone":"phone",Email:"email","Reference 1":"sales_order_no","Reference 2":"","Special Instructions":"","Service Code":"serviceCode","Number of Items":"numberOfItems","Total Weight":"totalWeight","Total Cubic Volume":"totalCubicVolume","Authority to Leave":"authorityToLeave"};try{const f=await U.post("/api/getDeliverySubByIds",{deliverSubIds:t});if(f.status===200){const e=f.data.deliverSubs.map(c=>{var oe,ie,re,ae;c.recordType="C",c.receiverCode=null,c.street=c.contact_address[0].street,c.street2=c.contact_address[0].street2,c.receiverAddress3=null,c.city=c.contact_address[0].city,c.zip=c.contact_address[0].zip,c.receiverContact=c.customer_name,c.reference2=null,c.specialInstructions=null,c.serviceCode=(oe=c.service_code)==null?void 0:oe.service_code,c.numberOfItems=(ie=c.service_code)==null?void 0:ie.number_of_items,c.totalWeight=(re=c.service_code)==null?void 0:re.total_weight,c.totalCubicVolume=(ae=c.service_code)==null?void 0:ae.total_cubit_volume,c.authorityToLeave="Y";let se={};for(const[je,Ee]of Object.entries(l))se[je]=c[Ee];return se}),o=L.json_to_sheet(e),w=L.book_new();L.book_append_sheet(w,o,"Sheet1");const B=L.sheet_to_csv(o),j=new Blob([B],{type:"text/csv;charset=utf-8;"}),Be=URL.createObjectURL(j),V=document.createElement("a");V.href=Be,V.setAttribute("download","subs_to_deliver.csv"),document.body.appendChild(V),V.click(),document.body.removeChild(V)}else g.error("Error: Unable to fetch delivery subscriptions.")}catch(f){g.error("Error: "+((($=(m=f.response)==null?void 0:m.data)==null?void 0:$.message)||"Network Error"))}},D=async()=>{try{var t=route().current("subscriptionsToDeliverFilterSubscription")?"/subscriptionsToDeliverFilterSubscription":"/subscriptionsToDeliver";const l=He.get(t,{page:H.value,search:te.value,dates:x.value,stateId:C.value,activitySummary:A.value,categories:Y.value,perPage:P.value,filters:JSON.stringify(F.value)},{preserveState:!0,replace:!1,onSuccess:m=>{R.value=m.props.filterSubs.total}})}catch(l){console.error("Error fetching data:",l)}finally{N.value=!1}},De=Le(D,300),G=t=>t?new Date(t).toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}):null,$e=t=>{if(!t||t.length===0)return"";const l=new Date(t[0]),m=t[1]?new Date(t[1]):l;return`${l.toLocaleDateString("en-PH",{day:"2-digit",month:"2-digit",year:"numeric"})} to ${m.toLocaleDateString("en-PH",{day:"2-digit",month:"2-digit",year:"numeric"})}`},Ie=t=>t.map(l=>{var m;return(m=T.value[l-1])==null?void 0:m.code}).join(", "),Ue=t=>{z.value=!0,W.value=t.sales_order_no,ee.value=t.order_line,Z.value=t.customer_name,X.value=t.address,ke.value=t.contact_address,O.value=t},Fe=t=>{P.value=t.rows,H.value=t.page+1,D()},Ve=t=>{te.value=t.target.value,De()},xe=async t=>{try{const l=await U.put(`/api/updateDeliveredOrDeliveryBooked/${t.id}`,{delivered_or_delivery_booked:t.delivered_or_delivery_booked.value,delivered_or_delivery_booked_by_id:S.currentUser.id});g.add({severity:"success",summary:`Updated #${t.sales_order_no} delivered or delivery booked status`,detail:"",life:3e3})}catch(l){console.error("Failed to update delivered_or_delivery_booked:",l),g.add({severity:"error",summary:"Failed Message",detail:"Message Content",life:3e3})}},Ae=async t=>{try{const l=await U.put(`/api/updateServiceCode/${t.id}`,{service_code_id:t.service_code_id.value,service_code_updated_by_id:S.currentUser.id});g.add({severity:"success",summary:`Updated #${t.sales_order_no}'s service code`,detail:"",life:3e3}),D()}catch(l){console.error("Failed to update delivered_or_delivery_booked:",l),g.add({severity:"error",summary:"Failed Message",detail:"Message Content",life:3e3})}},Oe=(t,l,m)=>{fe.require({message:`Do you want to unlink #${l} from #${t}?`,header:"Unlink Sales Order",icon:"pi pi-info-circle",rejectLabel:"Cancel",rejectProps:{label:"Cancel",severity:"secondary",outlined:!0},acceptProps:{label:"Unlink",severity:"danger"},accept:async()=>{await U.delete(`/api/deliverSub/${m}`),D(),g.add({severity:"info",summary:"Unlinked Successfully",detail:`Unlinked #${l} from #${t}`,life:3e3})},reject:()=>{}})},Te=async()=>{var t=h.value.map(m=>m.id);const l=JSON.stringify({deliverSubIds:t,delivered_or_delivery_booked_by_id:S.currentUser.id});await U.post("/api/bulkConfirmDeliveryBooked",l,{headers:{"Content-Type":"application/json"}}),g.add({severity:"success",summary:`Successfully confirmed ${t.length} filter subs`,detail:"",life:3e3}),D(),h.value=[]},Re=async t=>{h.value=t};return(t,l)=>{const m=pe("Toast"),$=pe("font-awesome-icon"),f=Je("tooltip");return a(),v("div",Ye,[r("div",null,[r("div",Xe,[x.value.length?(a(),v("div",Ze,[et,y(" "+d($e(x.value)),1)])):p("",!0),C.value.length?(a(),v("div",tt,[lt,y(" "+d(Ie(C.value)),1)])):p("",!0)])]),i(m),i(s(ce),{visible:z.value,"onUpdate:visible":l[0]||(l[0]=e=>z.value=e),header:W.value,class:"!w-full md:!w-80 lg:!w-[30rem]"},{default:n(()=>[r("p",null,[st,y(" "+d(Z.value),1)]),r("p",null,[ot,y(" "+d(X.value),1)]),it,i(s(ne),{value:ee.value,dataKey:"id",showGridlines:"",class:"mt-2"},{default:n(()=>[i(s(_),{field:"product",header:"Product",style:{"min-width":"10rem"}}),i(s(_),{field:"description",header:"Description",style:{"min-width":"10rem"}}),i(s(_),{field:"quantity",header:"Quantity",style:{"min-width":"5rem"}})]),_:1},8,["value"]),r("div",null,[O.value.contact_address[0].parent?(a(),v("p",rt,[at,dt,y(" "+d(O.value.contact_address[0].parent.complete_address),1)])):p("",!0)]),r("div",null,[(a(!0),v(K,null,Q(O.value.contact_address[0].children,(e,o)=>(a(),v("p",{key:o},[nt,ct,y(" "+d(e.complete_address),1)]))),128))])]),_:1},8,["visible","header"]),i(s(ce),{visible:q.value,"onUpdate:visible":l[3]||(l[3]=e=>q.value=e),header:"Filters",position:"right",class:"!w-full md:!w-80 lg:!w-[30rem]"},{default:n(()=>[ut,(a(!0),v(K,null,Q(T.value,e=>(a(),v("div",{key:e.id,class:"flex items-center mb-2"},[i(s(ue),{modelValue:C.value,"onUpdate:modelValue":l[1]||(l[1]=o=>C.value=o),inputId:e.state_id,name:"stateIds",value:e.state_id},null,8,["modelValue","inputId","value"]),r("label",{for:e.id,class:"ml-2"},d(e.name),9,vt)]))),128)),_t,(a(!0),v(K,null,Q(ge.value,e=>(a(),v("div",{key:e.id,class:"flex items-center mb-2"},[i(s(ue),{modelValue:A.value,"onUpdate:modelValue":l[2]||(l[2]=o=>A.value=o),inputId:e.name,name:"category",value:e.name},null,8,["modelValue","inputId","value"]),r("label",{for:e.id,class:"ml-2"},d(e.name),9,mt)]))),128))]),_:1},8,["visible"]),h.value.length?(a(),b(s(I),{key:0,class:"ml-4",outlined:""},{default:n(()=>[r("p",pt,d(h.value.length),1),y("selected "),h.value.length<k.filterSubs.total?(a(),b(s(I),{key:0,label:`Select all ${k.deliverSubIds.length}`,onClick:l[4]||(l[4]=e=>Re(k.deliverSubIds)),icon:"pi pi-arrow-right",class:"ml-4",severity:"info"},null,8,["label"])):p("",!0)]),_:1})):p("",!0),h.value.length?(a(),b(s(I),{key:1,label:`Export as Excel (${h.value.length})`,onClick:l[5]||(l[5]=e=>Ce(h.value)),class:"ml-4"},null,8,["label"])):p("",!0),h.value.length?(a(),b(s(I),{key:2,label:`Mark All As Delivery Booked (${h.value.length})`,onClick:Te,icon:"pi pi-truck",class:"ml-4"},null,8,["label"])):p("",!0),i(s(Ne),{rows:P.value,totalRecords:R.value,rowsPerPageOptions:[10,25,50,100,R.value].sort((e,o)=>e-o),onPage:Fe},{start:n(e=>[y(d(k.filterSubs.from)+"-"+d(k.filterSubs.to)+" / "+d(k.filterSubs.total),1)]),_:1},8,["rows","totalRecords","rowsPerPageOptions"]),i(s(ne),{selection:h.value,"onUpdate:selection":l[8]||(l[8]=e=>h.value=e),value:k.filterSubs.data,lazy:"",loading:N.value,tableStyle:"min-width: 50rem",showGridlines:"",dataKey:"id",filterDisplay:"menu",filters:F.value,"onUpdate:filters":l[9]||(l[9]=e=>F.value=e)},{header:n(()=>[r("div",yt,[i(s(I),{type:"button",icon:"pi pi-filter-slash",label:"Clear",outlined:"",onClick:l[6]||(l[6]=e=>we())}),i(s(Pe),null,{default:n(()=>[i(s(We),null,{default:n(()=>[ht]),_:1}),r("div",null,[i(s(I),{onClick:l[7]||(l[7]=e=>q.value=!0),label:"Filter",class:"mr-4"}),i(s(Me),{placeholder:"Keyword Search",onInput:Ve})])]),_:1})])]),empty:n(()=>[y(" No filterSubs found. ")]),loading:n(()=>[y(" Loading filterSubs data. Please wait. ")]),default:n(()=>[i(s(_),{selectionMode:"multiple",headerStyle:"width: 3rem"}),i(s(_),{field:"root_sales_order.sales_order_no",header:"Root Sales Order #",style:{"min-width":"10rem"}},{body:n(({data:e})=>[r("div",ft,[r("span",null,d(e.root_sales_order.sales_order_no),1),i(s(qe)),r("div",{onClick:o=>Oe(e.root_sales_order.sales_order_no,e.sales_order_no,e.id),style:{cursor:"pointer","margin-left":"8px"}},[i($,{icon:["fas","link-slash"],style:{color:"#800000"}})],8,bt)])]),_:1}),i(s(_),{field:"sales_order_no",header:"Sales Order No.",style:{"min-width":"10rem"}},{body:n(({data:e})=>[r("span",{onClick:o=>Ue(e),class:"cursor-pointer hover:underline"},d(e.sales_order_no),9,kt),r("div",gt,[t.route().current("subscriptionsToDeliverFilterSubscription")?(a(),v("div",St,[e.hasCallOutService?E((a(),b($,{key:0,icon:["fas","toolbox"]},null,512)),[[f,"Filter Sub (Filter + Call Out Service)"]]):E((a(),b($,{key:1,icon:["fas","faucet"]},null,512)),[[f,"Filter Sub (Filter Only)"]])])):p("",!0),e.delivered_or_delivery_booked&&e.delivered_or_delivery_booked.value!==null?(a(),v("i",wt)):p("",!0)])]),_:1}),i(s(_),{field:"",header:"Delivered or Delivery Booked",style:{"min-width":"10rem"}},{body:n(({data:e})=>[r("div",Ct,[i(s(ve),{modelValue:e.delivered_or_delivery_booked,"onUpdate:modelValue":o=>e.delivered_or_delivery_booked=o,options:Se.value,filter:"",optionLabel:"name",placeholder:"Select Confirmation",class:"w-full md:w-14rem",onChange:o=>xe(e)},{value:n(o=>{var w;return[o.value?(a(),v("div",Dt,[e.delivered_or_delivery_booked&&e.delivered_or_delivery_booked.value!==null?(a(),v("div",$t,d(((w=e.delivered_or_delivery_booked)==null?void 0:w.name)||e.delivered_or_delivery_booked),1)):(a(),v("div",It,d(o.placeholder),1))])):(a(),v("span",Ut,d(o.placeholder),1))]}),option:n(o=>[r("div",Ft,[r("div",null,d(o.option.name),1)])]),_:2},1032,["modelValue","onUpdate:modelValue","options","onChange"]),e.delivered_or_delivery_booked_by_id?E((a(),b(s(de),{key:0,class:"ml-2",style:{"background-color":"#ffffff",color:"#ffffff"}},{default:n(()=>[r("img",{src:e.delivered_or_delivery_booked_by.profile_photo_url,alt:"User Initials"},null,8,Vt)]),_:2},1024)),[[f,`Last updated by:
${e.delivered_or_delivery_booked_by.name}`]]):p("",!0)])]),_:1}),i(s(_),{field:"",header:"Service Code",style:{"min-width":"10rem"}},{body:n(({data:e})=>[r("div",xt,[i(s(ve),{modelValue:e.service_code_id,"onUpdate:modelValue":o=>e.service_code_id=o,options:M.value,filter:"",optionLabel:"name",placeholder:"Select Code",class:"w-full md:w-14rem",onChange:o=>Ae(e)},{value:n(o=>{var w,B,j;return[o.value?(a(),v("div",At,[e.service_code_id.name=="- Unselect -"&&e.service_code_id.value==null?(a(),v("div",Ot,d(o.placeholder),1)):e.service_code_id&&e.service_code_id.value==null?(a(),v("div",Tt,[r("div",null,d(e.service_code.service_code),1),e.service_code.total_weight?(a(),v("div",Rt,"("+d(e.service_code.total_weight)+"kg) ",1)):p("",!0)])):e.service_code_id.value!==null?(a(),v("div",Bt,[r("div",null,d(((w=e.service_code_id)==null?void 0:w.name)||""),1),(B=e.service_code_id)!=null&&B.totalWeight?(a(),v("div",jt,"("+d((j=e.service_code_id)==null?void 0:j.totalWeight)+"kg) ",1)):p("",!0)])):(a(),v("div",Et,d(o.placeholder),1))])):(a(),v("span",Lt,d(o.placeholder),1))]}),option:n(o=>[r("div",Nt,[r("div",null,d(o.option.name),1),o.option.totalWeight?(a(),v("div",Pt,"("+d(o.option.totalWeight)+"kg) ",1)):p("",!0)])]),_:2},1032,["modelValue","onUpdate:modelValue","options","onChange"]),e.service_code_updated_by_id?E((a(),b(s(de),{key:0,class:"ml-2",style:{"background-color":"#ffffff",color:"#ffffff"}},{default:n(()=>[r("img",{src:e.service_code_updated_by.profile_photo_url,alt:"User Initials"},null,8,Wt)]),_:2},1024)),[[f,`Last updated by:
${e.service_code_updated_by.name}`]]):p("",!0)])]),_:1}),i(s(_),{field:"customer_name",header:"Customer Name",style:{"min-width":"10rem"},filterField:"customer_name"}),i(s(_),{field:"address",header:"Address",style:{"min-width":"10rem"}}),i(s(_),{field:"activity_summary",header:"Activity Summary",style:{"min-width":"10rem"}}),i(s(_),{field:"start_date",header:"Start Date",style:{"min-width":"10rem"},filterField:"start_date",dataType:"date"},{body:n(({data:e})=>[y(d(G(e.start_date)),1)]),filter:n(({filterModel:e})=>[i(s(_e),{modelValue:e.value,"onUpdate:modelValue":o=>e.value=o,dateFormat:"dd/mm/yy",placeholder:"dd/mm/yyyy"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),i(s(_),{field:"due_date",header:"Due Date",style:{"min-width":"10rem"},filterField:"due_date",dataType:"date"},{body:n(({data:e})=>[y(d(G(e.due_date)),1)]),filter:n(({filterModel:e})=>[i(s(_e),{modelValue:e.value,"onUpdate:modelValue":o=>e.value=o,dateFormat:"dd/mm/yy",placeholder:"dd/mm/yyyy"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),i(s(_),{field:"invoice_number",header:"Invoice Number",style:{"min-width":"10rem"}}),i(s(_),{field:"invoice_date",header:"Invoice Date",style:{"min-width":"10rem"}},{body:n(({data:e})=>[y(d(G(e.invoice_date)),1)]),_:1}),i(s(_),{field:"state_id",header:"State",style:{"min-width":"10rem"}},{body:n(({data:e})=>{var o;return[y(d((o=T.value[e.state_id-1])==null?void 0:o.name),1)]}),_:1}),i(s(_),{field:"phone",header:"Phone",style:{"min-width":"10rem"}}),i(s(_),{field:"email",header:"Email",style:{"min-width":"10rem"}}),i(s(_),{field:"payment_status",header:"Payment Status",style:{"min-width":"10rem"}},{body:n(({data:e})=>[e.payment_status==="paid"?(a(),b(s(ze),{key:0,severity:"success",value:"Paid"})):p("",!0)]),_:1})]),_:1},8,["selection","value","loading","filters"])])}}};export{Qt as _};
