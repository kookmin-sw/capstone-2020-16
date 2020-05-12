# -*- coding: utf-8 -*-
import numpy as np
import random

class EndingRule:
    def __init__(self):
        self.ending_message = False
        self.ending_condition_list = [self.full_board, self.only_one_side, self.one_line]
        self.ending_option_list = [self.one_line_num, self.check_available_place]
        self.placement_type = None
        self.winner = None
        self.x1 = None
        self.y1 = None
        self.x = None
        self.y = None
        self.ending_result = ''

        self.board = None
        self.placement = None
        self.data = None

        self.rule_list = []

        # object rule
        self.obj_number = None
        self.obj_rule = None

        self.ending_rule = None
        self.ending_option = None

        self.flag = True

    def check_ending(self, game_data, board, placement):
        self.setting(game_data, board, placement)

        self.rule_list.append(self.ending_condition_list[self.ending_rule])
        self.check_available_place()
        self.available
        if self.ending_option is not None:
            self.rule_list.append(self.ending_option_list[self.ending_option])
        for function in self.rule_list:
            function()
            if self.ending_message is not False:
                return self.ending_message, self.winner#, self.ending_result
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
            self.available = True
            ##
            self.obj_rule = data.placement_rule[self.obj_number]   # [[["이동or추가", "몇번이동", "최소 or x","최대 or y"], [이동2, , ,], ["추가", "최소", "최대"]],"옵션"]
            self.obj_type = self.obj_rule[0]
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
        # if available == True
        print('in end')
        print(self.board)
        print(self.available)
        for line in self.board:
            for i in line:
                if i == 0:
                    if self.available == True:
                        return
                    else:
                        continue
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
        # if 
        # self.ending_result = 

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
    
    def check_available_place(self):
        poss = []
        poss2 = []
        for x, line in enumerate(self.board):
            for y, i in enumerate(line):
                if i < 0:
                    poss.append((x, y))
                    poss2.append((x, y))
        # print('why not poss', poss)
        result = None
        availalbe = None
        availalbe2 = None
        
        if self.obj_type == 1:
            _, _, availalbe = self.get_stones(poss, 0, 0)
        else:
            print('rule2')
            _, _, availalbe = self.get_stones(poss, 0, 0)
            _, _, availalbe2 = self.get_stones(poss2, 0, 1)
            pass
        print('available', availalbe)
        print('available2', availalbe2)
        if availalbe or availalbe2:
            pass
        else:
            print('nonononono')
            self.available = False

    def get_stones(self, poss, whose, space):
        # if space == 1:
        #     print('my poss', poss)
        eight_dir_poss = []
        pos_r = None
        result = None
        x_list = []
        y_list = []
        if space == 0:
            x_list = y_list = [-1, 0, 1]
        elif space == 1:
            x_list = y_list = [-2, -1, 0, 1, 2]
        while not eight_dir_poss:
            if not poss:
                break
            pos = random.choice(poss)
            poss.remove(pos)
            for x in x_list:
                for y in y_list:
                    if space == 0:
                        if x == 0 and y == 0:
                            continue
                    elif space == 1:
                        if abs(x) <= 1 and abs(y) <= 1:
                            continue
                    next_x = pos[0] + x
                    next_y = pos[1] + y
                    # if space == 1:
                    #     print(pos, (next_x, next_y))
                    if next_x > 7 or next_x < 0 or next_y > 7 or next_y < 0:
                        continue
                    if whose == 0:
                        if self.board[next_x][next_y] == 0:
                            eight_dir_poss.append((next_x, next_y))
                            result = True
                    elif whose == 1:
                        if self.board[next_x][next_y] > 0:
                            eight_dir_poss.append((next_x, next_y))
                            result = True
                    elif whose == -1:
                        if self.board[next_x][next_y] < 0:
                            eight_dir_poss.append((next_x, next_y))
                            result = True
            pos_r = pos
        return result, pos_r, eight_dir_poss