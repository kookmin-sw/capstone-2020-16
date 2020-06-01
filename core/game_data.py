

class GameData:
    def __init__(self, placement_rule, action_rule, ending_rule, board_size, board_info, obj_num, problem):
        self.placement_rule = placement_rule  # {'1': [1, 3, 5, 2], '2': [3, 2, 6, 2], '3': [1, 2, 3, 2]}
        self.action_rule = action_rule  # list
        self.ending_rule = ending_rule  # list
        self.board_size = board_size    # int
        self.board_info = board_info    # string
        self.obj_num = obj_num
        self.problem = problem