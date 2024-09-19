import{_ as ve}from"./AppLayout-BH2OlQO2.js";import{d as pe,s as H,a as p,b as W,c as T,e as ye,f as he,g as J,h as fe,i as ge,j as be,k as X}from"./primeicons-vP8qoV1O.js";import{B as Se,s as we,o,e as l,r as ke,p as j,t as n,c as U,n as Ce,q as $e,f as h,d as v,x as Ie,y as De,z as Y,A as V,C as M,D as Z,a as c,g as S,b as i,w as u,u as r,F as A,h as L,Q as xe}from"./app-BsMbtupP.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";var qe=function(y){var m=y.dt;return`
.p-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: `.concat(m("avatar.width"),`;
    height: `).concat(m("avatar.height"),`;
    font-size: `).concat(m("avatar.font.size"),`;
    background: `).concat(m("avatar.background"),`;
    border-radius: `).concat(m("avatar.border.radius"),`;
}

.p-avatar-image {
    background: transparent;
}

.p-avatar-circle {
    border-radius: 50%;
}

.p-avatar-circle img {
    border-radius: 50%;
}

.p-avatar-icon {
    font-size: `).concat(m("avatar.font.size"),`;
}

.p-avatar img {
    width: 100%;
    height: 100%;
}

.p-avatar-lg {
    width: `).concat(m("avatar.lg.width"),`;
    height: `).concat(m("avatar.lg.width"),`;
    font-size: `).concat(m("avatar.lg.font.size"),`;
}

.p-avatar-lg .p-avatar-icon {
    font-size: `).concat(m("avatar.lg.font.size"),`;
}

.p-avatar-xl {
    width: `).concat(m("avatar.xl.width"),`;
    height: `).concat(m("avatar.xl.width"),`;
    font-size: `).concat(m("avatar.xl.font.size"),`;
}

.p-avatar-xl .p-avatar-icon {
    font-size: `).concat(m("avatar.xl.font.size"),`;
}

.p-avatar-group {
    display: flex;
    align-items: center;
}

.p-avatar-group .p-avatar + .p-avatar {
    margin-left: `).concat(m("avatar.group.offset"),`;
}

.p-avatar-group .p-avatar {
    border: 2px solid `).concat(m("avatar.group.border.color"),`;
}
`)},Fe={root:function(y){var m=y.props;return["p-avatar p-component",{"p-avatar-image":m.image!=null,"p-avatar-circle":m.shape==="circle","p-avatar-lg":m.size==="large","p-avatar-xl":m.size==="xlarge"}]},label:"p-avatar-label",icon:"p-avatar-icon"},Ve=Se.extend({name:"avatar",theme:qe,classes:Fe}),Ue={name:"BaseAvatar",extends:we,props:{label:{type:String,default:null},icon:{type:String,default:null},image:{type:String,default:null},size:{type:String,default:"normal"},shape:{type:String,default:"square"},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:Ve,provide:function(){return{$pcAvatar:this,$parentInstance:this}}},Q={name:"Avatar",extends:Ue,inheritAttrs:!1,emits:["error"],methods:{onError:function(y){this.$emit("error",y)}}},ze=["aria-labelledby","aria-label"],Oe=["src","alt"];function Ee(s,y,m,$,w,g){return o(),l("div",j({class:s.cx("root"),"aria-labelledby":s.ariaLabelledby,"aria-label":s.ariaLabel},s.ptmi("root")),[ke(s.$slots,"default",{},function(){return[s.label?(o(),l("span",j({key:0,class:s.cx("label")},s.ptm("label")),n(s.label),17)):s.$slots.icon?(o(),U($e(s.$slots.icon),{key:1,class:Ce(s.cx("icon"))},null,8,["class"])):s.icon?(o(),l("span",j({key:2,class:[s.cx("icon"),s.icon]},s.ptm("icon")),null,16)):s.image?(o(),l("img",j({key:3,src:s.image,alt:s.ariaLabel,onError:y[0]||(y[0]=function(){return g.onError&&g.onError.apply(g,arguments)})},s.ptm("image")),null,16,Oe)):h("",!0)]})],16,ze)}Q.render=Ee;const je={class:"card"},Ae={class:"m-4 my-4"},Le={key:0,class:"pi pi-calendar"},Re=c("i",{class:"pi pi-user"},null,-1),Be=c("i",{class:"pi pi-map-marker mt-2"},null,-1),Ne=c("p",{class:"mt-6"}," Order Lines:",-1),Pe={key:0},Te=c("p",{class:"mt-6 mb-2"}," Other Address:",-1),Me=c("i",{class:"pi pi-building-columns"},null,-1),Qe=c("p",{class:"mt-6 mb-2"}," Other Address:",-1),Ge=c("i",{class:"pi pi-building"},null,-1),Ke=c("p",{class:"mb-2 text-xl font-bold"},"States",-1),He=["for"],We=c("p",{class:"mt-4 mb-2 text-xl font-bold"},"Category",-1),Je=["for"],Xe=c("p",{class:"mt-4 mb-2 text-xl font-bold"},"Activity Summary",-1),Ye=["for"],Ze=c("p",{class:"mt-4 mb-2 text-xl font-bold"},"Date Range",-1),et={class:"flex justify-between"},tt=c("i",{class:"pi pi-search"},null,-1),at=["onClick"],ot={class:"flex"},lt={key:0,class:"flex align-items-center"},nt={key:0},st={key:1},rt={key:1},it={class:"flex align-items-center"},dt={class:"flex"},ct={key:0,class:"flex align-items-center"},ut={key:0},mt={key:1},_t={key:1},vt={class:"flex align-items-center"},pt={key:0},yt={key:1},ht={key:0},ft={key:1},gt={key:0},bt={key:1},St={key:0},wt={key:1},kt={key:0},Ct={key:1},$t={key:0},It={key:1},Dt={key:0},xt={key:1},qt={key:0},Ft={key:1},Vt={key:0},Ut={key:1},zt={key:0},Ot={key:1},Et={__name:"ConfirmDeliveryRequirementDataTable",props:{filterSubs:Object,stateIds:Object,filterSubIds:Object,currentUser:Object,users:Object},setup(s){let y=s;const m=v([]);v();const $=v(!0),w=v(1),g=v(0),R=v(),B=v(!1),N=v(!1),ee=v(),P=v([]),I=Ie(),z=v([]),O=v();v();const te=v([{id:1,name:"Subscription"}]),ae=v([{id:1,name:"Send 1st Stage Filter"},{id:2,name:"Independent 3 + 3 Due for Change"},{id:3,name:"Independent 3 + 3 Expires"},{id:4,name:"3 + 3 Stage Filter"},{id:5,name:"3 Stage Filter"},{id:6,name:"3 + 3 Stage Filter Expires"},{id:7,name:"3 Stage Filter Expires"},{id:8,name:"Final Date to Order Filters for Warranty Extension"}]),oe=v([{name:"Confirm",value:"Confirm"},{name:"Deny",value:"Deny"},{name:"- Unselect -",value:null}]),k=v([]),C=v(),x=v([]),q=v([]),F=v([]);De(()=>{$.value=!1,g.value=y.filterSubs.total,ee.value=y.salesQuotations,z.value=y.stateIds});const le=t=>{w.value=t.page+1,console.log("page change"),console.log(w.value),D()},ne=t=>{R.value=t.target.value,console.log(t.target.value),se()},D=async()=>{try{console.log("fetch data page"),console.log(w.value);const t=await Y.get("/confirmDeliveryRequirement",{page:w.value,search:R.value,dates:k.value,stateId:x.value,activitySummary:q.value,categories:F.value},{preserveState:!0,replace:!1,onSuccess:a=>{console.log(a),console.log(a.props.filterSubs.total),g.value=a.props.filterSubs.total}})}catch(t){console.error("Error fetching data:",t)}finally{$.value=!1}},se=pe(async()=>{try{console.log("fetch data page"),console.log(w.value);const t=await Y.get("/confirmDeliveryRequirement",{page:w.value,search:R.value,dates:k.value,stateId:x.value,activitySummary:q.value,categories:F.value},{preserveState:!0,replace:!1,onSuccess:a=>{console.log(a),console.log(a.props.filterSubs.total),g.value=a.props.filterSubs.total}})}catch(t){console.error("Error fetching data:",t)}finally{$.value=!1}},300),E=t=>t?new Date(t).toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}):null,re=t=>{if(!t||t.length===0)return"";const a=new Date(t[0]),_=t[1]?new Date(t[1]):a;return`${a.toLocaleDateString("en-PH",{day:"2-digit",month:"2-digit",year:"numeric"})} to ${_.toLocaleDateString("en-PH",{day:"2-digit",month:"2-digit",year:"numeric"})}`},ie=()=>{initFilters()},de=t=>{B.value=!0,O.value=t.sales_order_no,C.value=t},ce=t=>{O.value=t.sales_order_no,console.log("Select clicked",event)},ue=async t=>{var a;try{const _=await M.put(`/api/updateCreatedOnOdooInFilterSubs/${t.id}`,{created_on_odoo:t.created_on_odoo.value,odoo_created_by_id:y.currentUser.id});(a=t.created_on_odoo)!=null&&a.value?(I.add({severity:"success",summary:`Updated #${t.sales_order_no}'s created on odoo to ${t.created_on_odoo.value}`,detail:"",life:3e3}),D()):I.add({severity:"info",summary:`Moved #${t.sales_order_no} back to Subscription to Enter`,detail:"",life:3e3})}catch(_){console.error("Failed to update created_on_odoo:",_),I.add({severity:"error",summary:"Failed to update",detail:"",life:3e3})}},me=async t=>{var a,_;try{const f=await M.put(`/api/updateRequiredDeliveryInFilterSubs/${t.id}`,{required_delivery:t.required_delivery.value,required_delivery_updated_by_id:y.currentUser.id});(a=t.required_delivery)!=null&&a.value&&(((_=t.required_delivery)==null?void 0:_.value)==="Confirm"?I.add({severity:"success",summary:`Added #${t.sales_order_no} to Subscriptions to Deliver`,detail:"",life:3e3}):I.add({severity:"success",summary:`Updated #${t.sales_order_no} required delivery to Denied`,detail:"",life:3e3}))}catch(f){console.error("Failed to update created_on_odoo:",f),I.add({severity:"error",summary:"Failed Message",detail:"Message Content",life:3e3})}};V(O,async t=>{if(t)try{const a=await M.get("/api/findFilterSubsBySalesOrderNo",{params:{sales_order_no:t}});P.value=a.data.map(_=>({name:_,value:_})),P.value.push({name:"- Unselect -",value:null})}catch(a){console.error("Error fetching dropdown options:",a)}}),V(x,async t=>{console.log("changed state, load fetch data 1"),t&&(console.log("changed state, load fetch data 2"),D())}),V(q,async t=>{console.log("changed state, load fetch data 1"),t&&(console.log("changed state, load fetch data 2"),D())}),V(k,async t=>{console.log("changed date, load fetch data 1"),t&&(console.log("changed date, load fetch data 2"),D())}),V(F,async t=>{console.log("changed date, load fetch data 1"),t&&(console.log("changed date, load fetch data 2"),D())});const _e=t=>t.filter(a=>{var _;return a.created_on_odoo!==null&&((_=a.created_on_odoo)==null?void 0:_.value)!==null}),G=t=>t.filter(a=>{var _;return a.created_on_odoo===null||((_=a.created_on_odoo)==null?void 0:_.value)===null||a.created_on_odoo===void 0}).length,K=(t,a)=>{const _=a.find(f=>f.id===t);if(_){const f=_.name.split(" ").map(d=>d[0]).join("").toUpperCase();return f.substring(0,2)||f}return""};return(t,a)=>{const _=Z("Toast"),f=Z("font-awesome-icon");return o(),l("div",je,[c("div",null,[c("div",Ae,[k.value.length?(o(),l("i",Le)):h("",!0),S(" "+n(re(k.value)),1)])]),i(_),i(r(W),{visible:B.value,"onUpdate:visible":a[0]||(a[0]=e=>B.value=e),header:O.value,class:"!w-full md:!w-80 lg:!w-[30rem]"},{default:u(()=>[c("p",null,[Re,S(" "+n(C.value.customer_name),1)]),c("p",null,[Be,S(" "+n(C.value.address),1)]),Ne,i(r(H),{value:C.value.order_line,dataKey:"id",showGridlines:"",class:"mt-2"},{default:u(()=>[i(r(p),{field:"product",header:"Product",style:{"min-width":"10rem"}}),i(r(p),{field:"description",header:"Description",style:{"min-width":"10rem"}}),i(r(p),{field:"quantity",header:"Quantity",style:{"min-width":"5rem"}})]),_:1},8,["value"]),c("div",null,[C.value.contact_address[0].parent?(o(),l("p",Pe,[Te,Me,S(" "+n(C.value.contact_address[0].parent.complete_address),1)])):h("",!0)]),c("div",null,[(o(!0),l(A,null,L(C.value.contact_address[0].children,(e,d)=>(o(),l("p",{key:d},[Qe,Ge,S(" "+n(e.complete_address),1)]))),128))])]),_:1},8,["visible","header"]),i(r(W),{visible:N.value,"onUpdate:visible":a[5]||(a[5]=e=>N.value=e),header:"Filters",position:"right",class:"!w-full md:!w-80 lg:!w-[30rem]"},{default:u(()=>[Ke,(o(!0),l(A,null,L(z.value,e=>(o(),l("div",{key:e.id,class:"flex items-center mb-2"},[i(r(T),{modelValue:x.value,"onUpdate:modelValue":a[1]||(a[1]=d=>x.value=d),inputId:e.state_id,name:"stateIds",value:e.state_id},null,8,["modelValue","inputId","value"]),c("label",{for:e.id,class:"ml-2"},n(e.name),9,He)]))),128)),We,(o(!0),l(A,null,L(te.value,e=>(o(),l("div",{key:e.id,class:"flex items-center mb-2"},[i(r(T),{modelValue:F.value,"onUpdate:modelValue":a[2]||(a[2]=d=>F.value=d),inputId:e.name,name:"category",value:e.name},null,8,["modelValue","inputId","value"]),c("label",{for:e.id,class:"ml-2"},n(e.name),9,Je)]))),128)),Xe,(o(!0),l(A,null,L(ae.value,e=>(o(),l("div",{key:e.id,class:"flex items-center mb-2"},[i(r(T),{modelValue:q.value,"onUpdate:modelValue":a[3]||(a[3]=d=>q.value=d),inputId:e.name,name:"category",value:e.name},null,8,["modelValue","inputId","value"]),c("label",{for:e.id,class:"ml-2"},n(e.name),9,Ye)]))),128)),Ze,i(r(ye),{modelValue:k.value,"onUpdate:modelValue":a[4]||(a[4]=e=>k.value=e),selectionMode:"range",manualInput:!1},null,8,["modelValue"])]),_:1},8,["visible"]),i(r(he),{rows:100,totalRecords:g.value,rowsPerPageOptions:[10,25,50,100],onPage:le},{start:u(e=>[S(n(s.filterSubs.from)+"-"+n(s.filterSubs.to-G(s.filterSubs.data))+" / "+n(s.filterSubs.total-G(s.filterSubs.data)),1)]),_:1},8,["totalRecords"]),i(r(H),{selection:m.value,"onUpdate:selection":a[8]||(a[8]=e=>m.value=e),value:_e(s.filterSubs.data),lazy:"",loading:$.value,tableStyle:"min-width: 50rem",showGridlines:"",dataKey:"id",filterDisplay:"menu"},{header:u(()=>[c("div",et,[i(r(J),{type:"button",icon:"pi pi-filter-slash",label:"Clear",outlined:"",onClick:a[6]||(a[6]=e=>ie())}),i(r(fe),null,{default:u(()=>[i(r(ge),null,{default:u(()=>[tt]),_:1}),c("div",null,[i(r(J),{onClick:a[7]||(a[7]=e=>N.value=!0),label:"Filter",class:"mr-4"}),i(r(be),{placeholder:"Keyword Search",onInput:ne})])]),_:1})])]),empty:u(()=>[S(" No filterSubs found. ")]),loading:u(()=>[S(" Loading filterSubs data. Please wait. ")]),default:u(()=>[i(r(p),{selectionMode:"multiple",headerStyle:"width: 3rem"}),i(r(p),{field:"sales_order_no",header:"Sales Order No.",style:{"min-width":"10rem"}},{body:u(({data:e})=>[c("span",{onClick:d=>de(e),class:"cursor-pointer hover:underline"},n(e.sales_order_no),9,at),e.category==="Subscription"?(o(),U(f,{key:0,icon:"fa-filter-circle-dollar",class:"ml-2"})):h("",!0)]),_:1}),i(r(p),{field:"",header:"Created on Odoo",style:{"min-width":"10rem"}},{body:u(({data:e})=>[c("div",ot,[i(r(X),{modelValue:e.created_on_odoo,"onUpdate:modelValue":d=>e.created_on_odoo=d,options:P.value,filter:"",optionLabel:"name",placeholder:"Select Sales Order #",class:"w-full md:w-14rem",onClick:d=>ce(e),onChange:d=>ue(e)},{value:u(d=>{var b;return[d.value?(o(),l("div",lt,[e.created_on_odoo&&e.created_on_odoo.value!==null?(o(),l("div",nt,n(((b=e.created_on_odoo)==null?void 0:b.name)||e.created_on_odoo),1)):(o(),l("div",st,n(d.placeholder),1))])):(o(),l("span",rt,n(d.placeholder),1))]}),option:u(d=>[c("div",it,[c("div",null,n(d.option.name),1)])]),_:2},1032,["modelValue","onUpdate:modelValue","options","onClick","onChange"]),e.odoo_created_by_id?(o(),U(r(Q),{key:0,label:K(e.odoo_created_by_id,s.users),class:"ml-2",style:{"background-color":"#dee9fc",color:"#1a2551"}},null,8,["label"])):h("",!0)])]),_:1}),i(r(p),{field:"",header:"Require Delivery",style:{"min-width":"10rem"}},{body:u(({data:e})=>[c("div",dt,[i(r(X),{modelValue:e.required_delivery,"onUpdate:modelValue":d=>e.required_delivery=d,options:oe.value,filter:"",optionLabel:"name",placeholder:"Select Confirmation",class:"w-full md:w-14rem",onChange:d=>me(e)},{value:u(d=>{var b;return[d.value?(o(),l("div",ct,[e.required_delivery&&e.required_delivery.value!==null?(o(),l("div",ut,n(((b=e.required_delivery)==null?void 0:b.name)||e.required_delivery),1)):(o(),l("div",mt,n(d.placeholder),1))])):(o(),l("span",_t,n(d.placeholder),1))]}),option:u(d=>[c("div",vt,[c("div",null,n(d.option.name),1)])]),_:2},1032,["modelValue","onUpdate:modelValue","options","onChange"]),e.required_delivery_updated_by_id?(o(),U(r(Q),{key:0,label:K(e.required_delivery_updated_by_id,s.users),class:"ml-2",style:{"background-color":"#dee9fc",color:"#1a2551"}},null,8,["label"])):h("",!0)])]),_:1}),i(r(p),{field:"customer_name",header:"Customer Name",style:{"min-width":"10rem"},filterField:"customer_name"},{body:u(({data:e})=>[e.new_sales_order.customer_name?(o(),l("p",pt,n(e.new_sales_order.customer_name),1)):e.customer_name?(o(),l("p",yt,n(e.customer_name),1)):h("",!0)]),_:1}),i(r(p),{field:"address",header:"Address",style:{"min-width":"10rem"}},{body:u(({data:e})=>[e.new_sales_order.address?(o(),l("p",ht,n(e.new_sales_order.address),1)):e.address?(o(),l("p",ft,n(e.address),1)):h("",!0)]),_:1}),i(r(p),{field:"activity_summary",header:"Activity Summary",style:{"min-width":"10rem"}},{body:u(({data:e})=>[e.new_sales_order.activity_summary?(o(),l("p",gt,n(e.new_sales_order.activity_summary),1)):e.activity_summary?(o(),l("p",bt,n(e.activity_summary),1)):h("",!0)]),_:1}),i(r(p),{field:"due_date",header:"Due Date",style:{"min-width":"10rem"}},{body:u(({data:e})=>[e.new_sales_order.due_date?(o(),l("p",St,n(E(e.new_sales_order.due_date)),1)):e.due_date?(o(),l("p",wt,n(E(e.due_date)),1)):h("",!0)]),_:1}),i(r(p),{field:"invoice_number",header:"Invoice Number",style:{"min-width":"10rem"}},{body:u(({data:e})=>[e.new_sales_order.invoice_number?(o(),l("p",kt,n(e.new_sales_order.invoice_number),1)):e.invoice_number?(o(),l("p",Ct,n(e.invoice_number),1)):h("",!0)]),_:1}),i(r(p),{field:"invoice_date",header:"Invoice Date",style:{"min-width":"10rem"}},{body:u(({data:e})=>[e.new_sales_order.invoice_date?(o(),l("p",$t,n(E(e.new_sales_order.invoice_date)),1)):e.invoice_date?(o(),l("p",It,n(E(e.invoice_date)),1)):h("",!0)]),_:1}),i(r(p),{field:"state_id",header:"State",style:{"min-width":"10rem"}},{body:u(({data:e})=>{var d,b;return[e.new_sales_order.state_id?(o(),l("p",Dt,n((d=z.value[e.new_sales_order.state_id-1])==null?void 0:d.name),1)):e.state_id?(o(),l("p",xt,n((b=z.value[e.state_id-1])==null?void 0:b.name),1)):h("",!0)]}),_:1}),i(r(p),{field:"phone",header:"Phone",style:{"min-width":"10rem"}},{body:u(({data:e})=>[e.new_sales_order.phone?(o(),l("p",qt,n(e.new_sales_order.phone),1)):e.phone?(o(),l("p",Ft,n(e.phone),1)):h("",!0)]),_:1}),i(r(p),{field:"email",header:"Email",style:{"min-width":"10rem"}},{body:u(({data:e})=>[e.new_sales_order.email?(o(),l("p",Vt,n(e.new_sales_order.email),1)):e.email?(o(),l("p",Ut,n(e.email),1)):h("",!0)]),_:1}),i(r(p),{field:"payment_status",header:"Payment Status",style:{"min-width":"10rem"}},{body:u(({data:e})=>[e.new_sales_order.payment_status?(o(),l("p",zt,n(e.new_sales_order.payment_status),1)):e.payment_status?(o(),l("p",Ot,n(e.payment_status),1)):h("",!0)]),_:1})]),_:1},8,["selection","value","loading"])])}}},jt={class:"bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg"},Nt={__name:"ConfirmDeliveryRequirement",props:{filterSubs:Object,stateIds:Object,activitySummaries:Object,filterSubIds:Object,users:Object},setup(s){const y=xe();return(m,$)=>(o(),U(ve,{title:"ConfirmDeliveryRequirement"},{default:u(()=>[c("div",jt,[i(Et,{filterSubs:s.filterSubs,stateIds:s.stateIds,activitySummaries:s.activitySummaries,filterSubIds:s.filterSubIds,currentUser:r(y).props.auth.user,users:s.users},null,8,["filterSubs","stateIds","activitySummaries","filterSubIds","currentUser","users"])])]),_:1}))}};export{Nt as default};
