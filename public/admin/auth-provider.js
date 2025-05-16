window.CMS_MANUAL_INIT = true;

window.addEventListener('DOMContentLoaded', () => {
  const auth = new netlifyCmsLibAuth.Auth0Auth({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    audience: "",
    scope: "openid profile email",
  });

  netlifyCmsLibAuth.registerOAuthProvider(auth);
  window.CMS.init();
});