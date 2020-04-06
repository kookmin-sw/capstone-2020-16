import time
import datetime
import docker
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
docker_img = "core"

@app.task
def play_game(data):
    print('run container')
    client = docker.from_env()
    # containers_num = len(client.containers.list())

    # while containers_num >= cpu_num:
    #     time.sleep(1)
    #     print('not enough cpu_num. waiting.....')

    f_dir = os.getcwd()
    match_data_file_path = os.path.join(f_dir, 'matchdata.json')
    with open(match_data_file_path, 'w') as f:
        json.dump(data, f)
#     volumes= ['/host_location']
#     volume_bindings = {
#                         '/home/algorithm/capstone-2020-16/core/matchdata.json': {
#                         'bind': '/matchdata.json',
#                         'mode': 'rw',
#                         },
#     }

# host_config = client.create_host_config(
#                     binds=volume_bindings
# )
    volumes = {'/home/algorithm/capstone-2020-16/core/matchdata.json': {'bind': '/matchdata.json', 'mode': 'rw'}}
    client.containers.run(image=docker_img, volumes=volumes, auto_remove=True, privileged=True)#, tty=True, stdin_open=True)

