package com.availity.csv.impl;

import com.availity.csv.framework.CsvWriter;
import com.availity.csv.models.Enrollment;
import com.opencsv.CSVWriter;

import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

public class EnrollmentsCsvWriter implements CsvWriter<Enrollment> {

    public void writeFile(String fileName, List<Enrollment> enrollments) throws IOException {
        // this solution assumes the file will be written in the same order as the input .CSV
        CSVWriter csvWriter = new CSVWriter(new FileWriter(fileName));
        csvWriter.writeNext(new String[]{
                "User Id", "First Name", "Last Name", "Version", "Insurance Company"
        });
        for (Enrollment enrollment : enrollments) {
            csvWriter.writeNext(new String[]{
                    enrollment.getUserId(),
                    enrollment.getFirstName(),
                    enrollment.getLastName(),
                    String.valueOf(enrollment.getVersion()),
                    enrollment.getInsuranceCompany()
            });
        }
        csvWriter.close();
    }

}
