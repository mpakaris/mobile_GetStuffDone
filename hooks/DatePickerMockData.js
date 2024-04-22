export const createMockEntries = () => {
  let entries = mockEntries;
  const today = new Date();

  return entries.map((entry) => {
    const daysToSubtract = Math.floor(Math.random() * 15) + 1; // +1 to ensure we never get today's date
    const newDate = new Date(today);
    newDate.setDate(today.getDate() - daysToSubtract);

    // Format the new date to an ISO string
    const newTimestamp = newDate.toISOString();

    // Return a new object with the updated timestamp
    return {
      ...entry,
      timestamp: newTimestamp,
    };
  });
};

const mockEntries = [
  {
    id: "2024-05-01",
    timestamp: "2024-05-01T08:30:20.123Z",
    structuredResults: [
      {
        activity: "Morning Jog",
        category: "Health & Fitness",
        desc: "",
        duration: 30,
      },
      {
        activity: "Breakfast",
        category: "Nutrition",
        desc: "Healthy breakfast with oats and fruits",
        duration: 15,
      },
      {
        activity: "Email Checking",
        category: "Work",
        desc: "",
        duration: 20,
      },
    ],
    results: "Started the day with a jog and healthy breakfast.",
  },
  {
    id: "2024-05-02",
    timestamp: "2024-05-02T17:45:00.654Z",
    structuredResults: [
      {
        activity: "Team Meeting",
        category: "Work",
        desc: "Weekly team alignment meeting",
        duration: 60,
      },
      {
        activity: "Lunch with Colleagues",
        category: "Social",
        desc: "Had lunch at a new restaurant",
        duration: 45,
      },
      {
        activity: "Client Call",
        category: "Work",
        desc: "Discussion on project deliverables",
        duration: 30,
      },
      {
        activity: "Project Planning",
        category: "Work",
        desc: "",
        duration: 40,
      },
    ],
    results: "Productive work day with a relaxing lunch break.",
  },
  {
    id: "2024-05-03",
    timestamp: "2024-05-03T10:10:30.567Z",
    structuredResults: [
      {
        activity: "Gardening",
        category: "Home Care",
        desc: "Planted some herbs and flowers",
        duration: 45,
      },
      {
        activity: "Read a Book",
        category: "Leisure",
        desc: "Read a few chapters of a novel",
        duration: 30,
      },
      {
        activity: "Online Course",
        category: "Education",
        desc: "Attended a webinar on data science",
        duration: 90,
      },
      {
        activity: "Yoga",
        category: "Health & Fitness",
        desc: "",
        duration: 30,
      },
      {
        activity: "Dinner Preparation",
        category: "Nutrition",
        desc: "Prepared a healthy dinner",
        duration: 50,
      },
    ],
    results:
      "A balanced day with learning, relaxation, and some physical activity.",
  },
  {
    id: "2024-05-04",
    timestamp: "2024-05-04T15:20:45.789Z",
    structuredResults: [
      {
        activity: "Cycling",
        category: "Health & Fitness",
        desc: "Went cycling around the lake",
        duration: 120,
      },
      {
        activity: "Picnic",
        category: "Leisure & Relaxation",
        desc: "Picnic by the lake after cycling",
        duration: 60,
      },
    ],
    results: "Great day out, enjoyed the weather and the outdoors.",
  },
  {
    id: "2024-05-05",
    timestamp: "2024-05-05T20:00:50.321Z",
    structuredResults: [
      {
        activity: "Cooking Class",
        category: "Education",
        desc: "Learned to cook Thai cuisine",
        duration: 120,
      },
      {
        activity: "Movie Night",
        category: "Leisure",
        desc: "Watched a new blockbuster film",
        duration: 150,
      },
      {
        activity: "House Cleaning",
        category: "Home Care",
        desc: "",
        duration: 60,
      },
      {
        activity: "Prepare Weekly Meal Plans",
        category: "Nutrition",
        desc: "Prepared meal plans for the upcoming week",
        duration: 30,
      },
      {
        activity: "Meditation",
        category: "Health & Fitness",
        desc: "",
        duration: 30,
      },
    ],
    results:
      "A full and rewarding Sunday spent learning new skills and relaxing.",
  },
];
