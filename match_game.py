import os
import sys
import json

from gamemanager import GameManager
from utils.code_query import select_code
from utils.user_info_in_problem_query import update_user_info_in_problem
from userprogram import UserProgram
from db_manager import DBManager


def match_game(match_data):
    match_dir = os.path.join(os.getcwd(), 'match')
    extension = {'': '', 'C': '.c', 'C++': '.cpp', 'PYTHON': '.py', 'JAVA': '.java'}

    challenger_code_filename = 'challenger_{0}{1}'.format(match_data['challenger'],
                                                          extension[match_data['challenger_language']])
    oppositer_code_filename = 'oppositer_{0}{1}'.format(match_data['oppositer'],
                                                        extension[match_data['oppositer_language']])

    challenger_code_path = os.path.join(match_dir, challenger_code_filename)
    oppositer_code_path = os.path.join(match_dir, oppositer_code_filename)

    challenger_code = select_code(match_data['challenger'], match_data['problem'])
    oppositer_code = select_code(match_data['oppositer'], match_data['problem'])

    with open(challenger_code_path, 'w') as f:
        f.write(challenger_code)

    with open(oppositer_code_path, 'w') as f:
        f.write(oppositer_code)

    challenger = UserProgram(match_data['challenger'], match_data['challenger_language'], match_dir, challenger_code_filename)
    oppositer = UserProgram(match_data['oppositer'], match_data['oppositer_language'], match_dir, oppositer_code_filename)

    game_manager = GameManager(challenger=challenger, oppositer=oppositer,
                               placement_rule=match_data['placement'], action_rule=match_data['action'],
                               ending_rule=match_data['ending'], turn=match_data['turn'],
                               board_size=match_data['board size'], board_info=match_data['board info'])

    match_result = game_manager.play_game()

    challenger_score = match_data['challenger_score']
    oppositer_score = match_data['oppositer_score']

    add_score_for_challenger, add_score_for_oppositer = 0, 0

    if match_result == 'win':
        add_score_for_challenger = 10
        add_score_for_oppositer = -10

    elif match_result == 'lose':
        add_score_for_challenger = -10
        add_score_for_oppositer = 10

    challenger_score += add_score_for_challenger
    oppositer_score += add_score_for_oppositer

    #   update user score
    update_user_info_in_problem(user_idx=match_data['challenger'], problem_idx=match_data['problem'],
                                score=challenger_score)
    update_user_info_in_problem(user_idx=match_data['oppositer'], problem_idx=match_data['problem'],
                                score=oppositer_score)


if __name__ == '__main__':
    json_data = json.loads(sys.argv[1])

    DBManager.init()  # not finish

    try:
        match = os.path.join(os.getcwd(), 'match')
        os.mkdir(match)

    except Exception as e:
        print('error in make match folder :', e)

    match_game(json_data)



