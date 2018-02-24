import os
import json
from datetime import datetime

PATH = './cache/'

if not os.path.isdir(PATH):
    os.mkdir(PATH)


def append(data, fileName):
    FULL_PATH = ''.join([PATH, fileName])

    if not os.path.isfile(FULL_PATH):
        with open(FULL_PATH, 'w') as f:
            json.dump({}, f)

    fData = None
    with open(PATH + fileName, 'r') as f:
        fData = json.load(f)

        dt = datetime.now()
        da = str(dt.date())
        tm = str(dt.time())

        if da not in fData:
            fData[da] = {}

        obj = {
            tm: {
                'user': 'ivin',
                'item': data
            }
        }

        fData[da].update(obj)

    with open(PATH + fileName, 'w') as f:
        json.dump(fData, f, indent=4, sort_keys=True)


def getitems(fileName):
    FULL_PATH = ''.join([PATH, fileName])

    with open(FULL_PATH) as f:
        data: dict = json.load(f)

    for i in data.values():
        for j in i.values():
            yield j['item']


if __name__ == '__main__':
    print(tuple(getitems('todo.json')))
