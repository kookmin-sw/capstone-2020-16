from placement_rule import PlacementRule
from action_rule import ActionRule
from ending_rule import EndingRule


class Rules(PlacementRule, ActionRule, EndingRule):
    def __init__(self, game_data):
        PlacementRule.__init__(self, game_data)
        ActionRule.__init__(self, game_data)
        EndingRule.__init__(self, game_data)
