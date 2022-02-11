# Telegram-Bot

Telegram bot in Node js give it a look at [here](https://t.me/EDITH_VS_BOT)

## Download

Download docker container using command

```sh
docker pull ghcr.io/vineelsai26/telegram-bot:latest
```

### Run

Run the container on port 5000 and replace BOT_TOKEN with your bots api token

```sh
docker run -p 5000:5000 -e BOT_TOKEN='BOT_TOKEN' -d ghcr.io/vineelsai26/telegram-bot
```
