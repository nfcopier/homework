import random
import sys


class InfiniteLifetimeGenerator:
    def __init__(self):
        self._lifetime = sys.maxint

    def generate(self):
        return self._lifetime


class ShortLifetimeGenerator:
    def __init__(self):
        self._lifetime = 5000  # milliseconds

    def generate(self):
        return self._lifetime


class VariableLifetimeGenerator:
    def __init__(self):
        self._min_lifetime = 1000  # milliseconds
        self._max_lifetime = 60 * 1000  # milliseconds

    def generate(self):
        return random.randrange(self._min_lifetime, self._max_lifetime)


class ComboLifetimeGenerator:
    def __init__(self, base_generator):
        self._base_generator = base_generator

    def set_generator(self, base_generator):
        self._base_generator = base_generator

    def generate(self):
        self._base_generator.generate()
