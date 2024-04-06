export async function fetchKanji(userEmail) {
    console.log(userEmail)
    const res = await fetch('/api/kanji', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userEmail}),
    });
    if (!res.ok) {
        throw new Error('Failed to fetch Kanji');
    }
    return await res.json();
}

export async function saveProgress(email, kanjiId, confidence) {
    console.log(email, kanjiId, confidence)
    const res = await fetch('/api/progress', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, kanjiId, confidence}),
    });
    if (!res.ok) {
        throw new Error('Failed to save progress');
    }
    return await res.json();
}