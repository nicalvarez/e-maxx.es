#!/usr/bin/env python
import urllib2

API_KEY = 'trnsl.1.1.20141225T204719Z.8e615b9d341153fc.ebeace10a218f28481f27567536f6539fe930db7'
URL = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=%s&lang=ru-es' % API_KEY
print URL


f = open('aho-corasick')
cnt = 10
for line in f:
    #print line
    line = line.strip()
    if (line): URL += '&text=' + line.replace(' ','+')

print URL

response = urllib2.urlopen(URL)
the_page = response.read()
print the_page;
