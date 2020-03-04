import os
import time
# import signal
# import ptrace
# import resource
# from errorCode import *


class Execution:
    def __init__(self, limit_time=2000):
        self.limit_time = limit_time

    def execute_program(self, command, path):
        pid = os.fork()

        if pid == 0:
            # os.nice(19)
            redirection_stdout = os.open(os.path.join(path + '/placement.txt'), os.O_RDWR | os.O_CREAT)
            os.dup2(redirection_stdout, 1)

            if '<' in command:
                redirection_stdin = os.open(os.path.join(path, 'board.txt'), os.O_RDONLY)
                os.dup2(redirection_stdin, 0)
            os.execv(command[0], tuple(command[1:]))

        else:
            while not os.path.isfile("placement.txt"):
                time.sleep(1)
            with open(os.path.join(path + '/placement.txt'), 'r') as fp:
                pos = fp.readline()
            os.remove("placement.txt")
            return pos