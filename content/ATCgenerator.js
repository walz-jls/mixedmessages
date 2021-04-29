//Data storing
let callsign = 'AFR146K'
const instructionType = ['hdg','level','speed','shoot'];
const frequencies = [['Bordeaux',132.315],['Bordeaux',128.430],['Bordeaux',125.115],['Brest',136.250],['Paris',126.125],['Madrid',125.840],['Marseille',115.365],['Bordeaux',122.590]];
const possibleTendancy = ['+','=','-'];

//generate random parameters(spd,hdg,fl)
function randomFL(){
  let centaines = Math.floor(Math.random()*3+1) * 100
  let dizaines = Math.floor(Math.random()*10) * 10
  let fl = centaines + dizaines
  return fl
};

function randomHDG(){
  let hdg = Math.floor(Math.random()*361)
  return hdg
};

function randomMach(){
  let pointdec = (Math.floor(Math.random()*2)+6) / 10
  let pointmil = Math.floor(Math.random()*10) / 100
  let machNb = pointdec + pointmil
  return machNb
}

function ranndomNextSector(){
  let sectorArr = frequencies[Math.floor(Math.random()*frequencies.length)]
  return sectorArr
};

//function to get rd type of instruction
function instType(){
  let nombreClairance = Math.floor(Math.random()*3 + 1)
  let types = Array.from(instructionType)
  let finaltype = []
  do {
    let i = Math.floor(Math.random()*types.length)
    finaltype.push(types[i])
    types.splice(i,1)
    nombreClairance -= 1
  } while (nombreClairance > 0)
  return finaltype
};

//function to convert instType to clairance object
function randomClairance(typeArray){
  let hdg
  let level
  let speed
  let sector
  if (typeArray.indexOf('hdg') !== -1) {
    hdg = randomHDG()
  }
  if (typeArray.indexOf('level') !== -1) {
    level = randomFL()
  }
  if (typeArray.indexOf('speed') !== -1) {
    speed = randomMach()
  }
  if (typeArray.indexOf('shoot') !== -1) {
    sector = ranndomNextSector()
  }
  let clairance = clairanceFactory(hdg,level,speed,sector)
  return clairance
};

//defining the instruction object
function clairanceFactory(hdg,level,speed,nextfreq) {
  return {
    hdg,
    level,
    speed,
    nextfreq,
    fleshOut(){
      if (this.hdg !== undefined){
        this.turnDir = possibleTendancy[Math.floor(Math.random()*3)]
      }
      if (this.level !== undefined) {
        this.vertTendancy = possibleTendancy[Math.floor(Math.random()*3)]
      }
      if (this.speed !== undefined) {
        this.speedTendancy = possibleTendancy[Math.floor(Math.random()*3)]
      }
      if (this.nextFreq === true) {
        this.speedTendancy = frequencies[Math.floor(Math.random()*frequencies.length)]
      }
    },
    hdgMessage(){
      if (this.hdg !== undefined){
        switch (this.turnDir){
          case '+':
            return `, Turn right heading ${this.hdg}`
            break;
          case '-':
            return `, Turn left heading ${this.hdg}`
            break;
          default:
            return ', Continue present heading'
        }
      } else return ''
    },
    levelchangeMessage(){
      if (this.level !== undefined){
        switch(this.vertTendancy){
          case '+':
            return `, Climb flight level ${this.level}`
            break;
          case '-':
            return  `, Descend flight level ${this.level}`
            break;
          case '=':
            return `, Maintain flight level ${this.level}`
        }
      } else return ''
    },
    speedChangeMessage(){
      if (this.speed !== undefined){
        switch (this.speedTendancy){
          case '+':
            return `, Keep Mach number ${this.speed} minimum`;
            break;
          case '-':
            return `, Fly Mach number ${this.speed} or less`;
            break;
          case '=':
            return `, Keep ${this.speed} exactly`;
        }
      } else return ''
    },
    frequencyChangeMessage(){
      if (this.nextfreq !== undefined) {
        return `, Call ${nextfreq[0]}, ${nextfreq[1]}, bye bye`
      } else return ''
    },
    transmit(callsign){
      return (`${callsign}${this.hdgMessage()}${this.levelchangeMessage()}${this. speedChangeMessage()}${this.frequencyChangeMessage()}.`)
    }
  }
};

//execution
function speakMessage(aircraft){
  const msgComponents = instType()
  const msg = randomClairance(msgComponents)
  msg.fleshOut()
  return msg.transmit(aircraft)
};

//speakMessage(callsign);

//html integration

const button = document.querySelector('button');
button.onclick = function () {
  let resultdiv = document.querySelector('.message-container')
  resultdiv.innerHTML = speakMessage(callsign)
};
