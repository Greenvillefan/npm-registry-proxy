export default {
  fetch: ({ url, method, headers }: Request, { NPM_REGISTRY, PROXY_AUTHORIZATION_SECRET }: Env) => {
    const originUrl = new URL(url);
    if (method === "GET") {
      if (PROXY_AUTHORIZATION_SECRET && headers.get("Proxy-Authorization") !== PROXY_AUTHORIZATION_SECRET) {
        return new Response("Unauthorized", { status: 401 });
      }
      return fetch(
        new URL(originUrl.pathname + originUrl.search, NPM_REGISTRY || "https://registry.npmjs.org"),
        { headers },
      );
    }
    // currenlty only GET method is supported
    return new Response("Method not allowed", { status: 405 });
  },
};
