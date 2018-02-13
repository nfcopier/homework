# Wormy (a Nibbles clone)
# By Al Sweigart al@inventwithpython.com
# http://inventwithpython.com/pygame
# Released under a "Simplified BSD" license

import random, pygame, sys
from pygame.locals import *

from apple_spawner import AppleSpawner
from lifetime_generators import ShortLifetimeGenerator
from location_generators import UniformLocationGenerator

GAME_TITLE = "Golden Apple"
FPS = 5
WINDOWWIDTH = 640
WINDOWHEIGHT = 480
CELLSIZE = 10
assert WINDOWWIDTH % CELLSIZE == 0, "Window width must be a multiple of cell size."
assert WINDOWHEIGHT % CELLSIZE == 0, "Window height must be a multiple of cell size."
CELLWIDTH = int(WINDOWWIDTH / CELLSIZE)
CELLHEIGHT = int(WINDOWHEIGHT / CELLSIZE)
GOLDEN_APPLE_CHANCE = 25  # percent

#             R    G    B
WHITE     = (255, 255, 255)
BLACK     = (  0,   0,   0)
RED       = (255,   0,   0)
GREEN     = (  0, 255,   0)
YELLOW    = (255, 255,   0)
DARKGREEN = (  0, 155,   0)
DARKGRAY  = ( 40,  40,  40)
BGCOLOR = BLACK

UP = 'up'
DOWN = 'down'
LEFT = 'left'
RIGHT = 'right'

HEAD = 0 # syntactic sugar: index of the worm's head


def main():
    global FPSCLOCK, DISPLAYSURF, BASICFONT

    pygame.init()
    FPSCLOCK = pygame.time.Clock()
    DISPLAYSURF = pygame.display.set_mode((WINDOWWIDTH, WINDOWHEIGHT))
    BASICFONT = pygame.font.Font('freesansbold.ttf', 18)
    pygame.display.set_caption(GAME_TITLE)

    showStartScreen()
    while True:
        run_game()
        showGameOverScreen()


def get_new_direction_1(direction_1, key):
    if (key == K_a or key == K_KP4) and direction_1 != RIGHT:
        return LEFT
    if (key == K_d or key == K_KP6) and direction_1 != LEFT:
        return RIGHT
    if (key == K_w or key == K_KP8) and direction_1 != DOWN:
        return UP
    if (key == K_s or key == K_KP2) and direction_1 != UP:
        return DOWN
    return direction_1


def get_new_direction_2(direction_2, key):
    if (key == K_LEFT or key == K_KP4) and direction_2 != RIGHT:
        direction_2 = LEFT
    if (key == K_RIGHT or key == K_KP6) and direction_2 != LEFT:
        direction_2 = RIGHT
    if (key == K_UP or key == K_KP8) and direction_2 != DOWN:
        direction_2 = UP
    if (key == K_DOWN or key == K_KP2) and direction_2 != UP:
        direction_2 = DOWN
    return direction_2


def run_game():
    worm_1_coords = get_random_start_coords()
    worm_2_coords = get_random_start_coords()
    direction_1 = RIGHT
    direction_2 = RIGHT
    missed_apples = 0

    location_generator = UniformLocationGenerator(0, 0, CELLHEIGHT, CELLWIDTH)
    lifetime_generator = ShortLifetimeGenerator()
    apple_spawner = AppleSpawner(location_generator, lifetime_generator)
    last_time = pygame.time.get_ticks()

    while True:  # main game loop
        current_time = pygame.time.get_ticks()
        elapsed_time = current_time - last_time
        last_time = current_time
        for event in pygame.event.get():  # event handling loop
            if event.type == QUIT:
                terminate()
            elif event.type == KEYDOWN:
                if event.key == K_ESCAPE:
                    terminate()
                direction_1 = get_new_direction_1(direction_1, event.key)
                direction_2 = get_new_direction_2(direction_2, event.key)

        apple_spawner.do_update(elapsed_time)
        missed_apples += apple_spawner.get_missed_apples()

        if is_game_over(worm_1_coords, worm_2_coords):
            return

        eat_apple(worm_1_coords, apple_spawner)
        eat_apple(worm_2_coords, apple_spawner)

        # move the worm by adding a segment in the direction it is moving
        new_head_1 = get_new_head(direction_1, worm_1_coords[HEAD])
        worm_1_coords.insert(0, new_head_1)
        new_head_2 = get_new_head(direction_2, worm_2_coords[HEAD])
        worm_2_coords.insert(0, new_head_2)
        render_game(apple_spawner, worm_1_coords, worm_2_coords, missed_apples)


def eat_apple(worm_1_coords, apple_spawner):
    apple_is_eaten = apple_spawner.eat_apple(worm_1_coords[HEAD])
    if not apple_is_eaten:
        remove_tail_from(worm_1_coords)


def render_game(apple_spawner, worm_0_coords, worm_1_coords, missed_apples):
    DISPLAYSURF.fill(BGCOLOR)
    draw_grid()
    draw_worm(worm_0_coords, is_worm_1=True)
    draw_worm(worm_1_coords, is_worm_1=False)
    for apple in apple_spawner.get_apples():
        draw_apple_at(apple["location"])
    score = score_game(missed_apples, worm_0_coords, worm_1_coords)
    draw_score(score)
    pygame.display.update()
    FPSCLOCK.tick(FPS)


def score_game(missed_apples, worm_0_coords, worm_1_coords):
    score = len(worm_0_coords) + len(worm_1_coords) - 6 - missed_apples
    if score <= 0:
        return 0
    return score


def is_game_over(worm_1_coords, worm_2_coords):
    return (
            has_hit_edge(worm_1_coords[HEAD]) or
            has_hit_edge(worm_2_coords[HEAD]) or
            has_intersected_self(worm_1_coords) or
            has_intersected_self(worm_2_coords) or
            has_intersected_other(worm_1_coords, worm_2_coords) or
            has_intersected_other(worm_2_coords, worm_1_coords)
    )


def has_intersected_other(worm_1_coords, worm_2_coords):
    head = worm_1_coords[HEAD]
    return head_intersects_body(head, worm_2_coords)


def has_intersected_self(worm_coords):
    body_segments = worm_coords[1:]
    head = worm_coords[HEAD]
    return head_intersects_body(head, body_segments)


def head_intersects_body(head, body_segments):
    for body_segment in body_segments:
        if are_intersecting(head, body_segment):
            return True
    return False


def are_intersecting(segment_1, segment_2):
    return segment_1['x'] == segment_2['x'] and segment_1['y'] == segment_2['y']


def remove_tail_from(worm_1_coords):
    del worm_1_coords[-1]  # remove worm's tail segment


def get_new_head(direction, head):
    if direction == UP:
        return {'x': head['x'], 'y': head['y'] - 1}
    elif direction == DOWN:
        return {'x': head['x'], 'y': head['y'] + 1}
    elif direction == LEFT:
        return {'x': head['x'] - 1, 'y': head['y']}
    elif direction == RIGHT:
        return {'x': head['x'] + 1, 'y': head['y']}
    return None


def has_hit_edge(head):
    return head['x'] == -1 or head['x'] == CELLWIDTH or head['y'] == -1 or head['y'] == CELLHEIGHT


def get_random_start_coords():
    start_x = random.randint(5, CELLWIDTH - 6)
    start_y = random.randint(5, CELLHEIGHT - 6)
    start_coords = [{'x': start_x, 'y': start_y}, {'x': start_x - 1, 'y': start_y}, {'x': start_x - 2, 'y': start_y}]
    return start_coords


def drawPressKeyMsg():
    pressKeySurf = BASICFONT.render('Press a key to play.', True, DARKGRAY)
    pressKeyRect = pressKeySurf.get_rect()
    pressKeyRect.topleft = (WINDOWWIDTH - 200, WINDOWHEIGHT - 30)
    DISPLAYSURF.blit(pressKeySurf, pressKeyRect)


def checkForKeyPress():
    if len(pygame.event.get(QUIT)) > 0:
        terminate()

    keyUpEvents = pygame.event.get(KEYUP)
    if len(keyUpEvents) == 0:
        return None
    if keyUpEvents[0].key == K_ESCAPE:
        terminate()
    return keyUpEvents[0].key


def showStartScreen():
    titleFont = pygame.font.Font('freesansbold.ttf', 100)
    titleSurf1 = titleFont.render(GAME_TITLE, True, RED, DARKGREEN)
    titleSurf2 = titleFont.render(GAME_TITLE, True, YELLOW)

    degrees1 = 0
    degrees2 = 0
    while True:
        DISPLAYSURF.fill(BGCOLOR)
        rotatedSurf1 = pygame.transform.rotate(titleSurf1, degrees1)
        rotatedRect1 = rotatedSurf1.get_rect()
        rotatedRect1.center = (WINDOWWIDTH / 2, WINDOWHEIGHT / 2)
        DISPLAYSURF.blit(rotatedSurf1, rotatedRect1)

        rotatedSurf2 = pygame.transform.rotate(titleSurf2, degrees2)
        rotatedRect2 = rotatedSurf2.get_rect()
        rotatedRect2.center = (WINDOWWIDTH / 2, WINDOWHEIGHT / 2)
        DISPLAYSURF.blit(rotatedSurf2, rotatedRect2)

        drawPressKeyMsg()

        if checkForKeyPress():
            pygame.event.get() # clear event queue
            return
        pygame.display.update()
        FPSCLOCK.tick(FPS)
        degrees1 += 3  # rotate by 3 degrees each frame
        degrees2 += 7  # rotate by 7 degrees each frame


def terminate():
    pygame.quit()
    sys.exit()


def showGameOverScreen():
    gameOverFont = pygame.font.Font('freesansbold.ttf', 150)
    gameSurf = gameOverFont.render('Game', True, WHITE)
    overSurf = gameOverFont.render('Over', True, WHITE)
    gameRect = gameSurf.get_rect()
    overRect = overSurf.get_rect()
    gameRect.midtop = (WINDOWWIDTH / 2, 10)
    overRect.midtop = (WINDOWWIDTH / 2, gameRect.height + 10 + 25)

    DISPLAYSURF.blit(gameSurf, gameRect)
    DISPLAYSURF.blit(overSurf, overRect)
    drawPressKeyMsg()
    pygame.display.update()
    pygame.time.wait(500)
    checkForKeyPress()  # clear out any key presses in the event queue

    while True:
        if checkForKeyPress():
            pygame.event.get()  # clear event queue
            return


def draw_score(score):
    score_color = GREEN
    score_background = DARKGREEN
    y_coord = 10
    score_surf = BASICFONT.render('Score: %s' % score, True, score_color, score_background)
    score_rect = score_surf.get_rect()
    score_rect.topleft = (WINDOWWIDTH - 120, y_coord)
    DISPLAYSURF.blit(score_surf, score_rect)


def draw_worm(worm_coords, is_worm_1):
    for coord in worm_coords:
        x = coord['x'] * CELLSIZE
        y = coord['y'] * CELLSIZE
        worm_color_1 = DARKGREEN if is_worm_1 else YELLOW
        worm_color_2 = GREEN if is_worm_1 else RED
        worm_segment_rect = pygame.Rect(x, y, CELLSIZE, CELLSIZE)
        pygame.draw.rect(DISPLAYSURF, worm_color_1, worm_segment_rect)
        worm_inner_segment_rect = pygame.Rect(x + 4, y + 4, CELLSIZE - 8, CELLSIZE - 8)
        pygame.draw.rect(DISPLAYSURF, worm_color_2, worm_inner_segment_rect)


def draw_apple_at(location):
    x = location['x'] * CELLSIZE
    y = location['y'] * CELLSIZE
    apple_rect = pygame.Rect(x, y, CELLSIZE, CELLSIZE)
    pygame.draw.rect(DISPLAYSURF, RED, apple_rect)


def draw_grid():
    for x in range(0, WINDOWWIDTH, CELLSIZE):  # draw vertical lines
        pygame.draw.line(DISPLAYSURF, DARKGRAY, (x, 0), (x, WINDOWHEIGHT))
    for y in range(0, WINDOWHEIGHT, CELLSIZE):  # draw horizontal lines
        pygame.draw.line(DISPLAYSURF, DARKGRAY, (0, y), (WINDOWWIDTH, y))


if __name__ == '__main__':
    main()
