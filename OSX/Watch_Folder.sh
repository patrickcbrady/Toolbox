#!/bin/bash

clear;
echo "Enter the directory to watch";
read dir;

clear;
echo "Enter a nicknam for the folder";
read name;

cd "$dir";

LAST=$(ls);

while true;
do
	# get the folder contents
	THIS=$(ls);
  	clear;

	# get what changed
	rawDiff=$( diff <(echo "$LAST") <(echo "$THIS") );

	# remove the line addresses and the divider 
	filtDiff=$( echo "$rawDiff" | sed '/^[0-9]/d' | sed '/^---/d' ); 

	# remove lines with "untitled folder"
	filtDiff=$( echo "$filtDiff" | sed '/untitled folder/d' );

	# convert ">" and "<" to spoken words
	filtDiff=$( echo "$filtDiff" | sed 's/>/added/g' | sed 's/</removed/g' );

	# add suffixes 
	filtDiff=$( echo "$filtDiff" | sed -E 's/(added.*)/\1 to '$name'/g' );
	filtDiff=$( echo "$filtDiff" | sed -E 's/(removed.*)/\1 from '$name'/g' );

	# display and say the change
	echo "$filtDiff";
	say -r 150 "$filtDiff";

	# store the folder contents in LAST
	# to prep for the next iteration
	LAST=$(ls);

	# display directory again (in order of
	clear;
	ls -ltr;
	
	# wait a second because CPU cycles don't grow on trees 
	sleep 1;
done;
