import random

HEAD = 0  # syntactic sugar: index of the worm's head


class Directions:
    def __init__(self):
        pass
    UP = 'up'
    DOWN = 'down'
    LEFT = 'left'
    RIGHT = 'right'


class CentralController:
    def __init__(self, apple_spawner, cell_width, cell_height):
        self.cell_width = cell_width
        self.cell_height = cell_height
        self._worm_1_coords = self._get_random_start_coords()
        self._worm_2_coords = self._get_random_start_coords()
        self._direction_1 = Directions.RIGHT
        self._direction_2 = Directions.RIGHT
        self._apple_spawner = apple_spawner
        self._missed_apples = 0

    def do_update(self, elapsed_time):
        self._apple_spawner.do_update(elapsed_time)
        self._missed_apples += self._apple_spawner.get_missed_apples()

        eat_apple(self._worm_1_coords, self._apple_spawner)
        eat_apple(self._worm_2_coords, self._apple_spawner)

        # move the worm by adding a segment in the direction it is moving
        new_head_1 = get_new_head(self._direction_1, self._worm_1_coords[HEAD])
        self._worm_1_coords.insert(0, new_head_1)
        new_head_2 = get_new_head(self._direction_2, self._worm_2_coords[HEAD])
        self._worm_2_coords.insert(0, new_head_2)

    def set_directions(self, direction_1, direction_2):
        self._direction_1 = direction_1
        self._direction_2 = direction_2

    def get_directions(self):
        return self._direction_1, self._direction_2

    def _get_random_start_coords(self):
        start_x = random.randint(5, self.cell_width - 6)
        start_y = random.randint(5, self.cell_height - 6)
        start_coords = [
            {'x': start_x, 'y': start_y},
            {'x': start_x - 1, 'y': start_y},
            {'x': start_x - 2, 'y': start_y}
        ]
        return start_coords

    def get_worm_coords(self):
        return self._worm_1_coords, self._worm_2_coords

    def get_missed_apples(self):
        return self._missed_apples


def eat_apple(worm_coords, apple_spawner):
    apple_is_eaten = apple_spawner.eat_apple(worm_coords[HEAD])
    if not apple_is_eaten:
        remove_tail_from(worm_coords)


def remove_tail_from(worm_1_coords):
    del worm_1_coords[-1]  # remove worm's tail segment


def get_new_head(direction, head):
    if direction == Directions.UP:
        return {'x': head['x'], 'y': head['y'] - 1}
    elif direction == Directions.DOWN:
        return {'x': head['x'], 'y': head['y'] + 1}
    elif direction == Directions.LEFT:
        return {'x': head['x'] - 1, 'y': head['y']}
    elif direction == Directions.RIGHT:
        return {'x': head['x'] + 1, 'y': head['y']}
    return None
