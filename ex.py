import numpy as np


def check_ending_omog(board):
    direction = np.array([[1, 0], [-1, 0], [1, 1], [-1, -1], [0, 1], [0, -1], [-1, 1], [1, -1]])  # ㅡ, \, ㅣ, /
    value = 1
    new_value = value
    pos = (3, 4)
    x = 3
    y = 2
    direction_count = [1, 1, 1, 1]  # ㅡ, \, ㅣ, /
    # print(board[4][4])
    for i in range(4):
        print('1', x, y, new_value)
        while (0 < x < 5) and (0 < y < 5) and (new_value == value):
            print('2')
            x += direction[i * 2][1]
            y += direction[i * 2][0]
            if x == 5 or y == 5:
                break
            # print('2', x, y, new_value)
            new_value = board[x][y]

            direction_count[i] += 1
            if direction_count[i] == 5:
                # self.message = True
                return value, direction_count

        x, y = 3, 2
        while (0 < x < 5) and (0 < y < 5) and (new_value == value):
            print('3')
            x += direction[(i * 2) + 1][1]
            y += direction[(i * 2) + 1][0]
            new_value = board[x][y]
            direction_count[i] += 1
            print(direction_count)
            if direction_count[i] == 5:
                # self.message = True
                print('aaaa')
                return value, direction_count

        return 1, 0

board = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 1, -1, -1, 0], [1, 1, 1, 1, 1], [0, -1, 1, -1, 0]]

value, count = check_ending_omog(board)
print(value, count)
