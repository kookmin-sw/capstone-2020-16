import time, datetime
import docker
import multiprocessing
import time
from celery import Celery, group


# celery app
app = Celery('tasks', broker='redis://localhost:6379')


# cpu_info
cpu_num = multiprocessing.cpu_count()


# docker image
docker_img = "image"


@app.task
def play_game(challenger_idx, opposite_idx, challenger_code_idx, opposite_code_idx, ploblem_idx):
    run_container()


def run_container():
    client = docker.from_env()
    containers_num = len(client.containers.list())
    
    while containers_num >= cpu_num:
        time.sleep(1)
        print('not enough cpu_num. waitting.....')


    client.containers.run(docker_img, command=None, auto_remove=True)