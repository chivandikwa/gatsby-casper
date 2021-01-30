---
layout: post
title: Pycharm hidden gems
image: img/de-hef.jpg
author: [Thulani S. Chivandikwa]
date: 2020-04-01T00:00:00.000Z
tags: [python]
draft: false
excerpt: a few simple things in pycharm that can increase your productivity
---

Here are a few interesting features of Pycharm that are otherwise not commonly known or used.

### Live templates

Live templates make it easy to add commonly used or otherwise annoying boiler plate code. I will not cover the existing live templates as you can have a look for yourself (File -> Settings [ctrl + alt + s] -> Editor -> Live Templates)

I do have a few custom ones to share that may be of interest to you.

```python
# add a new sanic route
@app.get('/$ROUTE$')
async def $ROUTE$(_: Request) -> HTTPResponse:
    return response.json(['a', 'b'])

# import logger in a file
import logging
logger = logging.getLogger(__name__)

# create a data class
@dataclass
class $NAME$:
    test: str

# create a json data class
@dataclass_json(letter_case=LetterCase.CAMEL)
@dataclass
class $NAME$:
    test: str
```

### Post fix autocompletion

Post fix autocompletion can make writing certain Python constructs faster. For example if you want the following

```python
if user.authorized:
    current_user = user
```

Instead of typing <code> if user.authorized </code>, you could type user.authorized.if and hit tab resulting in the if statement block and cursor on the next line.

The other supported postfix template are:

```python
a.ifn
if a is None:

a.ifnn
if a is not None:

a.len
len(a)

abs(1).main

if __name__ == '__main__':
    abs(1)

a.not
not a

a.print
print(a)

a.return
return a

a.while
while a:
```

> To my disappointment Pycharm currently does not support the adding new post fix template targetting python, but somehow does for SQL.

### File Templates

File templates are a sort of specification for the default contents of new files you create. Adding your own for the commonly bootstrapped files types can really increase your creativity.

Adding/Editing is easy (File -> Settings [ctrl + alt + s] -> Editor -> File and Code Templates)

![settings](https://raw.githubusercontent.com/chivandikwa/gatsby-thulani-chivandikwa/master/src/content/img/pycharm_file_templates.png)

Here are a few examples for context.

Bootstrap a new new unit test file

```python
import unittest

class #[[$Title$]]#Tests(unittest.TestCase):
    def test_x_given_when_then(self):
        self.assertEqual(True, False)

if __name__ == '__main__':
    unittest.main()
```

Bootstrap a new sanic api

```python
import logging

from sanic import Sanic, response
from sanic.request import Request
from sanic.response import HTTPResponse
from sanic_openapi import doc, swagger_blueprint
from sanic_openapi.doc import summary

logger = logging.getLogger(__name__)
app = Sanic(__name__)
app.logger = logger

app.blueprint(swagger_blueprint)
app.config['API_SCHEMES'] = ['http', 'https']
app.config['API_TITLE'] = APP_NAME
app.config['API_DESCRIPTION'] = ''


@summary('')
@doc.produces(doc.List(doc.String))
@app.get('/test')
async def test(_: Request) -> HTTPResponse:
    return response.json(['a', 'b'])


if __name__ == '__main__':
    app.run(host=HOST, port=PORT, threaded=True)


def api() -> Sanic:
    return app
```
