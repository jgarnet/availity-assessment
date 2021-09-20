package com.availity.csv.framework;

import java.io.IOException;
import java.util.List;

public interface CsvReader<T> {
    List<T> readFile(String fileName) throws IOException;
}
