const ap = new APlayer({
  container: document.getElementById("aplayer"),
  volume: 0.5,
  fixed: true,
  autoplay: false,
  audio: [
    {
      name: "Gimme! Gimme! Gimme! (A Man After Midnight)",
      artist: "ABBA",
      url: " http://music.163.com/song/media/outer/url?id=3880252.mp3",
      cover:
        "http://p2.music.126.net/DGp1Z5eqqGit_L3hg7h48w==/109951166365655176.jpg?param=130y130",
    },
  ],
});
