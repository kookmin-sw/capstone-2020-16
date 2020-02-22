class ActionRule:
    def __init__(self):
        self.message = 'OK'

    def apply_action_rule(self, game_data, board, placement):
        new_board = board

        return self.message, new_board
