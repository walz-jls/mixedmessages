//Data storing
const instructionType = ['hdg','level','speed','shoot'];
const turnDir = ['left','right'];
const frequencies = [['Bordeaux',122.415],['Bordeaux',118.430],['Bordeaux',135.115],['Brest',134.240],['Paris',132.265],['Madrid',127.830],['Marseille',132.365],['Bordeaux',132.990]];
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
  let pointdec = Math.floor(Math.random()*2+6) / 10
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
    machNb = randomMach()
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
        this.turndir = possibleTendancy[Math.floor(Math.random()*3)]
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
    }
  }
};

//Instructions templates
function headingTemplate(hdg,direction){
  return `turn ${direction} heading ${hdg}`
};

function climbTemplate(FL,tendancy){
  return `${tendancy} flight level ${FL}`
};

function machTemplate(machNb,tendancy){
  switch (tendancy){
    case '+':
      return `Keep Mach number ${machNb} minimum`;
      break;
    case '-':
      return `Fly Mach number ${machNb} or less`;
      break;
    default :
      return `Keep ${machNb} exactly`;
  }
};

function shootTemplate(frequency){
  return `call ${frequency[0]}, ${frequency[1]}, bye bye`
};

//function to join the instrusctions into a single message
//to be modified into object method
function transmit(callsign,instructions){ //callsign is a string, instructions an array
  let transmission = callsign + instructions.join(',') + '.'
  console.log(transmission)
};

/*
console.log(instType());
let clr = clairanceFactory(180,340,.75,['Bordeaux',122.415]);
//let clr2 = clairanceFactory(hdg = 180,level =340);
console.log(clr);
clr.fleshOut();
console.log(clr);
//console.log(clr2);
console.log(randomFL());
console.log(randomHDG());
console.log(randomMach());
console.log(ranndomNextSector());
*/
const type = instType();
const clairance = randomClairance(type);
console.log(clairance);
