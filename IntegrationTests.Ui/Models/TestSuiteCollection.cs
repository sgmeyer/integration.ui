using System;
using System.Collections.Generic;

namespace IntegrationTests.Ui.Models
{
    public class TestSuiteCollection
    {
        public IList<TestSuite> TestSuites { get; private set; }
        public Guid Id { get { return Guid.NewGuid(); } }
        public string Timestamp { get; private set; }

        public TestSuiteCollection()
        {
            Timestamp = DateTime.UtcNow.ToString();
            TestSuites = new List<TestSuite>();
        }

        public void Add(TestSuite suite)
        {
            TestSuites.Add(suite);
        }
    }

    public class TestSuite
    {
        public string Name { get; set; }
        public IList<Test> Tests { get; set; }

        public TestSuite()
        {
            Tests = new List<Test>();
        }
    }

    public class Test
    {
        public string Name { get; set; }
        public string ResultsFilePath { get; set; }
        public uint PassCount { get; set; }
        public uint FailCount { get; set; }
        public IList<TestCase> TestCases { get; set; }

        public Test()
        {
            TestCases = new List<TestCase>();
            PassCount = 0;
            FailCount = 0;
        }
    }

    public class TestCase
    {
        public string Name { get; set; }
        public uint PassCount { get; set; }
        public uint FailCount { get; set; }
        public IList<TestCaseResult> Results { get; set; }

        public TestCase()
        {
            Results = new List<TestCaseResult>();
            PassCount = 0;
            FailCount = 0;
        }
    }

    public class TestCaseResult
    {
        public string Description { get; set; }
        public bool Passed { get; set; }
    }
}