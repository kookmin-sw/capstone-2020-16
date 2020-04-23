import numpy as np
import os
import re
import sys
import time

from placement_rule import PlacementRule
from action_rule import ActionRule
from ending_rule import EndingRule
from game_data import GameData
from execute_code import Execution

def test():
    print('test')

class GameManager:
    def __init__(self, challenger, oppositer, placement_rule, action_rule, ending_rule, board_size, board_info, obj_num):
        self.board = np.zeros((board_size, board_size), dtype='i')
        self.board_info = board_info
        self.board_size = board_size
        self.board_record = ''

        # self.board = board_info
        self.check_turn = 'challenger'
        self.challenger = challenger
        self.opposite = oppositer

        self.game_data = GameData(placement_rule, action_rule, ending_rule, board_size, board_info, obj_num)
        self.placement_rule = PlacementRule()
        self.action_rule = ActionRule()
        self.ending_rule = EndingRule()

        self.execution = Execution()

        self.placement_record = ''

        self.limit_time = 2000

        self.error_msg = None

    def play_game(self):
        total_turn = 0
        total_turn_limit = self.game_data.board_size ** 3
        is_ending = False
        match_result = ''
        winner = 0

        self.board_record += str(self.board_info) + ' \n'
        self.parsing_board_info(self.board_info, self.board_size)
        self.compile_user_code()    # not finish

        while not is_ending:
            if total_turn > total_turn_limit:
                print("total_turn over")
                self.error_msg = 'total turn over'
                match_result = 'draw'
                return match_result

            self.make_board_data()

            # user code execute
            output = None
            # print(self.board)
            try:
                if os.path.isfile("placement.txt"):
                    os.remove("placement.txt")
                    # print('delete placement.txt')
                if self.check_turn == 'challenger':
                    print('challenger')
                    print(self.board)
                    output = self.execution.execute_program(self.challenger.play(), self.challenger.save_path)
                elif self.check_turn == 'opposite':
                    print('opposite')
                    print(self.board)
                    output = self.execution.execute_program(self.opposite.play(), self.opposite.save_path)
            except Exception as e:
                print(f'program error in execute user program : {e}')
                self.error_msg = f'program error in execute user program : {e}'
                break
            print(output.strip())
            if output and output != 'time over':
                try:
                    check_placement, new_board = self.placement_rule.check_placement_rule(self.game_data, self.board, output)
                except Exception as e:
                    check_placement = e
                    self.error_msg = e
                    print(f'check placement program error in gamemanger : {e}')
                print('check_placement :', check_placement, '\n')
                if check_placement == 'OK':
                    self.board = new_board
                    apply_action = ''
                    try:
                        apply_action, new_board = self.action_rule.apply_action_rule(self.game_data, self.board, output)
                    except Exception as e:
                        print(f'apply action program error : {e}')

                        self.error_msg = f'{apply_action} : {e}'
                        # break

                    if apply_action == 'OK':
                        self.board = new_board
                        try:
                            is_ending, winner = self.ending_rule.check_ending(self.game_data, self.board, output) # ending_result = self.ending_rule.check_ending(self.game_data, self.board, output)
                        except Exception as e:
                            print(f'check ending program error : {e}')
                            self.error_msg = f'{is_ending} : {e}'
                            # break
                    else:
                        print(f'apply action error {apply_action}')
                        self.error_msg = f'apply action error {apply_action}'
                        # break
                else:
                    self.error_msg = check_placement

                self.add_record(output)
            else:
                if output == 'time over':
                    self.error_msg = 'time over'
                else:
                    print(type(output))
                    self.error_msg = f'program error in execute user program'

            if is_ending is True and self.error_msg is None:
                print(1)
                if winner == 1:
                    winner = self.check_turn
                elif winner == -1:
                    if self.check_turn == 'challenger':
                        winner = 'opposite'
                    else:
                        winner = 'challenger'
                else:
                    winner = 'draw'
                match_result = 'finish'
                self.error_msg = 'no error' #ending_result
            
            
            #   change player
            elif is_ending is False and self.error_msg is None:
                # print(2, is_ending, self.error_msg)
                total_turn += 1
                self.check_turn = 'challenger' if self.check_turn == 'opposite' else 'opposite'
            elif self.error_msg is not None:
                # print('error', self.error_msg)
                if self.check_turn == 'challenger':
                    winner = 'opposite'
                    match_result = 'challenger_error'
                else:
                    winner = 'challenger'
                    match_result = 'opposite_error'
                is_ending = True
            else:
                pass
                # print(3, self.error_msg)
        if self.error_msg != 'no error':
            print('end error', str(self.error_msg))
            print(1)
            self.error_msg = str(self.error_msg) + f'--> placement = {output}'
        return winner, self.board_record, self.placement_record, match_result, self.error_msg

    def test_code(self):
        print('test')

    def compile_user_code(self):
        try:
            self.execution.execute_program(self.challenger.compile(), self.challenger.save_path)
        except KeyError as e:
            return False

        try:
            self.execution.execute_program(self.opposite.compile(), self.opposite.save_path)
        except KeyError as e:
            return False
        print('compile')
        return True

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
        if self.check_turn == 'challenger':
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
