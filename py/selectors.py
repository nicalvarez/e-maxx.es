#!/usr/bin/env python
import urllib2
from scrapy.selector import Selector
from scrapy.http import HtmlResponse

xpath = '/html/body/table/tbody/tr[2]/td[2]/textarea'
url = 'http://e-maxx.ru/algo/src_euler_function'

req = urllib2.Request(url)
response = urllib2.urlopen(req)
html = response.read()
print html


