#!/usr/bin/env python3
import requests, html


def extractText(text):
    PRE = r'height:500px">'
    POS = r'</textarea>'
    l = text.find(PRE) + len(PRE)
    r = text.find(POS)
    return html.unescape(text[l:r])


sites = open('../urls.txt')
for url in sites:
    url = url.rstrip()
    print(url)

    r = requests.get(url)
    f = open('html/' + url[26:] + '.html','w')
    text = r.content.decode('cp1251')
    f.write(text)
    f.close()

    f = open('txt/' + url[26:] + '.txt','w')
    f.write(extractText(text))
    f.close()

sites.close()
