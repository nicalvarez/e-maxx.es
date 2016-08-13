#!/usr/bin/env python3
import html, glob, os

def extractText(text):
    PRE = r'height:500px">'
    POS = r'</textarea>'
    l = text.find(PRE) + len(PRE)
    r = text.find(POS)
    ans = text[l:r]
    for iter in range(4):
        ans = html.unescape(ans)
    return ans

import sys
def main():
    for f in glob.glob('html/*.html'):
        print(f)
        fin = open(f)
        basename = os.path.basename(f)

        text = extractText(fin.read())
        fout = open('txt/' + basename.replace('.html', '.tex'),'w')
        fout.write(text)
         
if __name__ == '__main__':
    main()
