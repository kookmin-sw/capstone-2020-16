
board = []
with open('board.txt', 'r') as f:
    for line in f:
        board.append(list(map(int, line.strip('\n').split())))

x = 0
y = 0
cnt = 0
while True:
    if board[x][y] > 0:
        x += 1
        if x == 7:
            x = 0
            y += 1
    if board[x][y] < 0:
        x += 1
        if x == 7:
            x = 0
            y += 1
    if board[x][y] == 0 or cnt > 49:
        break
print(1, x, y)
