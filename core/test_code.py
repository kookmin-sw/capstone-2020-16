import os
import requests
import json

from gamemanager import GameManager
from gamemanager import test
from userprogram import UserProgram


def test_code(data):
    test_data = data
    test_dir = os.getcwd()  # os.path.join(os.getcwd(), 'match')
    extension = {'': '', 'C': '.c', 'C++': '.cpp', 'PYTHON': '.py', 'JAVA': '.java'}
    update_url = 'http://203.246.112.32:8000/api/v1/code/' + str(match_data['code_id']) + '/'

    code_filename = 'challenger{0}'.format(extension[test_data['challenger_language']])

    code_path = os.path.join(test_dir, code_filename)

    code = test_data['challenger_code']

    with open(code_path, 'w') as f:
        f.write(code)

    challenger = UserProgram('challenger', test_data['challenger'], test_data['challenger_language'], test_dir,
                             code_filename)

    game_manager = GameManager(challenger=challenger, oppositer=challenger,
                               placement_rule=test_data['placement'], action_rule=test_data['action'],
                               ending_rule=test_data['ending'],
                               board_size=test_data['board_size'], board_info=test_data['board_info'],
                               obj_num=test_data['obj_num'])

    _, _, _, result, _ = game_manager.play_game()
    print('result :', result)
    available = False
    if result == 'finish':
        available = True

    # r = requests.patch(update_url, data={"available_game": available})

if __name__ == '__main__':
    with open('testdata.json') as json_file:
        json_data = json.load(json_file)
    test_code(json_data)