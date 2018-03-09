import os
import json
from contextlib import contextmanager
from datetime import datetime

ROOT_DIR = './cache/'

options = {
    'indent': 4,
}




class createJSON:
    def __init__(self, fileName):
        self.fileName = fileName
        self.fullpath = ''.join((ROOT_DIR, fileName, '.json'))

        # TO DO check if folder exists
        if not os.path.isfile(self.fullpath):
            self.set({})

    def _get(self):
        obj = {}
        try:
            with open(self.fullpath, 'r') as f:
                obj = json.load(f)
        except Exception as e:
            print(e)

        return obj

    def set(self, obj):
        with open(self.fullpath, 'w') as f:
            json.dump(obj, f, **options)

    def get(self):
        obj = self._get()
        for dt in obj:
            for tm in obj[dt]:
                # TODO try using namedtuple
                yield {
                    'id': ' '.join((dt, tm)),
                    'value': obj[dt][tm]['item']
                }

    def add(self, val):
        obj: dict = self._get()

        now = str(datetime.now())
        dt, tm = now.split()

        # TODO try using defaultdict
        if dt not in obj:
            obj[dt] = {}

        temp = {
            tm: {
                'user': 'ivy',
                'status': False,
                'item': val
            }
        }

        obj[dt].update(temp)

        self.set(obj)

        # we are use the datetime object as the id
        # so, here we return the id and the value to
        # be send back to client
        return {'id': now, 'value': val}

    def update(self, id, **kwargs):
        obj: dict = self._get()
        st, tm = id.split()
        obj[dt][tm].update(kwargs)


    def delete(self, dt, tm):
        obj: dict = self._get()
        obj[dt].pop(tm, None)
        self.set(obj)


if __name__ == '__main__':
    items = createJSON('todoo')
    items.delete("2018-03-01", "02:23:10.264763")
