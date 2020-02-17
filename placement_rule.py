placement_rule_num = 5

class PlacementRule:
    def __init__(self, placement_rule):
        self.placement_rule = placement_rule    # list

    def check_placment_rule(self):
        self.check_base_placement_rule()

        if 'othello' in self.placement_rule:
            self.check_othello_placement_rule()

        if 'segyunjeon move' in self.placement_rule:
            self.check_segyunjeon_placement_rule_move()

        if 'segyunjeon add' in self.placement_rule:
            self.check_segyunjeon_placement_rule_add()

        return True

    def check_base_placement_rule(self):    # check if user's placement where the stone is
        pass

    def check_33_placement_rule(self):
        pass

    def check_othello_placement_rule(self):
        pass

    def check_segyunjeon_placement_rule_move(self):     # move 2 spaces
        pass

    def check_segyunjeon_placement_rule_add(self):      # add max 1 space
        pass
