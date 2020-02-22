# from tasks import play_game
#
#
# result = play_game()
import numpy as np


direction = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]]
x, y = (2, 3)
placement = (2, 3)
arr2 = np.array(direction)
arr1 = np.array(placement)
board = np.zeros((3,3))
x = arr1 - arr2[0]
print((arr1 - arr2[0])[1])
print(board[x])