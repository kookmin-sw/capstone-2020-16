import os
import sys
import json

from gamemanager import GameManager
from utils.code_query import select_code
from userprogram import UserProgram

try:
    match = os.path.join(os.getcwd(), 'match')
    problem_data = os.path.join(os.getcwd(), 'problem_data')
    os.mkdir(match)
    os.mkdir(problem_data)

except Exception as e:
    print('error in make game folder :', e)

extension = ['', '.c', '.cpp', '.py', '.java']

def match_game(challenger_idx, oppositer_idx, problem_idx):
    temp = '{0}{1}{2}'.format(challenger_idx, oppositer_idx, problem_idx)
    match_dir = os.path.join(match, temp)
    os.mkdir(match_dir)

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

    with open(os.path.join(problem_data, '{0}.json'.format(problem_idx))) as f:
        data = json.load(f)

    challenger = UserProgram(challenger_code_data.language, match_dir, challenger_code_filename)
    oppositer = UserProgram(oppositer_code_data.language, match_dir, oppositer_code_filename)

    game_manager = GameManager(challenger=challenger, oppositer=oppositer, data['placement'])



