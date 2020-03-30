import numpy as np


placement_rule_num = 5


class PlacementRule:
    def __init__(self):
        self.placement_message = 'OK'

    def check_placement_rule(self, data, board, placement):
        x, y = placement
        new_board = None
        # print('######')
        # print(board)
        # print(placement)
        self.check_base_placement_rule(data, board, placement)
        if 'othello' in data.placement_rule:
            self.check_othello_placement_rule(data, board, placement)

        if 'segyunjeon_move' in data.placement_rule:
            self.check_segyunjeon_placement_rule_move(data, board, placement)

        if 'segyunjeon_add' in data.placement_rule:
            self.check_segyunjeon_placement_rule_add(data, board, placement)

        if self.placement_message == 'OK':
            board[x][y] = 1
            new_board = board

        return self.placement_message, new_board

    # noinspection PyMethodMayBeStatic
    def check_base_placement_rule(self, data, board, placement):    # check if user's placement where the stone is
        x, y = placement
        if (x < 0 or x > data.board_size) or (y < 0 or y > data.board_size):
            self.placement_message = f'out of the board : {x, y}'

        if board[x][y] != 0:
            # print(board)
            # print(y, x, board[y][x])
            self.placement_message = f'There is already a stone : {x, y}'

    def check_33_placement_rule(self, data, board, placement):
        pass

    def check_othello_placement_rule(self, data, board, placement):
        pass

    def check_segyunjeon_placement_rule_move(self, data, board, placement):     # move 2 spaces
        pass

    def check_segyunjeon_placement_rule_add(self, data, board, placement):      # add max 1 space
        pass

    def apply_placement(self):
        pass
