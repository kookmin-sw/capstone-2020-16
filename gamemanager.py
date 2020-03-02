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
        self.first_turn = turn
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
            output = None
            try:
                if self.check_turn == 'challenger':
                    output = self.execution.execute_program(self.challenger.play(), self.challenger.save_path)
                elif self.check_turn == 'oppositer':
                    output = self.execution.execute_program(self.opposite.play(), self.opposite.save_path)
            except Exception as e:
                print(f'program error in execute user program : {e}')
            # print('user placement :', user_placement)
            user_placement = self.parsing_user_output(output)

            check_placement = ''
            new_board = ''
            try:
                check_placement, new_board = self.rules.check_placement_rule(self.game_data, self.board, user_placement)
                print('cheee', check_placement)
            except Exception as e:
                print(f'check placement program error : {e}')

                if check_placement == 'OK':
                    self.board = new_board
                    apply_action = ''
                    try:
                        apply_action, new_board = self.rules.apply_action_rule(self.game_data, self.board, user_placement)
                    except Exception as e:
                        print(f'apply action program error : {e}')

                    if apply_action == 'OK':
                        self.board = new_board
                        try:
                            is_ending, winner = self.rules.check_ending(self.game_data, self.board, user_placement)
                        except Exception as e:
                            print(f'check ending program error : {e}')
                    else:
                        print(f'apply action error {apply_action}')
                else:
                    print(f'check placement error {check_placement}')

            if is_ending is True:
                if winner == 'challenger':
                    match_result = 'WIN'
                else:
                    match_result = 'LOSE'
                break

            #   change player

            self.change_turn(output)

        return match_result, self.board_record, self.placement_record

    def compile_user_code(self):
        pass

    def add_data(self, board, output):
        self.placement_record += str(output).strip() + '\n'

        for line in board:
            for i in line:
                self.board_record += (str(i) + ' ')

        self.board_record += '\n'

    def make_input_data(self):
        board = str(self.board).strip() + '\n'
        with open(os.path.join(self.challenger.save_path, 'input.txt'), 'w') as f:
            f.write(board)

    def change_turn(self, output):
        if self.first_turn == self.check_turn:
            self.add_data(self.board, output)
            self.board *= -1

        else:
            self.board *= -1
            self.add_data(self.board, output)

        self.check_turn = 'challenger' if self.check_turn == 'oppositer' else 'oppositer'

    def parsing_user_output(self, output):
        placement = []
        if '>' in output:
            pass

        else:
            placement = [int(i) for i in output.split()]

        return placement
