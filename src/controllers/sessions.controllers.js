import envUtil from "../utils/env.util.js";

function register(req, res, next) {
  const { _id } = req.user;
  const message = "User Registered!";
  return res.json201(_id, message);
}
function login(req, res, next) {
  const { token } = req.user;
  const opts = { 
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
    sameSite: "none",
    secure: true,
    domain: envUtil.COOKIES_DOMAIN,
  };
  const message = "User logged in!";
  const response = "OK";
  return res.cookie("token", token, opts).json200({response, message, role: req.user.role, first_name: req.user.first_name})
}
function signout(req, res, next) {
  const message = "User signed out!";
  const response = "OK";
  console.log("SIGNOUT ",res.cookie);
  return res.clearCookie("token", {
    httpOnly: true
  }).json200(response, message);
}
function google(req, res, next) {
  //const { token } = req.user;
  //const opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: true };
  const message = "Google User logged in!";
  const response = "OK";
  return res.json200(response, message);
  //return res.cookie("token", token, opts).json200(response, message);
  //return res.status(200).json({ message: "GOOGLE USER LOGGED IN", token: req.token });
}
async function online(req, res, next) {
  return res.status(200).json({
    message: req.user.email.toUpperCase() + " IS ONLINE",
    online: true,
    role: req.user.role,
    first_name: req.user.first_name,
  });
}
async function updatePassword(req, res, next) {
  console.log("UPDATE PASSWORD ",req.body)
  const { _id } = req.user;
  const message = "Password Updated!";
  return res.json201(_id, message);
}


// async function verify(req, res, next) {
//   const { email, verifyCode } = req.body
//     const response = await verifyUserService(email, verifyCode)
//     if (response) {
//         const message = "User verified"
//         return res.json200("OK", message)
//     } else {
//         return res.json401()
//     }
// }
async function resetPassword(req, res, next) {
  const { _id } = req.user;
  const message = "Password Reseted!";
  return res.json201(_id, message);

}

export { register, login, signout, updatePassword, google, online, resetPassword }