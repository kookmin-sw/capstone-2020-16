
board = []
with open('board.txt', 'r') as f:
    for line in f:
        board.append(list(map(int, line.strip('\n').split())))

x = 4
y = 2

while board[x][y] != 0:
    y += 1

print(x, y)