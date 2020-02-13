import os
import sys
import json

from gamemanager import GameManager
from utils.code_query import select_code


try:
    game = os.path.join(os.getcwd(), 'game')
    os.mkdir(game)
except Exception as e:
    print(e)

extension = ['', '.c', '.cpp', '.py', '.java']

def match_game(challenger_idx, oppositer_idx, problem_idx):
    temp = '{0}{1}{2}'.format(challenger_idx, oppositer_idx, problem_idx)
    game_dir = os.path.join(game, temp)
    os.mkdir(game_dir)

    challenger_code_data = select_code(challenger_idx, problem_idx)
    oppositer_code_data = select_code(oppositer_idx, problem_idx)

    challenger_code_filename = '{0}{1}'.format(challenger_idx, extension[challenger_code_data.language_index])
    oppositer_code_filename = '{0}{1}'.format(oppositer_idx, extension[oppositer_code_data.language_index])

    challenger_code_path = os.path.join(game_dir, challenger_code_filename)
    oppositer_code_path = os.path.join(game_dir, oppositer_code_filename)

    with open(challenger_code_path, 'w') as f:
        f.write(challenger_code_data.code)

    with open(oppositer_code_path, 'w') as f:
        f.write(oppositer_code_data.code)

       
