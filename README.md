## koipy是一个Telegram 节点测速、连通性测试机器人，同时提供对接miaospeed后端的开源实现。 koipy是fulltclash的下游分支。
首先需要准备以下信息：

去 @BotFather 那里创建一个机器人，获得该机器人的bot_token，应形如：

bot_token = "123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"

这步不会请Google。

可选信息：

⚠️koipy从1.2版本开始内置api_hash, api_id，你仅需要bot_token即可开始玩耍。当然你想用自己的api也可以。

Telegram 的api_id 、api_hash 获取地址 不会请Google。(部分TG账号已被拉黑，无法正常使用，尝试更换代理IP，IP干净成功率高，用机场节点就自求多福吧🙃)

# docker 启动

1.创建config.yaml
```
services:
  ftcftc:
    image: rebecca554owen/koi:latest
    container_name: koi
    restart: always
    network_mode: host
    volumes:
        - ./config.yaml:/opt/config.yaml # 必须挂载配置文件
        - ./results:/opt/results # 结果存储文件夹

```
2. 启动命令。  
`docker compose up -d`