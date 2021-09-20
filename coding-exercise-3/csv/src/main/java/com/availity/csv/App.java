package com.availity.csv;

import com.availity.csv.framework.CsvReader;
import com.availity.csv.framework.CsvWriter;
import com.availity.csv.impl.EnrollmentsCsvReader;
import com.availity.csv.impl.EnrollmentsCsvWriter;
import com.availity.csv.models.Enrollment;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class App {

    private final CsvReader<Enrollment> csvReader;
    private final CsvWriter<Enrollment> csvWriter;

    public App(CsvReader<Enrollment> csvReader, CsvWriter<Enrollment> csvWriter) {
        this.csvReader = csvReader;
        this.csvWriter = csvWriter;
    }

    public void process(String fileName) throws IOException {
        System.out.println(String.format("Processing %s...", fileName));
        List<Enrollment> enrollments = this.csvReader.readFile(fileName);
        for (Map.Entry<String, Map<String, Enrollment>> entry : this.getEnrollmentsByCompany(enrollments).entrySet()) {
            String currentFileName = entry.getKey() + ".csv";
            System.out.println(String.format("Writing file %s...", currentFileName));
            List<Enrollment> currentEnrollments = entry.getValue()
                    .entrySet()
                    .stream()
                    .sorted(Map.Entry.comparingByValue())
                    .map(Map.Entry::getValue)
                    .collect(Collectors.toList());
            this.csvWriter.writeFile(currentFileName, currentEnrollments);
            System.out.println(String.format("Successfully wrote %s", currentFileName));
        }
        System.out.println(String.format("Successfully processed %s", fileName));
    }

    private Map<String, Map<String, Enrollment>> getEnrollmentsByCompany(List<Enrollment> enrollments) {
        // utilized multiple Maps to avoid O(n^2) runtime
        Map<String, Map<String, Enrollment>> enrollmentsByCompany = new HashMap<>();
        enrollments.forEach(enrollment -> {
            if (!enrollmentsByCompany.containsKey(enrollment.getInsuranceCompany())) {
                enrollmentsByCompany.put(enrollment.getInsuranceCompany(), new HashMap<>());
            }
            Enrollment enrollmentToAdd = enrollment;
            Map<String, Enrollment> enrollmentsInCompany = enrollmentsByCompany.get(enrollment.getInsuranceCompany());
            if (enrollmentsInCompany.containsKey(enrollment.getUserId())) {
                Enrollment current = enrollmentsInCompany.get(enrollment.getUserId());
                enrollmentToAdd =
                        enrollmentToAdd.getVersion() > current.getVersion() ? enrollmentToAdd : current;
            }
            enrollmentsInCompany.put(enrollment.getUserId(), enrollmentToAdd);
        });
        return enrollmentsByCompany;
    }

    public static void main(String...args) throws IOException {
        if (args.length == 0) {
            throw new IllegalArgumentException("No .CSV file was supplied");
        }
        String fileName = args[0];
        if (fileName == null || "".equals(fileName.trim())) {
            throw new IllegalArgumentException("Received an invalid .CSV file");
        }
        App app = new App(new EnrollmentsCsvReader(), new EnrollmentsCsvWriter());
        app.process(fileName);
    }

}
