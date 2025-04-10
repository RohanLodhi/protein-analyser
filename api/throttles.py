from rest_framework.throttling import SimpleRateThrottle

class IPBasedThrottle(SimpleRateThrottle):
    scope = 'anon'

    def get_cache_key(self, request, view):
        # Use the user's IP address as the cache key
        return self.get_ident(request)