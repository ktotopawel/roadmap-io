const ServerRoutes = {
  api: '/api',
  goals: '/goals',
  roadmaps: '/roadmaps',
  users: {
    base: '/users',
    me: '/me',
    email: '/email',
  },
  auth: {
    base: '/auth',
    magicLink: '/magic-link',
    consumeToken: '/consume-token',
  },
};

export default ServerRoutes;
