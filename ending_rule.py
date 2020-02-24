import numpy as np


class EndingRule:
    def __init__(self):
        self.message = ''

    def check_ending(self, game_data, board, placement):
        if 'omog' in game_data['ending']:
            self.check_ending_omog(game_data, board, placement)

    def check_ending_omog(self, game_data, board, placement):
        direction = np.array([[1, 0], [-1, 0], [1, 1], [-1, -1], [0, 1], [0, -1], [-1, 1], [1, -1]])    # ㅡ, \, ㅣ, /
        pos = np.array(placement)
        value = board[placement[0], placement[1]]
        new_value = value
        x = placement[0]
        y = placement[1]

        direction_count = [0, 0, 0, 0]  # ㅡ, \, ㅣ, /

        for i in range(4):
            while (0 < x < game_data.board_size) and (0 < y < game_data.board_size) and (new_value == value):
                x = x + direction[i*2][0]
                y = y + direction[i*2][1]
                new_value = board[x][y]
                direction_count[i] += 1
                if direction_count[i] == 5:
                    self.message = True
                    return self.message, value

            while (0 < x < game_data.board_size) and (0 < y < game_data.board_size) and (new_value == value):
                x = x + direction[(i*2)+1][0]
                y = y + direction[(i*2)+1][1]
                new_value = board[x][y]
                direction_count[i] += 1
                if direction_count[i] == 5:
                    self.message = True
                    return self.message, value

        return False, 0
