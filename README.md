# 葡萄园自动灌溉控制系统

http://192.168.1.28:8080/cao/user/login 

## API接口
```
# opera  post
加密传输数据
{
    ruleId:
    opera:  open close-手动模式停某个阀 stop-急停 remote local
    “cookie”:
    >>>>>>
}

# operaType : post
加密传输数据
{
    type:handle/time/auto
    “cookie”
    >>>>>>
}

handle
start:单位S
end:单位S
rule:0,1,2,3,4,5 , 0~7

time
    time:long ms
    start:单位S
    end:单位S
    ruletime:0,30,34  s

auto
    start:单位S
    end:单位S
    ruletime:0,30,34  s
    rules:78,   水分百分比
    readtime  s
    loop:   h
```