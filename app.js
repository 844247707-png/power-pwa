const $ = s => document.querySelector(s);
const stateKey = "power-pwa-v2";

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

const exerciseLibrary = [
  {
    name:"徒手深蹲", category:"下肢 · 臀腿", visual:"squat", tags:["入门","下肢","核心稳定"],
    summary:"最基础也最重要的下肢动作之一，练腿、臀和核心稳定。",
    points:["双脚与肩同宽，脚尖自然朝前或略微外开。","下蹲时屁股向后坐，像坐椅子。","膝盖方向和脚尖一致，不内扣。","站起时脚掌稳稳踩地，臀腿一起发力。"],
    errors:["膝盖内扣。","脚跟离地。","弯腰过多，胸口塌陷。","只蹲膝盖，不会向后坐臀。"],
    fix:["把注意力放在“屁股向后坐”。","想象把地板踩开，让膝盖朝脚尖方向走。","如果平衡差，可以先面对椅子做半蹲。"],
    breath:"下蹲吸气，站起呼气。"
  },
  {
    name:"斜板俯卧撑", category:"上肢 · 胸肩三头", visual:"incline_pushup", tags:["入门","胸肩","居家"],
    summary:"用桌沿、床沿或沙发扶手完成，更适合刚开始练俯卧撑的人。",
    points:["双手撑在稳定支撑面上，身体从头到脚保持一条线。","手掌略宽于肩。","下降时胸口靠近支撑面。","推起时不要耸肩。"],
    errors:["塌腰。","屁股撅得太高。","脖子前伸。","手肘完全外张。"],
    fix:["先收紧腹部和臀部，再开始动作。","如果太难，把支撑点抬高一些。"],
    breath:"下降吸气，推起呼气。"
  },
  {
    name:"臀桥", category:"臀部 · 后链", visual:"glute_bridge", tags:["入门","臀部","保护腰"],
    summary:"帮助找到臀部发力感，非常适合久坐人群和你的当前阶段。",
    points:["仰卧屈膝，双脚踩地。","抬起臀部到肩—髋—膝大致成一直线。","顶部停顿 1 秒，主动夹臀。","全程尽量让力从臀部发出，而不是腰。"],
    errors:["用腰猛顶。","脚离身体太远。","动作过快。"],
    fix:["把脚收近一点。","想象“把屁股抬起来”，顶部短暂停住。"],
    breath:"抬起呼气，放下吸气。"
  },
  {
    name:"Bird Dog", category:"核心 · 稳定", visual:"bird_dog", tags:["核心","稳定","护腰"],
    summary:"很适合练习抗旋转和躯干稳定。",
    points:["四点跪姿，肩在手上方，髋在膝上方。","一侧手向前、对侧腿向后伸。","腰背尽量稳定，不左右晃动。","动作慢，停顿一下再回位。"],
    errors:["抬得过高导致腰反弓。","身体左右扭。"],
    fix:["抬到和身体平行即可。","动作速度减慢，先少做几次。"],
    breath:"伸展时呼气，回位吸气。"
  },
  {
    name:"平板支撑", category:"核心", visual:"plank", tags:["核心","耐力","基础"],
    summary:"训练前侧核心耐力，但前提是姿势正确。",
    points:["肩膀在手肘正上方。","头、背、臀尽量成一直线。","腹部收紧，臀部轻微夹紧。","保持正常呼吸。"],
    errors:["塌腰。","屁股抬太高。","憋气。","耸肩。"],
    fix:["先把秒数降低到能稳定保持姿势的时长。","想象肚脐轻轻收向脊柱。"],
    breath:"持续自然呼吸，不要憋气。"
  },
  {
    name:"后撤弓步", category:"下肢 · 平衡", visual:"reverse_lunge", tags:["腿臀","平衡","单侧"],
    summary:"比前弓步更容易控制，对初学者更友好。",
    points:["站直后单脚向后迈。","前脚脚掌踩稳，躯干保持直立。","后膝向地面方向下降。","前腿发力回到起始。"],
    errors:["身体前扑。","前膝过度内扣。","步幅太窄。"],
    fix:["后撤时迈大一点。","可扶墙先练平衡。"],
    breath:"下去吸气，站起呼气。"
  },
  {
    name:"Dead Bug", category:"核心 · 协调", visual:"dead_bug", tags:["核心","协调","护腰"],
    summary:"帮助你在动态动作里保持腰部稳定。",
    points:["仰卧，腰背轻贴地面。","一侧手和对侧腿缓慢伸展。","动作过程中腰不要离地。","速度慢而稳定。"],
    errors:["伸腿时腰拱起来。","动作太快。"],
    fix:["缩小动作幅度。","先只练腿或只练手。"],
    breath:"伸展呼气，回位吸气。"
  },
  {
    name:"侧平板", category:"核心 · 侧链", visual:"side_plank", tags:["核心","侧腹","稳定"],
    summary:"非常适合补足侧向核心稳定。",
    points:["手肘在肩正下方。","膝支撑版适合初学者。","从头到膝（或脚）保持成线。","不要让身体向前翻或后倒。"],
    errors:["肩膀耸起。","臀部下沉。"],
    fix:["先做膝支撑版。","缩短时间但保证姿势漂亮。"],
    breath:"保持均匀呼吸。"
  },
  {name:"婴儿式", category:"拉伸", visual:"child_pose", tags:["拉伸","恢复"], summary:"训练后舒缓背部和肩部的经典动作。", points:["臀部坐向脚后跟。","手臂向前伸，肩放松。"], errors:["耸肩过紧。"], fix:["只要有轻拉伸感即可。"], breath:"缓慢深呼吸。"},
  {name:"腹部伸展", category:"拉伸", visual:"cobra", tags:["拉伸","腹部"], summary:"做完平板支撑后非常适合放松前侧。", points:["趴地后用手轻轻撑起上半身。","骨盆尽量贴地。"], errors:["强压腰部。"], fix:["腰不舒服就减小高度。"], breath:"撑起时自然呼吸。"},
  {name:"大腿前侧拉伸", category:"拉伸", visual:"quad_stretch", tags:["拉伸","腿部"], summary:"放松股四头肌。", points:["扶墙站稳。","同侧手抓脚踝向臀部靠近。"], errors:["膝盖外张。"], fix:["两侧膝盖尽量并拢。"], breath:"自然呼吸。"},
  {name:"大腿后侧拉伸", category:"拉伸", visual:"hamstring_stretch", tags:["拉伸","腿后侧"], summary:"放松腿后侧和髋后链。", points:["一腿伸直，一腿弯曲。","从髋部向前折叠。"], errors:["强行弓背摸脚尖。"], fix:["保持脊柱自然，不要硬压。"], breath:"自然呼吸。"}
];

function defaultState(){
  return {
    profile:{height:186,weight:70.1,bodyfat:"20–25%",calorieGoal:2100,proteinGoal:140,waterGoal:2.5},
    day:1,
    intake:{calories:0,protein:0,water:0},
    mealDone:[false,false,false,false],
    trainDone:false,
    logs:[{date:new Date().toISOString().slice(0,10),weight:70.1,waist:null,sleep:5.0}],
    libraryFilter:"全部",
    lastViewedExercise:null
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
function escapeHtml(s){return (s||"").replace(/[&<>\"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]))}
function findExercise(name){return exerciseLibrary.find(x=>x.name===name)}

function setRoute(r){
  route=r;
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.route===r));
  render();
}
document.querySelectorAll(".nav-item").forEach(b=>b.addEventListener("click",()=>setRoute(b.dataset.route)));

function homeView(){
  const p=state.profile, d=plan[state.day-1];
  const complete = Math.round(([...state.mealDone,state.trainDone].filter(Boolean).length/5)*100);
  const firstDemo = d.exercises.map(x=>findExercise(x[0])).find(Boolean);
  return `
    <section class="hero">
      <div class="kicker">DAY ${state.day} · ${d.title}</div>
      <div class="hero-row">
        <div><div class="big">${complete}%</div><div class="unit">今日完成度</div></div>
        <span class="pill">${d.minutes} 分钟 · ${d.exercises.length} 项</span>
      </div>
      <button class="primary" onclick="startTraining()">开始今日训练</button>
      <button class="secondary" onclick="setRoute('library')">打开动作库</button>
    </section>

    <div class="grid">
      ${metricCard(state.intake.calories,p.calorieGoal,"kcal","热量")}
      ${metricCard(state.intake.protein,p.proteinGoal,"g","蛋白质")}
      ${metricCard(state.intake.water,p.waterGoal,"L","饮水")}
      ${metricCard(lastLog()?.sleep || 0,7,"h","睡眠")}
    </div>

    ${firstDemo ? `
    <div class="section-title"><h2>今日动作预览</h2><button class="ghost compact" onclick="showExercise('${firstDemo.name}')">查看演示</button></div>
    <div class="card preview-line" onclick="showExercise('${firstDemo.name}')">
      <div class="mini-visual">${exerciseSVG(firstDemo.visual,'start')}</div>
      <div><strong>${firstDemo.name}</strong><div class="mini">点开可看姿势要点、错误动作与纠正建议</div></div>
    </div>` : ''}

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
        ${findExercise(x[0])? `<button class="ghost compact" onclick="showExercise('${x[0]}')">示范</button>`:''}
      </div>`).join("")}
    </div>
  `;
}
function startTraining(){ training={exercise:0,set:1}; route="train"; render(); }
function trainingView(){
  const d=plan[state.day-1], e=d.exercises[training.exercise];
  const totalSets=parseInt(e[2])||1;
  const demo = findExercise(e[0]);
  return `
    <div class="exercise-hero">
      <div class="kicker">${training.exercise+1} / ${d.exercises.length}</div>
      <h2>${e[0]}</h2>
      <div class="counter">${e[1]}</div>
      <div class="mini">第 ${training.set} / ${totalSets} 组</div>
      <p class="note">稳定呼吸，动作质量优先，不要憋气。</p>
      ${demo? `<button class="secondary" onclick="showExercise('${e[0]}')">查看动作示范</button>`:''}
      <button class="primary" onclick="completeSet()">完成本组</button>
      <button class="secondary" onclick="training=null;render()">退出训练</button>
    </div>`
}
function completeSet(){
  const d=plan[state.day-1], e=d.exercises[training.exercise], totalSets=parseInt(e[2])||1;
  if(training.set < totalSets){ training.set++; showCountdown(75, ()=>render(), "组间休息"); }
  else if(training.exercise < d.exercises.length-1){ training.exercise++; training.set=1; showCountdown(60, ()=>render(), "下一动作准备"); }
  else{ training=null; state.trainDone=true; save();
    showModal(`
      <div class="kicker">WORKOUT COMPLETE</div>
      <h2>训练完成</h2>
      <p class="note">建议现在进行约 8 分钟舒缓拉伸。</p>
      <button class="primary" onclick="closeModal();startStretch()">开始拉伸</button>
      <button class="secondary" onclick="closeModal();render()">稍后再做</button>`)
  }
}
function showCountdown(sec,done,title){
  let left=sec;
  showModal(`<div class="kicker">${title}</div><div class="timer-ring"><div><div class="time" id="modalTime">${formatTime(left)}</div><div class="mini" style="text-align:center">保持走动与呼吸</div></div></div><button class="secondary" onclick="skipTimer()">跳过</button>`);
  window._timerDone=()=>{closeModal();done()};
  clearInterval(timerId);
  timerId=setInterval(()=>{ left--; const el=$("#modalTime"); if(el) el.textContent=formatTime(left); if(left<=0){clearInterval(timerId); window._timerDone?.()} },1000);
}
function skipTimer(){clearInterval(timerId); window._timerDone?.()}
function formatTime(s){return `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`}

function startStretch(){ stretchSession={index:0,left:stretches[0][1],running:false}; route="train"; renderStretch(); }
function renderStretch(){
  const s=stretches[stretchSession.index];
  $("#view").innerHTML=`
    <div class="exercise-hero">
      <div class="kicker">拉伸 ${stretchSession.index+1} / ${stretches.length}</div>
      <h2>${s[0]}</h2>
      <div class="timer-ring"><div><div class="time" id="stretchTime">${formatTime(stretchSession.left)}</div><div class="mini" style="text-align:center">轻微牵拉即可</div></div></div>
      <p class="note">${s[2]}</p>
      <button class="secondary" onclick="showExerciseByKeyword('${s[0].replace(/·.*/,"")}')">查看示意</button>
      <button class="primary" onclick="toggleStretchTimer()">${stretchSession.running?"暂停":"开始"}</button>
      <button class="secondary" onclick="nextStretch()">下一个动作</button>
    </div>`;
}
function toggleStretchTimer(){
  stretchSession.running=!stretchSession.running; clearInterval(timerId);
  if(stretchSession.running){ timerId=setInterval(()=>{ stretchSession.left--; const e=$("#stretchTime"); if(e)e.textContent=formatTime(Math.max(0,stretchSession.left)); if(stretchSession.left<=0){clearInterval(timerId); nextStretch()} },1000); }
  renderStretch();
}
function nextStretch(){
  clearInterval(timerId);
  if(stretchSession.index < stretches.length-1){ stretchSession.index++; stretchSession.left=stretches[stretchSession.index][1]; stretchSession.running=false; renderStretch(); }
  else{ stretchSession=null; showModal(`<div class="kicker">RECOVERY COMPLETE</div><h2>拉伸完成</h2><p class="note">今天的训练流程结束。补水并正常进食即可。</p><button class="primary" onclick="closeModal();render()">完成</button>`); }
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
function addIntake(){ state.intake.calories+=Number($("#addCal").value||0); state.intake.protein+=Number($("#addPro").value||0); state.intake.water=+(state.intake.water+Number($("#addWater").value||0)).toFixed(1); save(); render(); }
function toggleMeal(i){state.mealDone[i]=!state.mealDone[i];save();render()}

function libraryView(){
  const categories=["全部",...new Set(exerciseLibrary.map(x=>x.category.split(' · ')[0]))];
  const list=exerciseLibrary.filter(x=>state.libraryFilter==="全部" || x.category.startsWith(state.libraryFilter));
  return `
    <div class="tabs">${categories.map(c=>`<button class="${state.libraryFilter===c?'active':''}" onclick="setLibraryFilter('${c}')">${c}</button>`).join('')}</div>
    <div class="section-title"><h2>动作库</h2><span class="pill">图示 · 要点 · 错误</span></div>
    <div class="library-grid">
      ${list.map(item=>`
        <div class="library-card" onclick="showExercise('${item.name}')">
          <div class="category">${item.category}</div>
          <div class="visual-box">${exerciseSVG(item.visual,'start')}</div>
          <h3>${item.name}</h3>
          <div class="badge-row">${item.tags.slice(0,3).map(t=>`<span class="badge">${t}</span>`).join('')}</div>
          <div class="mini">${item.summary}</div>
        </div>`).join('')}
    </div>
    <p class="foot-note">说明：当前版本先提供图示和动作要点，后续你换三星后我们还可以继续升级成真实短视频/GIF 版本。</p>
  `;
}
function setLibraryFilter(c){state.libraryFilter=c;save();render()}
function showExerciseByKeyword(keyword){
  const item=exerciseLibrary.find(x=>x.name.includes(keyword));
  if(item) showExercise(item.name);
}
function showExercise(name){
  const item=findExercise(name); if(!item) return;
  state.lastViewedExercise=name; save();
  showModal(`
    <div class="kicker">EXERCISE GUIDE</div>
    <h2>${item.name}</h2>
    <div class="badge-row">${item.tags.map(t=>`<span class="badge">${t}</span>`).join('')}</div>
    <div class="visual-box" id="exerciseVisualBox">${exerciseSVG(item.visual,'start')}</div>
    <div class="phase-toggle">
      <button class="active" onclick="swapVisual('${item.visual}','start', this)">起始姿势</button>
      <button onclick="swapVisual('${item.visual}','end', this)">动作过程/结束</button>
    </div>
    <p class="note">${item.summary}</p>
    <hr>
    <strong>动作要点</strong>
    <ul class="tip-list">${item.points.map(x=>`<li>${x}</li>`).join('')}</ul>
    <hr>
    <strong>常见错误</strong>
    <ul class="tip-list">${item.errors.map(x=>`<li>${x}</li>`).join('')}</ul>
    <hr>
    <strong>纠正建议</strong>
    <ul class="tip-list">${item.fix.map(x=>`<li>${x}</li>`).join('')}</ul>
    <hr>
    <strong>呼吸提示</strong>
    <p class="note">${item.breath}</p>
    <div class="action-row">
      <button class="secondary compact" onclick="closeModal();setRoute('train')">返回训练</button>
      <button class="primary compact" onclick="playDemo('${item.visual}')">播放演示</button>
    </div>
  `)
}
function swapVisual(visual, phase, el){
  const box=$("#exerciseVisualBox"); if(box) box.innerHTML=exerciseSVG(visual,phase);
  const wrap=el.parentElement; wrap.querySelectorAll('button').forEach(b=>b.classList.remove('active')); el.classList.add('active');
}
function playDemo(visual){
  let phase='start';
  const box=$("#exerciseVisualBox");
  if(!box) return;
  clearInterval(window._demoInt);
  window._demoInt=setInterval(()=>{ phase=phase==='start'?'end':'start'; box.innerHTML=exerciseSVG(visual,phase); },800);
}

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
function saveLog(){ const item={date:new Date().toISOString().slice(0,10),weight:Number($("#logWeight").value)||null,waist:Number($("#logWaist").value)||null,sleep:Number($("#logSleep").value)||null}; state.logs.push(item); save(); render(); }
function lastLog(){return state.logs[state.logs.length-1]}

function meView(){
  return `
    <div class="card">
      <div class="kicker">PROFILE</div>
      <h2>力量 Power</h2>
      <p class="note">个人健身、饮食与身体数据仪表盘。V2 已加入动作库、图示、常见错误和纠正建议。</p>
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
function saveProfile(){ state.profile.height=Number($("#pHeight").value)||state.profile.height; state.profile.weight=Number($("#pWeight").value)||state.profile.weight; state.profile.calorieGoal=Number($("#pCal").value)||state.profile.calorieGoal; state.profile.proteinGoal=Number($("#pPro").value)||state.profile.proteinGoal; state.profile.waterGoal=Number($("#pWater").value)||state.profile.waterGoal; save(); render(); }
function nextDay(){ state.day = state.day>=7 ? 1 : state.day+1; state.intake={calories:0,protein:0,water:0}; state.mealDone=[false,false,false,false]; state.trainDone=false; save(); render(); }
function exportData(){ const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"}); const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="power-backup.json"; a.click(); URL.revokeObjectURL(a.href); }
function importData(ev){ const f=ev.target.files[0]; if(!f)return; const r=new FileReader(); r.onload=()=>{try{state=JSON.parse(r.result);save();render()}catch(e){alert("备份文件无法读取")}}; r.readAsText(f); }

function exerciseSVG(type, phase='start'){
  const s = phase==='start';
  switch(type){
    case 'squat': return svgWrap(`
      <line x1="60" y1="42" x2="60" y2="82" ${stroke()}/><circle cx="60" cy="26" r="10" ${stroke()}/>
      <line x1="60" y1="52" x2="38" y2="62" ${stroke()}/><line x1="60" y1="52" x2="82" y2="62" ${stroke()}/>
      ${s? `<line x1="60" y1="82" x2="46" y2="118" ${stroke()}/><line x1="60" y1="82" x2="74" y2="118" ${stroke()}/>` : `<line x1="60" y1="82" x2="44" y2="100" ${stroke()}/><line x1="44" y1="100" x2="32" y2="118" ${stroke()}/><line x1="60" y1="82" x2="76" y2="100" ${stroke()}/><line x1="76" y1="100" x2="88" y2="118" ${stroke()}/>`}
      <line x1="24" y1="120" x2="96" y2="120" stroke="#bbb" stroke-width="3" stroke-linecap="round"/>
    `);
    case 'incline_pushup': return svgWrap(`
      <line x1="90" y1="40" x2="90" y2="120" stroke="#cfcfcf" stroke-width="4"/>
      <line x1="90" y1="80" x2="65" y2="${s?72:84}" ${stroke()}/><circle cx="55" cy="${s?68:80}" r="8" ${stroke()}/>
      <line x1="65" y1="${s?72:84}" x2="35" y2="${s?92:96}" ${stroke()}/><line x1="35" y1="${s?92:96}" x2="18" y2="104" ${stroke()}/>
      <line x1="67" y1="${s?74:86}" x2="83" y2="84" ${stroke()}/><line x1="63" y1="${s?74:86}" x2="82" y2="93" ${stroke()}/>
    `);
    case 'glute_bridge': return svgWrap(`
      <line x1="15" y1="120" x2="105" y2="120" stroke="#bbb" stroke-width="3" stroke-linecap="round"/>
      <circle cx="28" cy="${s?96:82}" r="9" ${stroke()}/>
      <line x1="36" y1="${s?98:84}" x2="${s?55:58}" y2="${s?106:86}" ${stroke()}/><line x1="${s?55:58}" y1="${s?106:86}" x2="${s?70:80}" y2="${s?112:88}" ${stroke()}/>
      <line x1="${s?70:80}" y1="${s?112:88}" x2="${s?88:100}" y2="${s?104:98}" ${stroke()}/><line x1="${s?88:100}" y1="${s?104:98}" x2="95" y2="120" ${stroke()}/>
      <line x1="${s?78:88}" y1="${s?110:90}" x2="75" y2="120" ${stroke()}/>
    `);
    case 'bird_dog': return svgWrap(`
      <line x1="40" y1="70" x2="70" y2="70" ${stroke()}/><circle cx="30" cy="68" r="8" ${stroke()}/>
      <line x1="42" y1="72" x2="${s?52:20}" y2="${s?100:68}" ${stroke()}/><line x1="68" y1="72" x2="80" y2="100" ${stroke()}/>
      <line x1="50" y1="70" x2="${s?76:96}" y2="${s?48:70}" ${stroke()}/><line x1="66" y1="70" x2="${s?52:20}" y2="${s?100:102}" ${stroke()}/>
      <line x1="18" y1="104" x2="88" y2="104" stroke="#bbb" stroke-width="3" stroke-linecap="round"/>
    `);
    case 'plank': return svgWrap(`
      <line x1="15" y1="108" x2="105" y2="108" stroke="#bbb" stroke-width="3" stroke-linecap="round"/>
      <circle cx="30" cy="${s?66:74}" r="8" ${stroke()}/>
      <line x1="38" y1="${s?68:76}" x2="84" y2="${s?78:70}" ${stroke()}/>
      <line x1="48" y1="78" x2="42" y2="108" ${stroke()}/><line x1="82" y1="${s?78:70}" x2="90" y2="108" ${stroke()}/>
    `);
    case 'reverse_lunge': return svgWrap(`
      <circle cx="60" cy="26" r="10" ${stroke()}/><line x1="60" y1="40" x2="60" y2="80" ${stroke()}/><line x1="60" y1="52" x2="42" y2="62" ${stroke()}/><line x1="60" y1="52" x2="78" y2="62" ${stroke()}/>
      ${s? `<line x1="60" y1="80" x2="50" y2="118" ${stroke()}/><line x1="60" y1="80" x2="76" y2="118" ${stroke()}/>` : `<line x1="60" y1="80" x2="48" y2="108" ${stroke()}/><line x1="48" y1="108" x2="44" y2="118" ${stroke()}/><line x1="60" y1="80" x2="82" y2="98" ${stroke()}/><line x1="82" y1="98" x2="96" y2="118" ${stroke()}/>`}
      <line x1="28" y1="120" x2="100" y2="120" stroke="#bbb" stroke-width="3" stroke-linecap="round"/>
    `);
    case 'dead_bug': return svgWrap(`
      <circle cx="24" cy="60" r="8" ${stroke()}/><line x1="32" y1="60" x2="62" y2="60" ${stroke()}/>
      <line x1="46" y1="60" x2="${s?40:76}" y2="${s?36:36}" ${stroke()}/><line x1="46" y1="60" x2="${s?40:76}" y2="${s?84:84}" ${stroke()}/>
      <line x1="62" y1="60" x2="${s?84:98}" y2="${s?40:60}" ${stroke()}/><line x1="62" y1="60" x2="${s?84:98}" y2="${s?80:60}" ${stroke()}/>
      <line x1="10" y1="100" x2="100" y2="100" stroke="#bbb" stroke-width="3" stroke-linecap="round"/>
    `);
    case 'side_plank': return svgWrap(`
      <line x1="20" y1="108" x2="100" y2="108" stroke="#bbb" stroke-width="3" stroke-linecap="round"/>
      <circle cx="${s?34:40}" cy="${s?54:72}" r="8" ${stroke()}/><line x1="${s?40:46}" y1="${s?58:76}" x2="82" y2="${s?92:84}" ${stroke()}/>
      <line x1="50" y1="74" x2="40" y2="108" ${stroke()}/><line x1="82" y1="${s?92:84}" x2="90" y2="108" ${stroke()}/>
      <line x1="${s?52:48}" y1="${s?74:76}" x2="${s?56:64}" y2="${s?46:52}" ${stroke()}/>
    `);
    case 'child_pose': return svgWrap(`
      <line x1="18" y1="110" x2="100" y2="110" stroke="#bbb" stroke-width="3" stroke-linecap="round"/>
      <circle cx="${s?48:32}" cy="${s?84:80}" r="8" ${stroke()}/><line x1="${s?56:40}" y1="${s?86:82}" x2="${s?76:60}" y2="${s?96:86}" ${stroke()}/>
      <line x1="${s?76:60}" y1="${s?96:86}" x2="90" y2="102" ${stroke()}/><line x1="${s?76:60}" y1="${s?96:86}" x2="24" y2="102" ${stroke()}/>
    `);
    case 'cobra': return svgWrap(`
      <line x1="18" y1="110" x2="100" y2="110" stroke="#bbb" stroke-width="3" stroke-linecap="round"/>
      <circle cx="${s?26:48}" cy="${s?90:58}" r="8" ${stroke()}/><line x1="${s?34:56}" y1="${s?92:62}" x2="${s?64:80}" y2="${s?98:84}" ${stroke()}/>
      <line x1="${s?64:80}" y1="${s?98:84}" x2="92" y2="102" ${stroke()}/><line x1="60" y1="98" x2="52" y2="110" ${stroke()}/><line x1="72" y1="100" x2="64" y2="110" ${stroke()}/>
    `);
    case 'quad_stretch': return svgWrap(`
      <line x1="22" y1="120" x2="98" y2="120" stroke="#bbb" stroke-width="3" stroke-linecap="round"/>
      <circle cx="58" cy="26" r="10" ${stroke()}/><line x1="58" y1="40" x2="58" y2="80" ${stroke()}/>
      <line x1="58" y1="52" x2="40" y2="62" ${stroke()}/><line x1="58" y1="52" x2="78" y2="${s?62:50}" ${stroke()}/>
      <line x1="58" y1="80" x2="50" y2="120" ${stroke()}/><line x1="58" y1="80" x2="78" y2="104" ${stroke()}/><line x1="78" y1="104" x2="${s?72:66}" y2="84" ${stroke()}/>
    `);
    case 'hamstring_stretch': return svgWrap(`
      <line x1="18" y1="120" x2="100" y2="120" stroke="#bbb" stroke-width="3" stroke-linecap="round"/>
      <circle cx="${s?48:42}" cy="${s?56:52}" r="8" ${stroke()}/><line x1="${s?56:50}" y1="${s?60:56}" x2="60" y2="80" ${stroke()}/>
      <line x1="60" y1="80" x2="90" y2="120" ${stroke()}/><line x1="60" y1="80" x2="28" y2="120" ${stroke()}/>
      <line x1="${s?50:44}" y1="${s?64:58}" x2="82" y2="92" ${stroke()}/>
    `);
    default: return svgWrap(`<circle cx="60" cy="60" r="24" ${stroke()}/>`)
  }
}
function stroke(){ return 'stroke="#111" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"'; }
function svgWrap(inner){ return `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>` }

function showModal(html){ $("#modalContent").innerHTML=html; $("#modal").showModal(); }
function closeModal(){ clearInterval(timerId); clearInterval(window._demoInt); $("#modal").close(); }
window.closeModal=closeModal;

$("#resetTodayBtn").addEventListener("click",()=>{ if(confirm("重置今天的饮食、饮水和训练完成状态？")){ state.intake={calories:0,protein:0,water:0};state.mealDone=[false,false,false,false];state.trainDone=false;save();render(); }});

function render(){
  clearInterval(timerId);
  if(stretchSession){ renderStretch(); return }
  const view=$("#view");
  view.innerHTML=
    route==="home"?homeView():
    route==="train"?trainView():
    route==="library"?libraryView():
    route==="food"?foodView():
    route==="data"?dataView():meView();
}
render();

if("serviceWorker" in navigator){ window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{})); }
