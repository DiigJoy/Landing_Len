window.CMS_MANUAL_INIT = true;

window.onload = () => {
  const auth = new netlifyCmsLibAuth.Auth0Auth({
    domain: "publilen.auth0.com", // tu tenant
    clientId: "TU_CLIENT_ID_DE_AUTH0", // de Auth0
    audience: "",
    scope: "openid profile email",
  });

  netlifyCmsLibAuth.registerOAuthProvider(auth);
  window.CMS.init();
};
