
const InitializeStatistics = () => {

    const statistics = {
        totalWords: 0,
        totalCharacters: 0,
        totalErrors: 0,
        totalKeystrokes: 0,
        totalTime: 0,
        wpm: 0,
        accuracy: 0,
        cpm: 0
    }

    const updateStatistics = (words, characters, errors, keystrokes, time) => {
        statistics.totalWords += words;
        statistics.totalCharacters += characters;
        statistics.totalErrors += errors;
        statistics.totalKeystrokes += keystrokes;
        statistics.totalTime += time;
        statistics.wpm = Math.round((statistics.totalWords / statistics.totalTime) * 60);
        statistics.accuracy = Math.round(((statistics.totalCharacters - statistics.totalErrors) / statistics.totalCharacters) * 100);
        statistics.cpm = Math.round((statistics.totalCharacters / statistics.totalTime) * 60);
    }

    const getStatistics = () => {
        return statistics;
    }

    return {
        updateStatistics,
        getStatistics
    }

}

export { InitializeStatistics }