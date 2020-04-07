import json
import os

from utils.program_run_query import select_compile_message


class UserProgram:
    def __init__(self, user, user_idx, language, save_path, filename):
        self.user = user
        self.index = user_idx
        self.language = language
        self.save_path = save_path
        self.input_path = os.path.join(self.save_path, 'board.txt')
        self.file_path = os.path.join(self.save_path, filename)

    def compile(self):
        # compile_message = select_compile_message(self.language)
        # dummy_data
        compile_message = {'C': ['gcc', '-o'],
                           'C++': ['g++', '-o']}

        if 'PYTHON' in self.language:
            pass

        else:
            compile_message[self.language].append(self.user)
            compile_message[self.language].append(self.file_path)

            return compile_message[self.language]

    def play(self):

        # dummy_data
        play_message = {'PYTHON': ['/usr/bin/python3', 'python3', self.file_path, '<', self.input_path],
                        'C': [self.user, self.user, '<', self.input_path],
                        'C++': [self.user, self.user, '<', self.input_path]}
        return play_message
