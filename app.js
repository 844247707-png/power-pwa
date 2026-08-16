
const $ = s => document.querySelector(s);
const stateKey = "power-pwa-v1";

const plan = [
  {day:1,title:"全身训练 A",minutes:35,exercises:[
    ["徒手深蹲","10 次","3 组"],["斜板俯卧撑","8–12 次","3 组"],["臀桥","12 次","3 组"],["Bird Dog","每侧 8 次","2 组"],["平板支撑","30–45 秒","3 组"]
  ]},
  {day:2,title:"恢复日",minutes:30,exercises:[["步行","20–30 分钟","1 组"],["训练后拉伸","5–8 分钟","1 组"]]},
  {day:3,title:"全身训练 B",minutes:35,exercises:[
    ["后撤弓步","每侧 8 次","3 组"],["斜板俯卧撑","8–12 次","3 组"],["臀桥","每侧 8 次","2 组"],["Dead Bug","每侧 8 次","2 组"],["侧平板","每侧 20–30 秒","2 组"],["平板支撑","30–45 秒","2 组"]
  ]},
  {day:4,title:"主动恢复",minutes:25,exercises:[["步行","30 分钟","1 组"],["猫牛式","8–10 次","1 组"],["轻拉伸","6 分钟","1 组"]]},
  {day:5,title:"全身训练 A+",minutes:35,exercises:[
    ["徒手深蹲","10–12 次","3 组"],["斜板俯卧撑","8–12 次","3 组"],["臀桥","12 次","3 组"],["Bird Dog","每侧 8 次","2 组"],["平板支撑","30–45 秒","3 组"]
  ]},
  {day:6,title:"轻活动 + 核心",minutes:30,exercises:[
    ["步行","30–45 分钟","1 组"],["Bird Dog","每侧 8 次","2 组"],["Dead Bug","每侧 8 次","2 组"],["臀桥","12 次","2 组"],["平板支撑","30 秒","2 组"]
  ]},
  {day:7,title:"恢复 + 记录",minutes:10,exercises:[["散步","轻松即可","1 组"],["身体数据记录","体重 / 腰围","1 组"]]}
];

const stretches = [
  ["婴儿式",30,"放松背部、腰部和肩膀。保持自然呼吸。"],
  ["腹部伸展",30,"趴地后缓慢撑起上半身；腹部有牵拉感即可，腰不舒服就降低高度。"],
  ["臀部拉伸·左",30,"仰卧，脚踝搭在另一侧膝盖上，轻轻拉向胸口。"],
  ["臀部拉伸·右",30,"换另一侧，保持稳定呼吸。"],
  ["大腿前侧·左",25,"扶墙站立，脚跟靠近臀部，膝盖尽量并拢。"],
  ["大腿前侧·右",25,"换另一侧，不要强拉。"],
  ["大腿后侧·左",30,"从髋部向前倾，不追求摸脚尖。"],
  ["大腿后侧·右",30,"换另一侧，保持脊柱自然。"],
  ["胸部拉伸·左",25,"前臂贴门框，身体缓慢向前。"],
  ["胸部拉伸·右",25,"换另一侧。"]
];

const mealsByDay = {
  1:["鸡蛋×2 + 无糖豆浆 + 全麦三明治 + 香蕉","鸡腿饭：去皮鸡腿 + 米饭 + 鸡蛋 + 双青菜","希腊酸奶 + 纯牛奶","麻辣烫：牛肉/虾/鸡蛋/豆腐/蔬菜，清汤少油"],
  2:["帕尼尼/鸡肉早餐堡 + 鸡蛋 + 无糖豆浆","兰州牛肉面：牛肉加量 + 鸡蛋 + 青菜","无糖豆浆 + 茶叶蛋×2 + 苹果","青椒牛肉 + 番茄炒蛋 + 青菜 + 米饭"],
  3:["鸡蛋×2–3 + 牛奶 + 玉米 + 全麦面包 + 水果","沙县：鸡腿 + 卤蛋 + 豆腐 + 青菜 + 米饭","希腊酸奶 + 香蕉","鱼套餐：鱼肉 + 米饭 + 豆腐 + 双青菜"],
  4:["肉包 + 鸡蛋×2 + 无糖豆浆 + 苹果","牛肉饭：牛肉加量 + 米饭 + 鸡蛋 + 双青菜","牛奶 + 无糖酸奶","番茄炒蛋 + 虾仁/鸡肉 + 青菜 + 米饭"],
  5:["鸡蛋×2 + 牛奶 + 全麦面包 + 香蕉","高蛋白轻食：双份鸡肉 + 杂粮饭 + 鸡蛋 + 大量蔬菜","香蕉 + 无糖酸奶","牛肉饭：牛肉 + 米饭 + 双青菜 + 豆腐"],
  6:["猪柳蛋麦满分 + 牛奶/无糖咖啡 + 高蛋白酸奶","冒菜：牛肉/虾/鸡蛋/豆腐/蔬菜 + 小份米饭","牛奶 + 茶叶蛋×2","鸡腿肉 + 米饭 + 双青菜 + 鸡蛋"],
  7:["鲜肉包 + 鸡蛋×2 + 无糖豆浆 + 香蕉","土豆牛肉饭 + 一份青菜，少汤汁","希腊酸奶 + 牛奶","白灼虾 + 豆腐 + 青菜 + 米饭"]
};

function defaultState(){
  return {
    profile:{height:186,weight:70.1,bodyfat:"20–25%",calorieGoal:2100,proteinGoal:140,waterGoal:2.5},
    day:1,
    intake:{calories:0,protein:0,water:0},
    mealDone:[false,false,false,false],
    trainDone:false,
    logs:[{date:new Date().toISOString().slice(0,10),weight:70.1,waist:null,sleep:5.0}],
  }
}
let state = JSON.parse(localStorage.getItem(stateKey) || "null") || defaultState();
let route = "home";
let training = null;
let stretchSession = null;
let timerId = null;

function save(){localStorage.setItem(stateKey,JSON.stringify(state))}
function pct(a,b){return Math.min(100,Math.max(0,Math.round((a/b)*100 || 0)))}
function todayCN(){return new Intl.DateTimeFormat("zh-CN",{month:"long",day:"numeric",weekday:"short"}).format(new Date())}
$("#todayLabel").textContent = todayCN();

function setRoute(r){
  route=r;
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.route===r));
  render();
}
document.querySelectorAll(".nav-item").forEach(b=>b.addEventListener("click",()=>setRoute(b.dataset.route)));

function homeView(){
  const p=state.profile, d=plan[state.day-1];
  const complete = Math.round(([...state.mealDone,state.trainDone].filter(Boolean).length/5)*100);
  return `
    <section class="hero">
      <div class="kicker">DAY ${state.day} · ${d.title}</div>
      <div class="hero-row">
        <div><div class="big">${complete}%</div><div class="unit">今日完成度</div></div>
        <span class="pill">${d.minutes} 分钟 · ${d.exercises.length} 项</span>
      </div>
      <button class="primary" onclick="startTraining()">开始今日训练</button>
    </section>

    <div class="grid">
      ${metricCard(state.intake.calories,p.calorieGoal,"kcal","热量")}
      ${metricCard(state.intake.protein,p.proteinGoal,"g","蛋白质")}
      ${metricCard(state.intake.water,p.waterGoal,"L","饮水")}
      ${metricCard(lastLog()?.sleep || 0,7,"h","睡眠")}
    </div>

    <div class="section-title"><h2>今日任务</h2><button class="ghost" onclick="setRoute('food')">查看饮食</button></div>
    <div class="list">
      ${["早餐","午餐","加餐","晚餐"].map((m,i)=>`
      <div class="list-item ${state.mealDone[i]?'done':''}" onclick="toggleMeal(${i})">
        <div><strong>${m}</strong><div class="mini">${mealsByDay[state.day][i]}</div></div>
        <div class="check">${state.mealDone[i]?'✓':''}</div>
      </div>`).join("")}
      <div class="list-item ${state.trainDone?'done':''}" onclick="state.trainDone=!state.trainDone;save();render()">
        <div><strong>今日训练</strong><div class="mini">${d.title}</div></div>
        <div class="check">${state.trainDone?'✓':''}</div>
      </div>
    </div>
  `;
}
function metricCard(v,goal,unit,label){
  return `<div class="card"><div class="kicker">${label}</div><div class="metric">${v}<span style="font-size:14px;font-weight:500;color:#aaa"> ${unit}</span></div><div class="metric-label">目标 ${goal} ${unit}</div><div class="progress"><span style="width:${pct(v,goal)}%"></span></div></div>`
}

function trainView(){
  if(training) return trainingView();
  const d=plan[state.day-1];
  return `
    <div class="section-title"><h2>Day ${state.day}</h2><span class="pill">${d.title}</span></div>
    <div class="card soft">
      <div class="kicker">TODAY'S WORKOUT</div>
      <div class="metric">${d.minutes}<span style="font-size:15px"> min</span></div>
      <p class="note">每组结束时保留约 2–3 次余力。动作出现尖锐疼痛时停止。</p>
      <button class="primary" onclick="startTraining()">开始训练</button>
      <button class="secondary" onclick="startStretch()">只做拉伸</button>
    </div>
    <div class="list">${d.exercises.map((x,i)=>`
      <div class="list-item">
        <div><strong>${String(i+1).padStart(2,'0')} · ${x[0]}</strong><div class="mini">${x[1]} · ${x[2]}</div></div>
      </div>`).join("")}
    </div>
  `;
}
function startTraining(){
  const d=plan[state.day-1];
  training={exercise:0,set:1,rest:false,restSec:0};
  route="train"; render();
}
function trainingView(){
  const d=plan[state.day-1], e=d.exercises[training.exercise];
  const totalSets=parseInt(e[2])||1;
  return `
    <div class="exercise-hero">
      <div class="kicker">${training.exercise+1} / ${d.exercises.length}</div>
      <h2>${e[0]}</h2>
      <div class="counter">${e[1]}</div>
      <div class="mini">第 ${training.set} / ${totalSets} 组</div>
      <p class="note">稳定呼吸，动作质量优先，不要憋气。</p>
      <button class="primary" onclick="completeSet()">完成本组</button>
      <button class="secondary" onclick="training=null;render()">退出训练</button>
    </div>
  `
}
function completeSet(){
  const d=plan[state.day-1], e=d.exercises[training.exercise], totalSets=parseInt(e[2])||1;
  if(training.set < totalSets){
    training.set++;
    showCountdown(75, ()=>render(), "组间休息");
  }else if(training.exercise < d.exercises.length-1){
    training.exercise++; training.set=1;
    showCountdown(60, ()=>render(), "下一动作准备");
  }else{
    training=null; state.trainDone=true; save();
    showModal(`
      <div class="kicker">WORKOUT COMPLETE</div>
      <h2>训练完成</h2>
      <p class="note">建议现在进行约 8 分钟舒缓拉伸。</p>
      <button class="primary" onclick="closeModal();startStretch()">开始拉伸</button>
      <button class="secondary" onclick="closeModal();render()">稍后再做</button>
    `)
  }
}
function showCountdown(sec,done,title){
  let left=sec;
  showModal(`<div class="kicker">${title}</div><div class="timer-ring"><div><div class="time" id="modalTime">${formatTime(left)}</div><div class="mini" style="text-align:center">保持走动与呼吸</div></div></div><button class="secondary" onclick="skipTimer()">跳过</button>`);
  window._timerDone=()=>{closeModal();done()};
  clearInterval(timerId);
  timerId=setInterval(()=>{
    left--; const el=$("#modalTime"); if(el) el.textContent=formatTime(left);
    if(left<=0){clearInterval(timerId); window._timerDone?.()}
  },1000);
}
function skipTimer(){clearInterval(timerId); window._timerDone?.()}
function formatTime(s){return `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`}

function startStretch(){
  stretchSession={index:0,left:stretches[0][1],running:false};
  route="train"; renderStretch();
}
function renderStretch(){
  const s=stretches[stretchSession.index];
  $("#view").innerHTML=`
    <div class="exercise-hero">
      <div class="kicker">拉伸 ${stretchSession.index+1} / ${stretches.length}</div>
      <h2>${s[0]}</h2>
      <div class="timer-ring"><div><div class="time" id="stretchTime">${formatTime(stretchSession.left)}</div><div class="mini" style="text-align:center">轻微牵拉即可</div></div></div>
      <p class="note">${s[2]}</p>
      <button class="primary" onclick="toggleStretchTimer()">${stretchSession.running?"暂停":"开始"}</button>
      <button class="secondary" onclick="nextStretch()">下一个动作</button>
    </div>`;
}
function toggleStretchTimer(){
  stretchSession.running=!stretchSession.running; clearInterval(timerId);
  if(stretchSession.running){
    timerId=setInterval(()=>{
      stretchSession.left--;
      const e=$("#stretchTime"); if(e)e.textContent=formatTime(Math.max(0,stretchSession.left));
      if(stretchSession.left<=0){clearInterval(timerId); nextStretch()}
    },1000);
  }
  renderStretch();
}
function nextStretch(){
  clearInterval(timerId);
  if(stretchSession.index < stretches.length-1){
    stretchSession.index++; stretchSession.left=stretches[stretchSession.index][1]; stretchSession.running=false; renderStretch();
  }else{
    stretchSession=null;
    showModal(`<div class="kicker">RECOVERY COMPLETE</div><h2>拉伸完成</h2><p class="note">今天的训练流程结束。补水并正常进食即可。</p><button class="primary" onclick="closeModal();render()">完成</button>`);
  }
}

function foodView(){
  const labels=["早餐","午餐","加餐","晚餐"];
  return `
  <div class="card">
    <div class="row"><div><div class="kicker">DAILY TARGET</div><div class="metric">${state.profile.calorieGoal}<span style="font-size:14px"> kcal</span></div></div><div style="text-align:right"><div class="metric">${state.profile.proteinGoal}<span style="font-size:14px"> g</span></div><div class="metric-label">蛋白质</div></div></div>
  </div>
  <div class="section-title"><h2>Day ${state.day} 饮食</h2></div>
  <div class="list">
    ${mealsByDay[state.day].map((x,i)=>`<div class="list-item ${state.mealDone[i]?'done':''}" onclick="toggleMeal(${i})"><div><strong>${labels[i]}</strong><div class="mini">${x}</div></div><div class="check">${state.mealDone[i]?'✓':''}</div></div>`).join("")}
  </div>
  <div class="section-title"><h2>快速记录</h2></div>
  <div class="card">
    <div class="form-row">
      <div><label>增加热量 kcal</label><input class="inline-input" id="addCal" type="number" placeholder="如 650"></div>
      <div><label>增加蛋白质 g</label><input class="inline-input" id="addPro" type="number" placeholder="如 42"></div>
    </div>
    <label style="margin-top:12px">饮水 L</label><input class="inline-input" id="addWater" type="number" step=".1" placeholder="如 0.5">
    <button class="primary" onclick="addIntake()">加入今日数据</button>
  </div>`;
}
function addIntake(){
  state.intake.calories+=Number($("#addCal").value||0);
  state.intake.protein+=Number($("#addPro").value||0);
  state.intake.water=+(state.intake.water+Number($("#addWater").value||0)).toFixed(1);
  save(); render();
}
function toggleMeal(i){state.mealDone[i]=!state.mealDone[i];save();render()}

function dataView(){
  const logs=state.logs.slice(-7), weights=logs.map(x=>x.weight).filter(Boolean), max=Math.max(...weights,71), min=Math.min(...weights,69);
  return `
    <div class="grid">
      <div class="card"><div class="kicker">当前体重</div><div class="metric">${lastLog()?.weight ?? "—"}<span style="font-size:14px"> kg</span></div></div>
      <div class="card"><div class="kicker">腰围</div><div class="metric">${lastLog()?.waist ?? "—"}<span style="font-size:14px"> cm</span></div></div>
      <div class="card"><div class="kicker">最近睡眠</div><div class="metric">${lastLog()?.sleep ?? "—"}<span style="font-size:14px"> h</span></div></div>
      <div class="card"><div class="kicker">训练</div><div class="metric">${state.trainDone?"100":"0"}<span style="font-size:14px"> %</span></div></div>
    </div>
    <div class="card">
      <div class="row"><div><div class="kicker">WEIGHT TREND</div><h3>近 7 次记录</h3></div></div>
      <div class="chart">${logs.map(x=>`<div class="bar" style="height:${x.weight? 30+((x.weight-min)/(max-min||1))*100:8}px"></div>`).join("")}</div>
    </div>
    <div class="card">
      <h3>记录身体数据</h3>
      <div class="form-row" style="margin-top:14px">
        <div><label>体重 kg</label><input id="logWeight" class="inline-input" type="number" step=".1" value="${lastLog()?.weight??state.profile.weight}"></div>
        <div><label>腰围 cm</label><input id="logWaist" class="inline-input" type="number" step=".1" value="${lastLog()?.waist??""}"></div>
      </div>
      <label style="margin-top:12px">昨晚睡眠 h</label><input id="logSleep" class="inline-input" type="number" step=".1" value="${lastLog()?.sleep??""}">
      <button class="primary" onclick="saveLog()">保存记录</button>
    </div>`;
}
function saveLog(){
  const item={date:new Date().toISOString().slice(0,10),weight:Number($("#logWeight").value)||null,waist:Number($("#logWaist").value)||null,sleep:Number($("#logSleep").value)||null};
  state.logs.push(item); save(); render();
}
function lastLog(){return state.logs[state.logs.length-1]}

function meView(){
  return `
    <div class="card">
      <div class="kicker">PROFILE</div>
      <h2>力量 Power</h2>
      <p class="note">个人健身、饮食与身体数据仪表盘。所有数据默认只保存在当前浏览器。</p>
    </div>
    <div class="card">
      <div class="form-row">
        <div><label>身高 cm</label><input id="pHeight" class="inline-input" type="number" value="${state.profile.height}"></div>
        <div><label>体重 kg</label><input id="pWeight" class="inline-input" type="number" step=".1" value="${state.profile.weight}"></div>
        <div><label>每日热量 kcal</label><input id="pCal" class="inline-input" type="number" value="${state.profile.calorieGoal}"></div>
        <div><label>蛋白质 g</label><input id="pPro" class="inline-input" type="number" value="${state.profile.proteinGoal}"></div>
      </div>
      <label style="margin-top:12px">每日饮水 L</label><input id="pWater" class="inline-input" type="number" step=".1" value="${state.profile.waterGoal}">
      <button class="primary" onclick="saveProfile()">保存目标</button>
    </div>
    <div class="card">
      <div class="row"><div><div class="kicker">PROGRAM</div><h3>当前：Day ${state.day}</h3></div><button class="pill" onclick="nextDay()">进入下一天</button></div>
      <p class="note">完成当天计划后再进入下一天。第 7 天之后会从 Day 1 重新开始。</p>
    </div>
    <div class="card">
      <h3>数据备份</h3>
      <button class="secondary" onclick="exportData()">导出 JSON</button>
      <button class="secondary" onclick="document.getElementById('importFile').click()">导入 JSON</button>
      <input id="importFile" type="file" accept="application/json" style="display:none" onchange="importData(event)">
    </div>`;
}
function saveProfile(){
  state.profile.height=Number($("#pHeight").value)||state.profile.height;
  state.profile.weight=Number($("#pWeight").value)||state.profile.weight;
  state.profile.calorieGoal=Number($("#pCal").value)||state.profile.calorieGoal;
  state.profile.proteinGoal=Number($("#pPro").value)||state.profile.proteinGoal;
  state.profile.waterGoal=Number($("#pWater").value)||state.profile.waterGoal;
  save(); render();
}
function nextDay(){
  state.day = state.day>=7 ? 1 : state.day+1;
  state.intake={calories:0,protein:0,water:0}; state.mealDone=[false,false,false,false]; state.trainDone=false;
  save(); render();
}
function exportData(){
  const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});
  const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="power-backup.json"; a.click(); URL.revokeObjectURL(a.href);
}
function importData(ev){
  const f=ev.target.files[0]; if(!f)return;
  const r=new FileReader(); r.onload=()=>{try{state=JSON.parse(r.result);save();render()}catch(e){alert("备份文件无法读取")}}; r.readAsText(f);
}

function showModal(html){$("#modalContent").innerHTML=html;$("#modal").showModal()}
function closeModal(){clearInterval(timerId);$("#modal").close()}
window.closeModal=closeModal;

$("#resetTodayBtn").addEventListener("click",()=>{
  if(confirm("重置今天的饮食、饮水和训练完成状态？")){
    state.intake={calories:0,protein:0,water:0};state.mealDone=[false,false,false,false];state.trainDone=false;save();render();
  }
});

function render(){
  clearInterval(timerId);
  if(stretchSession){renderStretch();return}
  const view=$("#view");
  view.innerHTML=route==="home"?homeView():route==="train"?trainView():route==="food"?foodView():route==="data"?dataView():meView();
}
render();

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
}
