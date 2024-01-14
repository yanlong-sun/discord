import argparse
import discord

class MyClient(discord.Client):
    async def on_ready(self):
        print(f'Logged on as {self.user}!')

    async def on_message(self, message):
        print(f'Message from {message.author}: {message.content}')

intents = discord.Intents.default()
intents.message_content = True

parser = argparse.ArgumentParser()
parser.add_argument('token')
args = parser.parse_args()
print('token is', args.token)
client = MyClient(intents=intents)
client.run(args.token)