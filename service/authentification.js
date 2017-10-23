auth = [];

function serve(ws, req){
  // TODO: issue AuthNo
}

function allowed(query, authNo){
  if(query.action === 1){
    return true; // always allow posting
  }
  let authDetails = auth[authNo];
  if(!authDetails){
    return false;
  }
  return authDetails.admin || 
           authDetails.realm &&
           authDetails.realm === query.realm &&
           authDetails.action &&
           authDetails.action === query.action &&
           authDetails.id &&
           authDetails.id === query.id;
}
