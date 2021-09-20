package com.availity.csv;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import com.availity.csv.framework.CsvReader;
import com.availity.csv.framework.CsvWriter;
import com.availity.csv.models.Enrollment;
import org.junit.Test;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class AppTest {

    @Test
    public void testWritesMultipleFiles() throws IOException {
        Enrollment one = new Enrollment();
        one.setUserId("1");
        one.setFirstName("Adam");
        one.setLastName("Johnson");
        one.setVersion(1);
        one.setInsuranceCompany("test 1");
        Enrollment two = new Enrollment();
        two.setUserId("2");
        two.setFirstName("Laura");
        two.setLastName("Johnson");
        two.setVersion(1);
        two.setInsuranceCompany("test 2");
        Enrollment three = new Enrollment();
        three.setUserId("3");
        three.setFirstName("Tom");
        three.setLastName("Hanks");
        three.setVersion(1);
        three.setInsuranceCompany("test 3");
        CsvReader<Enrollment> reader = new MockReader(Arrays.asList(one, two, three));
        MockWriter writer = new MockWriter();
        App app = new App(reader, writer);
        app.process("test");
        List<String> fileNames = writer.getCalls().stream().map(MockWriterCall::getFileName).collect(Collectors.toList());
        assertTrue("test 1.csv was created", fileNames.contains("test 1.csv"));
        assertTrue("test 2.csv was created", fileNames.contains("test 2.csv"));
        assertTrue("test 3.csv was created", fileNames.contains("test 3.csv"));
    }

    @Test
    public void testSortsEnrollments() throws IOException {
        Enrollment one = new Enrollment();
        one.setUserId("1");
        one.setFirstName("Adam");
        one.setLastName("Johnson");
        one.setVersion(1);
        one.setInsuranceCompany("test");
        Enrollment two = new Enrollment();
        two.setUserId("2");
        two.setFirstName("Laura");
        two.setLastName("Johnson");
        two.setVersion(1);
        two.setInsuranceCompany("test");
        Enrollment three = new Enrollment();
        three.setUserId("3");
        three.setFirstName("Tom");
        three.setLastName("Hanks");
        three.setVersion(1);
        three.setInsuranceCompany("test");
        CsvReader<Enrollment> reader = new MockReader(Arrays.asList(one, three, two));
        MockWriter writer = new MockWriter();
        App app = new App(reader, writer);
        app.process("test");
        List<Enrollment> enrollments = writer.getCalls().get(0).getValues();
        assertEquals("First element is Adam Johnson", "1", enrollments.get(1).getUserId());
        assertEquals("Second element is Laura Johnson", "2", enrollments.get(2).getUserId());
        assertEquals("Third element is Tom Hanks", "3", enrollments.get(0).getUserId());
    }

    @Test
    public void removesDuplicates() throws IOException {
        Enrollment one = new Enrollment();
        one.setUserId("1");
        one.setFirstName("test");
        one.setLastName("test");
        one.setVersion(1);
        one.setInsuranceCompany("test");
        Enrollment two = new Enrollment();
        two.setUserId("1");
        two.setFirstName("test");
        two.setLastName("test");
        two.setVersion(2);
        two.setInsuranceCompany("test");
        CsvReader<Enrollment> reader = new MockReader(Arrays.asList(one, two));
        MockWriter writer = new MockWriter();
        App app = new App(reader, writer);
        app.process("test");
        Enrollment enrollment = writer.getCalls().get(0).getValues().get(0);
        assertEquals("Duplicate is removed in favor of highest version", 2, enrollment.getVersion());
    }

}

class MockReader implements CsvReader<Enrollment> {

    private List<Enrollment> enrollments;

    public MockReader(List<Enrollment> enrollments) {
        this.enrollments = enrollments;
    }

    @Override
    public List<Enrollment> readFile(String fileName) throws IOException {
        return this.enrollments;
    }

}

class MockWriter implements CsvWriter<Enrollment> {

    private List<MockWriterCall> calls = new ArrayList<>();

    @Override
    public void writeFile(String fileName, List<Enrollment> values) throws IOException {
        this.calls.add(new MockWriterCall(fileName, values));
    }

    public List<MockWriterCall> getCalls() {
        return calls;
    }

}

class MockWriterCall {

    private String fileName;
    private List<Enrollment> values;

    public MockWriterCall(String fileName, List<Enrollment> values) {
        this.fileName = fileName;
        this.values = values;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public List<Enrollment> getValues() {
        return values;
    }

    public void setValues(List<Enrollment> values) {
        this.values = values;
    }

}