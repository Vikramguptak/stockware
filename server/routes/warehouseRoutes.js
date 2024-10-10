// ... (previous imports)

router.get('/vendor/analytics', protect, restrictTo('vendor'), getVendorAnalytics);

// ... (rest of the routes)

export default router;