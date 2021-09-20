---
layout: post
title: Python type hints
image: img/clean/used/star.jpg
author: [Thulani S. Chivandikwa]
date: 2020-04-01T00:00:00.000Z
tags: [python]
draft: false
excerpt: a primer to statically indicating types in python
---

This is my hopefully simple to follow Python type hints primer. I will only cover a few of the common types hints that should get a beginner started.

Type hints are Pythons formal solution to statically indicate the types of variables. This is however not used by the python runtime in most cases but can be useful for type checkers, IDEs, linters etc.

### Built in types

Any type, built in or user defined can be used as a type hint. Below are some of the common built in types.

```python
integer: int = 10

float_value: float = 10.5

boolean: bool = True

string: str = 'hello there'

byte_array: bytearray = bytearray([1, 2])

bytes_value: bytes = bytes([1, 2])

complex_number: complex = complex(10, 5)

mapping: dict = {'x': 10}

# an immutable unordered collection of unique elements
frozen_set: frozenset = frozenset([1, 2])

# mutable sequence
list_collection: list = [1, 2]
memory_view: memoryview = memoryview(bytearray([1, 2]))

# the most base type
object_value: object = object()

# n unordered collection of unique elements
set_collection: set = {1, 2, 3}

# immutable sequence
tuple_collection: tuple = 2, 5

type_value: type = type(integer)

# a zip object whose .__next__() method returns a tuple where
# the i-th element comes from the i-th iterable argument
zip_object: zip = zip([1, 2], ['A', 'B'])

# the enumerate object yields pairs containing a count (from start, which
# defaults to zero) and a value yielded by the iterable argument
enumerate_object: enumerate = enumerate([1, 2])

```

### Any

This is the 'catch all' type hint you should avoid using unless in the process of porting code to support type hints. This simply means the variable/argument can be of any type.

> - Any is compatible with every type.
> - Any assumed to have all methods.
> - All values assumed to be instances of Any.

> object is superficially similar to Any at a glance but different. Object is the root of Python's metaclass hierarchy but is still restrictive in that the only methods you are permitted to call are ones that are a part of the object definition, unlike Any. Any is an escape hatch meant to allow you to mix together dynamic and statically typed code.

```python
from typing import Any

# variable can be assigned to any type
unconstrained: Any
unconstrained = 10


# argument passed can be of any type
# and method can return any type
def sample(unconstrained: Any) -> Any:
    pass
```

### NoReturn

Special type indicating that a function never returns as in case of function that loops infinitely or always raises an exception.

> This type is invalid in other positions, e.g., <code>List[NoReturn]</code>

```python
from typing import NoReturn


# this will never return
def raise_always() -> NoReturn:
    raise RuntimeError()

```

### Callable

Reference to a function or lambda that can be called.

```python

from typing import Callable


def to_int(value: str) -> int:
    return int(value)


# constrained callable accepting one string arg and return integer
convert_to_int: Callable[[str], int] = to_int
# unconstrained callable accepting any number of args of any type and returning any
double: Callable = lambda x: x * 2
# return type constrained callable accepting any number of args of any type and return nothing
print_out: Callable[..., None] = lambda x: print(x)

print_out(double(convert_to_int('250')))
# 500

print(callable(convert_to_int))
print(callable(double))
print(callable(print_out))
# True
# True
# True

```

### ClassVar

Marks class variables (static).

```python

from typing import ClassVar


class Sample:
    name: str
    nationality: ClassVar[str] = 'World Citizen'  # class variable

    def __init__(self, name):
        self.name = name


sample = Sample('Shingayi')
Sample.nationality = 'World Citizen'

print(sample.nationality)
# World Citizen

```

### TypeVar

Allows for creation of generic variable, useful for generic methods.

> T = TypeVar('T') # Can be anything
> A = TypeVar('A', str, bytes) # Must be str or bytes

```python
from typing import TypeVar, Sequence, Callable, Mapping

# unconstrained generic
T = TypeVar('T')


def pass_through(input: T) -> T:
    return input


# constrained generic
U = TypeVar('U', int, float)


def double(input: U) -> U:
    return input * 2


print(double(5))
print(double(5.0))
# 10
# 10.0

# multiple generics
K = TypeVar('K')
V = TypeVar('V')


def group_by(items: Sequence[V], key_func: Callable[[V], K]) -> Mapping[K, V]:
    pass
```

### Literal

A type that can be used to indicate to type checkers that the corresponding variable or function parameter has a value equivalent to the provided literal (or one of several literals).

```python

from typing import Literal

MODE = Literal['r', 'rb', 'w', 'wb']


def open_file(path: str, mode: MODE) -> None:
    pass


open_file('', 'r')
open_file('', 'x')  # warning expected Literal['r', 'rb', 'w', 'wb']

```

### Generic

The abstract base class for creating generic types.

```python

from typing import Generic, TypeVar

K = TypeVar('K')
V = TypeVar('V')


class Mapping(Generic[K, V]):
    pass

```

### Optional

Optional type that can be a specific type or None.

> Optional[X] is equivalent to Union[X, None]

```python

from typing import Optional, Union

can_be_none: Optional[str] = None
cannot_be_none: str = 'hi there'

sample: Optional[int]
# is same as
sample2: Union[None, int]

```

### Tuple

Tuple definition type.

> Deprecated since version 3.9: builtins.tuple now supports []

```python

from typing import Tuple

# Tuple of two ints
sample: Tuple[int, int] = 1, 5
# same as, but more expressive
sample2: Tuple = 1, 5
# same as, not expressive also
sample3: tuple = 1, 5

# Variable length tuple with items of homogenous type (int in this case)
sample: Tuple[int, ...] = 1, 5, 6, 10, 20

```
