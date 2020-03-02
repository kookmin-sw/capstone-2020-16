import numpy as np


class EndingRule:
    def __init__(self):
        self.ending_message = ''

    def check_ending(self, game_data, board, placement):
        if 'omog' in game_data['ending']:
            self.check_ending_omog(game_data, board, placement)

        if self.ending_message is True:
            return True

    def check_ending_omog(self, game_data, board, placement):
        direction = np.array([[1, 0], [-1, 0], [1, 1], [-1, -1], [0, 1], [0, -1], [-1, 1], [1, -1]])
        value = board[placement[0], placement[1]]
        new_value = value
        x = placement[1] - 1
        y = placement[0] - 1

        direction_count = [1, 1, 1, 1]

        for i in range(4):
            while (0 < x < game_data.board_size) and (0 < y < game_data.board_size) and (new_value == value):
                x += direction[i*2][1]
                y += direction[i*2][0]
                if x == 5 or y == 5:
                    break
                new_value = board[x][y]
                direction_count[i] += 1
                if direction_count[i] == 5:
                    self.ending_message = 'OK'
                    return self.ending_message, value

            while (0 < x < game_data.board_size) and (0 < y < game_data.board_size) and (new_value == value):
                x += direction[(i*2)+1][1]
                y += direction[(i*2)+1][0]
                if x == 5 or y == 5:
                    break
                new_value = board[x][y]
                direction_count[i] += 1
                if direction_count[i] == 5:
                    self.ending_message = 'OK'
                    return self.ending_message, value

        return False, 0
