

class GameData:
    def __init__(self, placement_rule, action_rule, ending_rule, board_size, board_info):
        self.placement_rule = placement_rule  # list
        self.action_rule = action_rule  # list
        self.ending_rule = ending_rule  # list
        self.board_size = board_size    # int
        self.board_info = board_info    # list
