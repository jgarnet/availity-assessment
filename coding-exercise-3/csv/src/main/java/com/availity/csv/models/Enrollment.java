package com.availity.csv.models;

import java.util.Objects;

public class Enrollment implements Comparable<Enrollment> {

    private String userId;
    private String firstName;
    private String lastName;
    private String insuranceCompany;
    private int version;

    public Enrollment() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getInsuranceCompany() {
        return insuranceCompany;
    }

    public void setInsuranceCompany(String insuranceCompany) {
        this.insuranceCompany = insuranceCompany;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Enrollment that = (Enrollment) o;
        return version == that.version &&
                Objects.equals(userId, that.userId) &&
                Objects.equals(firstName, that.firstName) &&
                Objects.equals(lastName, that.lastName) &&
                Objects.equals(insuranceCompany, that.insuranceCompany);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, firstName, lastName, insuranceCompany, version);
    }

    @Override
    public String toString() {
        return "Enrollment{" +
                "userId='" + userId + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", insuranceCompany='" + insuranceCompany + '\'' +
                ", version=" + version +
                '}';
    }

    @Override
    public int compareTo(Enrollment o) {
        String myKey = String.format("%s%s", this.getLastName(), this.getFirstName());
        String theirKey = String.format("%s%s", o.getLastName(), o.getFirstName());
        return myKey.compareTo(theirKey);
    }

}
