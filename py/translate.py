#!/usr/bin/env python
# -*- coding: utf-8 -*-
import requests, codecs, json, glob, os

LIMIT = 9090
API_KEY = 'trnsl.1.1.20141225T204719Z.8e615b9d341153fc.ebeace10a218f28481f27567536f6539fe930db7'
URL = 'https://translate.yandex.net/api/v1.5/tr.json/translate'
PARAMS = {'key': API_KEY, 'lang' : 'ru-en'}

def splitFile(input):
    f = open(input)
    res = []
    chunk = ''
    for line in f:
        assert len(line) < LIMIT
        if len(chunk) + len(line) > LIMIT:
            res.append(chunk)
            chunk = ''
        chunk += line
    if len(chunk) > 0:
        res.append(chunk)
    return res

def translate(text):
    while True:
        try:
            params = PARAMS
            params['text'] = text
            r = requests.post(URL,data=params)
            print r.content
            js = json.loads(r.content)
            if js['code'] == 200:
                return js['text'][0]
        except:
            print "Fallo", text
    
def translateFile(input,output):
    print 'Translating', input

    fout = codecs.open(output,'w','utf-8')
    chunks = splitFile(input)
    n = len(chunks)
    for i in xrange(n):
        print 'Part', i+1, 'of', n
        fout.write(translate(chunks[i]))
    fout.close()

    print 'Done'


import sys
def main():
#    done = glob.glob('../text/new/*txt.es')
#    for f in done:
#        if os.stat(f).st_size == 0:
#            os.remove(f)
#
#    done = glob.glob('../text/new/*txt.es')
#    done = set(map(lambda x : x[:-3],done)) 

    global PARAMS
    lang = 'es'
    PARAMS['lang'] = 'ru-' + lang
    for f in glob.glob('txt/*tex'):
        if f.endswith('.'+lang+'.tex'): continue
        g = f.replace('.tex', '.'+lang+'.tex')
        if os.path.isfile(g) and os.path.getsize(g) > 0: continue
        print f
        #translateFile(f, g)

    
if __name__ == '__main__':
    main()

