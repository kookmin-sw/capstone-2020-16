board = []
with open('board.txt', 'r') as f:
    for line in f:
        board.append(list(map(int, line.strip('\n').split())))

x = 0
y = 7
cnt = 0
while True:
    cnt += 1
    if board[x][y] > 0:
        x += 1
        if x == 8:
            x = 0
            y -= 1
    if board[x][y] < 0:
        x += 1
        if x == 8:
            x = 0
            y -= 1
    if board[x][y] == 0 or cnt > 64:
        break
print(1, x, y)