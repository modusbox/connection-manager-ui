const getConfig = async () => {
  const { REACT_APP_API_BASE_URL } = process.env;
  const { protocol, host } = window.location;

  // Using the same protocol as we've been loaded from to avoid Mixed Content error.
  let apiBaseUrl = REACT_APP_API_BASE_URL ? REACT_APP_API_BASE_URL : `${protocol}//localhost:3001`;
  let isAuthEnabled = true;
  const infos = [`fetching ${protocol}//${host}/config`];

  try {
    const response = await fetch(`${protocol}//${host}/config`);
    const { AUTH_ENABLED, API_BASE_URL } = await response.json();

    isAuthEnabled = AUTH_ENABLED ? AUTH_ENABLED !== 'FALSE' : isAuthEnabled;
    apiBaseUrl = API_BASE_URL ? API_BASE_URL : apiBaseUrl;

    infos.push({ AUTH_ENABLED, API_BASE_URL });
    infos.push(`- after processing config, apiBaseUrl: ${apiBaseUrl}`);
  } catch (err) {
    infos.push('returned error:');
    infos.push(err);
    infos.push(`- calling boot() without loading config.`);
  }

  console.info(...infos);

  return { apiBaseUrl, isAuthEnabled };
};

export default getConfig;
