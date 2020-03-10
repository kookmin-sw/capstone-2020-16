# -*- coding: utf-8 -*-
import numpy as np


class PlacementRule:
    def __init__(self):
        self.placement_message = None
        self.placement_rule_type_list = [self.move, self.add]
        self.placement_rule_move_list = [self.cross, self.diagonal,  self.eight_dir]
        self.placement_rule_add_list = [self.add_close]
        self.placement_rule_option = [self.block_move, self.take_out_and_add, self.only_reverse]

        self.x1 = None
        self.y1 = None
        self.x = None
        self.y = None

        self.obj_number = None

        self.obj_rule = None

        self.board = None
        self.user_type = None
        self.placement = None
        self.data = None

    def check_placement_rule(self, data, board, placement):
        self.setting(data, board, placement)

        placement_type = self.obj_rule[0]  # TODO

        
        check_type = self.placement_rule_type_list[self.obj_rule[0]](placement)
        # 룰에 맞는 함수들 모아서 리스트로 묶어서 실행
        if check_type is True:
            self.check_base_placement_rule(data, board)
            if self.placement_message is not None:
                return self.placement_message, board
            self.placement_method(self.obj_rule[0], self.obj_rule[1])

        else:
            self.placement_message = f'placement that does not fit the rules of the object {self.obj_number}.'
            print(f'placement that does not fit the rules of the object {self.obj_number}.')

        new_board = None

        return self.placement_message, new_board

    def setting(self, data, board, placement):
        try:
            if '>' in placement:
                self.x1 = list(map(int, placement.split('>')[0].split()))[0]
                self.y1 = list(map(int, placement.split('>')[0].split()))[1]

                self.x = list(map(int, placement.split('>')[1].split()))[0]
                self.y = list(map(int, placement.split('>')[1].split()))[1]

                self.obj_number = str(board[self.x][self.y])
                self.user_type = 'move'
            else:
                self.obj_number = list(map(str, placement.split()))[0]

                self.x = list(map(int, placement.split()))[1]
                self.y = list(map(int, placement.split()))[2]

                self.x1 = None
                self.y1 = None
                self.placement_message = None
                self.user_type = 'add'
            self.board = board
            self.placement = placement
            self.data = data
            self.obj_rule = data.placement_rule[self.obj_number]  # ["이동", ["방향","가로","세로"],"옵션"]

        except Exception as e:
            print(f'error in parsing user placement in placement rule {e}')
            self.placement_message = f'error in parsing user placement in placement rule {e}'

    # noinspection PyMethodMayBeStatic
    def check_base_placement_rule(self, data, board):  # rule 0 : check if user's placement where the stone is
        if (self.x < 0 or self.x > data.board_size) or (self.y < 0 or self.y > data.board_size):
            self.placement_message = f'out of the board : {self.x, self.y}'

        if board[self.x][self.y] != 0:
            self.placement_message = f'There is already a stone : {self.x, self.y}'

        if self.x1 is not None and self.y1 is not None:
            if board[self.x1][self.y1] == 0 \
                    or (self.x1 < 0 or self.x1 > data.board_size) \
                    or (self.y1 < 0 or self.y1 > data.board_size):
                self.placement_message = f'There is no stone : {self.x1, self.y1}'

    # 착수 종류
    def move(self, placement):  # 이동
        if '>' in placement:
            return True
        else:
            return False

    def add(self, placement):  # 새로운 돌 추가
        if '>' in placement:
            return False
        else:
            return True

    def placement_method(self, method, option):
        if method == 1:  # move
            check_move = self.placement_rule_move_list[option[0]](option)

        elif method == 2:  # add
            pass

    # 이동일 때
    def cross(self, option):  # 4방 십자
        distance = option[1]
        if distance == 0:
            distance = 999
        if ((self.x1 - self.x) == 0 or (self.y1 - self.y) == 0) and \
                (self.x1 - self.x) <= distance and (self.y1 - self.y) <= distance:
            return True
        else:
            return False

    def diagonal(self, option):  # 4방 대각선
        distance = option[1]
        if distance == 0:
            distance = 999
        if (abs(self.x1 - self.x) == abs(self.y1 - self.y)) and \
                (self.x1 - self.x) <= distance and (self.y1 - self.y) <= distance:
            return True
        else:
            return False

    def eight_dir(self, option):  # 8방
        if self.diagonal(option) is True or self.cross(option) is True:
            return True
        else:
            return False

    def custom(self, option):  # 가로 y칸, 세로 x칸
        if abs(self.y - self.y1) == option[1] and abs(self.x - self.x1) == option[2]:
            return True
        else:
            return False

    # 새로운돌 착수
    def add_close(self, option):  # 추가시 거리 - 인접
        if option[1] == 0:  # 4방
            dirr = [(0, 1), (1, 0), (0, -1), (-1, 0)]
            for d in dirr:
                if self.board[self.x + d[0]][self.y + d[1]] > 0:
                    return True
            return False

    def add_any(self, option):  # 어디든
        pass

    # 착수 옵션
    def block_move(self):  # 이동시 충돌 무시 여부
        pass

    def take_out_and_add(self):  # 상대방 돌이 존재할 시 없애고 추가
        pass

    def only_reverse(self):  # 상대방 돌을 뒤집을 수 있는 곳에만 돌 이동/추가 가능
        pass


