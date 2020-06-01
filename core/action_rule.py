# -*- coding: utf-8 -*-
import numpy as np


class ActionRule:
    def __init__(self):
        self.action_message = None
        self.rule_condition = [self.passs, self.surround, self.adjacent]
        self.rule_direction = [self.passs, self.width, self.height, self.cross, self.diagonal, self.eight_dir]
        self.rule_method = [self.passs, self.reverse, self.remove]

        self.data = None
        self.board = None
        self.placement = None

        self.x1 = None
        self.y1 = None
        self.x = None
        self.y = None

        self.obj_number = None
        self.obj_rule = None

        self.obj_condition = None
        self.obj_dir = None
        self.obj_method = None

        self.rule_list = []
        self.dir_list = []
        self.stone_list = []

    def apply_action_rule(self, game_data, board, placement):
        self.setting(game_data, board, placement)
        if not game_data.action_rule[self.obj_number]:
            return 'OK', self.board

        self.add_condition_rule()
        self.add_direction_rule()
        self.add_method_rule()

        for function in self.rule_list:
            function()
            if self.action_message is not None:
                return self.action_message, self.board

        if self.action_message is None:
            self.action_message = 'OK'
        return self.action_message, self.board

    def setting(self, data, board, placement):
        self.data = data
        try:
            if '>' in placement:
                self.x1 = list(map(int, placement.split('>')[0].split()))[0]
                self.y1 = list(map(int, placement.split('>')[0].split()))[1]

                self.x = list(map(int, placement.split('>')[1].split()))[0]
                self.y = list(map(int, placement.split('>')[1].split()))[1]

                self.obj_number = str(board[self.x][self.y])
            else:
                self.obj_number = list(map(str, placement.split()))[0]

                self.x = list(map(int, placement.split()))[1]
                self.y = list(map(int, placement.split()))[2]

                self.x1 = None
                self.y1 = None
            self.board = board
            self.placement = placement
            self.rule_list.clear()
            if data.action_rule[self.obj_number]:
                self.obj_rule = data.action_rule[self.obj_number]
                self.obj_condition = self.obj_rule[0]
                self.obj_dir = self.obj_rule[1]
                self.obj_method = self.obj_rule[2]
            self.action_message = None
        except Exception as e:
            self.placement_message = f'error in parsing user placement: {e}'
            print(self.action_message)
            raise Exception(self.action_message)

    def add_condition_rule(self):
        self.rule_list.append(self.rule_condition[self.obj_condition])

    def add_direction_rule(self):
        self.rule_list.append(self.rule_direction[self.obj_dir])

    def add_method_rule(self):
        self.rule_list.append(self.rule_method[self.obj_method])

    # condition
    def surround(self):
        pass

    def adjacent(self):
        for d in self.dir_list:
            next_x = self.x + d[0]
            next_y = self.y + d[1]
            if self.check_range(next_x, next_y):
                continue
            if self.board[next_x][next_y] < 0:
                self.board[next_x][next_y] *= -1

    # direction
    def width(self):
        self.dir_list = [(0, 1), (0, -1)]

    def height(self):
        self.dir_list = [(1, 0), (-1, 0)]

    def cross(self):
        self.dir_list = [(0, 1), (1, 0), (0, -1), (-1, 0)]

    def diagonal(self):
        self.dir_list = [(-1, 1), (1, 1), (1, -1), (-1, -1)]

    def eight_dir(self):
        self.dir_list = [(0, 1), (1, 0), (0, -1), (-1, 0), (-1, 1), (1, 1), (1, -1), (-1, -1)]

    def reverse(self):
        pass

    def remove(self):
        pass
        # if self.board[self.x][self.y] < 0:
        #     self.board[self.x1][self.y1] = 0
        #     self.board[self.x][self.y] = self.obj_number

    def check_range(self, x, y):
        if (0 <= x < self.data.board_size) and (0 <= y < self.data.board_size):
            return False
        else:
            return True

    def passs(self):
        pass