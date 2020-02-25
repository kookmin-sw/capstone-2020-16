import sys
import json
import os


stdout = os.open(os.path.join(os.getcwd() + 'test.txt'), os.O_RDWR | os.O_CREAT)
os.dup2(stdout, 1)

os.execv('python', ('python', os.path.join(os.getcwd() + 'test2.py')))
