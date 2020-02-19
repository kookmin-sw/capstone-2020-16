import numpy as np
import os

from rules import Rules
from game_data import GameData


class GameManager:
    # ex) {placment_rule : [..., ..., ...]}
    def __init__(self, challenger, oppositer, placement_rule, action_rule, ending_rule, board_size, board_info):
        self.board = np.zeros((board_size, board_size))
        
        self.challenger = challenger
        self.opposite = oppositer

        self.game_data = GameData(placement_rule, action_rule, ending_rule, board_size, board_info)

        self.rules = Rules()

        self.limit_time = 2000

    def play_game(self):
        user_turn = 0    # 0 : first player turn, 1 : later player turn
        total_turn = 0
        total_turn_limit = self.game_data.board_size ** 3
        is_ending = False
        result = ''

        self.compile_user_code()    # not finish

        #   write initial board
        match_record_path = os.path.join(os.getcwd(), 'record')
        os.mkdir(match_record_path)
        with open(os.path.join(match_record_path, 'record.txt'), 'w') as f:
            f.write(self.board)

        while not is_ending:
            if total_turn > total_turn_limit:
                print("total_turn over")
                result = 'draw'
                return result

            check_placement, new_board = self.rules.check_placment_rule(self.game_data, self.board)
            if check_placement:
                self.board = new_board
                check_action = self.rules.ch
                pass    # doing action

        return result

    def compile_user_code(self):
        pass
