package com.availity.csv.impl;

import com.availity.csv.models.Enrollment;
import org.junit.Test;

import java.io.File;
import java.io.IOException;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class EnrollmentsCsvReaderTest {

    @Test
    public void testReadsEnrollments() throws IOException {
        EnrollmentsCsvReader reader = new EnrollmentsCsvReader();
        String path = "src/test/resources/test.csv";
        File file = new File(path);
        List<Enrollment> enrollments = reader.readFile(file.getAbsolutePath());
        assertEquals("First Enrollment should be User ID X514", "X514", enrollments.get(0).getUserId());
        assertEquals("Last Enrollment should be User ID X523", "X523", enrollments.get(enrollments.size() - 1).getUserId());
    }

}
