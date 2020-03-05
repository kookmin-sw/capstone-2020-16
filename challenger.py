
board = []
with open('board.txt', 'r') as f:
    for line in f:
        board.append(list(map(int, line.strip('\n').split())))

x = 3
y = 0

while board[x][y] != 0:
    y += 1

print(x, y)
