const GEMINI_API_KEY = "some_key";
const officeDocQuestions: string[] = [
  "How many days per week can employees work remotely according to company policy?",
  "What are the official company holidays for 2024?",
  "What is the deadline for submitting expense reimbursement requests?",
  "What IT security measures are employees required to follow?",
  "How can employees book a conference room and what are the booking limitations?",
  "What tasks are included in the employee onboarding checklist?",
  "What is required before booking business travel?",
  "When are annual performance reviews conducted and what should employees prepare?",
  "What behaviors are prohibited by the company's code of conduct?",
  "What should employees do if they notice a workplace hazard?",
];

const officeDocs: { pageContent: string; metadata: Record<string, any> }[] = [
  {
    pageContent:
      "The company's remote work policy allows employees to work from home up to three days per week, subject to manager approval. Employees must be reachable during core business hours and are responsible for maintaining productivity and data security while working remotely.",
    metadata: { id: 1, department: "HR" },
  },
  {
    pageContent:
      "The official holiday schedule for 2024 includes New Year's Day (Jan 1), Independence Day (Jul 4), Thanksgiving (Nov 28), and Christmas Day (Dec 25). Additional floating holidays may be taken with manager approval.",
    metadata: { id: 2, department: "Admin" },
  },
  {
    pageContent:
      "To request expense reimbursement, employees must submit receipts and a completed expense form within 30 days of incurring the expense. Approved expenses will be reimbursed in the next payroll cycle.",
    metadata: { id: 3, department: "Finance" },
  },
  {
    pageContent:
      "IT security best practices require employees to use strong passwords, enable two-factor authentication, and report suspicious emails to the IT department. Company devices must be locked when unattended.",
    metadata: { id: 4, department: "IT" },
  },
  {
    pageContent:
      "Conference rooms can be booked using the online reservation system. Bookings are limited to 2 hours per meeting, and rooms must be left clean and ready for the next user.",
    metadata: { id: 5, department: "Facilities" },
  },
  {
    pageContent:
      "The employee onboarding checklist includes submitting tax forms, completing mandatory training, and setting up direct deposit. New hires should meet with their manager on the first day.",
    metadata: { id: 6, department: "HR" },
  },
  {
    pageContent:
      "The updated travel policy requires pre-approval for all business trips. Employees should book travel through the company portal and follow the per diem guidelines for meals and lodging.",
    metadata: { id: 7, department: "Admin" },
  },
  {
    pageContent:
      "Annual performance reviews are conducted each December. Employees should prepare a self-assessment and discuss goals and achievements with their manager during the review meeting.",
    metadata: { id: 8, department: "HR" },
  },
  {
    pageContent:
      "All employees must adhere to the company's code of conduct, which prohibits harassment, discrimination, and conflicts of interest. Violations may result in disciplinary action.",
    metadata: { id: 9, department: "Legal" },
  },
  {
    pageContent:
      "Health and safety procedures require employees to report workplace hazards immediately and participate in regular safety drills. First aid kits and emergency exits are available on every floor.",
    metadata: { id: 10, department: "Facilities" },
  },
];

export { officeDocQuestions, officeDocs, GEMINI_API_KEY };
