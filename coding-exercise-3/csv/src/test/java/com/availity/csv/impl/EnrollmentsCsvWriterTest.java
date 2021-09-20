package com.availity.csv.impl;

import com.availity.csv.models.Enrollment;
import org.junit.Test;

import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class EnrollmentsCsvWriterTest {

    @Test
    public void testWritesEnrollments() throws IOException {
        Enrollment enrollment = new Enrollment();
        enrollment.setUserId("1");
        enrollment.setFirstName("Test");
        enrollment.setLastName("Test");
        enrollment.setVersion(1);
        enrollment.setInsuranceCompany("Test");
        List<Enrollment> enrollments = Collections.singletonList(enrollment);
        EnrollmentsCsvWriter writer = new EnrollmentsCsvWriter();
        String path = "src/test/resources";
        File file = new File(path);
        String fileName  = file.getAbsolutePath() + "/output.csv";
        writer.writeFile(fileName, enrollments);
        EnrollmentsCsvReader reader = new EnrollmentsCsvReader();
        List<Enrollment> output = reader.readFile(fileName);
        assertEquals(enrollments.get(0), output.get(0));
    }

}
