const ServerRoutes = {
  api: '/api',
  goals: { base: '/goals' },
  roadmaps: { base: '/roadmaps', list: '/list', byId: '/:id' },
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
