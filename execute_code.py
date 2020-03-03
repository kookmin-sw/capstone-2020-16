import os
# import signal
# import ptrace
# import resource
# from errorCode import *


class Execution:
    def __init__(self, limit_time=2000):
        self.limit_time = limit_time

    def execute_program(self, command, path):
        redirection_stdout = os.open(os.path.join(path + '/placement.txt'), os.O_RDWR | os.O_CREAT)
        os.dup2(redirection_stdout, 1)

        if '<' in command:
            redirection_stdin = os.open(os.path.join(path, 'board.txt'), os.O_RDONLY)
            os.dup2(redirection_stdin, 0)

        os.execv(command[0], tuple(command[1:]))

        with open(os.path.join(path + '/placement.txt')) as fp:
            # print('aa')
            pos = fp.readline()
        return pos

    # def execute_program(self, command, path):   # path = '~/match
    #     parent_pid = os.getpid()
    #     pid = os.fork()
    #     # pid == 0 : user program process, pid != 0 : matchingProgram process(user program process check)
    #     if pid is 0:
    #         self.__run_program(command, parent_pid, path)
    #
    #     else:
    #         # trace user program & returned result,running time
    #         print('elseeeeeeeeeeeee')
    #         result, time = self.__trace_program(pid)
    #         print('result:', result)
    #         # if success, check running time
    #         if time > self.limit_time:
    #             os.remove(os.path.join(path + '/output.txt'))
    #             return "TIME_OVER", time, False
    #
    #         elif result is True:
    #             # try:
    #                 # get user program's next place position
    #             with open(os.path.join(path + '/output.txt')) as fp:
    #                 pos = fp.readline()
    #
    #             # os.remove(os.path.join(path, str(parent_pid) + '.txt'))
    #             return pos, time, True  # return next place position, running item, result
    #
    #             # except Execution as e:
    #             #     print(e, '!!!!!!')
    #             #     return "SERVER_ERROR", time, False
    #
    #         # fail
    #         else:
    #             os.remove(os.path.join(path + '/output.txt'))
    #             return result, time, False  # return fail reason, running time, result
    #
    # def __run_program(self, command, pid, path):
    #     os.nice(19)     # program priority setting
    #     # redirect stdout to text file
    #
    #     redirection_stdout = os.open(os.path.join(path + '/output.txt'), os.O_RDWR | os.O_CREAT)
    #     os.dup2(redirection_stdout, 1)
    #
    #     if '<' in command:
    #         redirection_stdin = os.open(os.path.join(path, 'input.txt'), os.O_RDONLY)
    #         os.dup2(redirection_stdin, 0)
    #
    #     # cpu using time limit
    #     soft, hard = resource.getrlimit(resource.RLIMIT_CPU)
    #     resource.setrlimit(resource.RLIMIT_CPU, ((self.limit_time / 1000) + 1, hard))
    #
    #     ptrace.traceme()
    #     # program run
    #     os.execv(command[0], tuple(command[1:]))
    #
    # def __trace_program(self, pid):
    #     while True:
    #         wpid, status, res = os.wait4(pid, 0)
    #
    #         # normal termination
    #         if os.WIFEXITED(status):
    #             return True, res[0]
    #
    #         # abnormal termination
    #         elif os.WIFSIGNALED(status):
    #             # noinspection PyBroadException
    #             try:
    #                 os.kill(os.getpid(), signal.SIGSTOP)
    #             except Exception as e:
    #                 pass
    #
    #             return "RUNTIME_ERROR", res[0]
    #
    #         else:
    #             os.kill(os.getpid(), signal.SIGCONT)
