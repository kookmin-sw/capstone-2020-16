import time
import datetime
# import docker
import json
import multiprocessing
import time
import os
from celery import Celery

from gamemanager import GameManager
from utils.code_query import select_code
from utils.util_user_info_in_problem import update_user_info_in_problem
from utils.util_match import update_match_data
from userprogram import UserProgram

# celery app
app = Celery('tasks', broker='redis://localhost:6379', backend='redis://localhost:6379')

# cpu_info
cpu_num = multiprocessing.cpu_count()

# docker image
docker_img = "app"


# def play_game(json_data):  # match_data is json format
@app.task
def play_game(data):
    # run_container()

    match_data = data
    match_dir = os.getcwd()  # os.path.join(os.getcwd(), 'match')
    extension = {'': '', 'C': '.c', 'C++': '.cpp', 'PYTHON': '.py', 'JAVA': '.java'}

    challenger_code_filename = 'challenger{0}'.format(extension[match_data['challenger_language']])
    oppositer_code_filename = 'oppositer{0}'.format(extension[match_data['oppositer_language']])

    challenger_code_path = os.path.join(match_dir, challenger_code_filename)
    oppositer_code_path = os.path.join(match_dir, oppositer_code_filename)

    challenger_code = select_code(match_data['challenger'], match_data['problem'])
    oppositer_code = select_code(match_data['oppositer'], match_data['problem'])

    # with open(challenger_code_path, 'w') as f:
    #     f.write(challenger_code)
    #
    # with open(oppositer_code_path, 'w') as f:
    #     f.write(oppositer_code)

    challenger = UserProgram(match_data['challenger'], match_data['challenger_language'], match_dir,
                             challenger_code_filename)
    oppositer = UserProgram(match_data['oppositer'], match_data['oppositer_language'], match_dir,
                            oppositer_code_filename)

    game_manager = GameManager(challenger=challenger, oppositer=oppositer,
                               placement_rule=match_data['placement'], action_rule=match_data['action'],
                               ending_rule=match_data['ending'],
                               board_size=match_data['board_size'], board_info=match_data['board_info'],
                               obj_num=match_data['obj_num'])

    match_result, board_record, placement_record = game_manager.play_game()
    with open('result.txt', 'w') as f:
        f.write(match_result)
    with open('result.txt', 'a') as f:
        f.write(board_record)
    with open('result.txt', 'a') as f:
        f.write(placement_record)

    #   update match data
    update_match_data(match_result, board_record, placement_record)


# matchInfo = {
#     "challenger": challenger.user.pk,
#     "opposite": opposite.user.pk,
#     "challenger_code_id": challenger.code.id,
#     "opposite_code_id": opposite.code.id,
#     "challenger_code": challenger.code.code,
#     "opposite_code": opposite.code.code,
#     "challenger_language": challenger.code.language.name,
#     "opposite_language": opposite.code.language.name,
#     "problem": int(problemid),
#     "obj_num": rule["obj_num"],
#     "placement": rule["placement"],
#     "action": rule["action"],
#     "ending": rule["ending"],
#     "board_size": problem.board_size,
#     "board_info": problem.board_info,
# }


# def run_container():
#     print('run container')
#     client = docker.from_env()
#     containers_num = len(client.containers.list())
#
#     while containers_num >= cpu_num:
#         time.sleep(1)
#         print('not enough cpu_num. waiting.....')
#
#     client.containers.run(image=docker_img, command='echo hello world', auto_remove=False, tty=True, stdin_open=True)

