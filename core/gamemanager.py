import numpy as np
import os
import re
import sys
import time

from rules import Rules
from game_data import GameData
from execute_code import Execution


class GameManager:
    def __init__(self, challenger, oppositer, placement_rule, action_rule, ending_rule, turn, board_size, board_info):
        self.board = np.zeros((board_size, board_size), dtype='i')
        self.board_info = board_info
        self.board_size = board_size
        self.board_record = ''

        # self.board = board_info

        self.challenger = challenger
        self.opposite = oppositer
        self.first_turn = turn
        self.check_turn = turn

        self.game_data = GameData(placement_rule, action_rule, ending_rule, board_size, board_info)
        self.rules = Rules()
        self.execution = Execution()

        self.placement_record = ''

        self.limit_time = 2000

    def play_game(self):
        total_turn = 0
        total_turn_limit = self.game_data.board_size ** 3
        is_ending = False
        match_result = ''
        winner = 0

        self.board_record += str(self.board_info) + '\n'
        self.parsing_board_info(self.board_info, self.board_size)
        self.compile_user_code()    # not finish

        while not is_ending:
            if total_turn > total_turn_limit:
                print("total_turn over")
                match_result = 'draw'
                return match_result

            self.make_board_data()
            print(self.board)
            #   user code execute
            output = None

            try:
                if os.path.isfile("placement.txt"):
                    os.remove("placement.txt")
                    # print('delete placement.txt')
                if self.check_turn == 'challenger':
                    print('cc')
                    output = self.execution.execute_program(self.challenger.play(), self.challenger.save_path)
                elif self.check_turn == 'oppositer':
                    print('oo')
                    output = self.execution.execute_program(self.opposite.play(), self.opposite.save_path)

            except Exception as e:
                print(f'program error in execute user program : {e}')
            user_placement = self.parsing_user_output(output)
            try:
                check_placement, new_board = self.rules.check_placement_rule(self.game_data, self.board, user_placement)
            except Exception as e:
                print(f'check placement program error : {e}')
                break   #

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
                    break   #
            else:
                print(f'check placement error {check_placement}')
                break   #

            self.add_record(output)

            if is_ending is True:
                if winner == 1:
                    match_result = self.check_turn
                elif winner == -1:
                    if self.check_turn == 'challenger':
                        match_result = 'oppositer'
                    else:
                        match_result = 'challenger'

                break
            #   change player
            self.check_turn = 'challenger' if self.check_turn == 'oppositer' else 'oppositer'

        return match_result, self.board_record, self.placement_record

    def compile_user_code(self):
        pass

    def add_data(self, board, output):
        self.placement_record += str(output).strip() + '\n'

        for line in board:
            for i in line:
                self.board_record += (str(i) + ' ')

        self.board_record += '\n'

    def make_board_data(self):
        with open(os.path.join(self.challenger.save_path, 'board.txt'), 'w') as f:
            temp = ''
            for line in self.board:
                for i in line:
                    temp += (str(i) + ' ')
                temp += '\n'
            f.write(temp)

    def add_record(self, output):
        if self.first_turn == self.check_turn:
            self.add_data(self.board, output)
            self.board *= -1

        else:
            self.board *= -1
            self.add_data(self.board, output)

    def parsing_user_output(self, output):
        placement = []
        if '>' in output:
            pass
        else:
            placement = [int(i) for i in output.split()]

        return placement

    def parsing_board_info(self, board_info, board_size):
        numbers = board_info.split()
        for i in range(board_size):
            for j in range(board_size):
                self.board[i][j] = int(numbers[i*board_size + j])
