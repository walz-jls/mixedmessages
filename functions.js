//Data storing
const instructionType = ['hdg','level','speed','shoot'];
const turnDir = [left,right];
const frequencies = [122.415,118.430,124.830,128.765,135.115];


//function to get type of instruction


//message template
function headingTemplate(hdg,direction){
  return `turn ${direction} heading ${hdg}`
};

function climbTemplate(FL,tendancy){
  return `${tendancy} flight level ${FL}`
};
