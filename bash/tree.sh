#!/bin/bash

# - - - - - - - - - - - - -
# File: tree.sh
# Version: 1.0
# Author: Immanuel Morales
# Date: 6/11/2019
# - - - - - - - - - - - - -

# Outputs a recursive listing of all files in a directory.
# The only argument taken is the directory path.
# If no argument is given, the Current Working Directory will be used.

if [[ $1 ]]
then
	TARGET="$1";
else
	TARGET="$PWD";
fi


# recursively lists files
# uses tabs for depth to show
function LIST ()
{
	cd "$1";
	DEPTH="$2";

	# additional verbosity
	# echo "$DEPTH$PWD";

	for ITEM in *;
	do
		if [[
			# if its a directory
			-d "$ITEM"
		]]
		then
			# add a slash to it
			echo "$DEPTH$ITEM/";
		else
			echo "$DEPTH$ITEM";
		fi

		if [[
			# if its not a symbolic link
			! -L "$ITEM" &&
			
			# if its a directory
			-d "$ITEM" &&
			
			# if were allowed to open it
			-x "$ITEM"
		]]
		then
			# append a tab to DEPTH
			NEWDEPTH=$DEPTH$'\t';

			# recursive call to LIST
			# needs its own subshell
			# because the `local` builtin
			# doesnt work recursively
			( LIST "$ITEM" "$NEWDEPTH" );
		fi
	done;

	exit 0;
}

# removes "*" from empty directories
shopt -s nullglob;

# allow for CTRL+C to interrupt process
trap "exit" SIGINT SIGTERM;

# if you enclose this function call in a subshell
# make sure to include the trap
LIST "$TARGET" "";
