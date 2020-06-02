import os
import json
import redis

from gamemanager import GameManager
from gamemanager import test
from userprogram import UserProgram


def play_with_me(data):
    json_data = data
    pwm_dir = os.getcwd()

    extension = {'': '', 'C': '.c', 'C++': '.cpp', 'PYTHON': '.py', 'JAVA': '.java'}

    code_filename = 'challenger{0}'.format(extension[json_data['challenger_language']])

    code_path = os.path.join(pwm_dir, code_filename)
    # placement_path = os.path.join(pwm_dir, 'placement.txt')

    code = json_data['challenger_code']
    # placement = json_data['placement']

    with open(code_path, 'w') as f:
        f.write(code)

    # with open(placement_path, 'w') as f:
    #     f.write(placement)

    challenger = UserProgram('challenger', json_data['challenger'], json_data['challenger_language'], json_data,
                             code_filename)

    game_manager = GameManager(challenger=challenger, oppositer=challenger,
                               placement_rule=json_data['placement'], action_rule=json_data['action'],
                               ending_rule=json_data['ending'],
                               board_size=json_data['board_size'], board_info=json_data['board_info'],
                               obj_num=json_data['obj_num'], problem=json_data['problem'])

    result, winner, board_user, board_code, placement_code = game_manager.play_with_me(json_data['placement'])

    r = redis.StrictRedis(host="localhost", port=6379, db=0)

    dict_name = str(json_data['user_id']) + str(json_data['code_id'])

    result_dict = {
        'result': result,
        'winner': winner,
        'board_user': board_user,
        'board_code': board_code,
        'placement_code': placement_code
    }

    json_result_dict = json.dumps(result_dict, ensure_ascii=False).encode('utf-8')
    r.set(dict_name, json_result_dict)