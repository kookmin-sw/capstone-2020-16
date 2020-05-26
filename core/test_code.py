import os
import requests
import json

from gamemanager import GameManager
from gamemanager import test
from userprogram import UserProgram


def test_code(data):
    match_data = data
    match_dir = os.getcwd()  # os.path.join(os.getcwd(), 'match')
    extension = {'': '', 'C': '.c', 'C++': '.cpp', 'PYTHON': '.py', 'JAVA': '.java'}
    update_url = 'http://203.246.112.32:8000/api/v1/code/' + str(match_data['code_id']) + '/'

    challenger_code_filename = 'challenger{0}'.format(extension[match_data['challenger_language']])
    oppositer_code_filename = 'oppositer{0}'.format(extension[match_data['opposite_language']])

    challenger_code_path = os.path.join(match_dir, challenger_code_filename)
    oppositer_code_path = os.path.join(match_dir, oppositer_code_filename)

    challenger_code = match_data['challenger_code']
    oppositer_code = match_data['opposite_code']

    with open(challenger_code_path, 'w') as f:
        f.write(challenger_code)

    with open(oppositer_code_path, 'w') as f:
        f.write(oppositer_code)

    game_manager = GameManager(challenger=challenger, oppositer=oppositer,
                               placement_rule=match_data['placement'], action_rule=match_data['action'],
                               ending_rule=match_data['ending'],
                               board_size=match_data['board_size'], board_info=match_data['board_info'],
                               obj_num=match_data['obj_num'])

    result = game_manager.test()
    print('result :', result)
    # r = requests.patch(update_url, data={"available_game": result})


if __name__ == '__main__':
    with open('testdata.json') as json_file:
        json_data = json.load(json_file)
    test_code(json_data)