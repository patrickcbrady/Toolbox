#!/bin/bash

clear;
echo "Please enter the episode number";
read ep;

clear;
echo "Now enter your name";
read name;

clear;
echo "What folder should it be saved in? (you can just drag it into this window)"
read folder;

cd "$folder";
fname="$ep_$name_Timelapse";
clear;


ffmpeg \
		-f avfoundation \
		-r 1 \
	-i "1:none" \
\
		-vf "setpts=PTS/24" \
		-sws_flags bitexact \
	$fname.mkv \
\
&& \
\
ffmpeg \ 
		-r 24 \
	-i $fname.mkv \
\
		-c:v prores_ks \ 
		-pix_fmt yuv420p \
		-vf "scale=1920x1080" \ 
		-sws_flags bitexact \
	$fname.mov \

&& \
\
rm -v $fname.mkv
