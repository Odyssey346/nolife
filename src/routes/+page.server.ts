import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import Joi from 'joi';
import { env } from '$env/dynamic/private';

export const actions: Actions = {
    check: async ({ request }) => {
        const data = await request.formData();
        const name = data.get('name') as string;
        let playerTF2RecentPlaytime: number;
        let hasLife: boolean;
        let mightHaveLife: boolean;
        let desperatelyNeedsToTouchGrass: boolean;
        let playerUsername: string;
        let isSteamID64: boolean;

        const schema = Joi.object({
            name: Joi.string().required(),
        });

        if (schema.validate({ name }).error) {
            return fail(400, { error: true, message: String(schema.validate(Object.fromEntries(data.entries())).error) });
        } else {
            let id = name;
            if (id.startsWith('https://')) {
                return fail(400, { error: true, message: 'Invalid ID' });
            } else {
                function containsOnlyNumbers(str: string) {
                    return /^[0-9]+$/.test(str);
                }
                if (containsOnlyNumbers(id)) {
                    isSteamID64 = true;
                } else {
                    isSteamID64 = false;
                }
                if (!isSteamID64) {
                    const steamID64 = await fetch(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${env.STEAM_KEY}&vanityurl=${id}`).then((res) => res.json());
                    if (steamID64.response.success === 42) {
                        isSteamID64 = true;
                    } else {
                        id = steamID64.response.steamid;
                    }
                }

                // get username
                const username = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${env.STEAM_KEY}&steamids=${id}`).then((res) => res.json());
                playerUsername = username.response.players[0].personaname;

                console.log(playerUsername)

                console.log(id)

                // ok lets get tf2 recent playtime
                const tf2RecentPlaytime = await fetch(`https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${env.STEAM_KEY}&steamid=${id}`).then((res) => res.json());

                // if account is private
                if (tf2RecentPlaytime === undefined || tf2RecentPlaytime === null || tf2RecentPlaytime.response === undefined || tf2RecentPlaytime.response === null || tf2RecentPlaytime.response.games === undefined || tf2RecentPlaytime.response.games === null || tf2RecentPlaytime.response.games.length === 0) {
                    return { success: true, message: 'has a private account.', playerUsername, id, playerTF2RecentPlaytimeHours: 0 }
                }

                playerTF2RecentPlaytime = 0;

                // loop through all the playtime_2weeks and find tf2
                for (let i = 0; i < tf2RecentPlaytime.response.total_count; i++) {
                    console.log(tf2RecentPlaytime.response.games[i]);
                    if (tf2RecentPlaytime.response.games[i].appid === 440) {
                        playerTF2RecentPlaytime = tf2RecentPlaytime.response.games[i].playtime_2weeks;
                    }
                }


                // get hours from playtime
                const playerTF2RecentPlaytimeHourshaha = playerTF2RecentPlaytime / 60;


                // round to 2 decimal places
                const playerTF2RecentPlaytimeHours = Number(playerTF2RecentPlaytimeHourshaha.toFixed(2));

                if (playerTF2RecentPlaytimeHours === undefined || playerTF2RecentPlaytimeHours === null || playerTF2RecentPlaytimeHours === 0) {
                    hasLife = true;
                    return { success: true, message: 'has a life', playerUsername, id, playerTF2RecentPlaytimeHours }
                }

                if (playerTF2RecentPlaytimeHours < 10) {
                    hasLife = true;
                    return { success: true, message: 'has a life', playerUsername, id, playerTF2RecentPlaytimeHours }
                }

                if (playerTF2RecentPlaytimeHours < 30) {
                    mightHaveLife = true;
                    return { success: true, message: 'might have a life', playerUsername, id, playerTF2RecentPlaytimeHours }
                } else {
                    desperatelyNeedsToTouchGrass = true;
                    return { success: true, message: 'desperately needs to touch grass', playerUsername, id, playerTF2RecentPlaytimeHours }
                }
            }
        }
    }
};