import "@testing-library/jest-dom";

// Mock jsPDF
jest.mock("jspdf", () => {
  return jest.fn().mockImplementation(() => ({
    setFontSize: jest.fn(),
    text: jest.fn(),
    internal: {
      pageSize: {
        getWidth: jest.fn().mockReturnValue(210),
      },
    },
    save: jest.fn(),
  }));
});
