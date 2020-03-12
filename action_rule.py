import numpy as np


class ActionRule:
    def __init__(self):
        self.action_message = None
        self.rule_condition = [self.surround, self.adjacent]
        self.rule_direction = [self.width, self.height, self.cross, self.diagonal]
        self.rule_method = [self.reverse, self.remove]

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

        self.stone_list = []
    def apply_action_rule(self, game_data, board, placement):
        self.setting(game_data, board, placement)
        if not game_data.action_rule[self.obj_number]:
            return

        self.add_condition_rule()
        self.add_direction_rule()
        self.add_method_rule()
        for function in self.rule_list:
            function()
            if self.action_message is not None:
                return self.action_message, self.board

        return self.action_message, self.board

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
            if data.action_rule[self.obj_number]:
                self.obj_rule = data.action_rule[self.obj_number]
                self.obj_condition = self.obj_rule[0]
                self.obj_dir = self.obj_rule[1]
                self.obj_method = self.obj_rule[2]
            self.action_message = None
        except Exception as e:
            print(f'error in parsing user placement in action rule {e}')
            self.action_message = f'error in parsing user placement in action rule {e}'

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


    # direction
    def width(self):
        pass

    def height(self):
        pass

    def cross(self):
        pass

    def diagonal(self):
        pass

    # method
    def reverse(self):
        pass

    def remove(self):
        pass
