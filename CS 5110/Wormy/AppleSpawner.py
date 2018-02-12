class AppleSpawner:
    def __init__(self, location_generator, lifetime_generator):
        self._apple_list = [self._spawn_apple()]
        self._apples_missed = 0
        self._location_generator = location_generator
        self._lifetime_generator = lifetime_generator

    def do_update(self, time_elapsed):
        self._update_apple_lifetimes(time_elapsed)
        self._respawn_expired_apples()

    def get_missed_apples(self):
        apples_missed = self._apples_missed
        self._apples_missed = 0
        return apples_missed

    def eat_apple(self, location):
        for index, apple in enumerate(self._apple_list):
            if location is not apple["location"]:
                continue
            self._apple_list[index] = self._spawn_apple()
            return True
        return False

    def _spawn_apple(self):
        return {
            "location": self._location_generator.generate(),
            "time_remaining": self._lifetime_generator.generate()
        }

    def _update_apple_lifetimes(self, time_elapsed):
        for apple in self._apple_list:
            apple["time_remaining"] -= time_elapsed

    def _respawn_expired_apples(self):
        for index, apple in enumerate(self._apple_list):
            if apple["time_remaining"] <= 0:
                self._apple_list[index] = self._spawn_apple()
                self._apples_missed += 1
