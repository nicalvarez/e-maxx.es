#!/usr/bin/env python
import urllib2
import codecs
from scrapy.selector import Selector
from scrapy.http import HtmlResponse

url_src = 'http://e-maxx.ru/algo/src_euler_function'
url = 'http://e-maxx.ru/algo/euler_function'

req = urllib2.urlopen(url_src)
body = req.read()
body = body.decode('string_escape')
ext = Selector(text=body).xpath('//textarea/text()').extract()
print(ext[0].decode('string_escape'))
#print(ext[0].decode('string_escape'))

import sys
#sys.exit(0)

f = codecs.open('prueba.txt','w','utf-8')
f.write(ext[0].decode('string_escape'))


