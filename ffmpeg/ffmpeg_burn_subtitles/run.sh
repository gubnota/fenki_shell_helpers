#!/bin/bash
# curl -O https://raw.githubusercontent.com/gubnota/fenki_shell_helpers/master/ffmpeg/ffmpeg_burn_subtitles/run.sh; bash run.sh
cd "$(dirname $0)";
cwd=${PWD##*/}          # to assign to a variable
if [ 'ffmpeg_burn_subtitles' != $cwd ]; then
echo "Creating a directory ffmpeg_burn_subtitles … Done!";
if [ ! -d ffmpeg_burn_subtitles ]; then
mkdir ffmpeg_burn_subtitles; 
fi
cd ffmpeg_burn_subtitles; cwd=${PWD##*/}
fi

if [ ! -f run.sh ]; then
    curl -O "https://raw.githubusercontent.com/gubnota/fenki_shell_helpers/master/ffmpeg/ffmpeg_burn_subtitles/run.sh";
    chmod a+x run.sh;
fi
if [ ! -f Screen.png ]; then
    curl -O "https://raw.githubusercontent.com/gubnota/fenki_shell_helpers/master/ffmpeg/ffmpeg_burn_subtitles/Screen.png";
fi
if [ ! -f 720p.mp4 ]; then
ffmpeg -loop 1 -i Screen.png -c:v libx264 -t 4 -pix_fmt yuv420p -vf scale=1280:720 720p.mp4
fi
if [ ! -f 360p.mp4 ]; then
ffmpeg -loop 1 -i Screen.png -c:v libx264 -t 4 -pix_fmt yuv420p -vf scale=640:360 360p.mp4
fi
if [ ! -f 18px.srt ]; then
    curl -O "https://raw.githubusercontent.com/gubnota/fenki_shell_helpers/master/ffmpeg/ffmpeg_burn_subtitles/18px.srt";
fi
ffmpeg -i 720p.mp4 -vf "subtitles=18px.srt" 720p_sub.mp4
ffmpeg -i 360p.mp4 -vf "subtitles=18px.srt" 360p_sub.mp4
ffmpeg -i 720p.mp4 -vf "subtitles=18px.srt:force_style='OutlineColour=&H50ff0000,BorderStyle=1,Outline=0'" OutlineColour_Blue.1.mp4
ffmpeg -i 720p.mp4 -vf "subtitles=18px.srt:force_style='OutlineColour=&H0000ffff,BorderStyle=1,Outline=2'" OutlineColour_Yellow.2.mp4
ffmpeg -i 720p.mp4 -vf "subtitles=18px.srt:force_style='OutlineColour=&H00ffffff,BorderStyle=3,Outline=0'" OutlineColour_White.3.mp4
# H0 stands for opaque, HF stands for transparent outline, Outline=0 stands for lack of outline, 1 or 2 stands for a certain degree of thickness