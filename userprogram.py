import json
import os

from utils.program_run_query import select_compile_message


class UserProgram:
    def __init__(self, user_idx, language, save_path, filename):
        self.index = user_idx
        self.language = language
        self.save_path = save_path
        self.input_path = os.path.join(self.save_path, 'input.txt')
        self.file_path = os.path.join(self.save_path, filename)

    def compile(self):
        # compile_message = select_compile_message(self.language)
        # dummy_data
        compile_message = ['/usr/bin/gcc', '/usr/bin/gcc', '-o']

        if 'PYTHON' in self.language:
            pass

        else:
            compile_message[self.language].append(self.file_path)

            return compile_message[self.language]

    def play(self):

        # dummy_data
        return ['/usr/bin/python3', '/usr/bin/python3', self.save_path, '<', self.input_path]

        # run program with execution object & return result
        # return playMessage[self.language]
