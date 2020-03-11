# -*- coding: utf-8 -*-
import numpy as np


class PlacementRule:
    def __init__(self):
        self.placement_message = None
        self.placement_rule_move_list = [self.cross, self.diagonal, self.eight_dir]
        self.placement_rule_add_list = [self.add_close, self.add_any]
        self.placement_rule_option = [self.block_move, self.take_out_and_add, self.only_reverse]

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

        self.obj_type = None
        self.obj_method = None
        self.obj_option = None

    def check_placement_rule(self, data, board, placement):
        self.setting(data, board, placement)

        # 룰에 맞는 함수들 리스트에 추가
        self.rule_list.append(self.check_game_type)
        self.add_rule_method()
        self.add_rule_option()

        for function in self.rule_list:
            function()
            if self.placement_message is not None:
                return self.placement_message, self.board

        if self.obj_type == 0:
            self.board[self.x1][self.y1] = 0
            self.board[self.x][self.y] = 1
        elif self.obj_type == 1:
            self.board[self.x][self.y] = 1
        self.placement_message = 'OK'
        return self.placement_message, self.board

    def setting(self, data, board, placement):
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
            self.data = data
            self.rule_list.clear()
            self.obj_rule = data.placement_rule[self.obj_number]  # ["이동", ["방향","가로","세로"],"옵션"]
            self.obj_type = self.obj_rule[0]
            self.obj_method = self.obj_rule[1]
            self.obj_option = self.obj_rule[2]
            self.placement_message = None
        except Exception as e:
            print(f'error in parsing user placement in placement rule {e}')
            self.placement_message = f'error in parsing user placement in placement rule {e}'

    # noinspection PyMethodMayBeStatic
    def check_base_placement_rule(self):  # rule 0 : check if user's placement where the stone is
        if self.obj_type == 0:
            if (self.x < 0 or self.x > self.data.board_size) or (self.y < 0 or self.y > self.data.board_size):
                self.placement_message = f'out of the board : {self.x, self.y}. {self.x1, self.y1} > {self.x, self.y}'
            elif self.board[self.x1][self.y1] == 0:
                self.placement_message = f'There is no stone : {self.x1, self.y1}. {self.x1, self.y1} > {self.x, self.y}'

        if self.board[self.x][self.y] != 0 and 1 not in self.obj_option:  # TODO 착수할 곳에 이미 있는 돌이 내돌이냐 상대돌이냐
            self.placement_message = f'There is already a stone : {self.x, self.y}'

        if self.x1 is not None and self.y1 is not None:
            if board[self.x1][self.y1] == 0 \
                    or (self.x1 < 0 or self.x1 > data.board_size) \
                    or (self.y1 < 0 or self.y1 > data.board_size):
                self.placement_message = f'There is no stone : {self.x1, self.y1}'

    # 착수 종류
    def check_game_type(self):
        if self.obj_type == 0 and '>' in self.placement:
            pass
        elif self.obj_type == 1 and '>' not in self.placement:
            pass
        else:
            if self.obj_type == 0 and '>' not in self.placement:
                self.placement_message = f'object{self.obj_number}{self.x, self.y} is move rule'
            if self.obj_type == 1 and '>' in self.placement:
                self.placement_message = f'object{self.obj_number}{self.x, self.y} is add rule'

    def add_rule_method(self):
        if self.obj_type == 0:  # move
            self.rule_list.append(self.placement_rule_move_list[self.obj_method[0]])
        elif self.obj_type == 1:  # add
            self.rule_list.append(self.placement_rule_add_list[self.obj_method[0]])

    def add_rule_option(self):
        for option in self.obj_option:
            self.rule_list.append(self.placement_rule_option[option])

    # 이동일 때
    def cross(self):  # 4방 십자
        distance = self.obj_method[1]
        if distance == 0:
            distance = 999
        if ((self.x1 - self.x) == 0 or (self.y1 - self.y) == 0) and \
                (self.x1 - self.x) <= distance and (self.y1 - self.y) <= distance:
            pass
        else:
            self.placement_message = f'object{self.obj_number} is cross rule. {self.x1, self.y1} > {self.x, self.y}'

    def diagonal(self):  # 4방 대각선
        distance = self.obj_method[1]
        if distance == 0:
            distance = 999
        if (abs(self.x1 - self.x) == abs(self.y1 - self.y)) and \
                (self.x1 - self.x) <= distance and (self.y1 - self.y) <= distance:
            pass
        else:
            self.placement_message = f'object{self.obj_number} is diagonal rule. {self.x1, self.y1} > {self.x, self.y}'

    def eight_dir(self):  # 8방
        if self.diagonal() is True or self.cross() is True:
            pass
        else:
            self.placement_message = f'object{self.obj_number} is 8 direction rule. {self.x1, self.y1} > {self.x, self.y}'

    def custom(self):  # 가로 y칸, 세로 x칸
        if abs(self.y - self.y1) == self.obj_method[1] and abs(self.x - self.x1) == self.obj_method[2]:
            pass
        else:
            self.placement_message = f'object{self.obj_number} is x:{self.obj_method[1]} y:{self.obj_method[2]} rule. {self.x1, self.y1} > {self.x, self.y}'

    # 새로운돌 착수
    def add_close(self):  # 추가시 거리 - 인접
        if self.obj_method[1] == 0:  # 4방
            dirr = [(0, 1), (1, 0), (0, -1), (-1, 0)]
            for d in dirr:
                if self.board[self.x + d[0]][self.y + d[1]] > 0:
                    return
            self.placement_message = f'object{self.obj_number} is add close(cross) rule. {self.x, self.y}'
        elif self.obj_method[1] == 1:
            dirr = [(-1, 1), (1, 1), (1, -1), (-1, -1)]
            for d in dirr:
                if self.board[self.x + d[0]][self.y + d[1]] > 0:
                    return
            self.placement_message = f'object{self.obj_number} is add close(diagonal) rule. {self.x, self.y}'
        elif self.obj_method[1] == 2:
            dirr = [(0, 1), (1, 0), (0, -1), (-1, 0), (-1, 1), (1, 1), (1, -1), (-1, -1)]
            for d in dirr:
                if self.board[self.x + d[0]][self.y + d[1]] > 0:
                    return
            self.placement_message = f'object{self.obj_number} is add close(8 dir) rule. {self.x, self.y}'

    def add_any(self):  # 어디든
        pass

    # 착수 옵션
    def block_move(self):  # 이동시 충돌 무시 여부
        pass

    def take_out_and_add(self):  # 상대방 돌이 존재할 시 없애고 추가
        pass

    def only_reverse(self):  # 상대방 돌을 뒤집을 수 있는 곳에만 돌 추가 가능
        dirr = [(0, 1), (1, 0), (0, -1), (-1, 0), (-1, 1), (1, 1), (1, -1), (-1, -1)]
        dir_list = []
        for d in dirr:
            next_x = self.x + d[0]
            next_y = self.y + d[1]
            if self.board[next_x][next_y] < 0:
                for i in range(self.data.board_size):
                    next_x += d[0]
                    next_y += d[1]
                    if not (next_x < self.data.board_size and next_y < self.data.board_size):
                        break
                    if self.board[next_x][next_y] > 0:
                        return

        self.placement_message = f'Stones can only be placed where they can be turned over. {self.x, self.y}'



