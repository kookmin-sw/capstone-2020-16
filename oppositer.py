
board = []
with open('board.txt', 'r') as f:
    for line in f:
        board.append(list(map(int, line.strip('\n').split())))

x = 0
y = 6

while board[x][y] > 0:
    x += 1

print(x, y)