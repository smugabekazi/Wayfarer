// class Validate {
//   static string(input) {
//     if (input.match(/[a-z]{2}/i) && !input.match(/[!$%*|}{:><?~`_&#^=]/)) {
//       return true;
//     }
//     return false;
//   }
//   static number(input) {
//     if (input.match(/[0-9+]{2}/i) && !input.match(/[!$%*|}{:><?~`_&#^=]/)) {
//       return true;
//     }
//     return false;
//   }
//   static email(input) {
//     if (input.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
//       return true;
//     }
//     return false;
//   }
//   static password(input) {
//     if (input.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/g)) {
//       return true;
//     }
//     return false;
//   }
// }
// // export default Validate;*