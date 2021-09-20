#!/bin/sh
if [ ! -d "./target" ]
then
    echo "./target does not exist, compiling..."
    mvn clean compile assembly:single
fi
if [ -z "$1" ]
then
  read -p 'Enter the CSV file to process: ' file
fi
java -jar "./target/csv.jar" "${file}"
read -n1 -r -p "Press any key to continue..." key