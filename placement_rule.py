placement_rule_num = 5


class PlacementRule:
    def __init__(self):
        pass

    def check_placment_rule(self, data, board, placement):
        new_board = board
        self.check_base_placement_rule(data, board, placement)

        if 'othello' in data['placement']:
            self.check_othello_placement_rule(data, board, placement)

        if 'segyunjeon_move' in data['placement']:
            self.check_segyunjeon_placement_rule_move(data, board, placement)

        if 'segyunjeon_add' in data['placement']:
            self.check_segyunjeon_placement_rule_add(data, board, placement)

        return True, new_board

    def check_base_placement_rule(self, data, board, placement):    # check if user's placement where the stone is
        pass

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
