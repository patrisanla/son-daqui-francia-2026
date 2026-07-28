const DRIVE_DOCS_FOLDER_URL = "https://drive.google.com/drive/folders/1CX49oRBATy_ciEwMIx6FEOys_Zryt2aJ?usp=sharing";
const DRIVE_DOCS_API_URL = "https://script.google.com/macros/s/AKfycbxOFKKmE46QdDuhcCPPa6xoIoz-mIew0uglms2drBoSvcVKpauP3tdWq3Og6tpUUh7J/exec"; // Pegar aquí a URL do Google Apps Script publicado


const departureDate = new Date('2026-08-06T22:00:00+02:00');
const tripEndDate = new Date('2026-08-17T00:00:00+02:00');

function tripDayNumber(now){
  // A saída do xoves 6 ás 22:00 xa forma parte do Día 1.
  // Despois, o número avanza con cada novo día natural da viaxe (7–16 de agosto).
  const madridDate = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(now);
  const [year, month, day] = madridDate.split('-').map(Number);
  const currentUtcDay = Date.UTC(year, month - 1, day);
  const firstTripUtcDay = Date.UTC(2026, 7, 7);
  return Math.min(10, Math.max(1, Math.floor((currentUtcDay - firstTripUtcDay) / 86400000) + 1));
}

function cd(){
  const now = new Date();
  const el = document.getElementById('countdown');
  if(!el) return;

  if(now < departureDate){
    const diff = departureDate - now;
    const totalMinutes = Math.floor(diff / 60000);
    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;
    el.innerHTML = `Faltan<b>${days} días · ${hours} h · ${minutes} min</b>`;
    return;
  }

  if(now < tripEndDate){
    el.innerHTML = `<b>🚌 Xa estamos en camiño! Bon voyage!</b><span>Día ${tripDayNumber(now)} de 10</span>`;
    return;
  }

  el.innerHTML = '<b>Viaxe rematada 💛</b>';
}
cd();
setInterval(cd, 60000);
function current(){
 const now = new Date();
 const startDate = new Date('2026-08-07T00:00:00');
 const diff = Math.floor((now - startDate) / 86400000);
 if(diff < 0) return 0;
 if(diff >= itinerary.length) return itinerary.length - 1;
 return diff;
}


function appIcon(key){
  const s = String(key||'').toLowerCase();
  let d = 'M12 2a10 10 0 1 0 0 20a10 10 0 0 0 0-20Z';

  if(s==='festival'||s.includes('festivais')) d='M9 17.5V5.5l9-2v11.5M9 9l9-2M7.2 17.5a2.2 2.2 0 1 0 0 .1Zm8.8-2.5a2.2 2.2 0 1 0 0 .1Z';
  else if(s==='calendar'||s.includes('calendario')||s.includes('hoxe')) d='M7 3v3M17 3v3M4.5 8h15M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm2 7h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01';
  else if(key==='🚌'||s.includes('bus')||s.includes('traslado')) d='M5 6h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-4 0h-4a2 2 0 0 1-4 0H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm1 4h12M7 14h.01M17 14h.01';
  else if(key==='🎤'||key==='🎧'||s.includes('actuación')||s.includes('ensaio')||s.includes('son')) d='M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0M12 19v3M8 22h8';
  else if(key==='🍽️'||key==='🥪'||s.includes('xantar')||s.includes('cea')||s.includes('picnic')) d='M7 3v8M5 3v8M9 3v8M5 11h4M7 11v10M15 3v18M15 3c3 2 4 6 1 9';
  else if(key==='🛏️'||s.includes('durmida')||s.includes('aloxamento')) d='M3 11V5M3 11h18M21 11v8M3 19v-8M7 11V8h5a3 3 0 0 1 3 3';
  else if(key==='🎭'||s.includes('desfile')) d='M7 4h10l2 5-2 8-5 3-5-3-2-8 2-5Zm2 6h.01M15 10h.01M9 15c2 1 4 1 6 0';
  else if(key==='🚶'||s.includes('turismo')) d='M13 4a2 2 0 1 1-4 0a2 2 0 0 1 4 0ZM10 7l-2 5-3 3M10 7l4 3 4 1M8 12l3 3-1 6M11 15l5 6';
  else if(key==='😴'||s.includes('descanso')) d='M4 14a8 8 0 1 0 12-7M15 4h5l-5 6h5M6 6h4L6 11h4';
  else if(key==='🏡'||s.includes('casa')||s.includes('regreso')) d='M3 11 12 4l9 7M5 10v10h14V10M9 20v-6h6v6';
  else if(key==='📍'||s.includes('lugar')||s.includes('map')) d='M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z';
  else if(key==='🎪') d='M4 20h16L12 4 4 20Zm8-12v12M7 20v-6h10v6';
  else if(key==='📄'||s.includes('document')) d='M6 3h8l4 4v14H6V3Zm8 0v5h5M9 12h6M9 16h6';
  else if(key==='🌤️'||s.includes('tempo')) d='M7 17h10a4 4 0 0 0 0-8 5 5 0 0 0-9-2 4 4 0 0 0-1 10ZM16 3v2M21 8h-2M19 4l-1.5 1.5';
  else if(key==='🇫🇷'||s.includes('frase')) d='M5 4v16M5 5h12l-2 4 2 4H5';
  else if(key==='👀'||s.includes('ollo')) d='M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z';
  else if(key==='🔥'||s.includes('inferno')||s.includes('spotify')) d='M13.5 2.5c.8 3.7-.8 5.2-2.3 6.8-1.2 1.3-2.2 2.7-1.4 4.7.5-1.2 1.4-2 2.5-2.7-.1 1.7.8 3.1 2.4 4.1 2.1 1.4 4.8 1.1 6.6-.7 2.3-2.3 3.4-5.8 2.4-9.1-.5-1.7-1.6-3.4-3.2-4.9.2 2.4-.8 3.8-2 5.1-1.2 1.3-2 2.6-1.6 4.5-2.2-1.6-3.5-4.1-3.2-6.8.4-3.5 2.9-5.6 5.2-7.8 2.6-2.4 4.7-4.8 4.2-8.8Z';
  else if(key==='ℹ️'||s.includes('info')) d='M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 10v7M12 7h.01';
  else if(key==='✅'||s.includes('check')) d='M20 6 9 17l-5-5';
  else if(s.includes('inicio')||s.includes('home')) d='M3 11 12 4l9 7M5 10v10h14V10M9 20v-6h6v6';
  else if(s.includes('máis')||s.includes('mais')||s.includes('menu')) d='M4 7h16M4 12h16M4 17h16';

  return `<svg class="app-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;
}

function img(src, cls='photo'){return src?`<img class="${cls}" src="assets/${src}" alt="">`:''}
function ev(e){return `<div class="event"><div class="time">${e[0]}</div><div>${e[1]} <b>${e[2]}</b></div></div>`}
function nextShow(d){const show=d.events.find(e=>e[1]=='🎤' && /Actuación/i.test(e[2]));return show?`<div class="next-show"><b>🎤 Próxima actuación</b><br><span class="time">${show[0]||''}</span> · ${show[2]}</div>`:`<div class="next-show"><b>✅ Non hai actuacións previstas hoxe</b></div>`}
function sleepMapButton(d){return d.sleepMap?`<a class="detailbtn" href="${d.sleepMap}" target="_blank">Abrir aloxamento en Google Maps</a>`:''}
function weatherLocationForDay(dayIndex){
 const d=itinerary[dayIndex];
 const place=(d.mainPlace||'').split('/')[0].trim();
 const locations={
  "Les Sables d'Olonne":{lat:46.497,lng:-1.784,label:"Les Sables d'Olonne"},
  "Jard-sur-Mer":{lat:46.416,lng:-1.576,label:"Jard-sur-Mer"},
  "Beuzec Cap Sizun":{lat:48.075,lng:-4.513,label:"Beuzec-Cap-Sizun"},
  "Beuzec-Cap-Sizun":{lat:48.075,lng:-4.513,label:"Beuzec-Cap-Sizun"},
  "Quimper":{lat:47.996,lng:-4.102,label:"Quimper"},
  "Laval":{lat:48.070,lng:-0.771,label:"Laval"},
  "Pontorson":{lat:48.553,lng:-1.507,label:"Pontorson"},
  "Pontorson · Mont-Saint-Michel":{lat:48.636,lng:-1.511,label:"Mont-Saint-Michel"},
  "Mont-Saint-Michel":{lat:48.636,lng:-1.511,label:"Mont-Saint-Michel"},
  "Evron":{lat:48.156,lng:-0.401,label:"Évron"},
  "Évron":{lat:48.156,lng:-0.401,label:"Évron"},
  "Villedieu-les-Poêles":{lat:48.838,lng:-1.222,label:"Villedieu-les-Poêles"},
  "Saint Avaugourd des Landes":{lat:46.514,lng:-1.484,label:"Saint-Avaugourd-des-Landes"},
  "Saint-Avaugourd-des-Landes":{lat:46.514,lng:-1.484,label:"Saint-Avaugourd-des-Landes"},
  "Regreso":{lat:43.362,lng:-8.411,label:"A Coruña"},
  "Pasai pa casa":{lat:43.362,lng:-8.411,label:"A Coruña"}
 };
 return locations[place]||locations[d.mainPlace]||locations["Regreso"];
}

function dayHas(dayIndex, pattern){
  return itinerary[dayIndex].events.some(e=>pattern.test(e[2]));
}
function forecastRecommendation(dayIndex, locLabel, min, max, rain, wind){
  const parts=[];
  const hasParade=dayHas(dayIndex,/desfile/i);
  const hasShow=dayHas(dayIndex,/actuación/i);
  const dressedActivity=hasParade||hasShow;

  if(dressedActivity && max>=26){
    const activity=hasParade&&hasShow?'os desfiles e as actuacións':hasParade?'o desfile':'a actuación';
    parts.push(`Coidado: coa indumentaria tradicional podedes pasar bastante calor durante ${activity}. Hidratádevos ben antes e despois e aproveitade a sombra nas esperas.`);
  }else if(max>=28){
    parts.push("Vai facer calor: levade auga, gorra e procurade zonas de sombra.");
  }

  if(rain>=55){
    if(dressedActivity) parts.push("Hai bastante risco de choiva: convén organizar como protexer a indumentaria e os instrumentos durante os desprazamentos e as esperas.");
    else parts.push("Hai bastante probabilidade de choiva: levade chuvasqueiro ou paraugas pequeno.");
  }else if(rain>=30){
    if(dressedActivity) parts.push("Pode caer algo de chuvia: mellor ter prevista a protección da indumentaria e dos instrumentos.");
    else parts.push("Pode caer algo de chuvia: mellor levar chuvasqueiro lixeiro ou paraugas pequeno.");
  }

  if(wind>=35){
    if(dressedActivity) parts.push("O vento pode afectar aos instrumentos e aos elementos soltos da indumentaria. Haberá que telo en conta nas esperas e nos desprazamentos.");
    else parts.push("O vento pode notarse bastante, especialmente nas zonas abertas.");
  }

  if(/Mont-Saint-Michel|Pontorson/.test(locLabel)) parts.push("Na baía o vento pode notarse máis: mellor calzado cómodo e precaución nas zonas abertas.");
  if(!parts.length) parts.push(dressedActivity?"Tempo aparentemente cómodo para a actividade. Aínda así, lembrade hidratarvos e coidar a indumentaria e os instrumentos.":"Tempo aparentemente cómodo para pasear e facer as visitas previstas.");
  return parts.slice(0,2).join(" ");
}

function eclipseBlockForDay(dayIndex, cloudCover=null){
  const d=itinerary[dayIndex];
  if(!d || d.date!=="2026-08-12") return "";

  let conditions="A previsión de nubosidade aínda non está dispoñible. Consulta a meteoroloxía ese mesmo día.";
  if(Number.isFinite(cloudCover)){
    if(cloudCover<=25) conditions=`Boas condicións previstas: pouca nubosidade (${Math.round(cloudCover)}%).`;
    else if(cloudCover<=55) conditions=`Condicións variables: haberá algunhas nubes (${Math.round(cloudCover)}%), pero poden abrirse claros.`;
    else if(cloudCover<=80) conditions=`Observación difícil: prevese bastante nubosidade (${Math.round(cloudCover)}%). Haberá que buscar claros cara ao oeste.`;
    else conditions=`Condicións pouco favorables: ceo moi nubrado (${Math.round(cloudCover)}%), que pode impedir ver a eclipse.`;
  }

  return `<div class="eclipse-alert"><h3>🌒 Hoxe hai unha eclipse solar!</h3><p>Ao serán poderá verse unha eclipse parcial desde Francia. Procurade un lugar aberto con boa visibilidade cara ao oeste.</p><p><b>Condicións para a eclipse:</b> ${conditions}</p><p><b>Seguridade:</b> non miredes directamente ao Sol. Empregade unicamente lentes homologadas para observar eclipses; as gafas de sol normais non serven.</p></div>`;
}

async function weatherForecastBlockForDay(dayIndex){
  const d=itinerary[dayIndex], loc=weatherLocationForDay(dayIndex);
  try{
    const key=`meteo-forecast-v5-${loc.label}-${d.date}-${new Date().toISOString().slice(0,10)}`;
    const cached=localStorage.getItem(key);
    if(cached) return JSON.parse(cached).html;
    const url=`https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lng}&daily=weather_code,precipitation_probability_max,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,cloud_cover_mean&timezone=auto&start_date=${d.date}&end_date=${d.date}`;
    const r=await fetch(url);
    if(!r.ok) throw new Error("meteo");
    const w=await r.json(), daily=w.daily||{};
    if(!daily.time || !daily.time.length) throw new Error("sen-predicion");
    const min=Math.round(Number(daily.temperature_2m_min[0]));
    const max=Math.round(Number(daily.temperature_2m_max[0]));
    const rain=Math.round(Number((daily.precipitation_probability_max||[0])[0]||0));
    const wind=Math.round(Number((daily.wind_speed_10m_max||[0])[0]||0));
    const desc=weatherCodeText(Number(daily.weather_code[0]));
    const cloud=Number((daily.cloud_cover_mean||[])[0]);
    const rec=forecastRecommendation(dayIndex,loc.label,min,max,rain,wind);
    const eclipse=eclipseBlockForDay(dayIndex,Number.isFinite(cloud)?cloud:null);
    const html=`<div class="weather meteo-card"><div><h3>Meteoroloxía prevista</h3><p class="small">${loc.label} · ${d.day}</p></div><div class="meteo-main"><b>${min}–${max} ºC</b><span>${desc}</span></div><div class="meteo-grid"><span>🌧 ${rain}%</span><span>💨 ${wind} km/h</span>${d.date==="2026-08-12"&&Number.isFinite(cloud)?`<span>☁️ ${Math.round(cloud)}%</span>`:""}</div><p><b>Recomendación:</b> ${rec}</p>${eclipse}</div>`;
    localStorage.setItem(key,JSON.stringify({html,time:Date.now()}));
    return html;
  }catch(e){
    return `<div class="weather meteo-card"><h3>Meteoroloxía prevista</h3><p class="small">${loc.label} · ${d.day}</p><p>A previsión concreta para este día aínda non está dispoñible.</p><p><b>Recomendación xeral:</b> levade auga, chuvasqueiro lixeiro e calzado cómodo. Se hai actuación ou desfile, protexede a indumentaria e os instrumentos durante as esperas.</p>${eclipseBlockForDay(dayIndex)}</div>`;
  }
}

async function weatherBlockForDay(dayIndex){
 const d=itinerary[dayIndex];
 const loc=weatherLocationForDay(dayIndex);
 try{
   const key=`meteo-v5-${loc.label}-${new Date().toISOString().slice(0,13)}`;
   const cached=localStorage.getItem(key);
   if(cached) return JSON.parse(cached).html;
   const url=`https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lng}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,cloud_cover&daily=precipitation_probability_max,temperature_2m_max,temperature_2m_min,cloud_cover_mean&timezone=auto&forecast_days=1`;
   const r=await fetch(url);
   if(!r.ok) throw new Error('meteo');
   const w=await r.json();
   const c=w.current||{};
   const daily=w.daily||{};
   const code=Number(c.weather_code);
   const desc=weatherCodeText(code);
   const temp=Math.round(Number(c.temperature_2m));
   const wind=Math.round(Number(c.wind_speed_10m||0));
   const rain=Math.round(Number((daily.precipitation_probability_max||[0])[0]||0));
   const min=Math.round(Number((daily.temperature_2m_min||[temp])[0]));
   const max=Math.round(Number((daily.temperature_2m_max||[temp])[0]));
   const cloud=Number.isFinite(Number(c.cloud_cover))?Number(c.cloud_cover):Number((daily.cloud_cover_mean||[])[0]);
   const rec=forecastRecommendation(dayIndex,loc.label,min,max,rain,wind);
   const eclipse=eclipseBlockForDay(dayIndex,Number.isFinite(cloud)?cloud:null);
   const html=`<div class="weather meteo-card"><div><h3>Meteoroloxía</h3><p class="small">${loc.label}</p></div><div class="meteo-main"><b>${temp} ºC</b><span>${desc}</span></div><div class="meteo-grid"><span>🌡 ${min}º / ${max}º</span><span>🌧 ${rain}%</span><span>💨 ${wind} km/h</span>${d.date==="2026-08-12"&&Number.isFinite(cloud)?`<span>☁️ ${Math.round(cloud)}%</span>`:""}</div><p><b>Recomendación:</b> ${rec}</p>${eclipse}</div>`;
   localStorage.setItem(key,JSON.stringify({html,time:Date.now()}));
   return html;
 }catch(e){
   return `<div class="weather meteo-card"><h3>Meteoroloxía</h3><p>Non foi posible actualizar a meteoroloxía agora.</p><p><b>Recomendación xeral:</b> levade auga e un chuvasqueiro lixeiro. Se hai actuación ou desfile, protexede a indumentaria e os instrumentos.</p>${eclipseBlockForDay(dayIndex)}</div>`;
 }
}
async function weatherBlock(){return weatherBlockForDay(current())}
function weatherCodeText(code){
 const map={
  0:"Despexado",1:"Maiormente despexado",2:"Parcialmente nubrado",3:"Nubrado",
  45:"Néboa",48:"Néboa con xeada",51:"Orballo feble",53:"Orballo",55:"Orballo forte",
  61:"Choiva feble",63:"Choiva",65:"Choiva forte",71:"Neve feble",73:"Neve",75:"Neve forte",
  80:"Chuvascos febles",81:"Chuvascos",82:"Chuvascos fortes",95:"Treboada",96:"Treboada con sarabia",99:"Treboada forte"
 };
 return map[code]||"Tempo variable";
}

function festivalsForDay(dayId){return (typeof festivalEvents!=='undefined'?festivalEvents:[]).filter(f=>f.dayId===dayId)}
function festivalPosterHTML(f){return f.poster?`<img class="festival-poster" src="assets/${f.poster}" alt="Cartel ${f.name}">`:`<div class="festival-hero">🎪<br>${f.name}</div>`}
function festivalCardHTML(f){const programme=f.programme&&f.programme.length?`<div class="festival-programme"><h4>Resumo do festival</h4>${f.programme.map(item=>`<p>${item}</p>`).join('')}</div>`:'';return `<div class="festival-card"><h3>Coñece o festival</h3><h2>${f.name}</h2>${f.line?`<p class="festival-line">${f.line}</p>`:''}${festivalPosterHTML(f)}<p><b>📍 ${f.place}</b></p><p>${f.description}</p>${f.curiosity?`<p><b>💡 Curiosidade:</b> ${f.curiosity}</p>`:''}${f.curiosity2?`<p><b>💡 Sabías que...?</b> ${f.curiosity2}</p>`:''}${programme}<div class="notebook-actions">${f.maps?`<a class="detailbtn" target="_blank" rel="noopener" href="${f.maps}">Abrir localización</a>`:''}${f.url?`<a class="detailbtn" target="_blank" rel="noopener" href="${f.url}">Web oficial</a>`:''}</div></div>`}
function festivalTodayHTML(d){const fs=festivalsForDay(d.id);return fs.length?`<div class="card">${fs.map(f=>festivalCardHTML(f)).join('')}</div>`:''}
function festivalsSectionHTML(){const fs=(typeof festivalEvents!=='undefined'?festivalEvents:[]);return `<h2>🎪 Coñece os festivais</h2>`+(fs.length?fs.map(f=>festivalCardHTML(f)).join(''):`<div class="official-pending"><h3>Pendente</h3><p>Iremos engadindo aquí cada cartel ou información de festival.</p></div>`)}


function perfId(dayId, idx){return `perf-${dayId}-${idx}`}
function notebookKey(id){return `sondaqui-notebook-${id}`}
function getNotebook(id){try{return normalizeNotebookImages(JSON.parse(localStorage.getItem(notebookKey(id)))||{setlist:'',notes:'',images:[],done:false})}catch(e){return {setlist:'',notes:'',images:[],done:false}}}


function resizeImageFile(file, maxSize=1800, quality=0.85){
  return new Promise((resolve,reject)=>{
    const imgEl = new Image();
    const reader = new FileReader();
    reader.onload = () => {
      imgEl.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(imgEl.width, imgEl.height));
        const w = Math.round(imgEl.width * scale);
        const h = Math.round(imgEl.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(imgEl,0,0,w,h);
        const full = canvas.toDataURL('image/jpeg', quality);

        const thumbSize = 360;
        const tScale = Math.min(1, thumbSize / Math.max(imgEl.width, imgEl.height));
        const tw = Math.round(imgEl.width * tScale);
        const th = Math.round(imgEl.height * tScale);
        const tCanvas = document.createElement('canvas');
        tCanvas.width = tw; tCanvas.height = th;
        const tCtx = tCanvas.getContext('2d');
        tCtx.drawImage(imgEl,0,0,tw,th);
        const thumb = tCanvas.toDataURL('image/jpeg', 0.78);
        resolve({full, thumb, name:file.name || 'foto', createdAt:Date.now()});
      };
      imgEl.onerror = reject;
      imgEl.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
function normalizeNotebookImages(n){
  n.images = (n.images||[]).map(img => typeof img === 'string' ? {full:img, thumb:img, name:'foto'} : img);
  return n;
}
function photoCount(id){
  const n = normalizeNotebookImages(getNotebook(id));
  return (n.images||[]).length;
}
function saveNotebook(id,n){normalizeNotebookImages(n);localStorage.setItem(notebookKey(id),JSON.stringify(n))}
function notebookHasPhotos(id){return photoCount(id)>0}
function openPhotoViewer(id,index){
  const n=normalizeNotebookImages(getNotebook(id));
  const img=n.images[index];
  if(!img) return;
  modalContent.innerHTML = `<h2>📷 Foto ${index+1} de ${n.images.length}</h2>
    <div class="photo-viewer"><img src="${img.full}" alt=""></div>
    <div class="notebook-actions">
      ${index>0?`<button class="detailbtn" onclick="openPhotoViewer('${id}',${index-1})">← Anterior</button>`:''}
      ${index<n.images.length-1?`<button class="detailbtn" onclick="openPhotoViewer('${id}',${index+1})">Seguinte →</button>`:''}
      <button class="detailbtn danger" onclick="deleteNotebookPhoto('${id}',${index})">Eliminar</button>
    </div>
    <p class="small">Podes ampliar coa xestualidade do móbil.</p>`;
  modal.classList.add('notebook-open');
  modal.classList.remove('hidden');
}
function deleteNotebookPhoto(id,index){
  const n=normalizeNotebookImages(getNotebook(id));
  n.images.splice(index,1);
  saveNotebook(id,n);
  modal.classList.add('hidden');
  if(window.__lastNotebookArgs){showNotebook(...window.__lastNotebookArgs)}
}
function imageGridHTML(id,dayIndex,eventIndex,n){
  n=normalizeNotebookImages(n);
  const imgs=n.images||[];
  return `<div class="gallery-head"><b>📷 Fotos (${imgs.length})</b><label class="add-photo">+<input id="imageInput" type="file" accept="image/*" multiple></label></div>
  <div class="image-preview">${imgs.map((img,i)=>`<button class="preview-item" onclick="openPhotoViewer('${id}',${i})"><img src="${img.thumb||img.full}" alt=""></button>`).join('')}</div>`;
}
function shareNotebookOptions(id,dayIndex,eventIndex){
  saveNotebookFromModal(id,false);
  modalContent.innerHTML = `<h2>📲 Partillar por WhatsApp</h2>
    <div class="share-options">
      <label><input id="shareSetlist" type="checkbox" checked> Setlist</label>
      <label><input id="shareNotes" type="checkbox" checked> Notas</label>
      <label><input id="sharePhotos" type="checkbox"> Indicar número de fotos</label>
    </div>
    <button class="detailbtn" onclick="shareNotebook('${id}',${dayIndex},${eventIndex})">Partillar</button>`;
  modal.classList.add('notebook-open');
  modal.classList.remove('hidden');
}

function notebookButton(dayIndex,eventIndex){
 const d=itinerary[dayIndex], id=perfId(d.id,eventIndex), n=getNotebook(id);
 return `<button class="detailbtn notebook-btn" onclick="event.stopPropagation();showNotebook(${dayIndex},${eventIndex})">🎼 Caderno da actuación ${n.done?'✅':''}</button>`;
}
function performanceButtons(dayIndex){return itinerary[dayIndex].events.map((e,idx)=>e[1]=='🎤'?notebookButton(dayIndex,idx):'').join('')}
function todayPerformanceButtons(){return performanceButtons(current())}
function showNotebook(dayIndex,eventIndex){
 const d=itinerary[dayIndex], e=d.events[eventIndex], id=perfId(d.id,eventIndex), n=normalizeNotebookImages(getNotebook(id));
 window.__lastNotebookArgs=[dayIndex,eventIndex];
 returnScrollY=window.scrollY;
 modalContent.innerHTML=`
 <h2>🎼 Caderno da actuación</h2><h3>${d.day} · ${e[0]}</h3><p class="small">${d.mainPlace} · ${e[2]}</p>
 <label class="note-label">🎵 Setlist</label>
 <textarea id="setlistInput" class="notebook-input" placeholder="1. ...&#10;2. ...">${n.setlist||''}</textarea>
 <label class="note-label">📝 Notas</label>
 <textarea id="notesInput" class="notebook-input" placeholder="Notas da actuación...">${n.notes||''}</textarea>
 <label class="note-label">📷 Fotos</label>
 ${imageGridHTML(id,dayIndex,eventIndex,n)}
 <div class="notebook-actions">
 <button class="detailbtn" onclick="shareNotebookOptions('${id}',${dayIndex},${eventIndex})">📲 Partillar por WhatsApp</button>
 <button class="detailbtn" onclick="toggleDone('${id}',${dayIndex},${eventIndex})">${n.done?'↩️ Marcar como pendente':'✅ Actuación realizada'}</button>
 </div><p class="small">Gárdase só neste teléfono. As fotos redúcense automaticamente para poder lelas e consultalas sen ocupar tanto espazo.</p>`;
 modal.classList.add('notebook-open'); modal.classList.remove('hidden'); setTimeout(()=>{const mc=document.querySelector('.modal-card'); if(mc) mc.scrollTop=0;},0);
 setlistInput.oninput=()=>saveNotebookFromModal(id,false);
 notesInput.oninput=()=>saveNotebookFromModal(id,false);
 imageInput.onchange=async ev=>{const cur=normalizeNotebookImages(getNotebook(id));for(const file of ev.target.files){cur.images.push(await resizeImageFile(file))}saveNotebook(id,cur);showNotebook(dayIndex,eventIndex)};
}
function saveNotebookFromModal(id,toast=true){
 const n=normalizeNotebookImages(getNotebook(id));n.setlist=document.getElementById('setlistInput')?.value||'';n.notes=document.getElementById('notesInput')?.value||'';saveNotebook(id,n);if(toast) alert('Caderno gardado neste teléfono.')
}
function removeNotebookImage(id,i,dayIndex,eventIndex){deleteNotebookPhoto(id,i)}
function toggleDone(id,dayIndex,eventIndex){const n=getNotebook(id);n.done=!n.done;saveNotebook(id,n);showNotebook(dayIndex,eventIndex)}
function shareNotebook(id,dayIndex,eventIndex){
 const d=itinerary[dayIndex], e=itinerary[dayIndex].events[eventIndex], n=normalizeNotebookImages(getNotebook(id));
 const includeSetlist = document.getElementById('shareSetlist')?.checked ?? true;
 const includeNotes = document.getElementById('shareNotes')?.checked ?? true;
 const includePhotos = document.getElementById('sharePhotos')?.checked ?? false;
 let text=`🎼 Caderno da actuación · Son d'aquí

${d.day}
${d.mainPlace}
${e[0]} · ${e[2]}
`;
 if(includeSetlist) text += `
🎵 Setlist:
${n.setlist||'(sen escribir)'}
`;
 if(includeNotes) text += `
📝 Notas:
${n.notes||'(sen notas)'}
`;
 if(includePhotos) text += `
📷 Fotos gardadas neste caderno: ${(n.images||[]).length}
`;
 if(n.done) text += `
✅ Actuación realizada`;
 if(navigator.share){navigator.share({text}).catch(()=>{});return}
 window.open(`https://wa.me/?text=${encodeURIComponent(text)}`,'_blank');
}









// Diario persoal de cada día
function diaryKey(dayId){return `sondaqui-diary-${dayId}`}
function getDiary(dayId){
  try{return JSON.parse(localStorage.getItem(diaryKey(dayId))||'{"notes":"","images":[]}')}
  catch(e){return {notes:'',images:[]}}
}
function normalizeDiaryImages(d){
  d.images=(d.images||[]).map(img=>typeof img==='string'?{full:img,thumb:img,name:'foto'}:img);
  return d;
}
function saveDiary(dayId,d){normalizeDiaryImages(d);localStorage.setItem(diaryKey(dayId),JSON.stringify(d))}
function diaryHasContent(dayId){const d=normalizeDiaryImages(getDiary(dayId));return !!((d.notes||'').trim()||(d.images||[]).length)}
function diaryCardHTML(dayIndex){
  const d=itinerary[dayIndex], active=diaryHasContent(d.id);
  return `<div class="card diary-card ${active?'has-content':''}">
    <div class="diary-card-head"><div><h3>📔 O meu diario</h3><p class="small">Notas e fotografías privadas deste día.</p></div>
    <button class="detailbtn diary-open-btn" onclick="showDiary(${dayIndex})">${active?'Abrir diario ✓':'Abrir diario'}</button></div>
  </div>`;
}
function diaryImageGridHTML(dayId,d){
  d=normalizeDiaryImages(d); const imgs=d.images||[];
  return `<div class="gallery-head"><b>📷 Fotos (${imgs.length})</b><label class="add-photo">+<input id="diaryImageInput" type="file" accept="image/*" multiple></label></div>
  <div class="image-preview">${imgs.map((img,i)=>`<button class="preview-item" onclick="openDiaryPhotoViewer('${dayId}',${i})"><img src="${img.thumb||img.full}" alt=""></button>`).join('')}</div>`;
}
function showDiary(dayIndex){
  const day=itinerary[dayIndex], d=normalizeDiaryImages(getDiary(day.id));
  window.__lastDiaryDay=dayIndex; returnScrollY=window.scrollY;
  modalContent.innerHTML=`<h2>📔 O meu diario</h2><h3>${day.day}</h3><p class="small">${(day.dayPlaces||[day.mainPlace]).join(' · ')}</p>
    <label class="note-label">📝 Notas do día</label>
    <textarea id="diaryNotesInput" class="notebook-input diary-input" placeholder="Escribe aquí as túas impresións do día...">${d.notes||''}</textarea>
    <label class="note-label">📷 Fotos</label>${diaryImageGridHTML(day.id,d)}
    <div class="notebook-actions"><button class="detailbtn" onclick="exportDiary()">📤 Exportar o meu diario</button></div>
    <p class="small">🔒 O diario é privado: gárdase unicamente neste dispositivo. As fotos redúcense automaticamente.</p>`;
  modal.classList.add('notebook-open');modal.classList.remove('hidden');
  setTimeout(()=>{const mc=document.querySelector('.modal-card');if(mc)mc.scrollTop=0},0);
  diaryNotesInput.oninput=()=>{const cur=normalizeDiaryImages(getDiary(day.id));cur.notes=diaryNotesInput.value;saveDiary(day.id,cur)};
  diaryImageInput.onchange=async ev=>{const cur=normalizeDiaryImages(getDiary(day.id));for(const file of ev.target.files){cur.images.push(await resizeImageFile(file))}saveDiary(day.id,cur);showDiary(dayIndex)};
}
function openDiaryPhotoViewer(dayId,index){
  const d=normalizeDiaryImages(getDiary(dayId)),img=d.images[index];if(!img)return;
  modalContent.innerHTML=`<h2>📷 Foto ${index+1} de ${d.images.length}</h2><div class="photo-viewer"><img src="${img.full}" alt=""></div>
  <div class="notebook-actions">${index>0?`<button class="detailbtn" onclick="openDiaryPhotoViewer('${dayId}',${index-1})">← Anterior</button>`:''}${index<d.images.length-1?`<button class="detailbtn" onclick="openDiaryPhotoViewer('${dayId}',${index+1})">Seguinte →</button>`:''}<button class="detailbtn danger" onclick="deleteDiaryPhoto('${dayId}',${index})">Eliminar</button><button class="detailbtn" onclick="showDiary(window.__lastDiaryDay)">Voltar ao diario</button></div>`;
  modal.classList.add('notebook-open');modal.classList.remove('hidden');
}
function deleteDiaryPhoto(dayId,index){const d=normalizeDiaryImages(getDiary(dayId));d.images.splice(index,1);saveDiary(dayId,d);showDiary(window.__lastDiaryDay)}
function escapeDiaryHTML(v){return String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function exportDiary(){
  const entries=itinerary.map(day=>({day,data:normalizeDiaryImages(getDiary(day.id))})).filter(x=>(x.data.notes||'').trim()||x.data.images.length);
  if(!entries.length){alert('O diario aínda está baleiro.');return}
  const pages=entries.map(({day,data})=>`<section class="day"><h2>${escapeDiaryHTML(day.day)}</h2><p><b>📍 ${(day.dayPlaces||[day.mainPlace]).map(escapeDiaryHTML).join(' · ')}</b></p>${data.notes?`<div class="notes">${escapeDiaryHTML(data.notes).replace(/\n/g,'<br>')}</div>`:'<p><i>Sen notas.</i></p>'}<div class="photos">${data.images.map(img=>`<img src="${img.full}" alt="">`).join('')}</div></section>`).join('');
  const w=window.open('','_blank');if(!w){alert('Permite as ventás emerxentes para exportar o diario.');return}
  w.document.write(`<!doctype html><html lang="gl"><head><meta charset="utf-8"><title>O meu diario · Son d'Aquí Francia 2026</title><style>@page{size:A4;margin:16mm}body{font-family:Arial,sans-serif;color:#243342}header{text-align:center;padding:35mm 0 20mm}h1{font-size:34px;margin:0}h2{color:#335069;border-bottom:2px solid #d8a03d;padding-bottom:8px}.day{break-before:page}.day:first-of-type{break-before:auto}.notes{white-space:normal;line-height:1.55;margin:18px 0}.photos{display:grid;grid-template-columns:1fr 1fr;gap:10px}.photos img{width:100%;max-height:110mm;object-fit:contain;border-radius:8px}small{color:#666}</style></head><body><header><h1>Son d'Aquí</h1><h2>Francia 2026</h2><p>O meu diario de viaxe</p><p>Nome: __________________________</p></header>${pages}<script>window.onload=()=>setTimeout(()=>window.print(),500)<\/script></body></html>`);w.document.close();
}

function renderPlanEvent(dayIndex,e,idx){
  const isShow = e[1] === '🎤' && /Actuación/i.test(e[2]);
  const btn = isShow ? `<span class="trip-note-v2">${notebookButton(dayIndex,idx)}</span>` : '';
  const label = e[0] || '';
  return `<div class="trip-event-v2">
    ${label ? `<div class="trip-time-v2">${label}</div>` : ''}
    <div class="trip-body-v2 ${isShow?'with-note':''}">
      <span class="trip-text-v2">${e[2]}</span>${btn}
    </div>
  </div>`;
}
function renderPlan(dayIndex){
  return itinerary[dayIndex].events.map((e,idx)=>renderPlanEvent(dayIndex,e,idx)).join('');
}

function hasNotebookContent(id){
 const n=getNotebook(id);
 return !!(n.setlist?.trim() || n.notes?.trim() || (n.images&&n.images.length) || n.done);
}
function notebookIconHTML(){
 return `<svg class="notebook-icon" viewBox="0 0 48 48" aria-hidden="true">
   <rect x="13" y="7" width="26" height="34" rx="6" class="nb-cover"/>
   <path d="M18 7v34" class="nb-spine"/>
   <path d="M23 17h10M23 24h10M23 31h8" class="nb-lines"/>
   <path d="M34 7v9l-3-2-3 2V7" class="nb-ribbon"/>
 </svg>`;
}

function resizeImageFile(file, maxSize=1800, quality=0.85){
  return new Promise((resolve,reject)=>{
    const imgEl = new Image();
    const reader = new FileReader();
    reader.onload = () => {
      imgEl.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(imgEl.width, imgEl.height));
        const w = Math.round(imgEl.width * scale);
        const h = Math.round(imgEl.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(imgEl,0,0,w,h);
        const full = canvas.toDataURL('image/jpeg', quality);

        const thumbSize = 360;
        const tScale = Math.min(1, thumbSize / Math.max(imgEl.width, imgEl.height));
        const tw = Math.round(imgEl.width * tScale);
        const th = Math.round(imgEl.height * tScale);
        const tCanvas = document.createElement('canvas');
        tCanvas.width = tw; tCanvas.height = th;
        const tCtx = tCanvas.getContext('2d');
        tCtx.drawImage(imgEl,0,0,tw,th);
        const thumb = tCanvas.toDataURL('image/jpeg', 0.78);
        resolve({full, thumb, name:file.name || 'foto', createdAt:Date.now()});
      };
      imgEl.onerror = reject;
      imgEl.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
function normalizeNotebookImages(n){
  n.images = (n.images||[]).map(img => typeof img === 'string' ? {full:img, thumb:img, name:'foto'} : img);
  return n;
}
function photoCount(id){
  const n = normalizeNotebookImages(getNotebook(id));
  return (n.images||[]).length;
}
function saveNotebook(id,n){normalizeNotebookImages(n);localStorage.setItem(notebookKey(id),JSON.stringify(n))}
function notebookHasPhotos(id){return photoCount(id)>0}
function openPhotoViewer(id,index){
  const n=normalizeNotebookImages(getNotebook(id));
  const img=n.images[index];
  if(!img) return;
  modalContent.innerHTML = `<h2>📷 Foto ${index+1} de ${n.images.length}</h2>
    <div class="photo-viewer"><img src="${img.full}" alt=""></div>
    <div class="notebook-actions">
      ${index>0?`<button class="detailbtn" onclick="openPhotoViewer('${id}',${index-1})">← Anterior</button>`:''}
      ${index<n.images.length-1?`<button class="detailbtn" onclick="openPhotoViewer('${id}',${index+1})">Seguinte →</button>`:''}
      <button class="detailbtn danger" onclick="deleteNotebookPhoto('${id}',${index})">Eliminar</button>
    </div>
    <p class="small">Podes ampliar coa xestualidade do móbil.</p>`;
  modal.classList.add('notebook-open');
  modal.classList.remove('hidden');
}
function deleteNotebookPhoto(id,index){
  const n=normalizeNotebookImages(getNotebook(id));
  n.images.splice(index,1);
  saveNotebook(id,n);
  modal.classList.add('hidden');
  if(window.__lastNotebookArgs){showNotebook(...window.__lastNotebookArgs)}
}
function imageGridHTML(id,dayIndex,eventIndex,n){
  n=normalizeNotebookImages(n);
  const imgs=n.images||[];
  return `<div class="gallery-head"><b>📷 Fotos (${imgs.length})</b><label class="add-photo">+<input id="imageInput" type="file" accept="image/*" multiple></label></div>
  <div class="image-preview">${imgs.map((img,i)=>`<button class="preview-item" onclick="openPhotoViewer('${id}',${i})"><img src="${img.thumb||img.full}" alt=""></button>`).join('')}</div>`;
}
function shareNotebookOptions(id,dayIndex,eventIndex){
  saveNotebookFromModal(id,false);
  modalContent.innerHTML = `<h2>📲 Partillar por WhatsApp</h2>
    <div class="share-options">
      <label><input id="shareSetlist" type="checkbox" checked> Setlist</label>
      <label><input id="shareNotes" type="checkbox" checked> Notas</label>
      <label><input id="sharePhotos" type="checkbox"> Indicar número de fotos</label>
    </div>
    <button class="detailbtn" onclick="shareNotebook('${id}',${dayIndex},${eventIndex})">Partillar</button>`;
  modal.classList.add('notebook-open');
  modal.classList.remove('hidden');
}

function notebookButton(dayIndex,eventIndex){
 const d=itinerary[dayIndex], id=perfId(d.id,eventIndex), active=hasNotebookContent(id);
 return `<button class="inline-notebook ${active?'has-content':''} ${notebookHasPhotos(id)?'has-photos':''}" title="Abrir caderno" aria-label="Abrir caderno da actuación" onclick="event.stopPropagation();showNotebook(${dayIndex},${eventIndex})">${notebookIconHTML()}</button>`;
}



function accordion(title, content, open=false){
 return `<details class="accordion" ${open?'open':''}><summary><span>${title}</span><b></b></summary><div class="accordion-body">${content}</div></details>`;
}

function placesForDay(d){const names=d.dayPlaces||[d.mainPlace];return names.map(name=>(typeof places!=='undefined'?places:[]).find(p=>p.name===name||name.includes(p.name)||p.name.includes(name))).filter(Boolean);}
function placeForDay(d){return placesForDay(d)[0]||null;}
function placeCardHTML(p){return `<article class="place in-day">${img(p.photo,'photo')}<h3>${p.name}</h3><p class="small">${p.region}</p><p>${p.description}</p><p><b>⭐ Que ver:</b> ${p.see.join(', ')}</p>${curiosityBoxHTML(p.name)}<a class="linkbtn" href="${p.maps}" target="_blank">Abrir en Google Maps</a></article>`;}
function dayPlaceHTML(d){const ps=placesForDay(d);if(!ps.length)return '';return `<div class="day-places">${ps.map(placeCardHTML).join('')}</div>`;}

function dayFestivalHTML(d){
 const fs=festivalsForDay(d.id);
 return fs.length ? fs.map(f=>festivalCardHTML(f)).join('') : '';
}
function daySectionsHTML(d){
 const fest = dayFestivalHTML(d);
 const place = dayPlaceHTML(d);
 const sleep = `<div class="card sleep compact-sleep"><p><b>${d.sleep}</b></p>${d.sleepCuriosityPlace?curiosityBoxHTML(d.sleepCuriosityPlace):''}${sleepMapButton(d)}</div>`;
 return `${fest?accordion('🎪 Coñece o festival', fest):''}${place?accordion('📍 Lugares do día', place):''}${accordion('🛏️ Durmida', sleep)}`;
}


let openDayIndex = null;
let returnScrollY = 0;

function openDay(i){
  openDayIndex = i;
  const sec = document.getElementById('dayDetail');
  if(sec){
    sec.innerHTML = dayPageHTML(i);
    show('dayDetail');
    window.scrollTo({top:0,behavior:'auto'});
  } else {
    detailDay(i);
  }
}

function backToItinerary(){
  openDayIndex = null;
  show('itinerary');
  window.scrollTo({top:0,behavior:'auto'});
}

function closeNotebook(){
  modal.classList.add('hidden');
  if(openDayIndex !== null){
    show('dayDetail');
    setTimeout(()=>window.scrollTo({top:returnScrollY||0,behavior:'auto'}),0);
  }
}

function dayPageHTML(i){
  const d=itinerary[i];
  return `<button class="backbtn" onclick="backToItinerary()">← Voltar ao itinerario</button>
  <section class="day-page">
    <h2>${d.day}</h2>
    <h3>${d.route}</h3>
    ${img(d.photo,'hero-img')}
    <p><b>📍 Lugares do día:</b> ${(d.dayPlaces||[d.mainPlace]).join(' · ')}</p>
    <p><b>🚌 Distancia:</b> ${d.km}</p>
    <p>${d.summary}</p>
    ${nextShow(d)}
    <h3>📋 Plan do día</h3>
    ${renderPlan(i)}
    ${daySectionsHTML(d)}
    <div class="tags">${d.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
    <div id="dayWeatherBox-${i}" class="day-weather-holder"></div>
    ${diaryCardHTML(i)}
  </section>`;
}

function detailDay(i){modalContent.innerHTML=dayPageHTML(i);modal.classList.remove('hidden')}



function progressHTML(){const c=current();return `<div class="progress">${itinerary.map((d,i)=>`<span class="progress-dot ${i<c?'done':i==c?'current':''}"></span>`).join('')}</div>`}
function renderToday(){const d=itinerary[current()];today.innerHTML=`<div class="card">${progressHTML()}<span class="pill">📅 O día de hoxe</span><h2>${d.day}</h2>${img(d.photo,'hero-img')}<div class="title"><div><h2>${d.mainPlace}</h2><p>${d.route}</p></div><div class="km">${d.km}</div></div>${nextShow(d)}<h3>📋 Plan do día</h3>${renderPlan(current())}${daySectionsHTML(d)}<button onclick="show('route')" class="detailbtn">Ver mapa</button><button onclick="openDay(${current()})" class="detailbtn">Ver detalle</button></div><div id='weatherBox'></div>`}

function mapStepName(i){
  const names = [
    "Saint-Avaugourd-des-Landes",
    "La Roche-sur-Yon → Jard-sur-Mer → Saint-Avaugourd-des-Landes",
    "Beuzec-Cap-Sizun → Quimper",
    "Quimper",
    "Quimper → Pontorson / Mont-Saint-Michel",
    "Mont-Saint-Michel → Laval",
    "Laval → Évron → Laval",
    "Laval → Villedieu-les-Poêles",
    "Villedieu-les-Poêles → Saint-Avaugourd-des-Landes → regreso",
    "Pasai pa’ casa"
  ];
  return names[i] || `Punto ${i+1}`;
}
function routeStepLabel(i,d){
  const labels = [
    "Saint-Avaugourd-des-Landes",
    "La Roche-sur-Yon → Jard-sur-Mer → Saint-Avaugourd-des-Landes",
    "Beuzec-Cap-Sizun → Quimper",
    "Quimper",
    "Quimper → Pontorson / Mont-Saint-Michel",
    "Mont-Saint-Michel → Laval",
    "Laval → Évron → Laval",
    "Laval → Villedieu-les-Poêles",
    "Villedieu-les-Poêles → Saint-Avaugourd-des-Landes → regreso",
    "Pasai pa’ casa"
  ];
  return labels[i] || d.mainPlace;
}
function showMapTooltip(i,label){
  const map = document.querySelector('.map-clickable');
  const btn = document.querySelector(`.map-hotspot[onclick*="scrollToMapStep(${i})"]`);
  if(!map || !btn) return;
  map.querySelectorAll('.map-tooltip').forEach(t=>t.remove());
  const tip = document.createElement('div');
  tip.className = 'map-tooltip';
  tip.textContent = '📍 ' + (label || mapStepName(i));
  tip.style.left = btn.style.left || '50%';
  tip.style.top = btn.style.top || '50%';
  map.appendChild(tip);
  setTimeout(()=>tip.classList.add('show'), 10);
  setTimeout(()=>tip.remove(), 1150);
}
function scrollToMapStep(i,label){
  showMapTooltip(i,label);
  const steps = document.querySelectorAll('#steps .step');
  const target = steps[i];
  if(!target) return;
  setTimeout(()=>{
    const y = target.getBoundingClientRect().top + window.scrollY - 84;
    window.scrollTo({top: Math.max(0, y), behavior:'smooth'});
    target.classList.add('map-step-flash');
    setTimeout(()=>target.classList.remove('map-step-flash'), 750);
  }, 180);
}

function renderRoute(){const c=current();steps.innerHTML=itinerary.map((d,i)=>`<div class="step ${i<c?'done':''} ${i==c?'current':''}" onclick="openDay(${i})"><b>${i+1}. ${routeStepLabel(i,d)}</b><br><span class="small">${d.day} · ${i<c?'feito':i==c?'agora':'pendente'}</span></div>`).join('')}function renderItinerary(){itineraryEl=document.getElementById('itinerary');itineraryEl.innerHTML='<h2>Itinerario interactivo</h2>'+progressHTML()+'<p class="small">Toca nun día para abrir a información completa.</p>'+itinerary.map((d,i)=>`<div class="day-card ${i==current()?'current':''}" onclick="openDay(${i})">${img(d.photo,'photo small-photo')}<h3>${i+1}. ${d.day}</h3><p><b>${d.route}</b></p><p>${d.summary}</p><p><b>🚌 ${d.km}</b> · <b>🛏️ ${d.sleep}</b></p><div class="tags">${d.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div></div>`).join('')}




function slugifyId(str){return String(str||'global').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9_-]/g,'-');}
function allCuriosities(){const list=[];(typeof places !== 'undefined' ? places : []).forEach(p=>{if(p.name==='Regreso'||p.name==='Pasai pa casa') return;if(Array.isArray(p.curiosities)){ p.curiosities.forEach(c=>list.push({place:p.name,title:c.title,text:c.text})); }else if(p.curiosity){ list.push({place:p.name,title:'Sabías que...?',text:p.curiosity}); }});return list;}
function randomCuriosity(placeName=null){const source=placeName?(places.find(p=>p.name===placeName)?.curiosities||[]).map(c=>({place:placeName,title:c.title,text:c.text})):allCuriosities();if(!source.length)return null;const key=placeName?`curiosity-${placeName}`:'curiosity-global';let last=Number(localStorage.getItem(key)||-1);let idx=Math.floor(Math.random()*source.length);if(source.length>1&&idx===last)idx=(idx+1)%source.length;localStorage.setItem(key,idx);return source[idx];}
function randomCopla(){const source=(typeof returnCoplas !== 'undefined'?returnCoplas:[]);if(!source.length)return '';const key='copla-global';let last=Number(localStorage.getItem(key)||-1);let idx=Math.floor(Math.random()*source.length);if(source.length>1&&idx===last)idx=(idx+1)%source.length;localStorage.setItem(key,idx);return source[idx];}
function curiosityInnerHTML(c){
  if(c && c.copla){
    return `<p class="place-ref">Pasai pa casa</p><p class="copla-text">${c.text.replaceAll('\n','<br>')}</p><button type="button" class="icon-refresh curiosity-refresh" aria-label="Cargar outra">↻</button>`;
  }
  return `<p class="place-ref">${c.place}</p><p class="curiosity-text">${c.text}</p><button type="button" class="icon-refresh curiosity-refresh" aria-label="Outra curiosidade">↻</button>`;
}
function curiosityBoxHTML(placeName=null){let c;if(placeName==='Regreso'||placeName==='Pasai pa casa')c={copla:true,text:"Xa vou da-la despedida,\npor riba daquel ramallo,\nbeiladores do turreiro,\nide bailar ao carallo.",place:'Pasai pa casa'};else c=randomCuriosity(placeName);if(!c)return '';const target=placeName?`placeCuriosityBox-${slugifyId(placeName)}`:'globalCuriosityBox';const placeAttr=String(placeName||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;');return `<div id="${target}" class="curiosity-box ${(placeName==='Regreso'||placeName==='Pasai pa casa')?'copla-box':''}" data-place="${placeAttr}">${curiosityInnerHTML(c)}</div>`;}
function refreshCuriosityElement(el){if(!el)return;const placeName=el.dataset.place||null;let c;if(placeName==='Regreso'||placeName==='Pasai pa casa')c={copla:true,text:randomCopla(),place:'Pasai pa casa'};else c=randomCuriosity(placeName);if(c)el.innerHTML=curiosityInnerHTML(c);}
document.addEventListener('click',(ev)=>{const btn=ev.target.closest('.curiosity-refresh');if(btn){ev.preventDefault();ev.stopPropagation();refreshCuriosityElement(btn.closest('.curiosity-box'));}});

function renderPlaces(){placesSec=document.getElementById('places');placesSec.innerHTML='<h2>Lugares onde imos</h2><p class="small">Resumo breve, que ver e curiosidades.</p><div class="grid">'+places.filter(p=>p.name!=='Regreso').map(p=>`<article class="place">${img(p.photo,'photo')}<h3>${p.name}</h3><p class="small">${p.region}</p><p>${p.description}</p><p><b>⭐ Que ver:</b> ${p.see.join(', ')}</p>${curiosityBoxHTML(p.name)}<a class="linkbtn" href="${p.maps}" target="_blank">Abrir en Google Maps</a></article>`).join('')+'</div>'}
function festivalHTML(){let events=[];itinerary.forEach(d=>d.events.forEach(e=>{if(['🎶','🎭','🎤'].includes(e[1]))events.push([d.day,d.mainPlace,...e])}));return '<h2>🎤 Festival</h2>'+events.map(e=>`<div class="event"><div class="time">${e[0]}<br>${e[2]}</div><div>${e[3]} <b>${e[1]}</b><br>${e[4]}</div></div>`).join('')}
function phrasesHTML(){return '<h2>🇫🇷 Frases útiles</h2>'+phrases.map((p,i)=>`<div class="phrase"><button class="copy" onclick="copyPhrase(${i})">📋</button><b>${p[0]}</b><p><b>${p[1]}</b></p><p class="small">${p[2]}</p></div>`).join('')}
function curiosityHTML(){return `<p class="small">Curiosidades dos lugares da xira.</p>${curiosityBoxHTML(null)}`}
function accommodationsHTML(){return '<h2>🛏️ Aloxamentos</h2>'+itinerary.map(d=>`<div class="info"><b>${d.day}</b><br>${d.sleep}<br>${sleepMapButton(d)}</div>`).join('')}

function openMoreSection(title, html){
 modalContent.innerHTML = `<h2>${title}</h2>${html}`;
 modal.classList.remove('hidden');
}
function moreButton(icon,title,desc,handler){
 return `<button class="more-button" onclick="${handler}">
   <span class="more-icon">${appIcon(icon)}</span>
   <span><b>${title}</b><small>${desc}</small></span>
 </button>`;
}
function timeSectionHTML(){
 return `<div class="card"><p>A meteoroloxía aparece na pantalla “Hoxe” cando hai conexión.</p><p><b>Consello base:</b> levade auga e un chuvasqueiro lixeiro. Nos desfiles e actuacións, prestade especial atención á calor coa indumentaria e á protección dos instrumentos se chove ou fai vento.</p></div>`;
}


function docCardHTML(doc){
 return `<article class="doc-card">
   <div class="doc-icon">${doc.icon||'📄'}</div>
   <div><h3>${doc.title}</h3>${doc.badge?`<em class="doc-badge">${doc.badge}</em>`:''}<p>${doc.subtitle}</p><span>${doc.category} · ${doc.pages}</span>
   <div><a class="detailbtn" href="assets/${doc.file}" target="_blank">Abrir PDF</a></div></div>
 </article>`;
}
function documentIcon(mime,title=''){
 if(mime?.includes('pdf') || title.toLowerCase().endsWith('.pdf')) return '📄';
 if(mime?.includes('image')) return '🖼️';
 if(mime?.includes('spreadsheet')) return '📊';
 if(mime?.includes('document')) return '📝';
 return '📎';
}
function cleanDocTitle(title){
 return (title||'Documento').replace(/\.(pdf|docx?|xlsx?|pptx?|jpg|jpeg|png)$/i,'');
}
function renderDriveDocs(docs){
 if(!docs || docs.length===0){
   return `<div class="card"><p>Aínda non hai documentos para mostrar.</p><a class="detailbtn" href="${DRIVE_DOCS_FOLDER_URL}" target="_blank">Abrir cartafol en Drive</a></div>`;
 }
 return `<div class="docs-grid live-docs">${docs.map(doc=>`<article class="doc-card">
   <div class="doc-icon">${documentIcon(doc.mimeType,doc.title)}</div>
   <div><h3>${cleanDocTitle(doc.title)}</h3><p>Documento da viaxe</p>
   <div><a class="detailbtn" href="${doc.url}" target="_blank">Abrir</a></div></div>
 </article>`).join('')}</div>`;
}
async function loadDriveDocs(){
 const box = document.getElementById('driveDocsBox');
 if(!box) return;
 if(!DRIVE_DOCS_API_URL){
   box.innerHTML = `<div class="card"><p><b>Documentos conectados ao cartafol de Drive.</b></p><p>Para mostrar tarxetas limpas e actualizadas automaticamente falta pegar a URL do Google Apps Script publicado.</p><a class="detailbtn" href="${DRIVE_DOCS_FOLDER_URL}" target="_blank">Abrir cartafol en Drive</a></div>`;
   return;
 }
 try{
   const r = await fetch(DRIVE_DOCS_API_URL, {cache:'no-store'});
   const docs = await r.json();
   box.innerHTML = renderDriveDocs(docs);
 }catch(e){
   box.innerHTML = `<div class="card"><p>Non se puideron cargar os documentos agora mesmo.</p><a class="detailbtn" href="${DRIVE_DOCS_FOLDER_URL}" target="_blank">Abrir cartafol en Drive</a></div>`;
 }
}
function documentsHTML(){
 setTimeout(loadDriveDocs,0);
 return `<p class="small">Os documentos dependen dun cartafol vivo de Google Drive. Cando se engadan ou cambien documentos, aparecerán aquí sen actualizar a app.</p>
 <div id="driveDocsBox"><div class="card"><p>Cargando documentos…</p></div></div>
 <div class="docs-grid live-docs external-docs">
   <article class="doc-card">
     <div class="doc-icon">📝</div>
     <div><h3>Ligazóns bailes Son d'Aquí</h3><p>Documento externo</p>
     <div><a class="detailbtn" href="https://docs.google.com/document/d/1dt8jWo50bachA7xxVLrFgNEpfGm9EX0uZBHRuXwNQMc/edit?pli=1&tab=t.0" target="_blank" rel="noopener">Abrir</a></div></div>
   </article>
 </div>`;
}
function checklistHTML(){
 const items = (typeof checklistItems !== 'undefined' ? checklistItems : []);
 let saved={}; try{saved=JSON.parse(localStorage.getItem('sondaqui-checklist')||'{}')}catch(e){}
 return `<div class="checklist">${items.map((item,i)=>`<label class="check-item"><input type="checkbox" ${saved[i]?'checked':''} onchange="toggleChecklist(${i},this.checked)"><span>${item}</span></label>`).join('')}</div>`;
}
function toggleChecklist(i,checked){
 let saved={}; try{saved=JSON.parse(localStorage.getItem('sondaqui-checklist')||'{}')}catch(e){}
 saved[i]=checked; localStorage.setItem('sondaqui-checklist',JSON.stringify(saved));
}
function aboutHTML(){
 return `<div class="card about-card">
  <img src="assets/son-daqui.jpg" alt="Son d'aquí">
  <h3>Son d'aquí - Francia 2026</h3>
  <p><b>Versión 1.5</b></p>
  <p>App pensada para axudar durante a viaxe. Inclúe itinerario, ruta, lugares, festivais, documentos, meteoroloxía, aloxamentos e cadernos persoais para cada actuación.</p>
  <p>Que queredes que vos diga... a cabeza non para.</p>
 </div>`;
}



function calendarShortDay(day){
  const first = (day||'').split(' ')[0].toLowerCase();
  const map = {venres:'ven',sábado:'sáb',sabado:'sáb',domingo:'dom',luns:'lun',martes:'mar',mércores:'mér',mercores:'mér',xoves:'xov'};
  return map[first] || first.slice(0,3);
}
function calendarDayNumber(date){
  const m = String(date||'').match(/-(\d{2})$/);
  return m ? String(Number(m[1])) : '';
}
function calendarMainEvents(d){
  const rx = /actuación|desfile|turismo|descanso|chegada|saída|xantar|cea/i;
  const items = d.events.filter(e => rx.test(e[2])).map(e => {
    const when = e[0] ? `<span>${e[0]}</span>` : '';
    return `<li>${when}<b>${e[2]}</b></li>`;
  }).join('');
  return items || '<li><b>Plan de viaxe</b></li>';
}
function calendarSummaryHTML(){
  return `<div class="calendar-summary">
    ${itinerary.map((d,i)=>`<article class="calendar-row">
      <div class="calendar-date"><span>${calendarShortDay(d.day)}</span><b>${calendarDayNumber(d.date)}</b></div>
      <div class="calendar-info">
        <h3>Día ${i+1} · ${d.day}</h3>
        <p class="small">${(d.dayPlaces||[d.mainPlace]).join(' · ')}</p>
        <ul>${calendarMainEvents(d)}</ul>
      </div>
    </article>`).join('')}
  </div>`;
}


function gameHTML(){
 return `<div class="card game-card">
  <h2>GaliGuessr</h2>
  <p class="small">Un xogo para adiviñar lugares de Galicia. Ideal para entreterse na ruta.</p>
  <div class="game-frame-wrap">
    <iframe src="https://minimuino.github.io/galiguessr/" title="GaliGuessr" loading="lazy"></iframe>
  </div>
  <a class="detailbtn" href="https://minimuino.github.io/galiguessr/" target="_blank" rel="noopener">Abrir o xogo nunha nova pestana</a>
 </div>`;
}

function renderMore(){
 more.innerHTML = `<h2>Máis</h2><p class="small">Accesos rápidos á información complementaria.</p>
 <div class="more-menu">
  ${moreButton('festival','Festivais','Cartaces e contexto.',"openMoreSection('Coñece os festivais', festivalsSectionHTML())")}
  ${moreButton('calendar','Calendario','Resumo da xira.',"openMoreSection('Resumo calendario', calendarSummaryHTML())")}
  ${moreButton('🇫🇷','Frases','Chuleta útil.',"openMoreSection('Frases útiles', phrasesHTML())")}
  ${moreButton('👀','Ollo!','Curiosidades dos lugares da xira.',"openMoreSection('Ollo!', curiosityHTML())")}
  ${moreButton('📄','Documentos','Documentos da viaxe.',"openMoreSection('Documentos', documentsHTML())")}
  ${moreButton('🌤️','Tempo','Previsión e consellos.',"openMoreSection('Tempo', timeSectionHTML())")}
  ${moreButton('🛏️','Aloxamentos','Durmidas e mapas.',"openMoreSection('Aloxamentos', accommodationsHTML())")}
  ${moreButton('🎲','Xogo','GaliGuessr para a ruta.',"openMoreSection('Xogo', gameHTML())")}
  ${moreButton('🔥','A música do inferno','Listaxe infernal de Spotify coa que non teño nada que ver pero, se vos fai felices a min faime feliz vervos felices.',"window.open('https://open.spotify.com/playlist/0n2tw3GcKyIfeh9id8XO92?si=_Z0haq8tQI-QpZEnMEiPHQ&utm_source=whatsapp&pi=e-xyExlZjMQiGl','_blank','noopener')")}
  ${moreButton('ℹ️','Sobre esta app','Información e versión.',"openMoreSection('Sobre esta app', aboutHTML())")}
 </div>`;
}
function copyPhrase(i){navigator.clipboard?.writeText(phrases[i][1])}
function newCurio(){curio.textContent=curiosities[Math.floor(Math.random()*curiosities.length)]}
function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('active',s.id==id));document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('active',b.dataset.s==id));scrollTo({top:0,behavior:'smooth'})}
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>show(b.dataset.s));enter.onclick=()=>{splash.classList.add('hidden');app.classList.remove('hidden');show('today')};modal.onclick=e=>{if(e.target===modal)modal.classList.add('hidden')};
renderToday();renderRoute();renderItinerary();renderPlaces();renderMore();
if ('serviceWorker' in navigator) {
  let refreshing = false;
  let updateAccepted = false;

  function showUpdateBanner(registration) {
    if (document.getElementById('pwaUpdateBanner')) return;
    const banner = document.createElement('div');
    banner.id = 'pwaUpdateBanner';
    banner.className = 'pwa-update-banner';
    banner.setAttribute('role', 'status');
    banner.innerHTML = `
      <div class="pwa-update-text">
        <strong>🆕 Hai unha nova versión dispoñible</strong>
        <span>Actualiza para ter a última información da viaxe.</span>
      </div>
      <button type="button" id="pwaUpdateButton">Actualizar á última versión dispoñible</button>`;
    document.body.appendChild(banner);

    document.getElementById('pwaUpdateButton')?.addEventListener('click', () => {
      const waiting = registration.waiting;
      if (!waiting) {
        registration.update();
        return;
      }
      updateAccepted = true;
      waiting.postMessage({ type: 'SKIP_WAITING' });
    });
  }

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js');

      if (registration.waiting && navigator.serviceWorker.controller) {
        showUpdateBanner(registration);
      }

      registration.addEventListener('updatefound', () => {
        const worker = registration.installing;
        if (!worker) return;
        worker.addEventListener('statechange', () => {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) {
            showUpdateBanner(registration);
          }
        });
      });

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') registration.update().catch(() => {});
      });

      setInterval(() => registration.update().catch(() => {}), 60 * 60 * 1000);
    } catch (error) {
      console.warn('Non se puido rexistrar o service worker:', error);
    }
  });

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing || !updateAccepted) return;
    refreshing = true;
    window.location.reload();
  });
}

weatherBlock().then(html=>{const el=document.getElementById('weatherBox'); if(el) el.innerHTML=html;});
closeModal.onclick = () => {
  if (modal.classList.contains('notebook-open')) {
    modal.classList.remove('notebook-open');
    closeNotebook();
  } else {
    modal.classList.add('hidden');
  }
};

// --- v1 preview 9 safety init ---
window.addEventListener('DOMContentLoaded', () => {
  const enterBtn = document.getElementById('enter');
  if (enterBtn) {
    enterBtn.onclick = () => {
      document.getElementById('splash')?.classList.add('hidden');
      document.getElementById('app')?.classList.remove('hidden');
      if (typeof show === 'function') show('today');
    };
  }
  try { if (typeof cd === 'function') cd(); } catch(e) {}
});


/* RC8 — mini calendario cadradiño do itinerario */
function shortDayLabel(day){
  const first = (day||'').split(' ')[0].toLowerCase();
  const map = {venres:'ven',sábado:'sáb',sabado:'sáb',domingo:'dom',luns:'lun',martes:'mar',mércores:'mér',mercores:'mér',xoves:'xov'};
  return map[first] || first.slice(0,3);
}
function dayNumberFromDate(date){
  const m = String(date||'').match(/-(\d{2})$/);
  return m ? String(Number(m[1])) : '';
}
function buildMiniDayNav(){
  return `<div class="day-mini-calendar" id="dayMiniCalendar">${itinerary.map((d,i)=>`<button type="button" class="day-cal-btn" data-day-index="${i}" onclick="scrollToItineraryCard(${i})"><span>${shortDayLabel(d.day)}</span><b>${dayNumberFromDate(d.date)}</b></button>`).join('')}</div>`;
}
function scrollToItineraryCard(i){
  const cards = document.querySelectorAll('#itinerary .day-card');
  const el = cards[i];
  if(!el) return;
  setActiveMiniDay(i);
  el.scrollIntoView({behavior:'smooth', block:'start'});
  el.classList.add('day-flash-mini');
  setTimeout(()=>el.classList.remove('day-flash-mini'),650);
}
function setActiveMiniDay(i){
  document.querySelectorAll('.day-cal-btn').forEach(btn=>btn.classList.toggle('active', Number(btn.dataset.dayIndex)===Number(i)));
}
function insertMiniCalendar(){
  const container = document.getElementById('itinerary');
  if(!container || container.querySelector('#dayMiniCalendar')) return;
  const cards = [...container.querySelectorAll('.day-card')];
  if(!cards.length) return;
  cards.forEach((card,i)=>{
    card.dataset.dayIndex=i;
    if(!card.querySelector('.day-number-pill')){
      card.insertAdjacentHTML('afterbegin', `<span class="day-number-pill">Día ${i+1}</span>`);
    }
  });
  const holder = document.createElement('div');
  holder.innerHTML = buildMiniDayNav();
  const nav = holder.firstElementChild;
  const smallIntro = container.querySelector('p.small');
  if(smallIntro) container.insertBefore(nav, smallIntro);
  else container.insertBefore(nav, cards[0]);
  setActiveMiniDay(typeof current === 'function' ? current() : 0);
  setupMiniCalendarObserver();
}
function setupMiniCalendarObserver(){
  const cards = [...document.querySelectorAll('#itinerary .day-card')];
  if(!cards.length) return;
  if(window.__miniCalendarObserver) window.__miniCalendarObserver.disconnect();
  window.__miniCalendarObserver = new IntersectionObserver(entries=>{
    const visible = entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(visible) setActiveMiniDay(Number(visible.target.dataset.dayIndex || 0));
  }, {threshold:[0.35,0.55,0.75], rootMargin:'-120px 0px -55% 0px'});
  cards.forEach(c=>window.__miniCalendarObserver.observe(c));
}
if(typeof renderItinerary === 'function' && !window.__renderItineraryMiniCalendarWrapped){
  const __originalRenderItinerary = renderItinerary;
  renderItinerary = function(){
    __originalRenderItinerary();
    setTimeout(insertMiniCalendar,0);
  };
  window.__renderItineraryMiniCalendarWrapped = true;
}



function importantEventsForCalendar(d){
  const important = d.events.filter(e=>{
    const t = e[2].toLowerCase();
    return /actuación|desfile|turismo|descanso|chegada|saída|xantar|cea/.test(t);
  }).map(e=>{
    const label = e[0] ? `${e[0]} · ` : '';
    return `<li><span>${label}</span>${e[2]}</li>`;
  }).join('');
  return important || `<li>Plan de viaxe</li>`;
}
function calendarHTML(){
  return `<div class="calendar-summary">${itinerary.map((d,i)=>`<article class="calendar-row">
    <div class="calendar-date"><span>${shortDayLabel(d.day)}</span><b>${dayNumberFromDate(d.date)}</b></div>
    <div class="calendar-info">
      <h3>${d.day}</h3>
      <p class="small">${(d.dayPlaces||[d.mainPlace]).join(' · ')}</p>
      <ul>${importantEventsForCalendar(d)}</ul>
    </div>
  </article>`).join('')}</div>`;
}



/* RC8.3 safe day nav — non modifica dayPageHTML nin renderToday */
function safeCompactDayName(i){
  const d = itinerary[i];
  if(!d) return '';
  const names = d.dayPlaces || [d.mainPlace];
  return (d.navPlace || names[0] || d.mainPlace || '').replace('Pontorson · Mont-Saint-Michel','Pontorson');
}

function safeDayShortDate(i){
  const d = itinerary[i];
  if(!d) return '';
  const first = (d.day||'').split(' ')[0].toLowerCase();
  const map = {venres:'ven',sábado:'sáb',sabado:'sáb',domingo:'dom',luns:'lun',martes:'mar',mércores:'mér',mercores:'mér',xoves:'xov'};
  const label = map[first] || first.slice(0,3);
  const m = String(d.date||'').match(/-(\d{2})$/);
  const num = m ? String(Number(m[1])) : '';
  return `${label} ${num}`.trim();
}

function safeDayNavHTML(i, mode='detail'){
  const prev = i > 0;
  const next = i < itinerary.length - 1;
  return `<div class="safe-day-nav ${mode==='today'?'today-nav':''}" data-safe-day-nav="${mode}">
    ${prev ? `<button type="button" class="safe-day-nav-btn prev" data-target="${i-1}"><span>← ${safeDayShortDate(i-1)}</span><b>${safeCompactDayName(i-1)}</b></button>` : `<span class="safe-day-nav-btn ghost"></span>`}
    ${next ? `<button type="button" class="safe-day-nav-btn next" data-target="${i+1}"><span>${safeDayShortDate(i+1)} →</span><b>${safeCompactDayName(i+1)}</b></button>` : `<span class="safe-day-nav-btn ghost"></span>`}
  </div>`;
}
function injectSafeDayNav(i){
  const sec = document.getElementById('dayDetail');
  if(!sec || !sec.innerHTML.trim()) return;
  sec.querySelectorAll('[data-safe-day-nav]').forEach(n=>n.remove());
  const page = sec.querySelector('.day-page') || sec;
  const topTarget = page.querySelector('h2') || page.firstElementChild;
  if(topTarget) topTarget.insertAdjacentHTML('beforebegin', safeDayNavHTML(i,'detail'));
  page.insertAdjacentHTML('beforeend', safeDayNavHTML(i,'detail'));
}
function injectSafeTodayNav(){
  const idx = typeof current === 'function' ? current() : 0;
  const sec = document.getElementById('today');
  if(!sec || !sec.innerHTML.trim()) return;
  sec.querySelectorAll('[data-safe-day-nav="today"]').forEach(n=>n.remove());
  const card = sec.querySelector('.card') || sec;
  const h2 = card.querySelector('h2');
  if(h2) h2.insertAdjacentHTML('afterend', safeDayNavHTML(idx,'today'));
}
document.addEventListener('click', function(ev){
  const btn = ev.target.closest('.safe-day-nav-btn');
  if(!btn || btn.classList.contains('ghost')) return;
  ev.preventDefault();
  ev.stopPropagation();
  if(btn.dataset.home){
    if(typeof backToItinerary === 'function') backToItinerary();
    return;
  }
  const target = Number(btn.dataset.target);
  if(Number.isFinite(target) && typeof openDay === 'function') openDay(target);
}, true);

if(typeof openDay === 'function' && !window.__safeDayNavWrapped){
  const __openDayOriginal = openDay;
  openDay = function(i){
    __openDayOriginal(i);
    setTimeout(()=>injectSafeDayNav(i), 0);
  };
  window.__safeDayNavWrapped = true;
}
if(typeof renderToday === 'function' && !window.__safeTodayNavWrapped){
  const __renderTodayOriginal = renderToday;
  renderToday = function(){
    __renderTodayOriginal();
    setTimeout(injectSafeTodayNav, 0);
  };
  window.__safeTodayNavWrapped = true;
}
document.addEventListener('DOMContentLoaded', function(){
  setTimeout(injectSafeTodayNav, 0);
});



/* RC9.1 — meteo tamén no detalle de cada día */
async function loadDayWeather(dayIndex){
  const el=document.getElementById(`dayWeatherBox-${dayIndex}`);
  if(!el) return;
  el.innerHTML='<div class="meteo-card"><h3>Meteoroloxía</h3><p>Actualizando...</p></div>';
  el.innerHTML=await weatherForecastBlockForDay(dayIndex);
}
if(typeof openDay === 'function' && !window.__openDayWeatherWrapped){
  const __openDayWeatherOriginal=openDay;
  openDay=function(i){
    __openDayWeatherOriginal(i);
    setTimeout(()=>loadDayWeather(i),0);
  };
  window.__openDayWeatherWrapped=true;
}



function goSplash(){
  document.getElementById('app')?.classList.add('hidden');
  document.getElementById('splash')?.classList.remove('hidden');
  window.scrollTo({top:0, behavior:'smooth'});
}
const appHeader = document.getElementById('appHeader');
if(appHeader && !window.__headerSplashEnabled){
  appHeader.addEventListener('click', goSplash);
  appHeader.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      goSplash();
    }
  });
  window.__headerSplashEnabled = true;
}

