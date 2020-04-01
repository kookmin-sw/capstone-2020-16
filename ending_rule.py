# -*- coding: utf-8 -*-
import numpy as np


class EndingRule:
    def __init__(self):
        self.ending_message = False
        self.ending_condition_list = [self.full_board, self.only_one_side, self.one_line]
        self.ending_option_list = [self.one_line_num]
        self.placement_type = None
        self.winner = None
        self.x1 = None
        self.y1 = None
        self.x = None
        self.y = None

        self.board = None
        self.placement = None
        self.data = None

        self.rule_list = []

        # object rule
        self.obj_number = None
        self.obj_rule = None

        self.ending_rule = None
        self.ending_option = None

    def check_ending(self, game_data, board, placement):
        self.setting(game_data, board, placement)

        self.rule_list.append(self.ending_condition_list[self.ending_rule])
        if self.ending_option is not None:
            self.rule_list.append(self.ending_option_list[self.ending_option])
        for function in self.rule_list:
            function()
            if self.ending_message is not False:
                return self.ending_message, self.winner
        return self.ending_message, 0

    def setting(self, data, board, placement):
        self.data = data
        try:
            if '>' in placement:
                self.x1 = list(map(int, placement.split('>')[0].split()))[0]
                self.y1 = list(map(int, placement.split('>')[0].split()))[1]
                if self.check_range(self.x1, self.y1):
                    raise Exception
                self.x = list(map(int, placement.split('>')[1].split()))[0]
                self.y = list(map(int, placement.split('>')[1].split()))[1]
                if self.check_range(self.x, self.y):
                    raise Exception
                self.obj_number = str(board[self.x][self.y])
            else:
                self.obj_number = list(map(str, placement.split()))[0]
                self.x = list(map(int, placement.split()))[1]
                self.y = list(map(int, placement.split()))[2]
                if self.check_range(self.x, self.y):
                    raise Exception
                self.x1 = None
                self.y1 = None

            self.board = board
            self.placement = placement
            self.rule_list.clear()
            self.ending_rule = data.ending_rule[self.obj_number][0]
            if len(data.ending_rule[self.obj_number]) > 1:
                self.ending_option = data.ending_rule[self.obj_number][1]
            self.ending_message = False
        except Exception as e:
            print(f'error in parsing user placement in ending rule : {e}')
            self.ending_message = f'error in parsing user placement in ending rule : {e}'

    # 엔딩 조건
    def one_line(self, game_data, board, placement):  # TODO
        print('######')

        direction = np.array([[1, 0], [-1, 0], [1, 1], [-1, -1], [0, 1], [0, -1], [-1, 1], [1, -1]])
        value = board[placement[0]][placement[1]]

        direction_count = [1, 1, 1, 1]

        for i in range(4):
            x = placement[0]  # - 1
            y = placement[1]  # - 1
            new_value = value
            while (0 < x < game_data.board_size) and (0 < y < game_data.board_size) and (new_value == value):
                x += direction[i*2][1]
                y += direction[i*2][0]
                if x == game_data.board_size or y == game_data.board_size:
                    break
                new_value = board[x][y]
                direction_count[i] += 1
                if direction_count[i] == 5:
                    self.ending_message = True
                    print(direction_count)
                    return self.ending_message, value

            x = placement[0]  # - 1
            y = placement[1]  # - 1
            new_value = value
            while (0 < x < game_data.board_size) and (0 < y < game_data.board_size) and (new_value == value):
                x += direction[(i*2)+1][1]
                y += direction[(i*2)+1][0]
                if x == game_data.board_size or y == game_data.board_size:
                    break
                new_value = board[x][y]
                direction_count[i] += 1
                if direction_count[i] == 5:
                    self.ending_message = True
                    print('2', direction_count)
                    return self.ending_message, value
        return False, 0

    # 보드판을 가득 채웠을 경우
    def full_board(self):
        my_cnt = 0
        your_cnt = 0
        for line in self.board:
            for i in line:
                if i == 0:
                    return
                elif i < 0:
                    your_cnt += 1
                elif i > 0:
                    my_cnt += 1

        if my_cnt > your_cnt:
            self.winner = 1
        elif your_cnt > my_cnt:
            self.winner = -1
        else:
            self.winner = 0
        self.ending_message = True

    def only_one_side(self):
        pass

    # option
    def one_line_num(self):
        pass

    def check_range(self, x, y):
        if (0 <= x < self.data.board_size) and (0 <= y < self.data.board_size):
            return False
        else:
            return True