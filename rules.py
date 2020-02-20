from placement_rule import PlacementRule
from action_rule import ActionRule
from ending_rule import EndingRule
from winner_rule import WinnerRule


class Rules(PlacementRule, ActionRule, EndingRule, WinnerRule):
    def __init__(self):
        PlacementRule.__init__(self)
        ActionRule.__init__(self)
        EndingRule.__init__(self)
        WinnerRule.__init__(self)

