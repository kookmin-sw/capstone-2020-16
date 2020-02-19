placement_rule_num = 5


class PlacementRule:
    def __init__(self):
        pass

    def check_placment_rule(self, data, board):
        new_board = board
        self.check_base_placement_rule(data, board)

        if 'othello' in data['placement']:
            self.check_othello_placement_rule(data, board)

        if 'segyunjeon_move' in data['placement']:
            self.check_segyunjeon_placement_rule_move(data, board)

        if 'segyunjeon_add' in data['placement']:
            self.check_segyunjeon_placement_rule_add(data, board)

        return True, board

    def check_base_placement_rule(self, data, board):    # check if user's placement where the stone is
        pass

    def check_33_placement_rule(self, data, board):
        pass

    def check_othello_placement_rule(self, data, board):
        pass

    def check_segyunjeon_placement_rule_move(self, data, board):     # move 2 spaces
        pass

    def check_segyunjeon_placement_rule_add(self, data, board):      # add max 1 space
        pass
