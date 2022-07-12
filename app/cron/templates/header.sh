#!bin/sh

## Arguments
filename=$1
pid_file="/var/run/${filename}.pid"

## Create pid file
if [ -f $pid_file ]; then
  echo "Found existing .pid file named $pid_file. Checking."

  ## Check the pid to see if the process exists
  pgrep -F $filename
  pid_is_stale=$?
  old_pid=$(cat $pid_file)
  echo "pgrep check on existing .pid file returned exit status: $pid_is_stale"

  if [ $pid_is_stale -eq 1 ]; then
    echo "PID $old_pid is stale. Removing file and continuing."
    rm $pid_file
  else
    echo "PID $old_pid is still running or pgrep check errored. Exiting."
    exit
  fi
else
  echo "Creating .pid file $pid_file"
  echo $$ >$pid_file
fi
