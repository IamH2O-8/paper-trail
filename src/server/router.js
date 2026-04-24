function createRouter(routes) {
  return {
    async match(req) {
      const url = new URL(req.url, "http://localhost");
      const pathname = url.pathname;

      for (const route of routes) {
        if (route.method !== req.method) {
          continue;
        }

        const params = matchPath(route.path, pathname);
        if (params) {
          return {
            route,
            handler: route.handler,
            params
          };
        }
      }

      return null;
    }
  };
}

function matchPath(routePath, requestPath) {
  const routeParts = routePath.split("/").filter(Boolean);
  const requestParts = requestPath.split("/").filter(Boolean);

  if (routeParts.length !== requestParts.length) {
    return null;
  }

  const params = {};

  for (let index = 0; index < routeParts.length; index += 1) {
    const routePart = routeParts[index];
    const requestPart = requestParts[index];

    if (routePart.startsWith(":")) {
      params[routePart.slice(1)] = decodeURIComponent(requestPart);
      continue;
    }

    if (routePart !== requestPart) {
      return null;
    }
  }

  return params;
}

module.exports = { createRouter };
