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
from userprogram import UserProgram

# celery app
app = Celery('tasks', broker='redis://localhost:6379', backend='redis://localhost:6379')

# cpu_info
cpu_num = multiprocessing.cpu_count()



@app.task
def play_game(data):
    # docker image
    docker_img = "core"
    data = data
    print('run container')
    client = docker.from_env()
    f_dir = os.getcwd() + '/match'
    file_name = 'matchdata.json.' + time.strftime('%m-%d-%H-%M-%S', time.localtime(time.time())) + '_' + str(data['match_id'])
    print(file_name)
    match_data_file_path = os.path.join(f_dir, file_name)
    print(match_data_file_path)
    with open(match_data_file_path, 'w') as f:
        json.dump(data, f)
    print(111)
    volumes = {match_data_file_path: {'bind': '/matchdata.json', 'mode': 'rw'}}
    print(222)
    client.containers.run(image=docker_img, command='python3 match_game.py', volumes=volumes, auto_remove=True, privileged=True)#, tty=True, stdin_open=True)
    # client.containers.run(image=docker_img, volumes=volumes, auto_remove=True, privileged=True)#, tty=True, stdin_open=True)


@app.task
def test_code(data):
    print('run container for test code')
    docker_img = "core"
    client = docker.from_env()
    f_dir = os.getcwd() + '/test_code'
    file_name = 'matchdata.json.' + time.strftime('%m-%d-%H-%M-%S', time.localtime(time.time())) + '_' + str(data['match_id'])
    print(file_name)
    match_data_file_path = os.path.join(f_dir, file_name)
    print(match_data_file_path)
    with open(match_data_file_path, 'w') as f:
        json.dump(data, f)
    volumes = {match_data_file_path: {'bind': '/matchdata.json', 'mode': 'rw'}}
    client.containers.run(image=docker_img, command='python3 test_code.py', volumes=volumes, auto_remove=True, privileged=True)#, tty=True, stdin_open=True)


@app.task
def play_with_me(data):
    print('run container for play with me')
    docker_img = "core"
    client = docker.from_env()
    f_dir = os.getcwd() + '/play_with_me'
    file_name = 'matchdata.json.' + time.strftime('%m-%d-%H-%M-%S', time.localtime(time.time())) + '_' + str(
        data['challenger'])
    print(file_name)
    match_data_file_path = os.path.join(f_dir, file_name)
    print(match_data_file_path)
    with open(match_data_file_path, 'w') as f:
        json.dump(data, f)
    volumes = {match_data_file_path: {'bind': '/matchdata.json', 'mode': 'rw'}}
    client.containers.run(image=docker_img, command='python3 play_with_me.py', volumes=volumes, auto_remove=True,
                          privileged=True)


if __name__ == '__main__':
    with open('testdata.json') as json_file:
        json_data = json.load(json_file)
    play_with_me(json_data)