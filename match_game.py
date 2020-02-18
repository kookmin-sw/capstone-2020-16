import os
import sys
import json

from gamemanager import GameManager
from utils.code_query import select_code
from utils.rule_query import read_rule
from utils.user_info_in_problem_query import select_user_info_in_problem, update_user_info_in_problem
from userprogram import UserProgram
from db_manager import DBManager


DBManager.init()    # not finish

try:
    match = os.path.join(os.getcwd(), 'match')
    problem_data_dir = os.path.join(os.getcwd(), 'problem_data')
    os.mkdir(match)
    os.mkdir(problem_data_dir)

except Exception as e:
    print('error in make match folder :', e)

extension = ['', '.c', '.cpp', '.py', '.java']


def match_game(challenger_idx, oppositer_idx, problem_idx, rules):
    temp = '{0}{1}{2}'.format(challenger_idx, oppositer_idx, problem_idx)
    match_dir = os.path.join(match, temp)
    os.mkdir(match_dir)

    # ADD PROBLEM RULE DATA IN CONTAINER
    json_data = rules

    with open(os.path.join(problem_data_dir, '{0}.json'.format(problem_idx)), "w") as json_file:
        json.dump(json_data, json_file)

    # ADD USER DATA IN CONTAINER
    challenger_code_data = select_code(challenger_idx, problem_idx)
    oppositer_code_data = select_code(oppositer_idx, problem_idx)

    challenger_code_filename = '{0}{1}'.format(challenger_idx, extension[challenger_code_data.language_index])
    oppositer_code_filename = '{0}{1}'.format(oppositer_idx, extension[oppositer_code_data.language_index])

    challenger_code_path = os.path.join(match_dir, challenger_code_filename)
    oppositer_code_path = os.path.join(match_dir, oppositer_code_filename)

    with open(challenger_code_path, 'w') as f:
        f.write(challenger_code_data.code)

    with open(oppositer_code_path, 'w') as f:
        f.write(oppositer_code_data.code)

    # READ RULE DATA IN THE CONTAINER
    with open(os.path.join(problem_data_dir, '{0}.json'.format(problem_idx)), "r") as f:
        rule_data = json.load(f)

    challenger = UserProgram(challenger_code_data.language, match_dir, challenger_code_filename)
    oppositer = UserProgram(oppositer_code_data.language, match_dir, oppositer_code_filename)

    game_manager = GameManager(challenger=challenger, oppositer=oppositer,
                               placement_rule=rule_data['placement'], action_rule=rule_data['action'],
                               ending_rule=data['ending'],
                               board_size=rule_data['board size'], board_info=rule_data['board info'])

    match_result = game_manager.play_game()

    challenger_info_in_problem = select_user_info_in_problem(challenger_idx, problem_idx)
    oppositer_info_in_problem = select_user_info_in_problem(oppositer_idx,problem_idx)

    challenger_score = challenger_info_in_problem.score
    oppositer_score = oppositer_info_in_problem.score

    if match_result == 'win':
        add_score_for_challenger = 10
        add_score_for_oppositer = -10

    elif match_result == 'lose':
        add_score_for_challenger = -10
        add_score_for_oppositer = 10

    challenger_score += add_score_for_challenger
    oppositer_score += add_score_for_oppositer

    update_user_info_in_problem(user_idx=challenger_idx, problem_idx=problem_idx, score=challenger_score)
    update_user_info_in_problem(user_idx=oppositer_idx, problem_idx=problem_idx, score=oppositer_score)



