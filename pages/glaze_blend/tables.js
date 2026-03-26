function generate_line_table(size,data,root){
  let calc1 = '<div class="calc-1" style="grid-template-columns:'+ " 1fr".repeat(size) +';"></div><div></div>';
  let svg = '';

  root.insertAdjacentHTML('afterbegin',calc1);
  calc1 = document.querySelector('.calc-1');

  for(let i = 1; i <= size; i++){
    svg += '<svg class="calc-1-svg" viewBox="0 0 100 63.049996185302734"  xmlns="http://www.w3.org/2000/svg">\n\
              <rect class="calc-bg1" x="0" y="0" width="50" height="50" style="\n\
                fill:'+ (data[i]["content"]["1"][2] ? data[i]["content"]["1"][2] : "transparent") +'; \n\
                opacity:'+ (data[i]["content"]["1"][0] ? data[i]["content"]["1"][0]/100 : "1") +'; "/>\n\
              <rect class="calc-bg2" x="50" y="0" width="50" height="50" style="\n\
                fill:'+ (data[i]["content"]["2"][2] ? data[i]["content"]["2"][2] : "transparent") +'; \n\
                opacity:'+ (data[i]["content"]["2"][0] ? data[i]["content"]["2"][0]/100 : "1") +'; "/>\n\
              <line class="calc-st calc-st__0" x1="50" y1="0" x2="50" y2="50"/>\n\
              <polygon class="calc-st calc-st__1" fill="none" points="0,0 100,0 100,50 0,50" />\n\
              <polygon class="calc-st calc-st__1" fill="none" points=".5,.5 99.5,.5 99.5,50 .5,50" />\n\
              <circle class="calc-st calc-st__0" cx="50" cy="50" r="12.65" fill="#fff"></circle>\n\
              <text class="calc-txt1-1-1" x="4" y="11.5">'+ (data[i]["content"]["1"][0] ? data[i]["content"]["1"][0] : "") +'</text>\n\
              <text class="calc-txt1-1-2" x="96" y="11.5">'+ (data[i]["content"]["2"][0] ? data[i]["content"]["2"][0] : "") +'</text>\n\
              <text class="calc-txt1-2-1" x="26" y="28">'+ (data[i]["content"]["1"][1] ? data[i]["content"]["1"][1] : "") +'</text>\n\
              <text class="calc-txt1-2-1" x="74" y="28">'+ (data[i]["content"]["2"][1] ? data[i]["content"]["2"][1] : "") +'</text>\n\
              <text class="calc-txt1-n" x="50" y="51">'+ data[i]["name"] +'</text>\n\
            </svg>';
  }
  calc1.insertAdjacentHTML('afterbegin',svg);
}

function generate_rect_table(x,y,data,root){
  let calc1 = '<div class="calc-2" style="grid-template-columns:'+ " 1fr".repeat(x) +';"></div><div></div>';
  let svg = '';

  root.insertAdjacentHTML('afterbegin',calc1);
  calc1 = document.querySelector('.calc-2');

  for(let i = 1; i <= x*y; i++){
    if(data[i] && data[i]["content"]) {
      let temp = data[i]["content"]["3"];
      data[i]["content"]["3"] = data[i]["content"]["4"];
      data[i]["content"]["4"] = temp;
    }
  }

  for(let i = 1; i <= x*y; i++){
    svg += '<svg class="calc-2-svg" viewBox="0 0 74 74"  xmlns="http://www.w3.org/2000/svg">\n\
              <rect class="calc-bg1" x="0" y="0" width="37" height="37" style="\n\
                fill:'+ (data[i]["content"]["1"][2] ? data[i]["content"]["1"][2] : "transparent") +'; \n\
                opacity:'+ (data[i]["content"]["1"][0] ? data[i]["content"]["1"][0]/100 : "1") +'; "/>\n\
              <rect class="calc-bg2" x="37" y="0" width="37" height="37" style="\n\
                fill:'+ (data[i]["content"]["2"][2] ? data[i]["content"]["2"][2] : "transparent") +'; \n\
                opacity:'+ (data[i]["content"]["2"][0] ? data[i]["content"]["2"][0]/100 : "1") +'; "/>\n\
              <rect class="calc-bg3" x="37" y="37" width="37" height="37" style="\n\
                fill:'+ (data[i]["content"]["3"][2] ? data[i]["content"]["3"][2] : "transparent") +'; \n\
                opacity:'+ (data[i]["content"]["3"][0] ? data[i]["content"]["3"][0]/100 : "1") +'; "/>\n\
              <rect class="calc-bg4" x="0" y="37" width="37" height="37" style="\n\
                fill:'+ (data[i]["content"]["4"][2] ? data[i]["content"]["4"][2] : "transparent") +'; \n\
                opacity:'+ (data[i]["content"]["4"][0] ? data[i]["content"]["4"][0]/100 : "1") +'; "/>\n\
              <line class="calc-st calc-st__0" x1="37" y1="0" x2="37" y2="74"/>\n\
              <line class="calc-st calc-st__0" x1="0" y1="37" x2="74" y2="37"/>\n\
              <polygon class="calc-st calc-st__2" fill="none" points="0,0 74,0 74,74 0,74" />\n\
              <circle class="calc-st calc-st__0" cx="37" cy="37" r="9.43" fill="#fff"></circle>\n\
              <text class="calc-txt2-1-1" x="3" y="8">'+ (data[i]["content"]["1"][0] ? data[i]["content"]["1"][0] : "") +'</text>\n\
              <text class="calc-txt2-1-2" x="19" y="21">'+ (data[i]["content"]["1"][1] ? data[i]["content"]["1"][1] : "") +'</text>\n\
              <text class="calc-txt2-2-1" x="71" y="8">'+ (data[i]["content"]["2"][0] ? data[i]["content"]["2"][0] : "") +'</text>\n\
              <text class="calc-txt2-2-2" x="55" y="21">'+ (data[i]["content"]["2"][1] ? data[i]["content"]["2"][1] : "") +'</text>\n\
              <text class="calc-txt2-n" x="37.45" y="38">'+ data[i]["name"] +'</text>\n\
              <text class="calc-txt2-3-1" x="71" y="70">'+ (data[i]["content"]["3"][0] ? data[i]["content"]["3"][0] : "") +'</text>\n\
              <text class="calc-txt2-3-2" x="55" y="56">'+ (data[i]["content"]["3"][1] ? data[i]["content"]["3"][1] : "") +'</text>\n\
              <text class="calc-txt2-4-1" x="3" y="70">'+ (data[i]["content"]["4"][0] ? data[i]["content"]["4"][0] : "") +'</text>\n\
              <text class="calc-txt2-4-2" x="19" y="56">'+ (data[i]["content"]["4"][1] ? data[i]["content"]["4"][1] : "") +'</text>\n\
            </svg>';
  }
  calc1.insertAdjacentHTML('afterbegin',svg);
}

function generate_triangle_table(size,data,root){
  let calc1 = '<div class="calc-3" style="grid-template-columns:'+ " 1fr".repeat(size) +';"></div><div></div>';
  let svg = '';
  let objSpace = {};
  let arSpace = [0];
  
  for(let i = 1; i <= (size * (size + 1)) / 2; i++){
    if(data[i] && data[i]["content"]) {
      let temp = data[i]["content"]["2"];
      data[i]["content"]["2"] = data[i]["content"]["3"];
      data[i]["content"]["3"] = temp;
    }
  }
  
  for(let i = 1; i <= size; i++){
    arSpace[i]= i + arSpace[i-1];
    objSpace[arSpace[i]]= '<div></div>';
  }

  root.insertAdjacentHTML('afterbegin',calc1);
  calc1 = document.querySelector('.calc-3');
  for(let i = 1; i <= (size * (size + 1)) / 2; i++){
    svg += '<svg class="calc-3-svg" viewBox="0 0 88.06 76.27"  xmlns="http://www.w3.org/2000/svg">\n\
              <polygon class="calc-bg1" points="58.55 .5 29.53 .5 15.03 25.63 29.53 50.76 58.55 50.76 73.06 25.63 58.55 .5" style="\n\
                fill:'+ (data[i]["content"]["1"][2] ? data[i]["content"]["1"][2] : "transparent") +'; \n\
                opacity:'+ (data[i]["content"]["1"][0] ? data[i]["content"]["1"][0]/100 : "1") +'; "/>\n\
              <polygon class="calc-bg2" points="72.98 25.51 43.96 25.51 29.45 50.64 43.96 75.77 72.98 75.77 87.49 50.64 72.98 25.51" style="\n\
                fill:'+ (data[i]["content"]["2"][2] ? data[i]["content"]["2"][2] : "transparent") +'; \n\
                opacity:'+ (data[i]["content"]["2"][0] ? data[i]["content"]["2"][0]/100 : "1") +'; "/>\n\
              <polygon class="calc-bg3" points="44.1 25.51 15.09 25.51 .58 50.64 15.09 75.77 44.1 75.77 58.61 50.64 44.1 25.51" style="\n\
                fill:'+ (data[i]["content"]["3"][2] ? data[i]["content"]["3"][2] : "transparent") +'; \n\
                opacity:'+ (data[i]["content"]["3"][0] ? data[i]["content"]["3"][0]/100 : "1") +'; "/>\n\
              <polygon class="calc-st calc-st__1" fill="none" points=".58 50.64 15.06 25.57 29.53 .5 44.04 .5 58.55 .5 73.02 25.57 87.49 50.64 80.23 63.2 72.98 75.77 44.03 75.77 15.09 75.77 7.83 63.2 .58 50.64"/>\n\
              <polygon class="calc-st calc-st__0" fill="none" points="15.09 25.51 72.98 25.51 44.1 75.77 29.59 50.64 15.09 25.51"/>\n\
              <polygon class="calc-triangle calc-st calc-st__0" fill="none" points="44.03 25.51 58.47 50.64 29.59 50.64 44.03 25.51"/>\n\
              <text class="calc-txt3-1-1" x="44.25" y="21.5">'+ (data[i]["content"]["1"][0] ? data[i]["content"]["1"][0] : "") +'</text>\n\
              <text class="calc-txt3-1-2" x="44" y="14">'+ (data[i]["content"]["1"][1] ? data[i]["content"]["1"][1] : "") +'</text>\n\
              <text class="calc-txt3-2-1" x="75" y="57">'+ (data[i]["content"]["2"][0] ? data[i]["content"]["2"][0] : "") +'</text>\n\
              <text class="calc-txt3-2-2" x="67" y="59">'+ (data[i]["content"]["2"][1] ? data[i]["content"]["2"][1] : "") +'</text>\n\
              <text class="calc-txt3-3-1" x="13" y="62">'+ (data[i]["content"]["3"][0] ? data[i]["content"]["3"][0] : "") +'</text>\n\
              <text class="calc-txt3-3-2" x="16" y="59">'+ (data[i]["content"]["3"][1] ? data[i]["content"]["3"][1] : "") +'</text>\n\
              <text class="calc-txt3-n" x="44" y="43.5">'+ data[i]["name"] +'</text>\n\
            </svg>'+ (objSpace[i] ? objSpace[i] : '');
  }
  calc1.insertAdjacentHTML('afterbegin',svg);
}