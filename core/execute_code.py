import os
import time
# import signal
import ptrace
# import resource
# from errorCode import *


class Execution:
    def __init__(self, limit_time=2000):
        self.limit_time = limit_time

    def execute_program(self, command, path):
        pid = os.fork()
        if pid == 0:
            print('pid', pid)
            # os.nice(19)
            redirection_stdout = os.open(os.path.join(path + '/placement.txt'), os.O_RDWR | os.O_CREAT)
            os.dup2(redirection_stdout, 1)

            if '<' in command:
                redirection_stdin = os.open(os.path.join(path, 'board.txt'), os.O_RDONLY)
                os.dup2(redirection_stdin, 0)
            # ptrace.traceme()
            os.execv(command[0], tuple(command[1:]))

        else:
            print('else', pid)
            result, time = self.trace_program(pid)

            if time > self.limit_time:
                return f'time over'
            print('ppid', pid)
            if '<' in command:
                while not os.path.isfile("placement.txt"):
                    time.sleep(0.3)
                with open(os.path.join(path + '/placement.txt'), 'r') as fp:
                    pos = fp.readline()
                os.remove("placement.txt")
                return pos
            else:
                pass

    def trace_program(self, pid):
        while True:
            print('asdasd')
            wpid, status, res = os.wait4(pid, 0)
            # normal termination
            if os.WIFEXITED(status):
                return True, res[0]

            # abnormal termination
            elif os.WIFSIGNALED(status):
                try:
                    ptrace.kill(pid)
                except Exception as e:
                    pass

                return RUNTIME_ERROR, res[0]

            else:
                ptrace.syscall(pid, 0)