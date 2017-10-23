auth = [];

function serve(ws, req){
  // TODO: issue AuthNo
}

function allowed(query, authNo){
  let authDetails = auth[authNo];
  return authDetails.realm &&
         authDetails.realm === query.realm &&
         authDetails.action &&
         authDetails.action === query.action &&
         authDetails.id &&
         authDetails.id === query.id;
}
