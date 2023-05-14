module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
  },
  productionBrowserSourceMaps: true,
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/404': { page: '/404' },
      '/landing': { page: '/landing' },
      '/login': { page: '/login' },
      '/staff': { page: '/staff' },
      '/staff/update': { page: '/staff/update' },
      '/products': { page: '/products' },
      '/products/update': { page: '/products/update' },
      '/terms': { page: '/terms' },
      '/terms/update': { page: '/terms/update' },
      '/schedules': { page: '/schedules' },
      '/schedules/update': { page: '/schedules/update' },
      '/schedules/calendar': { page: '/schedules/calendar' },
      '/config': { page: '/config' },
    };
  },
};
