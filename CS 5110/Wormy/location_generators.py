import random


class UniformLocationGenerator:
    def __init__(self, top, left, bottom, right):
        self._top = top
        self._left = left
        self._bottom = bottom
        self._right = right

    def do_update(self, elapsed_time):
        pass

    def generate(self):
        return {
            "x": random.randint(self._left, self._right),
            "y": random.randint(self._top, self._bottom)
        }


class QuadrantLocationGenerator:
    def __init__(self, top, left, bottom, right, quadrant_lifetime):
        self._top = top
        self._left = left
        self._bottom = bottom
        self._right = right
        self._quadrant_lifetime = quadrant_lifetime
        self._reset_quadrant()

    def _reset_quadrant(self):
        self._elapsed_time = self._quadrant_lifetime
        self._quadrant = _choose_quadrant()
        self._base_generator = self._initialize_base_generator()

    def do_update(self, elapsed_time):
        self._elapsed_time -= elapsed_time
        if self._elapsed_time <= 0:
            self._reset_quadrant()

    def _initialize_base_generator(self):
        if self._quadrant is Quadrants.TOP_LEFT:
            return self._top_left_generator()
        elif self._quadrant is Quadrants.TOP_RIGHT:
            return self._top_right_generator()
        elif self._quadrant is Quadrants.BOTTOM_LEFT:
            return self._bottom_left_generator()
        elif self._quadrant is Quadrants.BOTTOM_RIGHT:
            return self._bottom_right_generator()

    def _top_left_generator(self):
        return UniformLocationGenerator(
                self._top,
                self._left,
                avg(self._top, self._bottom) - 1,
                avg(self._left, self._right) - 1
            )

    def _top_right_generator(self):
        return UniformLocationGenerator(
                self._top,
                avg(self._left, self._right),
                avg(self._top, self._bottom) - 1,
                self._right
            )

    def _bottom_left_generator(self):
        return UniformLocationGenerator(
                avg(self._top, self._bottom),
                self._left,
                self._bottom,
                avg(self._left, self._right) - 1
            )

    def _bottom_right_generator(self):
        return UniformLocationGenerator(
                avg(self._top, self._bottom),
                avg(self._left, self._right),
                self._bottom,
                self._right
            )

    def generate(self):
        return self._base_generator.generate()


def _choose_quadrant():
    return random.choice([
        Quadrants.TOP_LEFT,
        Quadrants.TOP_RIGHT,
        Quadrants.BOTTOM_LEFT,
        Quadrants.BOTTOM_RIGHT
    ])


def avg(one, two):
    return (one + two) / 2


class Quadrants:  # Python Enum
    def __init__(self):
        pass

    TOP_LEFT = "tl"
    TOP_RIGHT = "tr"
    BOTTOM_LEFT = "bl"
    BOTTOM_RIGHT = "br"
