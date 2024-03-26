import { NextResponse } from "next/server";
import Kanji from 'kanji.js'

const kanjiCharacters = Kanji.dump().filter(obj => obj.freq !== null).sort((a, b) => a.freq - b.freq);

export async function GET(req, res) {
    if (req.method === 'GET') {
        console.log('get')
        //const kanjiList = [
        //    { id: '1', character: '日', meaning: 'Sun', example: '日曜日 (にちようび) - Sunday' },
            // Add more Kanji details here
        //];

        return NextResponse.json({kanjiCharacters}, {status: 200});
    } else {
        return NextResponse.json({message: "An error occurred while getting latest Kanji."}, {status: 500});
    }

}
