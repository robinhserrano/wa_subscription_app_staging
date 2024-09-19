import{T as j,d as f,o as d,c as P,w as a,g as r,e as x,a as l,b as o,l as p,J as v,L as B,i as h,f as _,u as t,j as E,n as F,z}from"./app-BsMbtupP.js";import{_ as A}from"./ActionMessage-DuMB6Koy.js";import{_ as L}from"./FormSection-D6zUH8Dm.js";import{a as g,_ as S}from"./TextInput-u65-2rtv.js";import{_ as k}from"./InputLabel-BRpDWifM.js";import{_ as R}from"./PrimaryButton-F01WUD5F.js";import{_ as V}from"./SecondaryButton-DMLuDSkY.js";import"./SectionTitle-YZ8NMdqd.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const T={key:0,class:"col-span-6 sm:col-span-4"},q={class:"mt-2"},D=["src","alt"],J={class:"mt-2"},M={class:"col-span-6 sm:col-span-4"},O={class:"col-span-6 sm:col-span-4"},Y={key:0},G={class:"text-sm mt-2 dark:text-white"},H={class:"mt-2 font-medium text-sm text-green-600 dark:text-green-400"},ae={__name:"UpdateProfileInformationForm",props:{user:Object},setup(u){const y=u,e=j({_method:"PUT",name:y.user.name,email:y.user.email,photo:null}),b=f(null),c=f(null),n=f(null),$=()=>{n.value&&(e.photo=n.value.files[0]),e.post(route("user-profile-information.update"),{errorBag:"updateProfileInformation",preserveScroll:!0,onSuccess:()=>w()})},C=()=>{b.value=!0},I=()=>{n.value.click()},N=()=>{const s=n.value.files[0];if(!s)return;const i=new FileReader;i.onload=m=>{c.value=m.target.result},i.readAsDataURL(s)},U=()=>{z.delete(route("current-user-photo.destroy"),{preserveScroll:!0,onSuccess:()=>{c.value=null,w()}})},w=()=>{var s;(s=n.value)!=null&&s.value&&(n.value.value=null)};return(s,i)=>(d(),P(L,{onSubmitted:$},{title:a(()=>[r(" Profile Information ")]),description:a(()=>[r(" Update your account's profile information and email address. ")]),form:a(()=>[s.$page.props.jetstream.managesProfilePhotos?(d(),x("div",T,[l("input",{id:"photo",ref_key:"photoInput",ref:n,type:"file",class:"hidden",onChange:N},null,544),o(k,{for:"photo",value:"Photo"}),p(l("div",q,[l("img",{src:u.user.profile_photo_url,alt:u.user.name,class:"rounded-full h-20 w-20 object-cover"},null,8,D)],512),[[v,!c.value]]),p(l("div",J,[l("span",{class:"block rounded-full w-20 h-20 bg-cover bg-no-repeat bg-center",style:B("background-image: url('"+c.value+"');")},null,4)],512),[[v,c.value]]),o(V,{class:"mt-2 me-2",type:"button",onClick:h(I,["prevent"])},{default:a(()=>[r(" Select A New Photo ")]),_:1}),u.user.profile_photo_path?(d(),P(V,{key:0,type:"button",class:"mt-2",onClick:h(U,["prevent"])},{default:a(()=>[r(" Remove Photo ")]),_:1})):_("",!0),o(g,{message:t(e).errors.photo,class:"mt-2"},null,8,["message"])])):_("",!0),l("div",M,[o(k,{for:"name",value:"Name"}),o(S,{id:"name",modelValue:t(e).name,"onUpdate:modelValue":i[0]||(i[0]=m=>t(e).name=m),type:"text",class:"mt-1 block w-full",required:"",autocomplete:"name"},null,8,["modelValue"]),o(g,{message:t(e).errors.name,class:"mt-2"},null,8,["message"])]),l("div",O,[o(k,{for:"email",value:"Email"}),o(S,{id:"email",modelValue:t(e).email,"onUpdate:modelValue":i[1]||(i[1]=m=>t(e).email=m),type:"email",class:"mt-1 block w-full",required:"",autocomplete:"username"},null,8,["modelValue"]),o(g,{message:t(e).errors.email,class:"mt-2"},null,8,["message"]),s.$page.props.jetstream.hasEmailVerification&&u.user.email_verified_at===null?(d(),x("div",Y,[l("p",G,[r(" Your email address is unverified. "),o(t(E),{href:s.route("verification.send"),method:"post",as:"button",class:"underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800",onClick:h(C,["prevent"])},{default:a(()=>[r(" Click here to re-send the verification email. ")]),_:1},8,["href"])]),p(l("div",H," A new verification link has been sent to your email address. ",512),[[v,b.value]])])):_("",!0)])]),actions:a(()=>[o(A,{on:t(e).recentlySuccessful,class:"me-3"},{default:a(()=>[r(" Saved. ")]),_:1},8,["on"]),o(R,{class:F({"opacity-25":t(e).processing}),disabled:t(e).processing},{default:a(()=>[r(" Save ")]),_:1},8,["class","disabled"])]),_:1}))}};export{ae as default};
