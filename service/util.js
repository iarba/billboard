function sanitize(data){
  return {
    id: data.id, 
    request: data.request, 
    reward: data.reward, 
    contact: data.contact
  };
}

function withinReason(trial){
  if(trial){
    delete trial.toString; // revert to default toString
    let strTrial = trial.toString();
    if(strTrial.length < 1000)
    {
      return strTrial;
    }
  }
  return false;
}

module.exports.withinReason = withinReason;
module.exports.sanitize = sanitize;
