import os
import requests

from gamemanager import GameManager
from gamemanager import test
from userprogram import UserProgram


def test_code(data):
    test_data = data
    match_dir = os.getcwd()  # os.path.join(os.getcwd(), 'match')
    extension = {'': '', 'C': '.c', 'C++': '.cpp', 'PYTHON': '.py', 'JAVA': '.java'}
    update_url = 'http://203.246.112.32:8000/api/v1/game/' + str(test_data['match_id']) + '/'  # todo

    code_filename = 'challenger{0}'.format(extension[test_data['challenger_language']])

    code_path = os.path.join(match_dir, code_filename)

    code = test_data['challenger_code']

    with open(code_path, 'w') as f:
        f.write(code)

    challenger = UserProgram('challenger', match_data['challenger'], match_data['challenger_language'], match_dir,
                             challenger_code_filename)

    game_manager = GameManager(challenger=challenger,
                               placement_rule=match_data['placement'], action_rule=match_data['action'],
                               ending_rule=match_data['ending'],
                               board_size=match_data['board_size'], board_info=match_data['board_info'],
                               obj_num=match_data['obj_num'], test_case=match_data['test_case'])

    result = game_manager.test()
    print('result :', result)
    r = requests.patch(update_url, data={"available_game": result})


