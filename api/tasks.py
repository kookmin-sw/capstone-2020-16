from celery import Celery


app = Celery('tasks', broker='redis://192.168.23.13:6379')

@app.task
def play_game(data):
    pass
