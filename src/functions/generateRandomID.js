const input = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0".split(
  ","
);

const regex = /,/gi;

function generateRandomID(IDLength) {
  let randomID = [];

  for (let i = 0; i < IDLength; i++) {
    randomID.push(input[Math.floor(Math.random() * input.length)]);
  }

  return randomID.toString().replace(regex, "");
}

export default generateRandomID;
