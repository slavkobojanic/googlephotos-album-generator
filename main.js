const fetch = require("node-fetch");
const {prompt} = require("enquirer");
const wordbank = require("./wordbank");

async function run() {
    const response = await prompt([
        {
            type: "input",
            name: "token",
            message: "Enter your Google Photos write-only access token: "
        },
        {
            type: "input",
            name: "amount",
            message: "How many albums do you need: "
        }
    ]);

    const {token, amount} = response;
    
    if (!token || !amount) {
        throw new Error("You haven't provided an access token, try again.");
    }

    for (let i = 0; i < amount; i++) {
        const uri = `https://photoslibrary.googleapis.com/v1/albums?access_token=${token}`;
        const params = {
            method: "POST",
            body: JSON.stringify({
                album: {
                    title: wordbank()
                }
            })
        };
        fetch(uri, params)
            .catch(e => {
                if (e) {
                    throw new Error(e.message);
                }
            });
    }
}

run();

