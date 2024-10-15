import{f as L}from"./primeicons-C3jF3hj7.js";import{C as S,R as u,E as I,B as b,o as r,c as m,S as p,w as l,r as f,b as v,G as s,a as d,e as h,F as j,I as k,n as y,f as B,t as F}from"./app-CvDTkAv4.js";import{s as D}from"./index-GJNkQnAb.js";var E=function(n){var t=n.dt;return`
.p-confirmdialog .p-dialog-content {
    display: flex;
    align-items: center;
    gap:  `.concat(t("confirmdialog.content.gap"),`;
}

.p-confirmdialog-icon {
    color: `).concat(t("confirmdialog.icon.color"),`;
    font-size: `).concat(t("confirmdialog.icon.size"),`;
    width: `).concat(t("confirmdialog.icon.size"),`;
    height: `).concat(t("confirmdialog.icon.size"),`;
}
`)},R={root:"p-confirmdialog",icon:"p-confirmdialog-icon",message:"p-confirmdialog-message",pcRejectButton:"p-confirmdialog-reject-button",pcAcceptButton:"p-confirmdialog-accept-button"},A=S.extend({name:"confirmdialog",theme:E,classes:R}),O={name:"BaseConfirmDialog",extends:I,props:{group:String,breakpoints:{type:Object,default:null},draggable:{type:Boolean,default:!0}},style:A,provide:function(){return{$pcConfirmDialog:this,$parentInstance:this}}},P={name:"ConfirmDialog",extends:O,confirmListener:null,closeListener:null,data:function(){return{visible:!1,confirmation:null}},mounted:function(){var n=this;this.confirmListener=function(t){t&&t.group===n.group&&(n.confirmation=t,n.confirmation.onShow&&n.confirmation.onShow(),n.visible=!0)},this.closeListener=function(){n.visible=!1,n.confirmation=null},u.on("confirm",this.confirmListener),u.on("close",this.closeListener)},beforeUnmount:function(){u.off("confirm",this.confirmListener),u.off("close",this.closeListener)},methods:{accept:function(){this.confirmation.accept&&this.confirmation.accept(),this.visible=!1},reject:function(){this.confirmation.reject&&this.confirmation.reject(),this.visible=!1},onHide:function(){this.confirmation.onHide&&this.confirmation.onHide(),this.visible=!1}},computed:{header:function(){return this.confirmation?this.confirmation.header:null},message:function(){return this.confirmation?this.confirmation.message:null},blockScroll:function(){return this.confirmation?this.confirmation.blockScroll:!0},position:function(){return this.confirmation?this.confirmation.position:null},acceptLabel:function(){if(this.confirmation){var n,t=this.confirmation;return t.acceptLabel||((n=t.acceptProps)===null||n===void 0?void 0:n.label)||this.$primevue.config.locale.accept}return this.$primevue.config.locale.accept},rejectLabel:function(){if(this.confirmation){var n,t=this.confirmation;return t.rejectLabel||((n=t.rejectProps)===null||n===void 0?void 0:n.label)||this.$primevue.config.locale.reject}return this.$primevue.config.locale.reject},acceptIcon:function(){var n;return this.confirmation?this.confirmation.acceptIcon:(n=this.confirmation)!==null&&n!==void 0&&n.acceptProps?this.confirmation.acceptProps.icon:null},rejectIcon:function(){var n;return this.confirmation?this.confirmation.rejectIcon:(n=this.confirmation)!==null&&n!==void 0&&n.rejectProps?this.confirmation.rejectProps.icon:null},autoFocusAccept:function(){return this.confirmation.defaultFocus===void 0||this.confirmation.defaultFocus==="accept"},autoFocusReject:function(){return this.confirmation.defaultFocus==="reject"},closeOnEscape:function(){return this.confirmation?this.confirmation.closeOnEscape:!0}},components:{Dialog:D,Button:L}};function w(e,n,t,z,i,o){var g=b("Button"),C=b("Dialog");return r(),m(C,{visible:i.visible,"onUpdate:visible":[n[2]||(n[2]=function(c){return i.visible=c}),o.onHide],role:"alertdialog",class:y(e.cx("root")),modal:!0,header:o.header,blockScroll:o.blockScroll,position:o.position,breakpoints:e.breakpoints,closeOnEscape:o.closeOnEscape,draggable:e.draggable,pt:e.pt,unstyled:e.unstyled},p({default:l(function(){return[e.$slots.container?B("",!0):(r(),h(j,{key:0},[e.$slots.message?(r(),m(k(e.$slots.message),{key:1,message:i.confirmation},null,8,["message"])):(r(),h(j,{key:0},[f(e.$slots,"icon",{},function(){return[e.$slots.icon?(r(),m(k(e.$slots.icon),{key:0,class:y(e.cx("icon"))},null,8,["class"])):i.confirmation.icon?(r(),h("span",s({key:1,class:[i.confirmation.icon,e.cx("icon")]},e.ptm("icon")),null,16)):B("",!0)]}),d("span",s({class:e.cx("message")},e.ptm("message")),F(o.message),17)],64))],64))]}),_:2},[e.$slots.container?{name:"container",fn:l(function(c){return[f(e.$slots,"container",{message:i.confirmation,closeCallback:c.onclose,acceptCallback:o.accept,rejectCallback:o.reject})]}),key:"0"}:void 0,e.$slots.container?void 0:{name:"footer",fn:l(function(){var c;return[v(g,s({class:[e.cx("pcRejectButton"),i.confirmation.rejectClass],autofocus:o.autoFocusReject,unstyled:e.unstyled,text:((c=i.confirmation.rejectProps)===null||c===void 0?void 0:c.text)||!1,onClick:n[0]||(n[0]=function(a){return o.reject()})},i.confirmation.rejectProps,{label:o.rejectLabel,pt:e.ptm("pcRejectButton")}),p({_:2},[o.rejectIcon||e.$slots.rejecticon?{name:"icon",fn:l(function(a){return[f(e.$slots,"rejecticon",{},function(){return[d("span",s({class:[o.rejectIcon,a.class]},e.ptm("pcRejectButton").icon,{"data-pc-section":"rejectbuttonicon"}),null,16)]})]}),key:"0"}:void 0]),1040,["class","autofocus","unstyled","text","label","pt"]),v(g,s({label:o.acceptLabel,class:[e.cx("pcAcceptButton"),i.confirmation.acceptClass],autofocus:o.autoFocusAccept,unstyled:e.unstyled,onClick:n[1]||(n[1]=function(a){return o.accept()})},i.confirmation.acceptProps,{pt:e.ptm("pcAcceptButton")}),p({_:2},[o.acceptIcon||e.$slots.accepticon?{name:"icon",fn:l(function(a){return[f(e.$slots,"accepticon",{},function(){return[d("span",s({class:[o.acceptIcon,a.class]},e.ptm("pcAcceptButton").icon,{"data-pc-section":"acceptbuttonicon"}),null,16)]})]}),key:"0"}:void 0]),1040,["label","class","autofocus","unstyled","pt"])]}),key:"1"}]),1032,["visible","class","header","blockScroll","position","breakpoints","closeOnEscape","draggable","onUpdate:visible","pt","unstyled"])}P.render=w;export{P as s};
