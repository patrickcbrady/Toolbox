#!/data/data/com.termux/files/usr/bin/bash

# if no argument is passed by the user
# the current working directory is used
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
			# if it's not a symbolic link
			! -L "$ITEM" &&
			
			# if it's a directory
			-d "$ITEM"
		]]
		then
			# add a slash to it
			echo "$DEPTH$ITEM/";
		else
			echo "$DEPTH$ITEM";
		fi

		if [[
			# if we're allowed to open it
			-x "$ITEM"
		]]
		then
			# append a tab to DEPTH
			NEWDEPTH=$DEPTH$'\t';

			# recursive call to LIST
			# needs it's own subshell
			# because the `local` builtin
			# doesn't work recursively
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
