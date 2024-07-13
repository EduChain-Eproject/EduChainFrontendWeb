// import jwtDecode from 'jsonwebtoken';

// export const getTokenFromLocalStorage = (key:string) => {
//   return localStorage.getItem(key);
// };

//   export const decodeToken = (token:string) => {
//     try {
   
//       return decoded;
//     } catch (error) {
//       console.error('Invalid token:', error);
//       return null;
//     }
//   };

// export const getEmailFromToken = (key) => {
//   const token = getTokenFromLocalStorage(key);
//   if (token) {
//     const decodedToken = decodeToken(token);
//     if (decodedToken && decodedToken.email) {
//       return decodedToken.email;
//     }
//   }
//   return null;
// };

// export default getEmailFromToken;