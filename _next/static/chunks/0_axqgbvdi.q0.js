(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,76322,e=>{"use strict";var t=e.i(43476),o=e.i(71645);let r=`
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
vec2 mod289(vec2 x){return x - floor(x*(1.0/289.0))*289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
float fbm(vec2 p){
  float s=0.0, a=0.5;
  for(int i=0;i<3;i++){ s+=a*snoise(p); p*=2.02; a*=0.5; }
  return s;
}
float H(vec2 p, float t){
  vec2 q = vec2(fbm(p+vec2(0.0,t)), fbm(p+vec2(3.1,1.3)-t));
  return fbm(p + 1.8*q);
}
vec3 pal(float t, vec3 a, vec3 b, vec3 c, vec3 d){ return a + b*cos(6.28318*(c*t+d)); }

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = (gl_FragCoord.xy - 0.5*u_res.xy) / u_res.y;
  p *= 1.6;
  p += (u_mouse - 0.5) * 0.35;
  float t = u_time * 0.06;

  float e = 0.02;
  float h  = H(p, t);
  float hx = H(p + vec2(e,0.0), t);
  float hy = H(p + vec2(0.0,e), t);
  vec3 n = normalize(vec3(h-hx, h-hy, e*3.5));

  vec3 lightDir = normalize(vec3(0.5, 0.65, 0.6));
  float diff = clamp(dot(n, lightDir), 0.0, 1.0);
  float fres = pow(1.0 - clamp(n.z, 0.0, 1.0), 2.4);

  // 上品なイリデッセンス（青〜紫〜銀の狭い帯・ゆっくり循環）
  vec3 ir = pal(h*0.4 + fres*0.5 + t*0.15,
                vec3(0.55,0.55,0.62), vec3(0.32,0.28,0.4),
                vec3(1.0), vec3(0.0,0.12,0.3));

  // 面はほぼ漆黒。うねりの縁(フレネル)と光の当たりにだけ虹色が走る＝液体金属/鏡面
  vec3 dark = vec3(0.018,0.022,0.045);
  float sheen = fres*1.25 + pow(diff,2.2)*0.45;
  vec3 col = dark + ir*sheen + ir*0.05;

  col *= 1.0 - 0.5*length(uv-0.5);
  col = pow(col, vec3(0.9));
  gl_FragColor = vec4(col, 1.0);
}
`;function i(e,t,o){let r=e.createShader(t);return e.shaderSource(r,o),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)||console.error("shader error:",e.getShaderInfoLog(r)),r}e.s(["default",0,function(){let e=(0,o.useRef)(null);return(0,o.useEffect)(()=>{let t=e.current;if(!t)return;let o=window.matchMedia("(prefers-reduced-motion: reduce)").matches,n=t.getContext("webgl",{antialias:!1,alpha:!1});if(!n)return;let a=n.createProgram();n.attachShader(a,i(n,n.VERTEX_SHADER,"attribute vec2 a; void main(){ gl_Position = vec4(a,0.0,1.0); }")),n.attachShader(a,i(n,n.FRAGMENT_SHADER,r)),n.linkProgram(a),n.useProgram(a);let c=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,c),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),n.STATIC_DRAW);let l=n.getAttribLocation(a,"a");n.enableVertexAttribArray(l),n.vertexAttribPointer(l,2,n.FLOAT,!1,0,0);let s=n.getUniformLocation(a,"u_res"),m=n.getUniformLocation(a,"u_time"),f=n.getUniformLocation(a,"u_mouse"),v={x:.5,y:.5},d={x:.5,y:.5},x=e=>{d.x=e.clientX/window.innerWidth,d.y=1-e.clientY/window.innerHeight};window.addEventListener("pointermove",x);let h=Math.min(window.devicePixelRatio||1,1.5),u=()=>{let e=Math.floor(t.clientWidth*h),o=Math.floor(t.clientHeight*h);t.width=e,t.height=o,n.viewport(0,0,e,o),n.uniform2f(s,e,o)};u(),window.addEventListener("resize",u);let p=0,g=performance.now(),y=e=>{v.x+=(d.x-v.x)*.05,v.y+=(d.y-v.y)*.05,n.uniform1f(m,o?8:(e-g)/1e3),n.uniform2f(f,v.x,v.y),n.drawArrays(n.TRIANGLES,0,3),o||(p=requestAnimationFrame(y))};return p=requestAnimationFrame(y),()=>{cancelAnimationFrame(p),window.removeEventListener("pointermove",x),window.removeEventListener("resize",u)}},[]),(0,t.jsxs)("div",{style:{position:"relative",minHeight:"100svh",background:"#05060a",overflow:"hidden",fontFamily:"var(--font-noto-sans-jp), sans-serif"},children:[(0,t.jsx)("canvas",{ref:e,style:{position:"absolute",inset:0,width:"100%",height:"100%",display:"block"}}),(0,t.jsx)("div",{"aria-hidden":!0,style:{position:"absolute",inset:0,pointerEvents:"none",background:"linear-gradient(180deg, rgba(5,6,10,0.55) 0%, rgba(5,6,10,0) 28%, rgba(5,6,10,0) 62%, rgba(5,6,10,0.85) 100%)"}}),(0,t.jsxs)("div",{className:"n2-fade",style:{position:"relative",zIndex:2,minHeight:"100svh",display:"flex",flexDirection:"column",justifyContent:"center",maxWidth:1120,margin:"0 auto",padding:"0 28px"},children:[(0,t.jsx)("div",{style:{fontFamily:"var(--font-jetbrains-mono), monospace",fontSize:12,letterSpacing:"0.32em",color:"rgba(255,255,255,0.6)",marginBottom:22},children:"採用 × 集客 ／ SNS運用代行"}),(0,t.jsxs)("h1",{style:{fontWeight:900,color:"#fff",fontSize:"clamp(2.4rem, 6vw, 5.2rem)",lineHeight:1.18,letterSpacing:"-0.03em",margin:0,textShadow:"0 4px 40px rgba(0,0,0,0.5)"},children:["SNSを、",(0,t.jsx)("br",{}),"採用と集客につながる",(0,t.jsx)("br",{}),"資産へ。"]}),(0,t.jsx)("p",{style:{marginTop:26,color:"rgba(255,255,255,0.72)",fontWeight:700,fontSize:"clamp(0.9rem,1.4vw,1.05rem)",maxWidth:"32em",lineHeight:1.9},children:"Under25のSNSネイティブチーム × プロディレクター監修。 その先の景色まで、ツクリマクールが連れていく。"}),(0,t.jsx)("div",{style:{position:"absolute",bottom:36,left:28,color:"rgba(255,255,255,0.5)",fontSize:11,letterSpacing:"0.2em",fontFamily:"var(--font-jetbrains-mono), monospace"},children:"SCROLL ↓"})]}),(0,t.jsx)("style",{children:`
        .n2-fade{ opacity:0; transform: translateY(14px); animation: n2in 1.4s cubic-bezier(.22,1,.36,1) .3s forwards; }
        @keyframes n2in{ to{ opacity:1; transform:none; } }
        @media (prefers-reduced-motion: reduce){ .n2-fade{ opacity:1; transform:none; animation:none; } }
      `})]})}])}]);