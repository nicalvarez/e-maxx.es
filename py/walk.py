#!/usr/bin/env python
import fnmatch
import os
import trans

import sys
def translate(root,filename,lang):
    print 'Translating', filename
    dest_root = root.replace('/ru/','/'+lang+'/')
    if not os.path.exists(dest_root):
        os.makedirs(dest_root)

    input =  os.path.join(root,filename)
    output = os.path.join(dest_root,filename)

    if not os.path.isfile(output):
        trans.translate(lang,input,output)

def translate_all(lang):
    for root, dirnames, filenames in os.walk('../text/ru'):
        for filename in fnmatch.filter(filenames, "*"):
            translate (root, filename, lang)

def main():
    translate_all('en')
    #trans.translate('es', '../text/ru/algebra/egcd.txt', 'prueba2')

if __name__ == '__main__':
    main()
