auth = [];

function serve(ws, req){
  // TODO: issue AuthNo
}

function allowed(query, authNo){
  let authDetails = auth[authNo];
  return authDetails.realm && // might be super admin
         authDetails.realm === query.realm &&
         authDetails.action && // might be local admin
         authDetails.action === query.action &&
         authDetails.id &&
         authDetails.id === query.id;
}
