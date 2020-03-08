# -*- coding: utf-8 -*-
import numpy as np


placement_rule_num = 5


class PlacementRule:
    def __init__(self):
        self.placement_message = 'OK'
        self.placement_rule_type_list = [self.move, self.add, self.move_and_add]
        self.placement_rule_dir_list = [self.width, self.height, self.diagonal, self.cross, self.eight_dir]
        self.placement_rule_distance_list = [self.distance_move_1, self.distance_move_2, self.distance_move_3, self.distance_add_close, self.distance_add_any]
        self.placement_rule_option = [self.block_move, self.take_out_and_add, self.only_reverse]

    def check_placement_rule(self, data, board, placement):
        try:
            if '>' in placement:
                x = list(map(int, placement.split('>')[0].split()))[0]
                y = list(map(int, placement.split('>')[0].split()))[1]

                x2 = list(map(int, placement.split('>')[1].split()))[0]
                y2 = list(map(int, placement.split('>')[1].split()))[1]

                obj_number = str(board[x][y])
            else:
                n, x, y = placement
                obj_number = str(n)
        except Exception as e:
            print(f'error in parsing user placement in placement rule {e}')
            return False, board



        check_type = self.placement_rule_type_list[data.placement_rule[obj_number][0]](placement)
        if check_type is True:
            self.check_base_placement_rule(data, board, placement)
        else:
            print(f'placement that does not fit the rules of the object {obj_number}.')

        new_board = None

        return self.placement_message, new_board

    # noinspection PyMethodMayBeStatic
    def check_base_placement_rule(self, data, board, placement):  # rule 0 : check if user's placement where the stone is
        x, y = placement
        if (x < 0 or x > data.board_size) or (y < 0 or y > data.board_size):
            self.placement_message = f'out of the board : {x, y}'

        if board[x][y] != 0:
            self.placement_message = f'There is already a stone : {x, y}'

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

    def move_and_add(self, placement):
        pass


    # 착수 방향
    def width(self):  # 가로
        pass

    def height(self):  # 세로
        pass

    def diagonal(self):  # 대각선
        pass

    def cross(self):
        pass

    def eight_dir(self):
        pass


    # 거리
    def distance_move_1(self):  # 이동시 거리
        pass

    def distance_move_2(self):
        pass

    def distance_move_3(self):
        pass

    def distance_add_close(self):  # 추가시 거리 - 인접 or 어디든
        pass

    def distance_add_any(self):
        pass

    # 착수 옵션
    def block_move(self):  # 이동시 충돌 무시 여부
        pass

    def take_out_and_add(self):  # 상대방 돌이 존재할 시 없애고 추가
        pass

    def only_reverse(self):  # 상대방 돌을 뒤집을 수 있는 곳에만 돌 이동/추가 가능
        pass


