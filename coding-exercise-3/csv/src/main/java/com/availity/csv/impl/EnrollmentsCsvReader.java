package com.availity.csv.impl;

import com.availity.csv.framework.CsvReader;
import com.availity.csv.models.Enrollment;
import com.opencsv.CSVReader;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class EnrollmentsCsvReader implements CsvReader<Enrollment> {

    @Override
    public List<Enrollment> readFile(String fileName) throws IOException {
        List<Enrollment> rows = new LinkedList<>();
        try (CSVReader csvReader = new CSVReader(new FileReader(fileName))) {
            String[] values;
            boolean pastColumnsRow = false;
            while ((values = csvReader.readNext()) != null) {
                if (!pastColumnsRow) {
                    pastColumnsRow = true;
                } else {
                    rows.add(this.convertCsvToEnrollment(values));
                }
            }
        }
        return rows;
    }

    private Enrollment convertCsvToEnrollment(String[] csvValues) {
        // this solution assumes the columns will follow the same order specified in the prompt
        Enrollment enrollment = new Enrollment();
        enrollment.setUserId(csvValues[0]);
        enrollment.setFirstName(csvValues[1]);
        enrollment.setLastName(csvValues[2]);
        enrollment.setVersion(Integer.parseInt(csvValues[3]));
        enrollment.setInsuranceCompany(csvValues[4]);
        return enrollment;
    }

}
