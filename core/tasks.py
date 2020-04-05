import time
import datetime
# import docker
import json
import multiprocessing
import time
import os
import requests
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


# @app.task
# def play_game(data):
#
    # match_data = data
    # print(match_data)
    # match_dir = os.getcwd()  # os.path.join(os.getcwd(), 'match')
    # extension = {'': '', 'C': '.c', 'C++': '.cpp', 'PYTHON': '.py', 'JAVA': '.java'}
    # print(match_data['match_id'])
    # update_url = 'http://203.246.112.32:8000/api/v1/game/' + str(match_data['match_id']) + '/'
    #
    #
    # challenger_code_filename = 'challenger{0}'.format(extension[match_data['challenger_language']])
    # oppositer_code_filename = 'oppositer{0}'.format(extension[match_data['opposite_language']])
    #
    # challenger_code_path = os.path.join(match_dir, challenger_code_filename)
    # oppositer_code_path = os.path.join(match_dir, oppositer_code_filename)
    #
    # #challenger_code = select_code(match_data['challenger'], match_data['problem'])
    # #oppositer_code = select_code(match_data['oppositer'], match_data['problem'])
    # challenger_code = match_data['challenger_code']
    # oppositer_code = match_data['opposite_code']
    #
    # with open(challenger_code_path, 'w') as f:
    #     f.write(challenger_code)
    #
    # with open(oppositer_code_path, 'w') as f:
    #     f.write(oppositer_code)
    #
    # challenger = UserProgram(match_data['challenger'], match_data['challenger_language'], match_dir,
    #                          challenger_code_filename)
    # oppositer = UserProgram(match_data['opposite'], match_data['opposite_language'], match_dir,
    #                         oppositer_code_filename)
    #
    # game_manager = GameManager(challenger=challenger, oppositer=oppositer,
    #                            placement_rule=match_data['placement'], action_rule=match_data['action'],
    #                            ending_rule=match_data['ending'],
    #                            board_size=match_data['board_size'], board_info=match_data['board_info'],
    #                            obj_num=match_data['obj_num'])
    #
    # winner, board_record, placement_record, result, error_msg = game_manager.play_game()
    # #with open('result.txt', 'w') as f:
    # #    f.write(match_result)
    # #with open('result.txt', 'a') as f:
    # #    f.write(board_record)
    # #with open('result.txt', 'a') as f:
    # #    f.write(placement_record)
    #
    # #   update match data
    # #update_match_data(match_result, board_record, placement_record)
    # data = {"winner": winner, "record": board_record, "placement_record": placement_record, "result": result, "error_msg": error_msg}
    # print(data)
    # r = requests.patch(update_url, data=data)
    # print('request ok')

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


@app.task
def run_container(data):
    print('run container')
    client = docker.from_env()
    containers_num = len(client.containers.list())

    while containers_num >= cpu_num:
        time.sleep(1)
        print('not enough cpu_num. waiting.....')

    f_dir = os.getcwd()
    match_data_file_path = os.path.join(f_dir, 'matchdata.json')
    with open(match_data_file_path, 'w') as f:
        f.write(data)

    client.containers.run(image=docker_img, command='echo hello world', auto_remove=False, tty=True, stdin_open=True)

