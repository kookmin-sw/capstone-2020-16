class EndingRule():
    def __init__(self):
        self.message

    def check_ending(self, game_data, board):
        if 'omog' in game_data['ending']:
            self.check_ending_omog(game_data, board)

    def check_endig_omog(self, game_data, board):
        pass