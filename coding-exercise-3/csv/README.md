# CSV Solution

This example assumes the CSV file format (input & outputs) will match:

### `User Id, First Name, Last Name, Version, Insurance Company`

To run the solution, execute `run.sh`. 

You can provide the .csv input file as an argument -- otherwise the script will prompt for one.

If you do not have access to a bash terminal, the following command will compile the source:

### `mvn clean compile assembly:single`

Then run `java -jar ./target/csv.jar "csv file name.csv"`