import time, datetime
import docker
import json
import multiprocessing
import time
import osp
from celery import Celery, group


# celery app
app = Celery('tasks', broker='redis://localhost:6379')


# cpu_info
cpu_num = multiprocessing.cpu_count()


# docker image
docker_img = "image"


@app.task
def play_game(match_data):  # match_data is json format
    jsonData = json.dumps(match_data)
    temp = '{0}{1}{2}'.format(jsonData["challenger"], jsonData["oppositer"], jsonData["problem"])
    match_dir = os.path
    run_container()

# match_data
# { "challenger" : challenger_idx(int)
#   "oppositer" : oppositer_idx(int)
#   "challenger_code" : challenger_code_idx(int)
#   "oppositer_code" : oppositer_code_idx(int)
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