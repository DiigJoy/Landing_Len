window.CMS_MANUAL_INIT = true;

window.onload = () => {
  const auth = new netlifyCmsLibAuth.Auth0Auth({
    domain: "dev-rku8lich5s07mw0k.us.auth0.com", // tu tenant
    clientId: "HTrrSxd6v331amvSUVcGb4n2xetDGjxo", // de Auth0
    audience: "",
    scope: "openid profile email",
  });

  netlifyCmsLibAuth.registerOAuthProvider(auth);
  window.CMS.init();
};
