<p align="center">
  <img src="https://svgshare.com/i/Nb1.svg" height="80"/>
  <h1 align="center">crowdin-discord-webhooks</h1>
</p>

**crowdin-discord-webhooks** sends your Crowdin events to a Discord channel, no hosting or servers required! Simply point a Crowdin webhook to it and you're good to go!

![Image](https://i.imgur.com/UBxcYoA.jpg)

## Setup

1. Create a Discord Webhook in the channel you want to receive your events in and copy its URL
2. Replace `https://discordapp.com/api/webhooks` with `https://crowdinwebhooks.switchblade.xyz`, and save it temporarily somewhere like notepad
3. Go to your Crowdin Project settings, and navigate to the "API & Webhooks" tab
4. Click _"Add Webhook"_  and configure it like so:
    - **Name** can be whatever you want
    - Paste the Webhook URL from Step 2 on the **URL** field
    - Set the **Request Method** to `POST`
    - Set the **Content Type** to `application/json`
    - Select what events you want to be notified about
5. Click _"Test"_ on the right panel to check if your webhook is working
6. Click _"Add"_ and you should be good to go!

