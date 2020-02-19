import time, datetime
import docker
import json
import multiprocessing
import time
import os
from celery import Celery, g


# celery app
app = Celery('tasks', broker='redis://localhost:6379')


# cpu_info
cpu_num = multiprocessing.cpu_count()


# docker image
docker_img = "image"


@app.task
def play_game(match_data):  # match_data is json format

    run_container()

# match_data
# { "challenger" : challenger_idx(int)
#   "oppositer" : oppositer_idx(int)
#   "challenger_code" : challenger_code_idx(int)
#   "oppositer_code" : oppositer_code_idx(int)
#   "challenger_score" : challenger_score(int)
#   "oppositer_score" : oppositer_score(int)
#   "challenger_language" : challenger_language(string)
#   "oppositer_language" : oppositer_language(string)
#   "turn" : 0 or 1     # 0 : challenger first, 1 : oppositer first
#   "problem" : problem_idx(int)
#   "placement" : [idx1, ixd2, ..]
#   "action" : [idx1, idx2, ..]
#   "ending" : [idx1, idx2, ..]
#   "board_size" : board_size(int)
#   "board_info" : [(x1,y1), (x2,y2), ..]   # start board info
# }


def run_container():
    client = docker.from_env()
    containers_num = len(client.containers.list())
    
    while containers_num >= cpu_num:
        time.sleep(1)
        print('not enough cpu_num. waitting.....')

    client.containers.run(docker_img, command=None, auto_remove=True)