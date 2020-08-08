addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    if (request.method === 'POST') {
        const path = new URL(request.url).pathname
        const crowdin = await request.json()
        switch (crowdin.event) {
            case 'file.translated':
                await sendWebhook(path, `:white_check_mark: **${crowdin.file}** is now fully translated to \`${crowdin.language}\` ${getFileUrl(crowdin)}\n---`)
                break
            case 'file.approved':
                await sendWebhook(path, `:ballot_box_with_check: The \`${crowdin.language}\` translation for **${crowdin.file}** is now fully approved. ${getFileUrl(crowdin)}\n---`)
                break
            case 'project.translated':
                await sendWebhook(path, `:confetti_ball: All strings have been translated to \`${crowdin.language}\`! ${getProjectUrl(crowdin)}\n---`)
                break
            case 'project.approved':
                await sendWebhook(path, `:tada: All \`${crowdin.language}\` strings have been approved! ${getProjectUrl(crowdin)}\n---`)
                break
            case 'translation.updated':
                await sendWebhook(path, `:up: The translation for a \`${crowdin.language}\` string in **${crowdin.file}** has been updated by **${crowdin.user}** ${getFileUrl(crowdin)}\n---`)
                break
            case 'suggestion.added':
                await sendWebhook(path, `:pencil: **${crowdin.user}** has added a new \`${crowdin.language}\` suggestion to a string in **${crowdin.file}**  ${getFileUrl(crowdin)}\n---`)
                break
            case 'suggestion.updated':
                await sendWebhook(path, `:small_blue_diamond: **${crowdin.user}** has updated a \`${crowdin.language}\` suggestion to a string in **${crowdin.file}**  ${getFileUrl(crowdin)}\n---`)
                break
            case 'suggestion.deleted':
                await sendWebhook(path, `:wastebasket: **${crowdin.user}** has deleted a \`${crowdin.language}\` suggestion to a string in **${crowdin.file}**  ${getFileUrl(crowdin)}\n---`)
                break
            case 'suggestion.approved':
                await sendWebhook(path, `:thumbsup: **${crowdin.user}** has approved a \`${crowdin.language}\` suggestion to a string in **${crowdin.file}**  ${getFileUrl(crowdin)}\n---`)
                break
            case 'suggestion.disapproved':
                await sendWebhook(path, `:thumbsdown: **${crowdin.user}** has unapproved a \`${crowdin.language}\` suggestion to a string in **${crowdin.file}**  ${getFileUrl(crowdin)}\n---`)
                break
            case 'string.added':
                await sendWebhook(path, `:new: **${crowdin.user}** has added a new string to the project  ${getProjectUrl(crowdin)}\n---`)
                break
            case 'string.deleted':
                await sendWebhook(path, `:wastebasket: **${crowdin.user}** has deleted a string from the project  ${getProjectUrl(crowdin)}\n---`)
                break
            case 'string.updated':
                await sendWebhook(path, `:up: **${crowdin.user}** has updated a string in the project  ${getProjectUrl(crowdin)}\n---`)
                break
        }
        return new Response('OK', {status: 200})
    }
}

function getFileUrl (crowdin) {
    return `<https://crowdin.com/translate/${crowdin.project}/${crowdin.file_id}/en-${crowdin.language.replace('-', '').toLowerCase()}>`
}

function getProjectUrl (crowdin) {
    return `<https://crowdin.com/project/${crowdin.project}>`
}

async function sendWebhook(path, message) {
    return fetch(`https://discordapp.com/api/webhooks${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: 'Crowdin',
            avatar_url: 'https://pbs.twimg.com/profile_images/1123967384891613184/Ug8TZcdB.png',
            content: message
        })
    })
}