import numpy as np


class ActionRule:
    def __init__(self):
        self.action_message = 'OK'

    def apply_action_rule(self, game_data, board, placement):
        new_board = board
        print(f'apply {self.action_message, new_board}')
        return self.action_message, new_board
