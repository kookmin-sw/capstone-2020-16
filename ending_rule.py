import numpy as np

class EndingRule:
    def __init__(self):
        self.message

    def check_ending(self, game_data, board, placement):
        if 'omog' in game_data['ending']:
            self.check_ending_omog(game_data, board)

    def check_ending_omog(self, game_data, board, placement):
        direction = np.array([[1, 0], [-1, 0], [1, 1], [-1, -1], [0, 1], [0, -1], [-1, 1], [1, -1]])
        pos = np.array(placement)
        value = board[placement[0], placement[1]]
        x = (pos - direction[0])[0]
        for i in range(4):
            a = (board[(pos - direction[i])[0]][(pos - direction[i])[1]])
            while (board[(pos - direction[i])[0]][(pos - direction[i])[1]]) == value:
