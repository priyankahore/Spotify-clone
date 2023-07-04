console.log("Welcome to Spotify!");

//initialize the variables
let songIndex=0;
let audioElement=new Audio('song/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('songItem'));
let song=[
    {songName:"Let me Love Youuuuu",filepath:"song/1.mp3",coverpath:"covers/1.jpg"},
    {songName:"Perfect",filepath:"song/2.mp3",coverpath:"covers/2.jpg"},
    {songName:"Until I Found You",filepath:"song/3.mp3",coverpath:"covers/3.jpg"},
    {songName:"What makes You Beautiful",filepath:"song/4.mp3",coverpath:"covers/4.jpg"},
    {songName:"Sugar",filepath:"song/5.mp3",coverpath:"covers/5.jpg"},
    {songName:"Unholy",filepath:"song/6.mp3",coverpath:"covers/6.jpg"},
    {songName:"Intentions",filepath:"song/7.mp3",coverpath:"covers/7.jpg"},
    {songName:"Sugar & Brownies",filepath:"song/8.mp3",coverpath:"covers/8.jpg"},
]
songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 

})

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})

//listen to events
audioElement.addEventListener('timeupdate',()=>{
   

    //update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value *audioElement.duration/100;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
})
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex=parseInt(e.target.id)
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src=`song/${songIndex+1}.mp3`;
        masterSongName.innerText=song[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    masterSongName.innerText = song[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0
    }
    else{
        songIndex-=1;
    }
    audioElement.src=`song/${songIndex+1}.mp3`;
    masterSongName.innerText=song[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

