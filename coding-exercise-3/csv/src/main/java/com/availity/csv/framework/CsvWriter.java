package com.availity.csv.framework;

import java.io.IOException;
import java.util.List;

public interface CsvWriter<T> {
    void writeFile(String fileName, List<T> values) throws IOException;
}
