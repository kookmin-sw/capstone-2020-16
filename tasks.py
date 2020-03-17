import time
import datetime
import docker
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
app = Celery('tasks', broker='redis://localhost:6379')

# cpu_info
cpu_num = multiprocessing.cpu_count()

# docker image
docker_img = "app"


@app.task
# def play_game(json_data):  # match_data is json format
def play_game(json_data):
    #run_container()
    match_data = json.loads(json_data)
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
                               ending_rule=match_data['ending'], turn=match_data['turn'],
                               board_size=match_data['board_size'], board_info=match_data['board_info'],
                               obj_num=match_data['obj_num'])

    match_result, board_record, placement_record = game_manager.play_game()
    with open('result.txt', 'w') as f:
        f.write(match_result)
    with open('result.txt', 'a') as f:
        f.write(board_record)
    with open('result.txt', 'a') as f:
        f.write(placement_record)

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

    #   update match data
    update_match_data(match_result, board_record, placement_record)
# match_data
# { "challenger" : challenger_idx(int)
#   "oppositer" : oppositer_idx(int)
#   "challenger_code" : challenger_code_idx(int)
#   "oppositer_code" : oppositer_code_idx(int)
#   "challenger_score" : challenger_score(int)
#   "oppositer_score" : oppositer_score(int)
#   "challenger_language" : challenger_language(string)
#   "oppositer_language" : oppositer_language(string)
#   "turn" : "challenger" or "oppositer"
#   "problem" : problem_idx(int)
#   "placement" : [idx1, ixd2, ..]
#   "action" : [idx1, idx2, ..]
#   "ending" : [idx1, idx2, ..]
#   "board_size" : board_size(int)
#   "board_info" : [(x1,y1), (x2,y2), ..]   # start board info
# }


def run_container():
    print('run container')
    client = docker.from_env()
    containers_num = len(client.containers.list())
    
    while containers_num >= cpu_num:
        time.sleep(1)
        print('not enough cpu_num. waiting.....')

    client.containers.run(image=docker_img, command='echo hello world', auto_remove=False, tty=True, stdin_open=True)

