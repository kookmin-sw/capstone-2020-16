import numpy as np
import os
import sys

from rules import Rules
from game_data import GameData
from execute_code import Execution


class GameManager:
    # ex) {placement_rule : [..., ..., ...]}
    def __init__(self, challenger, oppositer, placement_rule, action_rule, ending_rule, turn, board_size, board_info):
        # self.board = np.zeros((board_size, board_size))
        self.board = board_info

        self.challenger = challenger
        self.opposite = oppositer
        self.check_turn = turn

        self.game_data = GameData(placement_rule, action_rule, ending_rule, board_size, board_info)

        self.rules = Rules()
        self.execution = Execution()

        self.board_record = ''
        self.placement_record = ''

        self.limit_time = 2000

    def play_game(self):
        total_turn = 0
        total_turn_limit = self.game_data.board_size ** 3
        is_ending = False
        match_result = ''
        winner = 0

        self.compile_user_code()    # not finish

        self.board_record += str(self.board) + '\n'

        while not is_ending:
            if total_turn > total_turn_limit:
                print("total_turn over")
                match_result = 'draw'
                return match_result

            self.make_input_data()

            #   user code execute
            user_placement = None
            if self.check_turn == 'challenger':
                try:
                    user_placement = self.execution.execute_program(self.challenger.play(), self.challenger.save_path)
                    print(type(user_placement))
                except Exception as e:
                    print(e)
            elif self.check_turn == 'oppositer':
                user_placement = self.execution.execute_program(self.opposite.play(), self.opposite.save_path)
            # print('user placement :', user_placement)
            check_placement, new_board = self.rules.check_placement_rule(self.game_data, self.board, user_placement)
            try:
                if check_placement == 'OK':
                    self.board = new_board
                    apply_action, new_board = self.rules.apply_action_rule(self.game_data, self.board, user_placement)

                    try:
                        if apply_action == 'OK':
                            self.board = new_board
                            self.add_data(new_board, user_placement)
                            is_ending, winner = self.rules.check_ending(self.game_data, self.board, user_placement)

                    except Exception as e:
                        print('check action error :', e)

            except Exception as e:
                print('check placement error :', e)

            if is_ending == 'OK':
                if winner == 'challenger':
                    match_result = 'WIN'
                else:
                    match_result = 'LOSE'

            #   change player
            self.board *= -1
            self.check_turn = 'challenger' if self.check_turn == 'oppositer' else 'oppositer'

        return match_result, self.board_record, self.placement_record

    def compile_user_code(self):
        pass

    def add_data(self, board, placement):
        self.board_record += str(board).strip() + '\n'
        self.placement_record += str(placement).strip() + '\n'

    def make_input_data(self):
        board = str(self.board).strip() + '\n'
        with open(os.path.join(self.challenger.save_path, 'input.txt'), 'w') as f:
            f.write(board)
