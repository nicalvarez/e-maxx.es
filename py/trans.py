#!/usr/bin/env python
import urllib2
import json
import codecs

API_KEY = 'trnsl.1.1.20141225T204719Z.8e615b9d341153fc.ebeace10a218f28481f27567536f6539fe930db7'
BASE_URL = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=%s&lang=ru-' % API_KEY

def init_URL(lang):
    global URL
    URL = BASE_URL + lang

def add_line(line):
    global URL
    line = line.strip()
    if len(line) == 0: return True
    line = '&text='+line
    if len(URL) + len(line) > 2**10: return False
    URL += line
    return True

def get_translation():
    print 'Getting translation...'
    response = urllib2.urlopen(URL)
    the_page = response.read()
    print 'DONE!'

    TRIES = 4
    for iter in xrange(TRIES):
        try:
            js = json.loads(the_page)
            if js['code'] != 200: 
                print "ERROR: ", 
                return None
            return js['text'] 
        except:
            print 'Fallo intento ', iter+1

    try:
        js = json.loads(the_page)
        if js['code'] != 200: 
            print "ERROR: ", 
            return None
        return js['text'] 
    except:
        print the_page

def translate(lang, input, output):
    print input
    fin = open(input)
    fout = codecs.open(output,'w','utf-8')
    init_URL(lang)

    res = []
    for line in fin:
        if not add_line(line):
            fragment = get_translation()
            init_URL(lang)
            if fragment:
                res.extend(fragment)
            else:
                print 'Fallo fragemento' + URL


    res = '\n'.join(res)
    fout.write(res)
    return res 
    
def main():
    trans = translate('es','aho-corasick', 'aho-es')
    print trans

if __name__ == '__main__':
    main()
