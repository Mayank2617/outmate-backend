const getYoutubeEmbed = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const urls = [
    "https://www.youtube.com/watch?v=8Vf0X_i4vA0",
    "https://www.youtube.com/watch?v=N6N2Q8yY4z8",
    "https://www.youtube.com/watch?v=sI91O792_yM",
    "https://www.youtube.com/watch?v=Fj2FOnwbX24",
    "https://www.youtube.com/watch?v=vxWwLfv-MZA",
    ""
];

urls.forEach(url => {
    console.log(`URL: '${url}' -> ID: '${getYoutubeEmbed(url)}'`);
});
