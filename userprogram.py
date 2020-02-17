import json
import os

from utils.program_run_query import select_compile_message


class UserProgram():
    def __init__(self, language, save_path, filename):
        self.language = language
        self.save_path = save_path
        self.input_path = os.path.join(self.save_path, 'input.txt')
        self.file_path = os.path.join(self.save_path, filename)

    def compile(self):
        compile_message = select_compile_message(self.language)

        if 'PYTHON' in self.language:
            pass

        else:
            compile_message[self.language].append(self.filePath)

            return compile_message[self.language]

    def play(self):
        # run program with execution object & return result
        return playMessage[self.language]


