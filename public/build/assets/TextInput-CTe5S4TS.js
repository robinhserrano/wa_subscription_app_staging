import{l as d,J as i,o as s,e as o,a as l,t as c,d as m,y as g}from"./app-CMr33kxx.js";const p={class:"text-sm text-red-600 dark:text-red-400"},k={__name:"InputError",props:{message:String},setup(t){return(a,e)=>d((s(),o("div",null,[l("p",p,c(t.message),1)],512)),[[i,t.message]])}},f=["value"],v={__name:"TextInput",props:{modelValue:String},emits:["update:modelValue"],setup(t,{expose:a}){const e=m(null);return g(()=>{e.value.hasAttribute("autofocus")&&e.value.focus()}),a({focus:()=>e.value.focus()}),(u,r)=>(s(),o("input",{ref_key:"input",ref:e,class:"border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm",value:t.modelValue,onInput:r[0]||(r[0]=n=>u.$emit("update:modelValue",n.target.value))},null,40,f))}};export{v as _,k as a};