import numpy as np

from rules import Rules
from game_data import GameData


class GameManager:
    # ex) {placment_rule : [..., ..., ...]}
    def __init__(self, challenger, opposite, placement_rule, action_rule, ending_rule, board_size, board_info):
        self.board = np.zeros((board_size, board_size))
        
        self.challenger = challenger
        self.opposite = opposite

        self.game_data = GameData(placement_rule, action_rule, ending_rule, board_size, board_info)

        self.rules = Rules()

        self.limit_time = 2000

    def play_game(self):
        user_turn = 0    # 0 : first player turn, 1 : later player turn
        total_turn = 0
        total_turn_limit = self.game_data.board_size ** 3
        is_ending = False
        result = False

        self.compile_user_code()

        while not is_ending:
            if total_turn > total_turn_limit:
                print("total_turn over")
                break

            if self.rules.check_placment_rule(self.game_data.placement_rule):
                pass    # doing action

        return result

    def compile_user_code(self):
        pass
