//Data storing
const instructionType = ['hdg','level','speed','shoot'];
const turnDir = ['left','right'];
const frequencies = [['Bordeaux',122.415],['Bordeaux',118.430],['Bordeaux',135.115],['Brest',134.240],['Paris',132.265],['Madrid',127.830],['Marseille',132.365]];
const possibleTendancy = ['+','=','-'];


//function to get type of instruction
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

//defining the instruction object
function clairanceFactory(hdg,level,speed,nextfreq) {
  return {
    hdg,
    level,
    speed,
    nextfreq,
    fleshOut(){
      if (this.hdg !== 0){
        this.turndir = possibleTendancy[Math.floor(Math.random()*3)]
      }
      if (this.level !== 0) {
        this.vertTendancy = possibleTendancy[Math.floor(Math.random()*3)]
      }
      if (this.speed !== 0) {
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
function transmit(callsign,instructions){ //callsign is a string, instructions an array
  let transmission = callsign + instructions.join(',') + '.'
  console.log(transmission)
};

console.log(instType());
let clr = clairanceFactory(180,340,.75,['Bordeaux',122.415]);
//let clr2 = clairanceFactory(hdg = 180,level =340);
console.log(clr);
clr.fleshOut();
console.log(clr);
//console.log(clr2);
