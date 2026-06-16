from langchain_core.tools import tool
import inspect

def f(x:str):
    return x

try:
    t = tool(f, description='test')
    print('tool type', type(t))
    print('tool callable', callable(t))
    print('tool name', getattr(t, 'name', None))
    print('tool run sig', inspect.signature(t.run))
except Exception as e:
    print('error', e)

class C:
    def __init__(self):
        self.x = 1
    def foo(self, x:str) -> str:
        return x

c = C()
try:
    t2 = tool(c.foo, description='test bound')
    print('bound tool type', type(t2))
    print('bound tool callable', callable(t2))
    print('bound tool name', getattr(t2,'name',None))
    print('bound tool run sig', inspect.signature(t2.run))
except Exception as e:
    print('bound error', e)
