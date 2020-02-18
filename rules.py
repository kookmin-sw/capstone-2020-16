from placement_rule import PlacementRule
from action_rule import ActionRule
from ending_rule import EndingRule


class Rules(PlacementRule, ActionRule, EndingRule):
    def __init__(self):
        PlacementRule.__init__(self)
        ActionRule.__init__(self)
        EndingRule.__init__(self)
