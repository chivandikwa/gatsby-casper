---
layout: post
title: Unit Testing with pytest
image: img/clean/used/rocks.jpg
author: [Thulani S. Chivandikwa]
date: 2020-04-04T00:00:00.000Z
tags: [python]
draft: false
excerpt: fun with the pytest framework
---

Unit testing is one of the most valuable tools we have as developers to ensure that we write working code. I have tried out both the inbuilt unittest and the third party pytest and no doubt have found pytest to shine. At a glance the two appear to be equal and unittest for me personally has a better assertions syntax. However when you start to do some more advanced things like fixtures and mocking then you really see pytest shine and when it comes to control of running tests you will have way more at your disposal with pytest.

This article is not meant to compare the two but instead will be focused on highlighting some key features of pytest.

### Sample test

Let's look at two very simple tests

```python
from typing import NoReturn

import pytest


def to_str(x: int) -> str:
    return str(x)


def test_to_str() -> None:
    assert to_str(3) == '3'


def raises() -> NoReturn:
    raise SystemExit(1)


def test_raises()  -> None:
    with pytest.raises(SystemExit):
        raises()
```

![Test Result](https://raw.githubusercontent.com/chivandikwa/gatsby-thulani-chivandikwa/master/src/content/img/pytest_1.jpg)

> For tests to be discovered they have to have the naming convention test\_\*

> PRO TIP: If you want to continually run your tests in Pycharm as you make changes you can set the current test run to be run on a delay when you stop coding by toggling this with the auto-test icon (refresh icon). The top bar of the test runner has a settings menu item (cog wheel icon) and there you can configure the delay for values between 1 and 10 seconds.

I have pytest set as the default test runner in Pycharm, see screenshot below for setting. Additionally you can run this from the console with the command <code> pytest -q test_file.py </code>

![Pycharm set test runner](https://raw.githubusercontent.com/chivandikwa/gatsby-thulani-chivandikwa/master/src/content/img/pytest_1.jpg)

The tests above are simple functions, alternatively they could have been grouped under a class:

> To my delight each test run by pytest in a class gets it's own instance, which is great for isolation. Are you paying attention NUnit?

```python
from typing import NoReturn

import pytest


def to_str(x: int) -> str:
    return str(x)


def raises() -> NoReturn:
    raise SystemExit(1)


class TestSamples:
    def test_to_str(self) -> None:
        assert to_str(3) == '3'

    def test_raises(self) -> None:
        with pytest.raises(SystemExit):
            raises()

    def test_needsfiles(self, tmpdir):
        print(tmpdir)
        assert 0
```

### Test that creates temp files

If you are writing a test that creates temp files or any other scenario that requires a temp folder, pytest has your back, no need to jump through hoops. This can be achieved by using a parameter named tmpdir that will be fulfilled by a fixture to inject a LocalPath to your test.

```python
from py._path.local import LocalPath

def test_create_temp_files(tmpdir: LocalPath):
    assert 0
```

### JUnitXML

You can configure your test runs to emit the JUnit XML report that can be consumed by many Continuous Integration tools like Jenkins, providing a visual report on. This can be achieved by triggering the test run with the junitxml flag and providing output path <code> pytest --junitxml=path </code>

> If you require a human readable report you can also emit plain text by triggering with the resultlog flag and providing an output path <code> pytest --resultlog=path </code>

### Assert that an exception is raised

Asserting if an exception has been raised is straightforward with context managers

```python
def test_raises() -> None:
    with pytest.raises(SystemExit):
        raises()


def test_raises_access_exception() -> None:
    with pytest.raises(SystemExit) as exc_info:
        raises()
    print(exc_info.typename)
```

### Test logging

It is very common to want to test if you code is logging out as expected, this can be achieved easily with the caplog built in fixture.

```python
import logging
from _pytest.logging import LogCaptureFixture

def get_logger(name: str) -> logging.Logger:
    logger = logging.getLogger(name)
    logger.setLevel("DEBUG")
    return logger

def log()-> None:
    logger = get_logger(__name__)
    logger.info('sample log')


def test_logging(caplog: LogCaptureFixture):
    log()
    print(caplog.messages)
    print(caplog.text)
    print(caplog.text)
    print(caplog.records)
    print(caplog.record_tuples)
    caplog.clear()
```

The same can be achieved with capsys for writes to sys.stdout and sys.stderr

```python
def test_sys_output(capsys: CaptureFixture):
    print('hello there')
    captured = capsys.readouterr()
    print(captured)
```

### Mocking

This is the big one. To have complete test coverage you will no doubt have to test code that has external dependencies that you do not desire in your test or that you cannot control at all. In that case one way, is to mock the specific dependencies. The mocks can target both attributes and behavior. This is surprisingly very easy to achieve with pytest using the MonkeyPatch fixture.

This fixture has support for mocking various things such as method calls, properties, dictionaries and environment variables. Here are a few examples:

```python
import functools
import os
from pathlib import Path

import pytest
import requests

from _pytest.monkeypatch import MonkeyPatch


def get_path():
    return Path.home()


# Mock method return value
def test_get_path(monkeypatch: MonkeyPatch):
    def mock_return():
        return Path("/abc")

    monkeypatch.setattr(Path, "home", mock_return)

    x = get_path()
    assert x == Path("/abc")


def get_json(url):
    response = requests.get(url)
    return response.json()


class MockResponse:

    @staticmethod
    def json():
        return {'Name': 'Chloe'}


# Mock method return object
def test_get_json(monkeypatch: MonkeyPatch):
    def mock_get(*_args, **_kwargs):
        return MockResponse()

    monkeypatch.setattr(requests, 'get', mock_get)

    result = get_json('https://fake')
    assert result['Name'] == 'Chloe'

# Scoping of mock with context manager
# Useful as mocking certain framework aspects may break pytest
def test_patch_scoped(monkeypatch):
    with monkeypatch.context() as m:
        m.setattr(functools, "partial", 10)
        assert functools.partial == 10


def get_environment_variables():
    username = os.getenv("USER")

    if username is None:
        raise OSError("USER environment is not set.")

    return username.lower()

# Mock environment variables
def test_upper_to_lower(monkeypatch: MonkeyPatch):
    monkeypatch.setenv("USER", "TestingUser")
    assert get_environment_variables() == "testinguser"


def test_raise_exception(monkeypatch: MonkeyPatch):
    monkeypatch.delenv("USER", raising=False)

    with pytest.raises(OSError):
        _ = get_environment_variables()
```

That is all I will cover in this post. Take a look at the pytest website for documentation and more examples [here](https://docs.pytest.org).
