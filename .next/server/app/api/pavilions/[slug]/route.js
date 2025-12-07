"use strict";(()=>{var e={};e.id=559,e.ids=[559],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},5900:e=>{e.exports=require("pg")},3320:(e,t,o)=>{o.r(t),o.d(t,{originalPathname:()=>h,patchFetch:()=>g,requestAsyncStorage:()=>d,routeModule:()=>c,serverHooks:()=>m,staticGenerationAsyncStorage:()=>_});var r={};o.r(r),o.d(r,{GET:()=>u});var a=o(9303),i=o(8716),n=o(670),s=o(7070),l=o(1818);let p=[{id:1,slug:"white-hall",name:"White Hall",location:"Center, Yerevan",description:"Bright white studio with cyclorama, perfect for fashion and beauty shoots.",base_price:5e4,area_sqm:90},{id:2,slug:"dark-loft",name:"Dark Loft",location:"Center, Yerevan",description:"Atmospheric dark loft with textured walls and controlled lighting.",base_price:55e3,area_sqm:80}];async function u(e,{params:t}){let{slug:o}=t;if(!process.env.DATABASE_URL){let e=p.find(e=>e.slug===o)||{id:999,slug:o,name:"Demo Pavilion",location:"Center, Yerevan",description:"This is a demo pavilion used for preview when the database is not configured.",base_price:5e4,area_sqm:80};return s.NextResponse.json({pavilion:e,upcomingBookings:[]})}try{let e=await (0,l.JQ)(o);if(!e)return s.NextResponse.json({error:"Not found"},{status:404});let t=await (0,l.PJ)(e.id,30);return s.NextResponse.json({pavilion:e,upcomingBookings:t})}catch(e){return console.error("GET /api/pavilions/[slug] error:",e),s.NextResponse.json({error:"Failed to load pavilion"},{status:500})}}let c=new a.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/pavilions/[slug]/route",pathname:"/api/pavilions/[slug]",filename:"route",bundlePath:"app/api/pavilions/[slug]/route"},resolvedPagePath:"/Users/meritsaturyan/Desktop/anihambardzumyan/ani-hambardzumian-studios/app/api/pavilions/[slug]/route.js",nextConfigOutput:"",userland:r}),{requestAsyncStorage:d,staticGenerationAsyncStorage:_,serverHooks:m}=c,h="/api/pavilions/[slug]/route";function g(){return(0,n.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:_})}},53:(e,t,o)=>{o.d(t,{I:()=>c});var r=o(5900);let{DATABASE_URL:a,PGSSL:i,NODE_ENV:n}=process.env,s="production"===n,l=!a||/USER|PASS|HOST|DB_NAME/.test(a||""),p=(a||"").includes("127.0.0.1")||(a||"").includes("localhost"),u=null;async function c(e,t=[]){if(!u){if(s)return console.warn("[db] query() called without configured pool in production. Returning empty result."),{rows:[],rowCount:0};throw Error("Database is not configured. Set a real DATABASE_URL in your .env")}let o=await u.connect();try{return await o.query(e,t)}finally{o.release()}}l||s&&p?s||console.warn("[db] DATABASE_URL is not configured or uses localhost. DB access is disabled. Set real Postgres URL in .env (например: postgres://user:pass@host:5432/ani_hambardzumian_studios)"):u=new r.Pool({connectionString:a,ssl:"true"===i&&{rejectUnauthorized:!1}})},1818:(e,t,o)=>{o.d(t,{JQ:()=>n,PJ:()=>s,_O:()=>i});var r=o(53);let a=[{id:1,slug:"white-hall",name:"White Hall",location:"Center, Yerevan",description:"Bright white studio with cyclorama, perfect for fashion and beauty shoots.",base_price:5e4,area_sqm:90,capacity_min:2,capacity_max:8,supports_photo:!0,supports_video:!0,supports_content:!0},{id:2,slug:"dark-loft",name:"Dark Loft",location:"Center, Yerevan",description:"Atmospheric dark loft with textured walls and controlled lighting.",base_price:55e3,area_sqm:80,capacity_min:2,capacity_max:12,supports_photo:!0,supports_video:!0,supports_content:!1}];async function i(){let e=`
    SELECT
      id,
      slug,
      name,
      location,
      description,
      base_price,
      area_sqm,
      capacity_min,
      capacity_max,
      supports_photo,
      supports_video,
      supports_content
    FROM pavilions
    ORDER BY id ASC
  `,t=`
    SELECT
      id,
      slug,
      name,
      location,
      description
    FROM pavilions
    ORDER BY id ASC
  `;try{let t=await (0,r.I)(e);if(!t||0===t.rowCount)return a;return t.rows}catch(e){console.error("getAllPavilions full query failed, fallback to legacy:",e);try{let e=await (0,r.I)(t);if(!e||0===e.rowCount)return a;return(e?.rows||[]).map((e,t)=>({...e,base_price:e.base_price??(0===t?5e4:55e3),area_sqm:e.area_sqm??null,capacity_min:e.capacity_min??null,capacity_max:e.capacity_max??null,supports_photo:"boolean"!=typeof e.supports_photo||e.supports_photo,supports_video:"boolean"!=typeof e.supports_video||e.supports_video,supports_content:"boolean"!=typeof e.supports_content||e.supports_content}))}catch(e){return console.error("getAllPavilions legacy query failed:",e),a}}}async function n(e){try{let t=await (0,r.I)("SELECT * FROM pavilions WHERE slug = $1 LIMIT 1",[e]);if(t&&t.rows&&t.rows.length>0)return t.rows[0];return a.find(t=>t.slug===e)||null}catch(t){return console.error("getPavilionBySlug error:",t),a.find(t=>t.slug===e)||null}}async function s(e,t=30){try{let o=await (0,r.I)(`
      SELECT *
      FROM bookings
      WHERE pavilion_id = $1
        AND date >= CURRENT_DATE
        AND date <= CURRENT_DATE + $2::interval
      ORDER BY date ASC, time_from ASC
    `,[e,`${t} days`]);if(!o)return[];return o.rows}catch(e){return console.error("getPavilionBookingsUpcoming error:",e),[]}}}};var t=require("../../../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),r=t.X(0,[948,972],()=>o(3320));module.exports=r})();